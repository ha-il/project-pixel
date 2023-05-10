import Component from "../../core/Component.js";

class Login extends Component {
  template() {
    return `
      <div class="form-container">
        <form method="post">
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
          <a href="/signup">가입하기</a>
        </div>
      </div>
    `;
  }
}

export default Login;
