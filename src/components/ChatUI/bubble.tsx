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
import moment from "moment";
// import * as nyanyalog from "nyanyajs-log";
// import "moment/dist/locale/zh-cn";

@Component({
  tag: "saki-chat-bubble",
  styleUrl: "bubble.scss",
  shadow: true,
})
export class ChatBubbleComponent {
  @Prop() type: "receiver" | "sender" = "sender";

  isShowCenterTime: boolean = false;

  @Prop() uid: string = "";

  @Prop() language: string = "en-US";

  // 单位秒
  @Prop() sendTime: number = 0;
  @Prop() previousMessageUid: string = "";
  @Prop() previousMessageSendTime: number = 0;
  @Prop() previousMessageType: typeof this["type"] | "" = "";

  // 1 success
  // 0 sending
  // -1 fail
  @Prop({ mutable: true }) status: 1 | 0 | -1 = 0;
  @Prop() selected: boolean = false;
  @Prop() readStatsIcon: boolean = false;
  @Prop() statusIcon: boolean = false;
  @Prop() displayTime: boolean = false;
  @Prop() timeDisplayInterval = 2 * 60;
  @Prop() userInfoDisplayMode: "Merge" | "Full" = "Full";
  @Prop() editText: string = "";

  // 0~1
  @Prop() readProgress: number = 0;
  // 1 connected successfully
  // 0 calling
  // -1 Missing call
  // -2 Other devices calling
  // -3 Invite to join the call
  @Prop() callStatus: 1 | 0 | -1 | -2 | -3 | -10 = -10;
  @Prop() callTime: number = 0;
  @Prop() callType: "Audio" | "Video" | "ScreenShare" | "" = "";

  @Prop() avatar: string = "";
  @Prop() nickname: string = "";

  @Prop() backgroundColor: string = "";
  @Prop() bubbleBackgroundColor: string = "";
  @Prop() border: string = "1px solid rgba(0,0,0,0)";
  @Prop() padding: string = "8px 10px";
  @Prop() borderRadius: string =
    "var(--saki-chat-bubble-content-border-radius)";
  @Prop() horizontalMargin: string = "46px";
  @Prop() verticalMargin: string = "2px";

  @Prop() watchStatus: boolean = false;
  @Prop() watchStatusTimeout: number = 5;
  @Prop() watchStatusCount: number = 30;
  currentWatchStatusCount: number = 0;
  @State() timer: NodeJS.Timer;

  bubbleEl: HTMLElement = null;
  @State() bubbleElWidth: number;

  clickTime: number = 0;

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

  @Watch("status")
  watchStatusF() {
    this.watchStatusFunc();
  }
  @Watch("sendTime")
  watchSendTime() {
    this.isShowCenterTime = this.isShowCenterTimeFunc();
  }
  @Watch("previousMessageSendTime")
  watchPreviousMessageSendTime() {
    this.isShowCenterTime = this.isShowCenterTimeFunc();
  }

  formatStatusText(status: number) {
    switch (status) {
      case 1:
        return "success";
      case 0:
        return "sending";
      case -1:
        return "fail";
      default:
        break;
    }
  }

  formatCallMsgText() {
    return (
      window["mwc"]?.methods?.formatCallMsgText?.({
        isAuthor: this.type === "sender",
        callType: this.callType,
        status: this.callStatus,
        callTime: this.callTime || 0,
      }) || ""
    );
  }
  formatCallTypeText(type: "Audio" | "Video" | "ScreenShare" | "") {
    // console.log("formatCallTypeText", type);

    return window["mwc"]?.methods?.formatCallTypeText?.(type) || "";
  }

  getTimeConfig(language: string, name: string) {
    // console.log("formatCallTypeText", type);

    return window["mwc"]?.l?.(language, name) || "";
  }

