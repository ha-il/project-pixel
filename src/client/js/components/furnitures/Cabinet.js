import Component from "../../core/Component.js";
import { getCookie } from "../../utils/cookie.js";
import Playlist from "../Playlist.js";

class Cabinet extends Component {
  initState() {
    return {
      isLoggedIn: getCookie("isLoggedIn"),
      loggedInUser: getCookie("loggedInUser"),
    };
  }
  async fetchData() {
    if (!this.state.isLoggedIn) return;
    const userId = this.state.loggedInUser._id;
    const response = await fetch(`/api/users/playlists/${userId}`);

    if (response.ok) {
      const playlists = await response.json();
      return this.setState({ playlists });
    }
  }
  template() {
    const userPlaylists = this.state.playlists ? [...this.state.playlists] : [];
    const cabinetContainer = (start, end) => {
      return `
        <div class="cabinet-container">
          ${userPlaylists
            .slice(start, end)
            .map((item, i) => {
              return `<a class="playlist" data-playlistid=${item}>
                        <img src=../../../../../images/playlist-${i}.png />
                      </a>`;
            })
            .join("")} 
        </div>`;
    };
    return `
      ${cabinetContainer(0, 3)}
      ${cabinetContainer(3, 6)}
      ${cabinetContainer(6, 9)}
      ${cabinetContainer(9, 12)}
      ${cabinetContainer(12, 15)}
      
    `;
  }
  setEvent() {
    this.$target.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("playlist")) {
        const playlistId = e.target.dataset.playlistid;
        window.history.pushState(null, "", `/playlists/${playlistId}`);
        const { $main, playerSetState } = this.props;
        new Playlist($main, { $main, playerSetState });
      }
    });
  }
}

export default Cabinet;
