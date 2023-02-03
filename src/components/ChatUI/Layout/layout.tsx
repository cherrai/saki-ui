import {
  Component,
  Event,
  Element,
  h,
  EventEmitter,
  Prop,
  State,
} from "@stencil/core";

@Component({
  tag: "saki-chat-layout",
  styleUrl: "layout.scss",
  shadow: true,
})
export class ChatLayoutComponent {
  @Prop() deviceType: "Mobile" | "Pad" | "PC" = "Mobile";
  @Prop() bottomNavigator = false;

  @State() language: string = "en";
  @Event() tap: EventEmitter;
  @Event() resend: EventEmitter;
  @Event() sendfailed: EventEmitter<{
    totalCount: number;
    currentCount: number;
  }>;

  @Event({
    eventName: "opencontextmenu",
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  opencontextmenu: EventEmitter;
  @Element() el: HTMLElement;

  render() {
    return (
      <div
        class={
          "saki-chat-layout-component " +
          this.deviceType +
          (this.bottomNavigator ? " bottom-navigator " : "")
        }
      >
        <div class={"l-side"}>
          <slot name="side-navigator"></slot>
        </div>
        <div class={"l-main"}>
          <div class={"l-m-main"}>
            {/* <saki-scroll-view mode="Auto"> */}
            <slot></slot>
            {/* </saki-scroll-view> */}
          </div>
          <div class={"l-m-bottom"}>
            <slot name="bottom-navigator"></slot>
          </div>
        </div>
      </div>
    );
  }
}
