import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import Signup from "./Singup.js";

class Login extends Component {
  template() {
    return `
      <div class="form-container">
        <div class="error_message"></div>
        <form method="post" id="login-form">
          <div class="form-input">
            <label for="username">사용자 이름</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="사용자 이름"
              required
            />
          </div>
          <div class="form-input">
            <label for="password">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              required
            />
          </div>
          <input type="submit" , value="로그인하기" />
        </form>
        <div class="link-container">
          <span>계정이 없나요?</span>
          <a href="/signup" class="form-link">가입하기</a>
        </div>
      </div>
    `;
  }
  setEvent() {
    $(".form-link").addEventListener("click", (e) => {
      e.preventDefault();
      window.history.pushState(null, "", "/signup");
      new Signup(this.$target);
    });

    window.addEventListener("DOMContentLoaded", (event) => {
      if (window.location.pathname === "/signup") {
        $("#modal").classList.remove("hidden");
        new Signup(this.$target);
      }
    });

    $("#login-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData($("#login-form"));
      const serializedFormData = new URLSearchParams(formData).toString();
      const response = await fetch(`/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: serializedFormData,
      });

      if (response.ok) {
        $("#modal").classList.add("hidden");
        window.history.pushState(null, "", "/");
      } else {
        const data = await response.json();
        $(".error_message").innerText = `${data.errorMessage}`;
      }
    });
  }
}

export default Login;
