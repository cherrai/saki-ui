import { Component, Element, h } from "@stencil/core";
@Component({
  tag: "saki-call-container",
  styleUrl: "container.scss",
  shadow: true,
})
export class CallContainerComponent {
  @Element() el: HTMLElement;

  componentDidLoad() {}
  render() {
    return (
      <div class={"saki-call-container-component"}>
        <div class={"call-header"}>
          <slot name="header"></slot>
        </div>
        <div class={"call-main"}>
          <slot name="main"></slot>
        </div>
        <div class={"call-small-window"}>
          <slot name="small-window"></slot>
        </div>
        <div class={"call-info"}>
          <slot name="call-info"></slot>
        </div>
        <div class={"call-footer"}>
          <slot name="footer"></slot>
        </div>
      </div>
    );
  }
}
