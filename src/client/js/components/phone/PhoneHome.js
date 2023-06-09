import Component from "../../core/Component.js";
import { getCookie } from "../../utils/cookie.js";
import { $ } from "../../utils/dom.js";
import { getCurrentDate, getCurrentTime } from "../../utils/time.js";
import PlaylistCreation from "./PlaylistCreation.js";
import UrlRegistration from "./UrlRegistration.js";

class PhoneHome extends Component {
  initState() {
    return {
      loggedInUser: getCookie("loggedInUser"),
    };
  }
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
        <div class="date">${getCurrentDate()}</div>
        <div class="time">${getCurrentTime()}</div>
        <div class="greeting">Hello, ${
          this.state.loggedInUser.profileName
        } !</div>
      </div>
      
      <div class="dock">
        <div id="playlist-creation" class="phone-app">
          <div class="app-description">
            <span>플레이리스트</span>
            <span>생성</span>
          </div>
          <i class="fa-solid fa-list"></i>
        </div>
        <div id="music-registration" class="phone-app">
          <div class="app-description four-letters">음악 추가</div>
          <i class="fa-solid fa-music"></i>
        </div>
        <div class="phone-app">X</div>
        <div class="phone-app">X</div>
      </div>
    `;
  }
  setEvent() {
    $("#playlist-creation").addEventListener("click", (e) => {
      const { $main, playerSetState } = this.props;
      new PlaylistCreation($(".phone-container"), { $main, playerSetState });
    });
    $("#music-registration").addEventListener("click", (e) => {
      const { $main } = this.props;
      new UrlRegistration($(".phone-container"), { $main });
    });
  }
}

export default PhoneHome;
