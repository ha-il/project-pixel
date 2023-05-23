import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import PlaylistCreation from "./PlaylistCreation.js";
import UrlRegistration from "./UrlRegistration.js";

class PhoneHome extends Component {
  template() {
    return `
      <div class="widget-container">
        <div id="user-avatar" class="widget">이미지</div>
        <div id="user-profile" class="widget">
          <span class="profile-name">프로필 이름</span>
        </div>
      </div>
      <div class="dock">
        <div id="playlist-creation" class="phone-app">플리 생성</div>
        <div id="music-registration" class="phone-app">음악 등록</div>
        <div class="phone-app">3</div>
        <div class="phone-app">4</div>
      </div>
    `;
  }
  setEvent() {
    this.$target.addEventListener("click", (e) => {
      if (e.target.id === "user-avatar") {
      }
      if (e.target.id === "user-profile") {
      }
      if (e.target.id === "playlist-creation") {
        const { $main } = this.props;
        new PlaylistCreation($(".phone-container"), { $main });
      }
      if (e.target.id === "music-registration") {
        new UrlRegistration($(".phone-container"));
      }
    });
  }
}

export default PhoneHome;
