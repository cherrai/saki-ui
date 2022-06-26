import { Component, Element, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-chat-container-main",
  styleUrl: "container.scss",
  shadow: true,
})
export class ChatContainerMainComponent {
  @Prop() border: boolean = false;
  @Prop() boxShadow: string = "";
  @Element() el: HTMLElement;

  componentDidLoad() {}
  render() {
    return (
      <div
        class={
          "saki-chat-container-main-component " + (this.border ? "border" : "")
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
