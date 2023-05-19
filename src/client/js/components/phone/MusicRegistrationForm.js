import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import UrlRegistration from "./UrlRegistration.js";

class MusicRegistrationForm extends Component {
  template() {
    const { title, image, channelTitle } = this.props.musicData;
    return `
        <img class="thumbnails"
        src=${image.url}
        alt=""/>   
        <div class="form-input">
          <label for="title">음악 제목</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="음악 제목을 입력해주세요"
            maxlength="20"
            required
            value=${title}
          />
        </div>
        <div class="form-input">
          <label for="artist">아티스트 이름</label>
          <input
            id="artist"
            name="artist"
            type="text"
            placeholder="아티스트의 이름을 입력해주세요"
            maxlength="20"
            required
            value=${channelTitle}
          />
        </div>
        <input type="submit" , value="음악 등록" />
        <div id="music-registration-error" class="error_message"></div>
    `;
  }
  setEvent() {
    $("#music-registration-form").addEventListener("submit", async (e) => {
      e.preventDefault();

      const {
        id: youtubeId,
        image: { url: imageUrl },
        duration,
      } = this.props.musicData;

      const musicData = JSON.stringify({
        youtubeId,
        imageUrl,
        duration,
        title: $("#title").value,
        artist: $("#artist").value,
      });

      const response = await fetch(`/api/musics/music`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: musicData,
      });
      if (response.ok) {
        new UrlRegistration($(".phone-container"));
      } else {
        const data = await response.json();
        $("#music-registration-error").innerText = `${data.errorMessage}`;
      }
    });
  }
}

export default MusicRegistrationForm;
