import {
  Component,
  State,
  h,
  Event,
  EventEmitter,
  Prop,
  Watch,
  Method,
  Element,
} from "@stencil/core";

// 暂时弃用
@Component({
  tag: "saki-snackbar-message",
  styleUrl: "snackbar.scss",
  shadow: false,
})
export class SnackbarMessageComponent {
  @Prop() visible: boolean = false;
  @Prop() closeIcon: boolean = false;
  @Prop() autoHideDuration: number = 0;
  @Prop() message: string = "";
  @Prop() borderRadius: string = "6px";
  @Prop() backgroundColor: string = "#fff";
  @Prop() padding: string = "10px";
  @Prop() top: string = "";
  @Prop() left: string = "";
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
  @Element() el: HTMLElement;
  @Event() close: EventEmitter;
  @Event() load: EventEmitter<{
    height: number;
  }>;
  @Watch("visible")
  watchVisible() {
    if (this.visible) {
    } else {
      clearTimeout(this.timer);
    }
  }
  componentDidLoad() {
    console.log(this.el);
    const el: HTMLElement = this.el.querySelector(
      ".saki-snackbar-message-component"
    );

    this.load.emit({
      height: el.offsetHeight,
    });
    document.body.appendChild(el);

    if (this.autoHideDuration) {
      this.timer = setTimeout(() => {
        this.visible = false;
        this.close.emit();
        document.body.removeChild(el);
      }, this.autoHideDuration);
    }
  }

  @Method()
  async open(value: any) {
    console.log(value);
  }

  render() {
    return (
      <div
        class={"saki-snackbar-message-component"}
        style={{
          position: "fixed",
          transition: "all .3s",
          ...["top", "left"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          "--saki-snackbar-padding": this.padding,
        }}
      >
        {this.message}
      </div>
    );
    // return (
    //   <div
    //     class={"saki-snackbar-message-component "}
    //     onTransitionEnd={() => {
    //       if (!this.visible) {
    //         this.hide = true;
    //       }
    //     }}
    //     style={{
    //       ...[
    //         "width",
    //         "maxWidth",
    //         "minWidth",
    //         "height",
    //         "maxHeight",
    //         "minHeight",
    //         "fontSize",
    //         "padding",
    //         "borderRadius",
    //         "backgroundColor",
    //       ].reduce(
    //         (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
    //         {}
    //       ),
    //       "--saki-snackbar-padding": this.padding,
    //     }}
    //   >
    //     <div class={"ss-left"}>
    //       <slot name="left"></slot>
    //       {this.message ? <div class={"ss-l-message"}>{this.message}</div> : ""}
    //     </div>
    //     <div class={"ss-right " + (this.closeIcon ? "closeIcon" : "")}>
    //       <slot name="left"></slot>

    //       {this.closeIcon ? (
    //         <div class="delete-icon">
    //           <svg
    //             // t="1639418573603"
    //             class="icon"
    //             viewBox="0 0 1024 1024"
    //             version="1.1"
    //             xmlns="http://www.w3.org/2000/svg"
    //             p-id="1213"
    //             onClick={() => {
    //               this.close.emit();
    //             }}
    //           >
    //             <path
    //               d="M556.8 512L832 236.8c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2l-275.2-277.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l275.2 277.333333-277.333333 275.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333L512 556.8 787.2 832c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8L556.8 512z"
    //               p-id="1214"
    //             ></path>
    //           </svg>
    //         </div>
    //       ) : (
    //         ""
    //       )}
    //     </div>
    //   </div>
    // );
  }
}
