import "../scss/styles.scss";
import Home from "./components/Home.js";
import Component from "./core/Component.js";
import { $ } from "./utils/dom.js";

class App extends Component {
  initRouter() {
    this.router = {
      "/": Home,
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
    const path = window.location.pathname;
    const pageComponent = this.router[path];
    new pageComponent($("main"));
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
