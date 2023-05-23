import Component from "../core/Component.js";
import { $ } from "../utils/dom.js";
import Login from "./modals/Login.js";
import Signup from "./modals/Singup.js";

class Modal extends Component {
  template() {
    return `
      <button type="button" class="close-button">X</button>
      <div class="modal-content">컨텐츠</div>
    `;
  }
  addComponent() {
    if (window.location.pathname === "/login") {
      const { renderHome } = this.props;
      new Login($(".modal-content"), { renderHome });
    }
    if (window.location.pathname === "/signup") {
      new Signup($(".modal-content"));
    }
  }

  setEvent() {
    $(".close-button").addEventListener("click", () => {
      this.$target.classList.add("hidden");
      window.history.pushState(null, "", "/");
    });
  }
}

export default Modal;
