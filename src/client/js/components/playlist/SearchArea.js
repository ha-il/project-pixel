import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";

class SearchArea extends Component {
  template() {
    const { isSearched, listTitle } = this.props;
    return `
      <div class="search-container">
      <form method="get" id="music-search-form">
        <div class="form-input">
          <label for="searchWord">검색하기: </label>
          <input
            id="searchWord"
            name="searchWord"
            type="text"
            placeholder="검색하고 싶은 곡의 제목을 입력해주세요"
            maxlength="30"
            required
          />
        </div>
        <input type="submit" value="검색" />
        <input type="button" id="backChartBtn" value="인기차트" class=${
          isSearched ? "" : "hidden"
        } />
      </form>
      </div>
      <div class="music-list-title">${
        listTitle ? listTitle : "인기차트 곡 추가하기"
      }</div>
    `;
  }
  setEvent() {
    const { playlistSetState, chartMusics } = this.props;
    $("#music-search-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const searchWord = $("#searchWord").value;
      const response = await fetch(`/api/musics/search/${searchWord}`);

      if (response.ok) {
        const data = await response.json();
        const listTitle = `"${searchWord}" 검색 결과: ${data.length} 곡`;
        playlistSetState({
          recommendMusics: data,
          listTitle,
          isSearched: true,
        });
      }
    });
    $("#backChartBtn").addEventListener("click", () => {
      playlistSetState({
        recommendMusics: chartMusics,
        listTitle: "인기차트 곡 추가하기",
        isSearched: false,
      });
    });
  }
}

export default SearchArea;
