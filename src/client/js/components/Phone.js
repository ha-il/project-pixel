import Component from "../core/Component.js";
import { $ } from "../utils/dom.js";
import PhoneHome from "./phone/PhoneHome.js";

class Phone extends Component {
  template() {
    return `
      <div class="phone-container"></div>
    `;
  }

  addComponent() {
    new PhoneHome($(".phone-container"));
  }
}

export default Phone;
