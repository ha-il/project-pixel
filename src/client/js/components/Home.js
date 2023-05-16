import Component from "../core/Component.js";
import { $ } from "../utils/dom.js";
import Modal from "./Modal.js";
import Cabinet from "./furnitures/Cabinet.js";
import Bed from "./furnitures/bed.js";

class Home extends Component {
  template() {
    return `
    <div class="home-container">
      <div id="window" class="object">창문</div>
      <div id="bed" class="object">침대</div>
      <div id="cabinet" class="object">보관함</div>
      <div id="tv" class="object">TV</div>
      <div id="monitor" class="object">모니터</div>
      <div id="desk" class="object">책상</div>
      <div id="coffee" class="object">커피</div>
      <div id="chair" class="object">의자</div>
      <div id="modal" class="object hidden"></div>
    </div>
    `;
  }
  addComponent() {
    const { initApp, $app } = this.props;
    new Cabinet($("#cabinet"), { initApp, $app });
  }

  setEvent() {
    $(".home-container").addEventListener("click", (e) => {
      if (e.target.id === "monitor") {
        window.history.pushState(null, "", "/login");
        $("#modal").classList.remove("hidden");
        new Modal($("#modal"));
      }
      if (e.target.id === "bed") {
        new Bed();
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
