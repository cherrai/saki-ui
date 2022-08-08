import { Component, Element, Event, EventEmitter, h } from "@stencil/core";

@Component({
  tag: "saki-init",
  styleUrl: "init.scss",
  // shadow: true,
})
export class SakiInitComponent {
  @Event() mounted: EventEmitter;
  @Element() el: HTMLElement;
  watchFocusFunc() {}
  inputValue() {}
  componentWillLoad() {}
  componentDidLoad() {
    this.mounted.emit()
  }
  render() {
    return <div class={"saki-init"}></div>;
  }
}
