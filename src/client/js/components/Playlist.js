import Component from "../core/Component.js";
import { $ } from "../utils/dom.js";
import Home from "./Home.js";
import CurrentMusicList from "./playlist/CurrentMusicList.js";
import CurrentPlaylist from "./playlist/CurrentPlaylist.js";
import RecommendedMusicList from "./playlist/RecommendedMusicList.js";
import SearchArea from "./playlist/SearchArea.js";

class Playlist extends Component {
  initState() {
    return {
      recommendMusics: [],
      listTitle: "인기차트 곡 추가하기",
      isSearched: false,
    };
  }
  async fetchData() {
    const playlistId = window.location.pathname.slice(11);

    const playlistResponse = await fetch(`/api/playlists/${playlistId}`);
    const playlist = await playlistResponse.json();

    const chartResponse = await fetch("/api/musics/chart");
    const chartMusics = await chartResponse.json();

    if (chartResponse.ok && playlistResponse.ok) {
      return this.setState({
        recommendMusics: chartMusics,
        chartMusics,
        playlist,
      });
    }
  }

  template() {
    return `
      <div class="playlist-container">
        <button type="button" class="back-button">↩</button>
        <div id="info-container" class="info-container"></div>
        <div id="current-music-list" class="current-music-list music-list-container"></div>
        <div id="search-area"></div>
        <div id="recommended-music-list" class="recommended-music-list music-list-container"></div>
      </div>
    `;
  }
  addComponent() {
    const { playerSetState } = this.props;

    new CurrentPlaylist($("#info-container"), {
      playlist: this.state.playlist,
      playerSetState,
    });

    new CurrentMusicList($("#current-music-list"), {
      playlist: this.state.playlist,
      playlistSetState: this.setState.bind(this),
    });

    new RecommendedMusicList($("#recommended-music-list"), {
      playlist: this.state.playlist,
      recommendMusics: this.state.recommendMusics,
      playlistSetState: this.setState.bind(this),
    });

    new SearchArea($("#search-area"), {
      isSearched: this.state.isSearched,
      listTitle: this.state.listTitle,
      chartMusics: this.state.chartMusics,
      playlistSetState: this.setState.bind(this),
    });
  }

  setEvent() {
    $(".back-button").addEventListener("click", (e) => {
      window.history.pushState(null, "", "/");
      const { playerSetState } = this.props;
      new Home($("main"), { playerSetState });
    });
    $(".play-button").addEventListener("click", (e) => {
      if (this.state.playlist.musics.length === 0) return;
      const { playerSetState } = this.props;
      return playerSetState({
        musics: this.state.playlist.musics,
        currentMusic: this.state.playlist.musics[0],
      });
    });
  }
}

export default Playlist;
