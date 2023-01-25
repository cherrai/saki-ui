import { Component, Element, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-chat-message-container",
  styleUrl: "container.scss",
  shadow: true,
})
export class ChatMessageContainerComponent {
  @Prop() border: boolean = false;
  @Prop() full: boolean = false;
  @Prop() visible: boolean = false;
  @Prop() boxShadow: string = "";
  @Element() el: HTMLElement;

  componentWillLoad() {
    this.full && this.el.classList.add("saki-full-page");
  }
  render() {
    return (
      <div
        style={{
          display: this.visible ? "flex" : "none",
        }}
        class={
          "saki-chat-message-container-component " +
          (this.border ? "border" : "")
        }
      >
        <div class="message-header">
          <slot name="message-header"></slot>
        </div>
        <div class="message-main">
          <slot name="message-main"></slot>
        </div>
        <div class="message-inputbar">
          <slot name="message-inputbar"></slot>
        </div>
      </div>
    );
  }
}
