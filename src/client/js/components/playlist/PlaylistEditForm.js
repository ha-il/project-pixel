import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import CurrentPlaylist from "./CurrentPlaylist.js";

class PlaylistEditForm extends Component {
  template() {
    const { playlist } = this.props;
    return `
        ${
          playlist
            ? playlist.musics[0]
              ? `<img class="image" src="${playlist.musics[0].imageUrl}"/>`
              : '<div class="image"><i class="fa-solid fa-music"></i></div>'
            : '<div class="image"><i class="fa-solid fa-music"></i></div>'
        }
        <form class="info" id="playlist-edit-form">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="제목을 수정하세요"
            maxlength="30"
            required
          />                                  
          <div>
            <div class="profileName">${
              playlist ? playlist.owner.profileName : "..."
            }</div>
            <div class="duration">${
              playlist ? playlist.musics.length : "0"
            }곡</div>
          </div>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="설명을 수정하세요"
            maxlength="50"
            required
          />
          <div class="playlist-buttons">
            <input type="submit" class="edit-complete-button" value="완료"/>
            <input type="button" class="edit-cancle-button" value="취소"/>
            <input type="button" class="remove-playlist-button" value="삭제"/>
          </div>
        </form>
    `;
  }
  setEvent() {
    const { playlist, playerSetState } = this.props;
    $(".edit-cancle-button").addEventListener("click", () => {
      return new CurrentPlaylist($("#info-container"), {
        playlist,
        playerSetState,
      });
    });
    $("#playlist-edit-form").addEventListener("submit", async (e) => {
      e.preventDefault();

      const userInputData = JSON.stringify({
        name: $("#name").value,
        description: $("#description").value,
      });

      const response = await fetch(`/api/playlists/${playlist._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: userInputData,
      });

      const newPlaylist = await response.json();

      return new CurrentPlaylist($("#info-container"), {
        playlist: newPlaylist,
        playerSetState,
      });
    });

    $(".remove-playlist-button").addEventListener("click", async (e) => {
      const isRemoved = window.confirm("플레이리스트를 삭제하시겠습니까?");
      if (isRemoved) {
        await fetch(`/api/playlists/${playlist._id}`, {
          method: "DELETE",
        });
        window.location.href = "/";
      }
    });
  }
}

export default PlaylistEditForm;
