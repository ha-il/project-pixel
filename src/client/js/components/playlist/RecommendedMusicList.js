import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import {
  convertMillisecondsToTime,
  convertTimeToMilliseconds,
} from "../../utils/time.js";

class RecommendedMusicList extends Component {
  template() {
    const { recommendMusics } = this.props;
    return `
      ${
        recommendMusics
          ? recommendMusics
              .map((music) => {
                return `
                  <div class="music-container">
                    <img class="image" src="${music.imageUrl}"/>
                    <div class="title">${music.title}</div>
                    <div class="artist">${music.artist}</div>
                    <button type="button" class="add-music-button" data-musicid=${
                      music._id
                    }>+</button>
                    <div class="duration">${convertMillisecondsToTime(
                      convertTimeToMilliseconds(music.duration)
                    )}</div>
                  </div>
                `;
              })
              .join("")
          : "인기 차트 음악을 불러오는 중입니다..."
      }
    `;
  }
  findMusicByMusicid(musicid) {
    const { playlist } = this.props;
    for (let music of playlist.musics) {
      if (music._id === musicid) {
        return true;
      }
    }
  }
  setEvent() {
    $("#recommended-music-list").addEventListener("click", async (e) => {
      const { playlistSetState, playlist } = this.props;
      if (e.target.classList.contains("add-music-button")) {
        const musicId = e.target.dataset.musicid;
        const isExistedMusic = this.findMusicByMusicid(musicId);
        if (isExistedMusic) return;

        const response = await fetch(`/api/playlists/${playlist._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ musicId }),
        });

        const newPlaylist = await response.json();

        if (response.ok) {
          playlistSetState({ playlist: newPlaylist });
        }
      }
    });
  }
}

export default RecommendedMusicList;
