import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import PlaylistEditForm from "./PlaylistEditForm.js";

class CurrentPlaylist extends Component {
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
      <div class="info">
        <div class="name">${
          playlist ? playlist.name : "플레이리스트를 불러오고 있습니다..."
        }</div>
        <div class="profileName">${
          playlist ? playlist.owner.profileName : "..."
        }</div>
        <div class="duration">${playlist ? playlist.musics.length : "0"}곡</div>
        <div class="description">${
          playlist ? playlist.description : "..."
        }</div>
        <div class="playlist-buttons">
          <button type="button" class="play-button">재생</button>
          <button type="button" class="edit-button">편집</button>
        </div>
      </div>
    `;
  }
  setEvent() {
    $(".edit-button").addEventListener("click", () => {
      const { playlist, playerSetState } = this.props;
      return new PlaylistEditForm($("#info-container"), {
        playlist,
        playerSetState,
      });
    });
    $(".play-button").addEventListener("click", (e) => {
      const { playlist, playerSetState } = this.props;
      if (playlist.musics.length === 0) return;
      return playerSetState({
        musics: playlist.musics,
        currentMusic: playlist.musics[0],
      });
    });
  }
}

export default CurrentPlaylist;
