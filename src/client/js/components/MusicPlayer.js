import Component from "../core/Component.js";
import { $ } from "../utils/dom.js";

class MusicPlayer extends Component {
  player;
  done = false;
  init() {
    this.state = this.initState();
    this.initRouter();
    this.render();
    this.setEvent();
    this.initYoutubeApi();
  }
  initYoutubeApi() {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  initState() {
    const fakeDB = [
      { title: "가시나", artist: "선미", videoId: "ur0hCdne2-s" },
      { title: "Roller Coaster", artist: "청하", videoId: "900X9fDFLc4" },
      { title: "나만, 봄", artist: "볼빨간 사춘기", videoId: "AsXxuIdpkWM" },
      { title: "HIP", artist: "마마무", videoId: "KhTeiaCezwM" },
      { title: "Bad Boy", artist: "레드벨벳", videoId: "J_CFBjAyPWE" },
    ];
    return (this.state = {
      fakeDB,
      currentMusic: fakeDB[0].videoId,
      visible: false,
    });
  }
  template() {
    return `
      <div id="music-list" class=${this.state.visible ? "visible" : ""}>
        <div class="container">
          <div id="player"></div>
          <div id="list-container">
            ${this.state.fakeDB
              .map((music) => {
                return `
              <div class="music-container" id="${music.videoId}">
                <div class="image">
                <i class="fa-solid fa-music"></i>
                </div>
                <div class="info">
                  <div class="title">${music.title}</div>
                  <div class="artist">${music.artist}</div>
                </div>
              </div>
              `;
              })
              .join("")}
          </div>
        </div>
      </div>
      <div id="music-controls">
        <div class="player-contorls">
          <div id="pre-btn" class="player-btn">
            <i class="fa-solid fa-backward-step"></i>
          </div>
          <div id="play-btn" class="player-btn">
            <i class="fa-solid fa-play"></i>
          </div>
          <div id="next-btn" class="player-btn">
            <i class="fa-solid fa-forward-step"></i>
          </div>
        </div>
      </div>
    `;
  }
  onYouTubeIframeAPIReady() {
    this.player = new YT.Player("player", {
      height: "360",
      width: "640",
      videoId: this.state.currentMusic,
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
      },
    });
  }

  onPlayerReady(event) {
    event.target.playVideo();
  }

  addComponent() {
    window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
  }

  setEvent() {
    $("#list-container").addEventListener("click", (e) => {
      if (e.target.closest(".music-container")) {
        const music = e.target.closest(".music-container");
        this.setState({ currentMusic: music.id, visible: true });
      }
    });
    $("#music-controls").addEventListener("click", (e) => {
      if (e.target.id === "music-controls") {
        $("#music-list").classList.toggle("visible");
      }
    });
    $("#play-btn").addEventListener("click", (e) => {
      let playerState = this.player.getPlayerState();
      if (playerState === -1) {
        this.player.playVideo();
      }
      if (playerState === 0) {
        this.player.playVideo();
      }
      if (playerState === 1) {
        this.player.pauseVideo();
      }
      if (playerState === 2) {
        this.player.playVideo();
      }
    });
    $("#next-btn").addEventListener("click", (e) => {
      const currentIndec = this.state.fakeDB.findIndex(
        (music) => music.videoId === this.state.currentMusic
      );
      if (currentIndec === this.state.fakeDB.length - 1) {
        return;
      }
      this.setState({
        currentMusic: this.state.fakeDB[currentIndec + 1].videoId,
        visible: true,
      });
    });
    $("#pre-btn").addEventListener("click", (e) => {
      const currentIndec = this.state.fakeDB.findIndex(
        (music) => music.videoId === this.state.currentMusic
      );
      if (currentIndec === 0) {
        return;
      }
      this.setState({
        currentMusic: this.state.fakeDB[currentIndec - 1].videoId,
        visible: true,
      });
    });
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
    this.setEvent();
    this.onYouTubeIframeAPIReady();
  }
}

export default MusicPlayer;
