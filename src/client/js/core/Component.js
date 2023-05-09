class Component {
  state;
  router;
  constructor($target) {
    this.$target = $target;
    this.init();
  }

  init() {
    this.state = {};
    this.initRouter();
    this.render();
    this.setEvent();
  }
  initRouter() {}
  initState() {
    return {};
  }
  template() {
    return "";
  }
  addComponent() {}
  setEvent() {}
  render() {
    this.$target.innerHTML = this.template();
    this.addComponent();
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}

export default Component;
