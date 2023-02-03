import {
  Component,
  State,
  h,
  Event,
  EventEmitter,
  Prop,
  Watch,
  Method,
} from "@stencil/core";

interface OpenParams {
  message: string;
  autoHideDuration: number;
  vertical: "bottom" | "center" | "top";
  horizontal: "left" | "center" | "right";
}
interface MessagesItem extends OpenParams {
  key: number;
  height: number;
  top: string;
}

@Component({
  tag: "saki-snackbar",
  styleUrl: "snackbar.scss",
  shadow: true,
})
export class SnackbarComponent {
  @Prop({ mutable: true }) visible: boolean = false;
  @Prop() closeIcon: boolean = false;
  @Prop() allowContentClick: boolean = false;
  @Prop() autoHideDuration: number = 0;
  @Prop() message: string = "";
  @Prop() borderRadius: string = "6px";
  @Prop() backgroundColor: string = "#fff";
  @Prop() backgroundHoverColor: string = "";
  @Prop() backgroundActiveColor: string = "";
  @Prop() color: string = "#000";
  @Prop() hoverColor: string = "";
  @Prop() activeColor: string = "";
  @Prop() fontWeight: string = "";
  @Prop() padding: string = "10px";
  @Prop() fontSize: string = "";
  @Prop() height: string = "";
  @Prop() maxHeight: string = "";
  @Prop() minHeight: string = "";
  @Prop() width: string = "";
  @Prop() maxWidth: string = "";
  @Prop() minWidth: string = "";
  @Prop() vertical: "bottom" | "center" | "top" = "top";
  @Prop() horizontal: "left" | "center" | "right" = "center";
  @State() timer?: NodeJS.Timeout;
  @State() hide: boolean = true;
  @State() messages: MessagesItem[] = [];
  @State() updateTime: number = 0;
  @Event({
    eventName: "close",
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  closeFunc: EventEmitter;
  @Event() tap: EventEmitter;
  @Event() load: EventEmitter;
  @Watch("visible")
  watchVisible() {
    if (this.visible) {
      this.hide = false;
      if (this.autoHideDuration) {
        this.timer = setTimeout(() => {
          this.close();
        }, this.autoHideDuration);
      }
    } else {
      clearTimeout(this.timer);
    }
  }
  componentDidLoad() {
    this.load.emit();
  }

  @Method()
  async open() {
    // params: OpenParams
    // console.log("open")
    this.visible = true;
    // console.log(params);
    // // const el = <saki-snackbar-message message={message} />;
    // this.messages.push({
    //   ...params,
    //   key: new Date().getTime(),
    //   height: 0,
    //   top: "0px",
    // });
    // this.updateTime = new Date().getTime();
    // console.log(this.messages);
  }
  @Method()
  async close() {
    this.visible = false;
  }

  render() {
    return (
      <div
        class={
          "saki-snackbar-component " +
          (this.visible ? " visible" : " none-visible") +
          (this.hide ? " hide" : "") +
          (this.allowContentClick ? " click" : "")
        }
      >
        <div class={"snackbar-wrap " + (this.vertical + this.horizontal)}>
          <div
            class={
              "snackbar-content" +
              (this.backgroundActiveColor ? " bgActive" : "") +
              (this.backgroundHoverColor ? " bgHover" : "") +
              (this.activeColor ? " activeColor" : "") +
              (this.hoverColor ? " hoverColor" : "")
            }
            onTransitionEnd={() => {
              if (!this.visible) {
                this.hide = true;
                this.closeFunc.emit();
              }
            }}
            onClick={() => {
              this.tap.emit();
            }}
            style={{
              ...[
                "width",
                "maxWidth",
                "minWidth",
                "height",
                "maxHeight",
                "minHeight",
                "fontSize",
                "padding",
                "borderRadius",
                "color",
                "fontWeight",
              ].reduce(
                (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
                {}
              ),
              ...[
                "backgroundColor",
                "backgroundHoverColor",
                "backgroundActiveColor",
                "color",
                "hoverColor",
                "activeColor",
              ].reduce(
                (fin, cur) =>
                  this[cur]
                    ? { ...fin, ["--saki-snackbar-" + cur]: this[cur] }
                    : fin,
                {}
              ),
              "--saki-snackbar-padding": this.padding,
            }}
          >
            <div class={"ss-left"}>
              <slot name="left"></slot>
              {this.message ? (
                <div class={"ss-l-message"}>{this.message}</div>
              ) : (
                ""
              )}
            </div>
            <div class={"ss-right " + (this.closeIcon ? "closeIcon" : "")}>
              <slot name="left"></slot>

              {this.closeIcon ? (
                <div class="delete-icon">
                  <svg
                    // t="1639418573603"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1213"
                    onClick={() => {
                      this.close();
                    }}
                  >
                    <path
                      d="M556.8 512L832 236.8c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2l-275.2-277.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l275.2 277.333333-277.333333 275.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333L512 556.8 787.2 832c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8L556.8 512z"
                      p-id="1214"
                    ></path>
                  </svg>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {/* {this.messages.map((v, i) => {
            return (
              <saki-snackbar-message
                left="0px"
                top={50 * i + "px"}
                autoHideDuration={v.autoHideDuration}
                // onLoad={(e) => {
                //   console.log(e);
                // }}
                ref={(e) => {
                  console.log(e.offsetHeight);
                }}
                onClose={() => {
                  this.messages = this.messages.filter((sv) => {
                    return v.key !== sv.key;
                  });
                  this.updateTime = new Date().getTime();
                }}
                message={v.message + "_" + i + "_" + this.messages.length}
              >
                {i}
              </saki-snackbar-message>
            );
          })} */}
        {/* <saki-snackbar-message></saki-snackbar-message> */}
      </div>
    );
  }
}
