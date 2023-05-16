class Component {
  state;
  router;
  props;
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.init();
  }

  init() {
    this.state = this.initState();
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
    this.setEvent();
  }
}

export default Component;
