import {
  Component,
  Event,
  EventEmitter,
  Element,
  h,
  State,
  Prop,
} from "@stencil/core";

@Component({
  tag: "saki-chat-dialog",
  styleUrl: "dialog.scss",
  shadow: true,
})
export class ChatDialogComponent {
  @Prop() avatar: string = "";
  @Prop() selected: boolean = false;
  @Prop() contextMenuActive: boolean = false;
  @Prop() nickname: string = "";
  @Prop() lastSeenTime: string = "";
  @Prop() lastMessage: string = "";
  @Prop() count: number = 0;

  @State() updateTime = 0;
  @Element() el: HTMLElement;
  @Event({
    eventName: "tap",
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tap: EventEmitter;

  componentDidLoad() {}
  render() {
    return (
      <div
        // onContextMenu={(e) => {
        //   this.contextMenuObj.left = e.clientX;
        //   this.contextMenuObj.top = e.clientY;
        //   console.log("event");
        //   // console.log(this.contextMenuHandler);
        //   this.contextmenu.emit({
        //     left: e.clientX,
        //     top: e.clientY,
        //   });
        //   this.updateTime = new Date().getTime();
        //   e.preventDefault();
        //   // var event = event || window.event;
        //   // txt.style =
        //   //   "top:" +
        //   //   event.clientY +
        //   //   "px;left:" +
        //   //   event.clientX +
        //   //   "px;display:block";
        //   return false;
        // }}
        onClick={() => {
          this.tap.emit();
        }}
        class={
          "saki-chat-dialog-component " +
          (this.selected ? "selected " : "") +
          (this.contextMenuActive ? "contextMenuActive " : "")
        }
      >
        {/* <div
          style={{
            position: "fixed",
            left: this.contextMenuObj.left + "px",
            top: this.contextMenuObj.top + "px",
          }}
        >
          测试是所所
        </div> */}
        <div class="chat-dialog-avatar">
          <img class="chat-dialog-avatar-img" src={this.avatar} alt="" />
        </div>
        <div class="chat-dialog-info">
          <div class="chat-dialog-i-info">
            <div class="chat-dialog-i-i-nickname text-elipsis">
              {this.nickname}
            </div>
            <div class="chat-dialog-i-i-time">{this.lastSeenTime}</div>
          </div>
          <div class={"chat-dialog-i-bottom"}>
            <div class="chat-dialog-i-b-message text-elipsis">
              {this.lastMessage}
            </div>
            {this.count ? (
              <div class="chat-dialog-i-b-count">{this.count}</div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
