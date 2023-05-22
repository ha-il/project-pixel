import Component from "../core/Component.js";
import { $ } from "../utils/dom.js";
import {
  convertMillisecondsToTime,
  convertTimeToMilliseconds,
} from "../utils/time.js";
import Home from "./Home.js";

class Playlist extends Component {
  async fetchData() {
    const playlistId = window.location.pathname.slice(11);

    const playlistResponse = await fetch(`/api/playlists/${playlistId}`);
    const playlist = await playlistResponse.json();

    const chartResponse = await fetch("/api/musics/chart");
    const chartMusics = await chartResponse.json();

    if (chartResponse.ok && playlistResponse.ok) {
      return this.setState({ chartMusics, playlist });
    }
  }
  template() {
    return `
      <div class="playlist-container">
        <button type="button" class="back-button">↩</button>
        <div class="info-container">
          <div class="image"></div>
          <div class="info">
            <div class="name">${
              this.state.playlist
                ? this.state.playlist.name
                : "플레이리스트 제목"
            }</div>
            <div class="profileName">${
              this.state.playlist
                ? this.state.playlist.owner.profileName
                : "유저의 프로필 네임"
            }</div>
            <div class="duration">${
              this.state.playlist ? this.state.playlist.musics.length : "0"
            }곡 / 00:00:00시간</div>
            <div class="description">${
              this.state.playlist
                ? this.state.playlist.description
                : "곡 설명이니까 좀 길게 써보자. 이 플레이리스트는 1970년 영국에서부터 날아와.."
            }</div>
            <button type="button" class="play-button">재생</button>
          </div>
        </div>
        <div class="current-music-list music-list-container">
          ${
            this.state.playlist
              ? this.state.playlist.musics.length === 0
                ? "<div>음악을 추가해보세요!</div>"
                : this.state.playlist.musics
                    .map((music) => {
                      return `
                      <div class="music-container">
                        <img class="image" src="${music.imageUrl}"/>
                        <div class="title">${music.title}</div>
                        <div class="artist">${music.artist}</div>
                        <button type="button" class="add-music-button" data-musicid=${
                          music._id
                        }>+</button>
                        <div class="duration">${convertMillisecondsToTime(
                          convertTimeToMilliseconds(music.duration)
                        )}</div>
                      </div>
                    `;
                    })
                    .join("")
              : null
          }
        </div>
        <div class="search-container">검색 바</div>
        <div class="recommended-music-list music-list-container">
          ${
            this.state.chartMusics
              ? this.state.chartMusics
                  .map((music) => {
                    return `
                      <div class="music-container">
                        <img class="image" src="${music.imageUrl}"/>
                        <div class="title">${music.title}</div>
                        <div class="artist">${music.artist}</div>
                        <button type="button" class="add-music-button" data-musicid=${
                          music._id
                        }>+</button>
                        <div class="duration">${convertMillisecondsToTime(
                          convertTimeToMilliseconds(music.duration)
                        )}</div>
                      </div>
                    `;
                  })
                  .join("")
              : null
          }
        </div>
      </div>
    `;
  }

  setEvent() {
    $(".back-button").addEventListener("click", (e) => {
      window.history.pushState(null, "", "/");
      new Home($("main"));
    });
    $(".recommended-music-list").addEventListener("click", async (e) => {
      if (e.target.classList.contains("add-music-button")) {
        const musicId = e.target.dataset.musicid;

        const response = await fetch(
          `/api/playlists/${this.state.playlist._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ musicId }),
          }
        );

        const playlist = await response.json();

        if (response.ok) {
          this.setState({ playlist });
        }
      }
    });
  }
}

export default Playlist;
