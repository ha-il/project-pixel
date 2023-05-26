import Component from "../../core/Component.js";
import { getCookie } from "../../utils/cookie.js";
import Playlist from "../Playlist.js";

class Cabinet extends Component {
  init() {
    this.state = this.initState();
    this.initRouter();
    this.fetchData();
    this.render();
  }
  async fetchData() {
    if (!getCookie("isLoggedIn")) return;
    const userId = getCookie("loggedInUser")._id;
    const response = await fetch(`/api/users/playlists/${userId}`);

    if (response.ok) {
      const playlists = await response.json();
      return this.setState({ playlists });
    }
  }
  template() {
    const arr = this.state.playlists ? [...this.state.playlists] : [];
    return `
      <div class="cabinet-container">
        ${arr
          .slice(0, 3)
          .map((item, i) => {
            return `<a class="playlist" data-playlistid=${item}>
                      <img src=../../../../../images/playlist-${i}.png />
                    </a>`;
          })
          .join("")} 
      </div>
      <div class="cabinet-container">
      ${arr
        .slice(3, 6)
        .map((item, i) => {
          return `<a class="playlist" data-playlistid=${item}>
                    <img src=../../../../../images/playlist-${i}.png />
                  </a>`;
        })
        .join("")} 
      </div>
      <div class="cabinet-container">
      ${arr
        .slice(6, 9)
        .map((item, i) => {
          return `<a class="playlist" data-playlistid=${item}>
                      <img src=../../../../../images/playlist-${i}.png />
                    </a>`;
        })
        .join("")} 
      </div>
      <div class="cabinet-container">
      ${arr
        .slice(9, 12)
        .map((item, i) => {
          return `<a class="playlist" data-playlistid=${item}>
                      <img src=../../../../../images/playlist-${i}.png />
                    </a>`;
        })
        .join("")} 
      </div>
      <div class="cabinet-container">
      ${arr
        .slice(12, 15)
        .map((item, i) => {
          return `<a class="playlist" data-playlistid=${item}>
                      <img src=../../../../../images/playlist-${i}.png />
                    </a>`;
        })
        .join("")} 
      </div>
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
