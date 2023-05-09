import Component from "../core/Component.js";

class Home extends Component {
  template() {
    return `
    <div class="home-container">
      <div id="window">창문</div>
      <div id="bed">침대</div>
      <div id="cabinet">보관함</div>
      <div id="tv">TV</div>
      <div id="monitor">모니터</div>
      <div id="desk">책상</div>
      <div id="coffee">커피</div>
      <div id="chair">의자</div>
    </div>
    `;
  }
}

export default Home;
