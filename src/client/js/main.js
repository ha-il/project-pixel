import "../scss/styles.scss";
import Chart from "./components/Chart.js";
import Home from "./components/Home.js";
import MusicPlayer from "./components/MusicPlayer.js";
import Playlist from "./components/Playlist.js";
import Component from "./core/Component.js";
import { getCookie } from "./utils/cookie";
import { $ } from "./utils/dom.js";
import { matchRoute } from "./utils/routerHelper.js";

class App extends Component {
  initRouter() {
    this.router = {
      "/": Home,
      "/login": Home,
      "/signup": Home,
      "/playlists/:id": Playlist,
      "/playlists/chart": Chart,
    };
  }
  initState() {
    return {
      isLoggedIn: getCookie("isLoggedIn"),
      initialMusic: {
        musics: [
          {
            title: "스마트폰 아이콘을 클릭해보세요!",
            youtubeId: "",
            imageUrl: "../../../images/coffee.png",
            artist: "음악 추가와 플레이리스트 생성을 할 수 있습니다.",
          },
        ],
      },
    };
  }
  template() {
    return `
      <main class=${this.state.isLoggedIn ? "" : "room-dark"}></main>
      <div id="music-player"></div>
    `;
  }
  addComponent() {
    let path = window.location.pathname;

    const isPlaylists = path.includes("playlists/");
    if (isPlaylists && !(path === "/playlists/chart")) {
      path = matchRoute(this.router, path);
    }

    const pageComponent = this.router[path];

    if (this.state.isLoggedIn) {
      const musicPlayer = new MusicPlayer(
        $("#music-player"),
        this.state.initialMusic
      );
      return new pageComponent($("main"), {
        playerSetState: musicPlayer.setState,
      });
    }

    return new pageComponent($("main"));
  }
}

new App($("#app"));
