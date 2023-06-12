import Component from "../core/Component.js";
import { $ } from "../utils/dom.js";
import Modal from "./Modal.js";
import Cabinet from "./furnitures/Cabinet.js";
import Bed from "./furnitures/Bed.js";
import Phone from "./Phone.js";
import { getCookie } from "../utils/cookie.js";

import Chart from "./Chart.js";

class Home extends Component {
  initState() {
    return {
      isLoggedIn: getCookie("isLoggedIn"),
    };
  }
  template() {
    return `
    <div class="home-container">
      <img id="window" class="object" src=${
        this.state.isLoggedIn
          ? "../../../../images/window.png"
          : "../../../../images/window-closed.png"
      } />
      <img id="bed" class="object" src="../../../../images/bed.png" />
      <div id="cabinet" class="object">
        <div class="cabinet-container"></div>
        <div class="cabinet-container"></div>
        <div class="cabinet-container"></div>
        <div class="cabinet-container"></div>
        <div class="cabinet-container"></div>
      </div>
      <img id="tv" class="object" src=${
        this.state.isLoggedIn
          ? "../../../../images/tv-on.gif"
          : "../../../../images/tv.png"
      } />
      <img id="monitor" class="object" src=${
        this.state.isLoggedIn
          ? "../../../../images/monitor-on.png"
          : "../../../../images/monitor.gif"
      } />
      <img id="desk" class="object" src="../../../../images/desk.png" />
      
      ${
        this.state.isLoggedIn
          ? `<img id="coffee" class="object" src="../../../../images/coffee.png" />`
          : ""
      }
      <img id="chair" class="object" src=${
        this.state.isLoggedIn
          ? "../../../../images/chair-on.png"
          : "../../../../images/chair.png"
      } />
      <div id="modal" class="object hidden"></div>
      <div id="phone" class="object"></div>
      ${
        this.state.isLoggedIn
          ? `<div id="phone-icon">
              <i class="fa-solid fa-mobile-screen-button"></i>
            </div>`
          : `<div></div>`
      }
      
    </div>
    <div class="floor ${this.state.isLoggedIn ? "" : "floor-dark"}"></div>
    `;
  }
  addComponent() {
    if (this.state.isLoggedIn) {
      const { playerSetState } = this.props;
      new Cabinet($("#cabinet"), {
        $main: this.$target,
        playerSetState,
      });
    }
  }

  setEvent() {
    $(".home-container").addEventListener("click", (e) => {
      if (e.target.id === "monitor" || e.target.id === "chair") {
        if (this.state.isLoggedIn) return;
        window.history.pushState(null, "", "/login");
        $("#modal").classList.remove("hidden");
        new Modal($("#modal"));
      }

      if (e.target.id === "bed") {
        if (this.state.isLoggedIn) {
          new Bed();
        }
      }

      if (e.target.closest("#phone-icon")) {
        $("#phone").classList.toggle("visible");
        const { playerSetState } = this.props;
        new Phone($("#phone"), {
          $main: this.$target,
          playerSetState,
        });
      }

      if (e.target.id === "tv") {
        e.preventDefault();
        window.history.pushState(null, "", `/playlists/chart`);
        const { playerSetState } = this.props;
        new Chart(this.$target, {
          $main: this.$target,
          playerSetState,
        });
      }
    });

    window.addEventListener("DOMContentLoaded", (event) => {
      if (window.location.pathname === "/login") {
        $("#modal").classList.remove("hidden");
        new Modal($("#modal"));
      }
      if (window.location.pathname === "/signup") {
        $("#modal").classList.remove("hidden");
        new Modal($("#modal"));
      }
    });
  }
}

export default Home;
