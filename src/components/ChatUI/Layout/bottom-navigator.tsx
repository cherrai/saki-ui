import {
  Component,
  Event,
  Element,
  h,
  EventEmitter,
  Prop,
  State,
  Watch,
} from "@stencil/core";

@Component({
  tag: "saki-chat-layout-bottom-navigator",
  styleUrl: "bottom-navigator.scss",
  shadow: true,
})
export class ChatLayoutBottomNavigatorComponent {
  @Prop() type: "receiver" | "sender" = "sender";

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
      <div class={"saki-chat-layout-bottom-navigator-component"}>
        bottom-navigator
      </div>
    );
  }
}
