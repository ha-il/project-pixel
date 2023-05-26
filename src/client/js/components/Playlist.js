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
          ${
            this.state.playlist
              ? this.state.playlist.musics[0]
                ? `<img class="image" src="${this.state.playlist.musics[0].imageUrl}"/>`
                : '<div class="image"><i class="fa-solid fa-music"></i></div>'
              : '<div class="image"><i class="fa-solid fa-music"></i></div>'
          }
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
            }곡</div>
            <div class="description">${
              this.state.playlist ? this.state.playlist.description : "곡 설명"
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
                        <div class="duration">${convertMillisecondsToTime(
                          convertTimeToMilliseconds(music.duration)
                        )}</div>
                      </div>
                    `;
                    })
                    .join("")
              : "플레이리스트의 음악을 불러오는 중입니다..."
          }
        </div>
        <div class="search-container">
          <form method="get" id="music-search-form">
            <div class="form-input">
              <label for="searchWord">검색하기: </label>
              <input
                id="searchWord"
                name="searchWord"
                type="text"
                placeholder="검색하고 싶은 곡의 제목을 입력해주세요"
                maxlength="30"
                required
              />
            </div>
            <input type="submit" value="검색" />
          </form>
        </div>
        <div class="music-list-title">${
          this.state.listTitle ? this.state.listTitle : "인기차트 곡 추가하기"
        }</div>
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
              : "인기 차트 음악을 불러오는 중입니다..."
          }
        </div>
      </div>
    `;
  }

  findMusicByMusicid(musicid) {
    for (let music of this.state.playlist.musics) {
      if (music._id === musicid) {
        return true;
      }
    }
  }
  setEvent() {
    $(".back-button").addEventListener("click", (e) => {
      window.history.pushState(null, "", "/");
      const { playerSetState } = this.props;
      new Home($("main"), { playerSetState });
    });
    $(".recommended-music-list").addEventListener("click", async (e) => {
      if (e.target.classList.contains("add-music-button")) {
        const musicId = e.target.dataset.musicid;
        const isExistedMusic = this.findMusicByMusicid(musicId);
        if (isExistedMusic) return;

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
    $(".play-button").addEventListener("click", (e) => {
      if (this.state.playlist.musics.length === 0) return;
      const { playerSetState } = this.props;
      return playerSetState({
        musics: this.state.playlist.musics,
        currentMusic: this.state.playlist.musics[0],
      });
    });
    $("#music-search-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const searchWord = $("#searchWord").value;
      const response = await fetch(`/api/musics/search/${searchWord}`);

      if (response.ok) {
        const data = await response.json();
        const listTitle = `"${searchWord}" 검색 결과: ${data.length} 곡`;
        this.setState({ chartMusics: data, listTitle });
      }
    });
  }
}

export default Playlist;
