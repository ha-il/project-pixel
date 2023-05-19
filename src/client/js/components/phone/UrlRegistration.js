import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import { extractYouTubeVideoId } from "../../utils/inputUtils.js";
import MusicRegistrationForm from "./MusicRegistrationForm.js";
import PhoneHome from "./PhoneHome.js";

class UrlRegistration extends Component {
  template() {
    return `
      <button type="button" class="back-button">↩</button>
      <div class="phone-form-container">
        <form method="post" id="url-registration-form">
          <div class="form-input">
            <label for="youtubeURL">YouTube URL</label>
            <input
              id="youtubeURL"
              name="youtubeURL"
              type="text"
              placeholder="YouTube URL을 입력하세요"
              required
            />
          </div>
          <input type="submit" , value="영상 찾기" />
          <div id="url-registration-error" class="error_message"></div>
        </form>
        <form method="post" id="music-registration-form"></form>
      </div>
    `;
  }
  setEvent() {
    $(".back-button").addEventListener("click", () => {
      new PhoneHome(this.$target);
    });
    $("#url-registration-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const userInputURL = $("#youtubeURL").value;

      const extractedMusicId = extractYouTubeVideoId(userInputURL);

      if (!extractedMusicId) {
        $("#url-registration-error").innerText = "YouTube URL을 입력해주세요.";
        return;
      } else {
        $("#url-registration-error").innerText = "";
      }

      const response = await fetch(`/api/youtube/musics/${extractedMusicId}`);
      const musicData = await response.json();
      if (response.ok) {
        new MusicRegistrationForm($("#music-registration-form"), musicData);
      } else {
        $("#url-registration-error").innerText = `${data.errorMessage}`;
      }
    });
  }
}

export default UrlRegistration;
