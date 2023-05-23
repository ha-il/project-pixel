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
    const { $main } = this.props;
    new PhoneHome($(".phone-container"), { $main });
  }
}

export default Phone;
