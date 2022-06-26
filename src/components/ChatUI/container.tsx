import { Component, Element, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-chat-container",
  styleUrl: "container.scss",
  shadow: true,
})
export class ChatContainerComponent {
  @Prop() border: boolean = false;
  @Prop() boxShadow: string = "";
  @Element() el: HTMLElement;

  componentDidLoad() {}
  render() {
    return (
      <div
        class={"saki-chat-container-component " + (this.border ? "border" : "")}
        style={{
          ...["boxShadow"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
      >
        <div class="chat-container-sidebar">
          <div class="sidebar-header">
            <slot name="sidebar-header"></slot>
          </div>
          <div class="sidebar-main">
            <slot name="sidebar-main"></slot>
          </div>
          <div class="sidebar-footer">
            <slot name="sidebar-footer"></slot>
          </div>
        </div>
        <div class="chat-container-message">
          <slot name="message-container"></slot>
        </div>
      </div>
    );
  }
}
