import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import Playlist from "../Playlist.js";
import PhoneHome from "./PhoneHome.js";

class PlaylistCreation extends Component {
  template() {
    return `
      <button type="button" class="back-button">↩</button>
      <div class="phone-form-container">
        <form method="post" id="playlist-creation-form">
          <div class="form-input">
            <label for="name">플레이리스트 이름</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="생성할 플레이리스트의 이름을 입력해주세요"
              maxlength="30"
              required
            />
          </div>
          <div class="form-input">
            <label for="description">플레이리스트 설명</label>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="생성할 플레이리스트의 설명을 입력해주세요"
              maxlength="50"
              required
            />
          </div>
          <input type="submit" , value="플레이리스트 생성" />
          <div id="playlist-creation-error" class="error_message"></div>
        </form>
      </div>
    `;
  }
  setEvent() {
    $(".back-button").addEventListener("click", () => {
      const { $main } = this.props;
      new PhoneHome($(".phone-container"), { $main });
    });
    $("#playlist-creation-form").addEventListener("submit", async (e) => {
      e.preventDefault();

      const userInputData = JSON.stringify({
        name: $("#name").value,
        description: $("#description").value,
      });

      const response = await fetch(`/api/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userInputData,
      });

      const data = await response.json();

      if (response.ok) {
        const { $main } = this.props;
        window.history.pushState(null, "", `/playlists/${data.playlistId}`);
        new Playlist($main, { $main });
      } else {
        return ($(
          "#playlist-creation-error"
        ).innerText = `${data.errorMessage}`);
      }
    });
  }
}

export default PlaylistCreation;
