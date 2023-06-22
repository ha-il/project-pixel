import Component from "../core/Component.js";
import { $, toggleClass } from "../utils/dom.js";
import { convertMillisecondsToTime } from "../utils/time.js";

class MusicPlayer extends Component {
  player;
  done = false;
  intervalId = 123;
  volume = 1;
  visible = false;

  init() {
    this.initYoutubeApi();
    this.state = this.initState();
    this.initRouter();
    this.render();
    this.setEvent();
  }
  initYoutubeApi() {
    let existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
    if (existingScript) {
      existingScript.parentNode.removeChild(existingScript);
    }
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
  }
  initState() {
    let musics = this.props.musics;

    return {
      musics,
      currentMusic: musics[0],
    };
  }
  template() {
    return `
      <div id="music-list" class=${this.visible ? "visible" : ""}>
        <div class="container">
          <div id="player"></div>
          <div id="list-container">
            ${this.state.musics
              .map((music) => {
                return `
                <div class="music-container" id="${music.youtubeId}">
                  <img class="image" src="${music.imageUrl}"/>
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
        <div class=music-info>
          ${
            this.state.currentMusic.imageUrl
              ? `<img class="image" src="${this.state.currentMusic.imageUrl}" />`
              : `<div class="image"></div>`
          }
          
          <div class="info-container">
            <span class="title">${this.state.currentMusic.title}</span>
            <span class="artist">${this.state.currentMusic.artist}</span>
          </div>
        </div>
        <div id="play-contorls">
          <div class="play-buttons">
            <button id="pre-btn" class="player-btn" type="button">
              <i class="fa-solid fa-backward-step"></i>
            </button>
            <button id="play-btn" class="player-btn" type="button">
              <i id="play-icon" class="fa-solid fa-play"></i>
            </button>
            <button id="next-btn" class="player-btn" type="button">
              <i class="fa-solid fa-forward-step"></i>
            </button>
          </div>
          <div class="player-bar">
            <span id="current-time">00:00</span>
            <input id="timeline" type="range" step="1" value="0" min="0" />
            <span id="total-time">00:00</span>
          </div>
        </div>
        <div class=list-volume-controls>
          <button id="list-button" type="button">
            <i class="fa-solid fa-list"></i>
          </button>
          <button id="mute" type="button">
            <i id="mute-icon" class="fa-solid fa-volume-high"></i>
          </button>
          <input id="volume" type="range" step="0.01" value="0" min="0" max="1" />
        </div>
      </div>
    `;
  }
  onYouTubeIframeAPIReady() {
    this.player = new YT.Player("player", {
      height: "360",
      width: "640",
      videoId: this.state.currentMusic.youtubeId,
      events: {
        onReady: this.onPlayerReady.bind(this),
        onStateChange: this.onPlayerStateChange.bind(this),
      },
    });
  }

  onPlayerReady(event) {
    clearInterval(this.intervalId);
    toggleClass($("#play-icon"), "fa-play", "fa-pause");
    $("#volume").value = event.target.getVolume();
    $("#volume").style.backgroundSize =
      Math.floor(($("#volume").value * 100) / $("#volume").max) + "% 100%";
    $("#total-time").textContent = convertMillisecondsToTime(
      event.target.getDuration() * 1000
    );
    $("#timeline").max = event.target.getDuration();

    $("#current-time").textContent = convertMillisecondsToTime(
      event.target.getCurrentTime() * 1000
    );
    $("#timeline").value = event.target.getCurrentTime();

    this.intervalId = setInterval(() => {
      $("#current-time").textContent = convertMillisecondsToTime(
        event.target.getCurrentTime() * 1000
      );
      $("#timeline").value = event.target.getCurrentTime();

      $("#timeline").style.backgroundSize =
        Math.floor(($("#timeline").value * 100) / $("#timeline").max) +
        "% 100%";
    }, 1000);

    event.target.playVideo();
  }

  onPlayerStateChange = (event) => {
    if (event.target.getPlayerState() === 0) {
      this.updatePlaycount();
      return this.playNextMusic();
    }
  };

  playNextMusic() {
    const currentIndex = this.state.musics.findIndex(
      (music) => music.youtubeId === this.state.currentMusic.youtubeId
    );

    if (currentIndex === this.state.musics.length - 1) {
      return;
    }
    this.setState({
      currentMusic: this.state.musics[currentIndex + 1],
    });
  }

  async updatePlaycount() {
    const musicId = this.state.currentMusic._id;
    return await fetch(`/api/musics/${musicId}/playcounts`, {
      method: "POST",
    });
  }

  findMusicByYoutubeId(youtubeId) {
    for (let music of this.state.musics) {
      if (music.youtubeId === youtubeId) {
        return music;
      }
    }
    return null;
  }

  setEvent() {
    $("#list-container").addEventListener("click", (e) => {
      if (e.target.closest(".music-container")) {
        const { id } = e.target.closest(".music-container");
        const music = this.findMusicByYoutubeId(id);
        this.setState({ currentMusic: music });
      }
    });
    $("#list-button").addEventListener("click", (e) => {
      if (this.visible) {
        this.visible = false;
        $("#music-list").classList.remove("visible");
      } else {
        this.visible = true;
        $("#music-list").classList.add("visible");
      }
    });

    $("#play-btn").addEventListener("click", (e) => {
      let playerState = this.player.getPlayerState();

      if (playerState === 1) {
        $("#play-icon").classList.replace("fa-pause", "fa-play");
        return this.player.pauseVideo();
      } else {
        $("#play-icon").classList.replace("fa-play", "fa-pause");
        return this.player.playVideo();
      }
    });
    $("#next-btn").addEventListener("click", (e) => {
      return this.playNextMusic();
    });
    $("#pre-btn").addEventListener("click", (e) => {
      const currentIndex = this.state.musics.findIndex(
        (music) => music.youtubeId === this.state.currentMusic.youtubeId
      );
      if (currentIndex === 0) {
        return;
      }
      this.setState({
        currentMusic: this.state.musics[currentIndex - 1],
      });
    });
    $("#mute").addEventListener("click", (e) => {
      let isMuted = this.player.isMuted();
      if (isMuted) {
        $("#mute-icon").classList.replace("fa-volume-xmark", "fa-volume-high");
        $("#volume").value = this.volume;
        const { value, max } = $("#volume");
        $("#volume").style.backgroundSize =
          Math.floor((value * 100) / max) + "% 100%";
        this.player.unMute();
      } else {
        $("#mute-icon").classList.replace("fa-volume-high", "fa-volume-xmark");
        $("#volume").value = 0;
        $("#volume").style.backgroundSize = "0% 100%";
        this.player.mute();
      }
      return;
    });
    $("#volume").addEventListener("input", (e) => {
      const { value, max } = e.target;
      e.target.style.backgroundSize =
        Math.floor((value * 100) / max) + "% 100%";
      if (value === "0") {
        $("#mute-icon").classList.replace("fa-volume-high", "fa-volume-xmark");
      } else {
        $("#mute-icon").classList.replace("fa-volume-xmark", "fa-volume-high");
      }
      this.volume = value;
      this.player.setVolume(value * 100);
    });
    $("#timeline").addEventListener("input", (e) => {
      const { value, max } = e.target;

      e.target.style.backgroundSize =
        Math.floor((value * 100) / max) + "% 100%";

      this.player.seekTo(value);
    });
  }

  setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.render();
    this.setEvent();
    this.onYouTubeIframeAPIReady();
  };
}

export default MusicPlayer;
