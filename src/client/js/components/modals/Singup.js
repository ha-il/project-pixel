import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import Login from "./Login.js";
import formInput from "./formInput.js";

class Signup extends Component {
  template() {
    return `
      <div class="form-container">
        <div id="signup-error" class="error_message"></div>
        <form method="POST" id="signup-form">
          ${formInput({
            id: "username",
            labelText: "어떤 사용자 이름을 사용하시겠어요?",
            name: "username",
            type: "text",
            placeholder: "사용자 이름을 입력하세요",
            infoSpan: "로그인에 사용되는 이름입니다.",
          })}
          ${formInput({
            id: "profileName",
            labelText: "어떤 프로필 이름을 사용하시겠어요?",
            name: "profileName",
            type: "text",
            placeholder: "프로필 이름을 입력하세요",
            infoSpan: "프로필에 표시되는 이름입니다.",
          })}
          ${formInput({
            id: "password",
            labelText: "비밀번호를 만드세요.",
            name: "password",
            type: "password",
            placeholder: "비밀번호를 입력하세요",
          })}
          ${formInput({
            id: "passwordConfirm",
            labelText: "비밀번호를 확인하세요.",
            name: "passwordConfirm",
            type: "password",
            placeholder: "비밀번호를 다시 입력하세요",
          })}
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
    $("#signup-form").addEventListener("submit", async (e) => {
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
        window.history.pushState(null, "", "/login");
        new Login(this.$target);
      } else {
        const data = await response.json();
        $("#signup-error").innerText = `${data.errorMessage}`;
      }
    });
  }
}

export default Signup;
