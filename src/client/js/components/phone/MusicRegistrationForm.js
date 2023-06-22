import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import UrlRegistration from "./UrlRegistration.js";

class MusicRegistrationForm extends Component {
  template() {
    const { title, image, channelTitle } = this.props.musicData;
    return `
        <img class="thumbnails"
        src="${image.url}"
        alt=""/>   
        <div class="form-input">
          <label for="title">음악 제목</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="음악 제목을 입력해주세요"
            maxlength="30"
            required
            value="${title}"
          />
        </div>
        <div class="form-input">
          <label for="artist">아티스트 이름</label>
          <input
            id="artist"
            name="artist"
            type="text"
            placeholder="아티스트의 이름을 입력해주세요"
            maxlength="30"
            required
            value="${channelTitle}"
          />
        </div>
        <input type="submit" , value="음악 등록" />
        <div id="music-registration-error" class="error_message"></div>
    `;
  }
  setEvent() {
    $("#music-registration-form").addEventListener("submit", async (e) => {
      e.preventDefault();

      if ($("#title").value.length > 30) {
        return ($(
          "#music-registration-error"
        ).innerText = `음악 제목은 30자까지 입력할 수 있습니다.`);
      }

      const {
        id: youtubeId,
        image: { url: imageUrl },
        duration,
      } = this.props.musicData;

      const title = $("#title").value.trim();
      const artist = $("#artist").value.trim();
      const musicData = JSON.stringify({
        youtubeId,
        imageUrl,
        duration,
        title,
        artist,
      });

      const response = await fetch(`/api/musics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: musicData,
      });
      if (response.ok) {
        const { $main } = this.props;
        new UrlRegistration($(".phone-container"), { $main });
      } else {
        const data = await response.json();
        $("#music-registration-error").innerText = `${data.errorMessage}`;
      }
    });
  }
}

export default MusicRegistrationForm;
