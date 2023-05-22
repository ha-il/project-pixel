import "../scss/styles.scss";
import Home from "./components/Home.js";
import MusicPlayer from "./components/MusicPlayer.js";
import Playlist from "./components/Playlist";
import Component from "./core/Component.js";
import { $ } from "./utils/dom.js";
import { matchRoute } from "./utils/routerHelper";

class App extends Component {
  initRouter() {
    this.router = {
      "/": Home,
      "/login": Home,
      "/signup": Home,
      "/playlists/:id": Playlist,
    };
    window.addEventListener("popstate", () => {
      this.render();
    });
    window.dispatchEvent(new Event("popstate"));
  }
  template() {
    return `
      <main></main>
      <div id="music-player"></div>
    `;
  }
  addComponent() {
    let path = window.location.pathname;
    const isPlaylists = path.includes("playlists/");

    if (isPlaylists) {
      path = matchRoute(this.router, path);
    }

    const pageComponent = this.router[path];
    new pageComponent($("main"));

    new MusicPlayer($("#music-player"));
  }

  setEvent() {
    const links = document.querySelectorAll("a[href]");
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const path = link.pathname;
        window.history.pushState(null, "", path);
        const pageComponent = this.router[path];
        new pageComponent($("main"));
      });
    });
  }
}

new App($("#app"));
