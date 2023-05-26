import Component from "../../core/Component.js";
import { getCookie } from "../../utils/cookie.js";
import { $ } from "../../utils/dom.js";
import PlaylistCreation from "./PlaylistCreation.js";
import UrlRegistration from "./UrlRegistration.js";

class PhoneHome extends Component {
  template() {
    return `
      <div class="header">
        <div class="telecom">SKT</div>
        <div class="empty-space">
          <div class="speaker"></div>
        </div>
        <div class="status-container">
          <div class=""><i class="fa-solid fa-signal"></i></div>
          <div class="status-center">5G</div>
          <div class=""><i class="fa-solid fa-battery-full"></i></div>
        </div>
      </div>
      <div class="time-container">
        <div class="date">5월 27일 토요일</div>
        <div class="time">12:53</div>
        <div class="greeting">Hello, ${
          getCookie("loggedInUser").profileName
        } !</div>
      </div>
      
      <div class="dock">
        <div id="playlist-creation" class="phone-app">
          <i class="fa-solid fa-list"></i>
        </div>
        <div id="music-registration" class="phone-app">
          <i class="fa-solid fa-music"></i>
        </div>
        <div class="phone-app">X</div>
        <div class="phone-app">X</div>
      </div>
    `;
  }
  setEvent() {
    $("#playlist-creation").addEventListener("click", (e) => {
      const { $main } = this.props;
      new PlaylistCreation($(".phone-container"), { $main });
    });
    $("#music-registration").addEventListener("click", (e) => {
      const { $main } = this.props;
      new UrlRegistration($(".phone-container"), { $main });
    });
  }
}

export default PhoneHome;
