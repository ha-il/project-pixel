import Component from "../../core/Component.js";
import Playlist from "../Playlist.js";

class Cabinet extends Component {
  template() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    return `
      ${arr
        .map((item) => {
          return `<a class="playlist">${item}</a>`;
        })
        .join("")}
    `;
  }
  setEvent() {
    this.$target.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("playlist")) {
        const playlistId = e.target.textContent;
        window.history.pushState(null, "", `/playlists/${playlistId}`);
        const { $main } = this.props;
        new Playlist($main, { $main });
      }
    });
  }
}

export default Cabinet;
