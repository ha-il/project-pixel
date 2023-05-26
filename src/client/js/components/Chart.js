import Component from "../core/Component.js";
import { $ } from "../utils/dom.js";
import {
  convertMillisecondsToTime,
  convertTimeToMilliseconds,
} from "../utils/time.js";
import Home from "./Home.js";
import MusicPlayer from "./MusicPlayer.js";

class Chart extends Component {
  async fetchData() {
    const chartResponse = await fetch("/api/musics/chart");
    const chartMusics = await chartResponse.json();

    if (chartResponse.ok) {
      return this.setState({ chartMusics });
    }
  }
  template() {
    return `
      <div class="playlist-container">
        <button type="button" class="back-button">↩</button>
        <div class="info-container">
          <img class="image" src="../../../../images/tv-on.gif" />
          <div class="info">
            <div class="name">인기 차트</div>
            <div class="profileName">Top 10</div>
            <div class="description">재생수 상위 10 곡입니다.</div>
            <button type="button" class="play-button">재생</button>
          </div>
        </div>
        
        <div class="recommended-music-list music-list-container">
          ${
            this.state.chartMusics
              ? this.state.chartMusics
                  .map((music, i) => {
                    return `
                      <div class="music-container">
                        <div class="rank">${i + 1} 위</div>
                        <img class="image" src="${music.imageUrl}"/>
                        <div class="title">${music.title}</div>
                        <div class="artist">${music.artist}</div>
                        <div class="playcount">${music.playcount} 회</div>
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
      const { playerSetState } = this.props;
      return playerSetState({
        musics: this.state.chartMusics,
        currentMusic: this.state.chartMusics[0],
      });
    });
  }
}

export default Chart;
