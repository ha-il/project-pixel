import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import {
  convertMillisecondsToTime,
  convertTimeToMilliseconds,
} from "../../utils/time.js";

class CurrentMusicList extends Component {
  template() {
    const { playlist } = this.props;
    return `
      ${
        playlist
          ? playlist.musics.length === 0
            ? "<div>음악을 추가해보세요!</div>"
            : playlist.musics
                .map((music) => {
                  return `
                  <div class="music-container">
                    <img class="image" src="${music.imageUrl}"/>
                    <div class="title">${music.title}</div>
                    <div class="artist">${music.artist}</div>
                    <button type="button" class="remove-music-button" data-musicid=${
                      music._id
                    }>-</button>
                    <div class="duration">${convertMillisecondsToTime(
                      convertTimeToMilliseconds(music.duration)
                    )}</div>
                  </div>
                `;
                })
                .join("")
          : "플레이리스트의 음악을 불러오는 중입니다..."
      }
    `;
  }
  setEvent() {
    $(".current-music-list").addEventListener("click", async (e) => {
      const { playlist, playlistSetState } = this.props;
      if (e.target.classList.contains("remove-music-button")) {
        const musicId = e.target.dataset.musicid;

        const response = await fetch(`/api/playlists/${playlist._id}`, {
          method: "PUT",
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

export default CurrentMusicList;
