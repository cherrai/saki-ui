import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
  Watch,
} from "@stencil/core";

@Component({
  tag: "saki-aside-modal",
  styleUrl: "aside-modal.scss",
  // shadow: true,
})
export class AsideModalComponent {
  @Prop() visible: boolean = false;
  // hide用于部分情况如通讯、只能隐藏不能删除dom
  @Prop() hide: boolean = false;

  @Prop({ mutable: true }) vertical: "Top" | "Center" | "Bottom" = "Top";
  @Prop({ mutable: true }) horizontal: "Left" | "Center" | "Right" = "Left";

  @State() isAddVisibleClass: boolean = false;
  @State() isAddHideClass: boolean = false;
  @State() visibleStyle: boolean = false;
  modalEl: HTMLElement;
  contentEl: HTMLElement;
  @Prop() backgroundColor: string = "";
  @Prop() width: string = "";
  @Prop() height: string = "";
  @Prop() minWidth: string = "";
  @Prop() minHeight: string = "";
  @Prop() maxWidth: string = "";
  @Prop() maxHeight: string = "";
  @Prop() borderRadius: string = "";
  @Prop() boxShadow: string = "";
  @Prop() border: string = "";
  @Prop() padding: string = "";
  @Prop() margin: string = "";
  @Prop() mask: boolean = false;
  @Prop() maskBackgroundColor: string = "";
  @Prop() overflow: string = "hidden";
  @Prop() maskClosable: boolean = false;
  @Prop({ mutable: true }) zIndex: number = 999;

  @Prop({ mutable: true }) offsetX = 0;
  @Prop({ mutable: true }) offsetY = 0;

  @State() closing: boolean = false;

  @Event({
    bubbles: false,
  })
  tap: EventEmitter;

  @Event({
    bubbles: false,
  })
  open: EventEmitter;

  @Event({
    bubbles: false,
  })
  close: EventEmitter;

  @Event({
    bubbles: false,
  })
  loaded: EventEmitter;
  @Element() el: HTMLElement;
  @Watch("visible")
  watchVisibleFunc() {
    if (this.visible) {
      this.closing = false;
      this.open.emit();
      this.visibleStyle = true;
      document.body.appendChild(this.modalEl);
      setTimeout(() => {
        this.isAddVisibleClass = true;
      }, 10);
    } else {
      this.close.emit();
      this.isAddVisibleClass = false;
      this.closing = true;
    }
  }
  @Watch("hide")
  watchHideFunc() {
    if (this.hide) {
      this.isAddVisibleClass = false;
      setTimeout(() => {
        this.isAddHideClass = true;
      }, 300);
    } else {
      this.isAddHideClass = false;
      setTimeout(() => {
        this.isAddVisibleClass = true;
      }, 10);
    }
  }
  componentDidLoad() {
    this.loaded.emit();
  }
  render() {
    return (
      // <saki-transition
      //   animation-duration={2000}
      //   in={this.hide}
      //   class-name={"hide-modal-transition"}
      // >
      // {/* </saki-transition> */}
      <div
        ref={(e) => {
          this.modalEl = e;
          // if (!this.modalEl && e) {
          //   this.modalEl = e;
          // }
        }}
        style={{
          "--saki-modal-max-width": this.maxWidth,
          // display: this.visibleStyle ? "block" : "none",
        }}
        data-hide={this.hide}
        class={
          "saki-aside-modal-component " +
          this.horizontal +
          this.vertical +
          " " +
          (this.visibleStyle ? "visibleStyle " : "") +
          (this.isAddVisibleClass && !this.hide ? "visible " : "") +
          (this.isAddHideClass ? "hide " : "")
        }
      >
        {this.mask ? (
          <div
            onClick={() => {
              if (this.maskClosable) {
                this.visible = false;
              }
            }}
            style={{
              backgroundColor: this.maskBackgroundColor,
              zIndex: String(this.zIndex - 1),
            }}
            class={"model-bg " + (this.isAddVisibleClass ? "visible" : "")}
          ></div>
        ) : (
          ""
        )}

        <div
          style={{
            ...[
              "maxWidth",
              "maxHeight",
              "minWidth",
              "minHeight",
              "height",
              "width",
              "backgroundColor",
              "borderRadius",
              "boxShadow",
              "border",
              "padding",
              "margin",
              "overflow",
            ].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
            zIndex: String(this.zIndex),
            "--saki-aside-modal-offset-x": this.offsetX + "px",
            "--saki-aside-modal-offset-y": this.offsetY + "px",
          }}
          ref={(e) => {
            this.contentEl = e;
          }}
          onTransitionEnd={() => {
            if (this.closing && document.body.contains(this.modalEl)) {
              this.visibleStyle = false;
              this.el.appendChild(this.modalEl);
              // document.body.removeChild(this.modalEl);
            }
          }}
          class={
            "model-content saki-images-lazyload " +
            this.horizontal +
            this.vertical +
            " " +
            (this.isAddVisibleClass ? "visible" : "")
          }
        >
          <slot></slot>
        </div>
      </div>
    );
  }
}
