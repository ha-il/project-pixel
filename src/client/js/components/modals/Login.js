import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import Signup from "./Singup.js";
import formInput from "./formInput.js";

class Login extends Component {
  template() {
    return `
      <div class="form-container">
        <div id="login-error" class="error_message"></div>
        <form method="post" id="login-form">
          ${formInput({
            id: "username",
            labelText: "사용자 이름",
            name: "username",
            type: "text",
            placeholder: "사용자 이름",
          })}
          ${formInput({
            id: "password",
            labelText: "비밀번호",
            name: "password",
            type: "password",
            placeholder: "비밀번호",
          })}
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
        window.history.pushState(null, "", "/");
        location.reload();
      } else {
        const data = await response.json();
        $("#login-error").innerText = `${data.errorMessage}`;
      }
    });
  }
}

export default Login;
