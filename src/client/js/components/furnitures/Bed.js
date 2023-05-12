class Bed {
  constructor() {
    this.logout();
  }
  async logout() {
    const isLogout = window.confirm("로그아웃 하시겠습니까?");
    if (isLogout) {
      await fetch(`/api/users/logout`, {
        method: "POST",
      });
      window.location.href = "/";
    }
  }
}

export default Bed;
