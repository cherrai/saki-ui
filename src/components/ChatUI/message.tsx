import { Component, Element, h } from "@stencil/core";

@Component({
  tag: "saki-chat-message",
  styleUrl: "message.scss",
  shadow: true,
})
export class ChatMessageComponent {
  @Element() el: HTMLElement;

  componentDidLoad() {}
  render() {
    return (
      <div class={"saki-chat-message-component "}>
        <slot></slot>
      </div>
    );
  }
}
