import Component from "../../core/Component.js";
import { getCookie } from "../../utils/cookie.js";
import Playlist from "../Playlist.js";

class Cabinet extends Component {
  async fetchData() {
    const userId = getCookie("loggedInUser")._id;
    const response = await fetch(`/api/users/playlists/${userId}`);

    if (response.ok) {
      const playlists = await response.json();
      return this.setState({ playlists });
    }
  }
  template() {
    const arr = this.state.playlists
      ? [1, 2, 3, ...this.state.playlists]
      : [1, 2, 3];
    return `
      ${arr
        .map((item, i) => {
          return `<a class="playlist">${i}</a>`;
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