  componentWillLoad() {
    this.watchStatusFunc();
    this.isShowCenterTime = this.isShowCenterTimeFunc();
  }
  watchStatusFunc() {
    clearInterval(this.timer);

    if (
      !this.watchStatus ||
      this.watchStatusTimeout <= 0 ||
      this.watchStatusCount <= 0 ||
      this.status !== 0
    ) {
      return;
    }
    this.timer = setInterval(() => {
      if (this.status === 0) {
        this.currentWatchStatusCount++;
        this.sendfailed.emit({
          currentCount: this.currentWatchStatusCount,
          totalCount: this.watchStatusCount,
        });
        if (this.currentWatchStatusCount >= this.watchStatusCount) {
          clearInterval(this.timer);
          return;
        }
      } else {
        clearInterval(this.timer);
      }
    }, this.watchStatusTimeout * 1000);
    console.log(this.timer);
  }
  isShowCenterTimeFunc() {
    // 超过6分钟？
    const sendTime = moment(this.sendTime * 1000);
    const previousMessageSendTime = moment(this.previousMessageSendTime * 1000);

    if (
      sendTime.year() !== previousMessageSendTime.year() ||
      sendTime.month() !== previousMessageSendTime.month() ||
      sendTime.date() !== previousMessageSendTime.date() ||
      this.sendTime - this.previousMessageSendTime >= this.timeDisplayInterval
    ) {
      return true;
    }
    return false;
  }
  isShowTime() {
    if (this.userInfoDisplayMode === "Full") return true;
    return (
      this.isShowCenterTime ||
      this.type !== this.previousMessageType ||
      this.uid !== this.previousMessageUid ||
      this.sendTime - this.previousMessageSendTime >= this.timeDisplayInterval
    );
  }
  render() {
    let isShowMsg = true;
    let msg = "";
    if (this.callType) {
      isShowMsg = false;
      let width = "auto";
      msg = (
        <div
          style={{
            width: width + "px",
          }}
          class={
            "bubble-c-msg-call " +
            (this.callStatus === 1 ||
            this.callStatus === -1 ||
            this.callStatus === -3
              ? "hover"
              : "")
          }
        >
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1486"
            width="200"
            height="200"
          >
            <path
              d="M838.4 569.6c-3.2 9.6-6.4 16-12.8 19.2-6.4 3.2-12.8 6.4-19.2 6.4H800c-9.6-3.2-16-6.4-22.4-12.8-6.4-6.4-6.4-16-3.2-25.6 12.8-67.2 0-137.6-38.4-198.4-38.4-57.6-99.2-99.2-169.6-112-9.6-3.2-16-6.4-22.4-12.8-6.4-6.4-6.4-16-3.2-25.6 3.2-16 16-25.6 32-25.6h6.4c179.2 35.2 294.4 208 259.2 387.2zM694.4 384c35.2 51.2 48 115.2 35.2 176-3.2 9.6-6.4 16-12.8 19.2-6.4 3.2-12.8 6.4-19.2 6.4h-6.4c-16-3.2-28.8-19.2-25.6-38.4 9.6-44.8 0-89.6-25.6-128-25.6-38.4-64-64-108.8-73.6-19.2-3.2-28.8-22.4-25.6-38.4 3.2-16 16-25.6 35.2-25.6h6.4c57.6 12.8 112 48 147.2 102.4z m-73.6 166.4c-3.2 9.6-6.4 16-12.8 19.2-9.6 6.4-16 6.4-22.4 6.4h-6.4c-9.6-3.2-16-6.4-22.4-12.8-6.4-6.4-6.4-16-3.2-25.6 3.2-19.2 0-38.4-9.6-57.6-12.8-16-28.8-28.8-48-32-9.6-3.2-16-6.4-22.4-12.8-6.4-6.4-6.4-16-3.2-25.6 3.2-16 16-25.6 35.2-25.6h6.4c73.6 16 124.8 89.6 108.8 166.4z m-259.2-169.6s-41.6 16-48 19.2c-6.4 3.2-9.6 9.6-9.6 19.2 16 48 41.6 99.2 73.6 147.2 28.8 44.8 67.2 89.6 105.6 121.6 3.2 3.2 6.4 3.2 9.6 3.2 3.2 0 6.4-3.2 9.6-6.4 6.4-6.4 16-19.2 25.6-28.8 19.2-19.2 35.2-25.6 51.2-25.6 3.2 0 9.6 0 12.8 3.2 3.2 0 9.6 3.2 19.2 9.6 3.2 0 41.6 25.6 73.6 57.6 12.8 12.8 32 32 32 54.4 0 16-9.6 32-28.8 48-3.2 3.2-44.8 41.6-108.8 41.6-19.2 0-35.2-3.2-54.4-9.6-19.2-6.4-38.4-16-57.6-25.6-76.8-44.8-134.4-99.2-188.8-182.4-96-140.8-99.2-262.4-96-288 0-105.6 89.6-147.2 99.2-150.4 12.8-6.4 25.6-9.6 38.4-9.6 6.4 0 9.6 0 16 3.2 9.6 3.2 22.4 9.6 32 28.8 12.8 25.6 25.6 64 32 105.6 6.4 41.6-16 54.4-38.4 64z"
              p-id="1487"
            ></path>
          </svg>
          <div
            data-hover-text={window["mwc"]?.methods?.formatCallMsgText?.({
              isAuthor: this.type === "sender",
              callType: this.callType,
              status: 0,
              callTime: this.callTime || 0,
            })}
            class={"bubble-c-msg-call-content"}
          >
            <div class={"bubble-c-msg-call-msg"}>
              {this.formatCallMsgText()}
            </div>
            {/* <div class={"bubble-c-msg-call-msg-hover"}>
              发起{this.formatCallTypeText(this.callType)}通话
            </div> */}
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          "--horizontal-margin": this.horizontalMargin,
          "--vertical-margin": this.verticalMargin,
          "--width": "0px",
          ...["padding"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        // onContextMenu={() => {
        //   // e.preventDefault();
        //   // return false;
        // }}
        ref={(e) => {
          this.bubbleEl = e;
        }}
        class={"saki-chat-bubble-component " + " "}
      >
        {this.isShowCenterTime ? (
          <div class={"bubble-center-time"}>
            <span>
              {/* {this.sendTime + ", "} */}
              {moment(this.sendTime * 1000).calendar(
                this.getTimeConfig(this.language, "centerTimeMomentConfig")
              )}
            </span>
          </div>
        ) : (
          ""
        )}

        <div
          style={{
            ...(this.backgroundColor
              ? { backgroundColor: this.backgroundColor }
              : {}),
          }}
          class={
            "bubble-message " +
            this.type +
            (this.selected ? " selected " : "") +
            (this.isShowTime() && this.displayTime ? " showTime " : "") +
            (this.userInfoDisplayMode === "Full"
              ? " showUserInfo "
              : this.isShowTime()
              ? " showUserInfo "
              : "")
          }
        >
          <div class="bubble-m-userinfo">
            <div
              onClick={() => {
                this.tap.emit("avatar");
              }}
              class="bubble-u-avatar"
            >
              <saki-avatar
                width={"36px"}
                height={"36px"}
                borderRadius={"50%"}
                nickname={this.nickname}
                src={this.avatar}
              ></saki-avatar>
            </div>
          </div>
          <div class={"bubble-m-main"}>
            {/* {this.sendTime + ", "} */}
            {this.displayTime ? (
              <div class="bubble-time">
                <span class={"full-time"}>
                  {this.editText ? this.editText + " · " : ""}
                  {moment(this.sendTime * 1000).calendar(
                    this.getTimeConfig(
                      this.language,
                      "sendTimeFullMomentConfig"
                    )
                  )}
                </span>
                <span class={"short-time"}>
                  {this.editText ? this.editText + " · " : ""}
                  {moment(this.sendTime * 1000).calendar(
                    this.getTimeConfig(this.language, "sendTimeMomentConfig")
                  )}
                </span>
              </div>
            ) : (
              ""
            )}

            <div class="bubble-content">
              <div
                class={
                  "bubble-c-status " +
                  this.type +
                  " " +
                  this.formatStatusText(this.status)
                }
              >
                {this.readStatsIcon && this.status === 1 ? (
                  <div
                    data-read-progress={this.readProgress}
                    class={"bubble-c-s-readstatus"}
                  >
                    <saki-circle-progress-bar
                      class={"bubble-c-s-progress-bar"}
                      progress={this.readProgress === 1 ? 0 : this.readProgress}
                      width="12px"
                      barWidth="2px"
                      padding="1px"
                      border-width="1px"
                      color="var(--saki-chat-bubble-read-progress-color)"
                    >
                      {this.readProgress >= 1 ? (
                        <svg
                          class="bubble-c-s-progress-bar-icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="1698"
                          width="200"
                          height="200"
                        >
                          <path
                            d="M836.1 170.8L367.7 692.1 182.8 486.5c-27.9-30.7-72.5-30.7-100.4 0-27.9 30.7-27.9 80.9 0 111.6L304 844.9c14.9 16.4 41.8 23.8 64.1 22.7 22.3 1.1 48.8-6.3 63.2-22.7l505.1-562.6c27.9-30.7 27.9-80.9 0-111.6-27.8-30.6-72.4-30.6-100.3 0.1z m0 0"
                            p-id="1699"
                          ></path>
                        </svg>
                      ) : (
                        ""
                      )}
                    </saki-circle-progress-bar>
                  </div>
                ) : (
                  ""
                )}
                {this.statusIcon ? (
                  this.status === 0 ? (
                    <saki-animation-loading
                      width="12px"
                      height="12px"
                      border="2px"
                      type="rotateLinear"
                      color="var(--saki-default-color)"
                    ></saki-animation-loading>
                  ) : this.status === -1 ? (
                    <svg
                      class="bubble-c-s-resend-icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2594"
                      width="200"
                      height="200"
                      onClick={() => {
                        this.resend.emit();
                      }}
                    >
                      <path
                        d="M684.032 403.456q-17.408-8.192-15.872-22.016t11.776-22.016q3.072-2.048 19.968-15.872t41.472-33.28q-43.008-49.152-102.4-77.312t-129.024-28.16q-64.512 0-120.832 24.064t-98.304 66.048-66.048 98.304-24.064 120.832q0 63.488 24.064 119.808t66.048 98.304 98.304 66.048 120.832 24.064q53.248 0 100.864-16.896t87.04-47.616 67.584-72.192 41.472-90.624q7.168-23.552 26.624-38.912t46.08-15.36q31.744 0 53.76 22.528t22.016 53.248q0 14.336-5.12 27.648-21.504 71.68-63.488 132.096t-99.84 103.936-128.512 68.096-148.48 24.576q-95.232 0-179.2-35.84t-145.92-98.304-98.304-145.92-36.352-178.688 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352q105.472 0 195.584 43.52t153.6 118.272q23.552-17.408 39.424-30.208t19.968-15.872q6.144-5.12 13.312-7.68t13.312 0 10.752 10.752 6.656 24.576q1.024 9.216 2.048 31.232t2.048 51.2 1.024 60.416-1.024 58.88q-1.024 34.816-16.384 50.176-8.192 8.192-24.576 9.216t-34.816-3.072q-27.648-6.144-60.928-13.312t-63.488-14.848-53.248-14.336-29.184-9.728z"
                        p-id="2595"
                      ></path>
                    </svg>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>

              <div
                style={{
                  padding: this.padding || "8px 10px",
                  borderRadius:
                    this.borderRadius ||
                    "var(--saki-chat-bubble-content-border-radius)",

                  border: this.border || "1px solid rgba(0,0,0,0)",

                  ...(this.bubbleBackgroundColor
                    ? { backgroundColor: this.bubbleBackgroundColor }
                    : {}),
                }}
                // onTouchStart={(e) => {}}
                // onMouseDown={(e) => {
                //   console.log(e);
                //   this.clickTime = new Date().getTime();
                //   switch (e.button) {
                //     case 2:
                //       this.opencontextmenu.emit({
                //         x: e.x,
                //         y: e.y,
                //       });
                //       // this.selected = !this.selected;
                //       break;

                //     default:
                //       break;
                //   }
                // }}
                onContextMenu={(e) => {
                  // console.log("onContextMenu", e);
                  this.opencontextmenu.emit({
                    x: e.x,
                    y: e.y,
                  });
                  e.preventDefault();
                  return false;
                }}
                onClick={() => {
                  this.tap.emit("message");
                }}
                class="bubble-c-msg"
              >
                {isShowMsg ? <slot></slot> : msg}
              </div>
            </div>
          </div>
        </div>
        {/* && this.type !== this.previousMessageType */}

        {/* <div class={"bubble-time-hover"}>{this.timePrompt}</div> */}
      </div>
    );
  }
}
