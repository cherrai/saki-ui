import { Component, Element, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-chat-container",
  styleUrl: "container.scss",
  shadow: true,
})
export class ChatContainerComponent {
  @Prop() deviceType: "Mobile" | "Pad" | "PC" = "Mobile";
  @Prop() border: boolean = false;
  @Prop() messagePage: boolean = false;
  @Prop() boxShadow: string = "";
  @Element() el: HTMLElement;

  componentDidLoad() {}
  render() {
    return (
      <div
        class={
          "saki-chat-container-component " +
          this.deviceType +
          (this.border ? " border " : "") +
          (this.messagePage ? " message-page " : "")
        }
        style={{
          "--sidebar-width":
            this.deviceType === "Mobile"
              ? this.messagePage
                ? "0%"
                : "100%"
              : "260px",
          // "--message-page-width": !this.messagePage ? "100%" : "0%",
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
            <saki-scroll-view mode="Inherit" scrollBar="Auto">
              <slot name="sidebar-main"></slot>
            </saki-scroll-view>
          </div>
          <div class="sidebar-footer">
            <slot name="sidebar-footer"></slot>
          </div>
        </div>
        <div
          style={{
            opacity:
              this.deviceType === "Mobile" && !this.messagePage ? "0" : "1",
          }}
          class="chat-container-message"
        >
          <slot name="message-container"></slot>
        </div>
      </div>
    );
  }
}
