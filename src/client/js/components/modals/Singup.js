import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import Login from "./Login.js";

class Signup extends Component {
  template() {
    return `
      <div class="form-container">
        <form method="POST" id="signup-form">
          <div class="form-input">
            <label for="username">어떤 사용자 이름을 사용하시겠어요?</label>
            <input id="username" name="username" type="text" placeholder="사용자 이름을 입력하세요" required>
            <span>로그인에 사용되는 이름입니다.</span>
          </div>
          <div class="form-input">
            <label for="profileName">어떤 프로필 이름을 사용하시겠어요?</label>
            <input id="profileName" name="profileName" type="text" placeholder="프로필 이름을 입력하세요" required>
            <span>프로필에 표시되는 이름입니다.</span>
          </div>
          <div class="form-input">
            <label for="password">비밀번호를 만드세요.</label>
            <input id="password" name="password" type="password" placeholder="비밀번호를 입력하세요" required>
          </div>
          <div class="form-input">
            <label for="passwordConfirm">비밀번호를 확인하세요.</label>
            <input id="passwordConfirm" name="passwordConfirm" type="password" placeholder="비밀번호를 다시 입력하세요" required>
          </div>
          <input type="submit" value="가입하기">
        </form>
        <div class="link-container">
          <span>계정이 있나요?</span>
          <a href="/login" class="form-link">로그인하세요.</a>
        </div>
      </div>
    `;
  }
  setEvent() {
    $(".form-link").addEventListener("click", (e) => {
      e.preventDefault();
      window.history.pushState(null, "", "/login");
      new Login(this.$target);
    });
    window.addEventListener("DOMContentLoaded", (event) => {
      if (window.location.pathname === "/login") {
        $("#modal").classList.remove("hidden");
        new Login(this.$target);
      }
    });
    this.$target.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData($("#signup-form"));
      const serializedFormData = new URLSearchParams(formData).toString();
      const response = await fetch(`/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: serializedFormData,
      });

      if (response.ok) {
        $("#modal").classList.remove("hidden");
        new Login(this.$target);
      } else {
        const data = await response.json();
        console.log(data.errorMessage);
      }
    });
  }
}

export default Signup;
