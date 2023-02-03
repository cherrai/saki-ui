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
  @Prop() avatarText: string = "";
  @Prop() selected: boolean = false;
  @Prop() contextMenuActive: boolean = false;
  @Prop() nickname: string = "";
  @Prop() lastMessageTime: string = "";
  @Prop() lastMessage: string = "";
  @Prop() count: number = 0;
  @Prop() anonymous: boolean = false;
  @Prop() close: boolean = false;
  @Prop() encryption: boolean = false;
  @Prop() encryptionColor: string = "#25af36";
  // @Prop() contextMenuActiveBorderColor =
  //   "var(--saki-chat-dialog-context-menu-border-color)";

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
          (this.contextMenuActive ? "contextMenuActive " : "") +
          (this.anonymous ? "anonymous " : "") +
          (this.encryption ? "encryption " : "")
        }
        style={{
          // "--saki-chat-dialog-context-menu-border-color-local":
          //   this.contextMenuActiveBorderColor,
          "--saki-chat-dialog-encryption-color": this.encryptionColor,
        }}
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
          <saki-avatar
            width="40px"
            height="40px"
            borderRadius="50%"
            nickname={!this.avatar ? this.avatarText : ""}
            src={this.avatar}
          ></saki-avatar>
        </div>
        <div class="chat-dialog-info">
          <div class="chat-dialog-i-info">
            <div class="chat-dialog-i-i-nickname">
              {this.encryption ? (
                <div class={"chat-dialog-i-i-lock"}>
                  <svg
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="9856"
                  >
                    <path
                      d="M846.237 455.584V334.237C846.237 149.023 697.214 0 512 0S177.763 149.023 177.763 334.237v121.347c-57.48 4.258-104.316 53.223-104.316 112.832V909.04c0 63.866 51.094 114.96 114.96 114.96h649.314c63.867 0 114.96-51.094 114.96-114.96V568.416c-2.128-59.61-48.964-108.574-106.444-112.832z m-102.187 0H282.079V334.237c0-127.734 104.316-232.05 232.05-232.05s232.05 104.316 232.05 232.05v121.347z m0 0"
                      p-id="9857"
                    ></path>
                  </svg>
                </div>
              ) : (
                ""
              )}
              <span class={"text-elipsis"}>{this.nickname}</span>
              {this.anonymous ? (
                <div class={"chat-dialog-i-i-anonymous"}>
                  <svg
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="36691"
                  >
                    <path
                      d="M511.671 112c205.821 0 372.672 166.85 372.672 372.671v339.2c0 34.19-27.717 61.906-61.906 61.906a61.906 61.906 0 0 1-30.872-8.247l-31.819-18.306c-37.746-21.716-84.188-21.743-121.959-0.069l-64.185 36.832c-37.693 21.63-84.03 21.651-121.743 0.055L386.994 858.9c-37.601-21.532-83.785-21.579-121.43-0.123l-32.907 18.754c-30.056 17.13-68.309 6.651-85.439-23.405A62.64 62.64 0 0 1 139 823.108V484.671C139 278.851 305.85 112 511.671 112zM386.034 426.035c-37.21 0-67.373 30.128-67.373 67.293 0 37.166 30.164 67.294 67.373 67.294s67.373-30.128 67.373-67.294c0-37.165-30.164-67.293-67.373-67.293z m260.87 0c-37.21 0-67.373 30.128-67.373 67.293 0 37.166 30.164 67.294 67.373 67.294s67.373-30.128 67.373-67.294c0-37.165-30.164-67.293-67.373-67.293z"
                      p-id="36692"
                    ></path>
                  </svg>
                </div>
              ) : (
                ""
              )}
              {this.close ? (
                <div class={"chat-dialog-i-i-close"}>Closed</div>
              ) : (
                ""
              )}
            </div>
            {this.close ? (
              ""
            ) : (
              <div class="chat-dialog-i-i-time">{this.lastMessageTime}</div>
            )}
          </div>
          <div class={"chat-dialog-i-bottom"}>
            {/* {this.close ? (
              <div class={"chat-dialog-i-b-close"}>Closed</div>
            ) : (
              ""
            )} */}
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
