import { Component, Element, h } from "@stencil/core";

@Component({
  tag: "saki-chat-container",
  styleUrl: "container.scss",
  shadow: true,
})
export class ChatContainerComponent {
  @Element() el: HTMLElement;

  componentDidLoad() {}
  render() {
    return (
      <div class="saki-chat-container-component">
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
      </div>
    );
  }
}
