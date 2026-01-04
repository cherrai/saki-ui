import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
} from "@stencil/core";
// import 'cropperjs/dist/cropper.css';
// import Cropper from "cropperjs";

@Component({
  tag: "saki-waterfall-layout-item",
  styleUrls: ["waterfallLayout.scss"],
  shadow: true,
})
export class WaterfallLayoutItemComponent {
  @State() left: number = 0;
  @State() top: number = 0;
  @Prop() width: number = 0;
  @Prop() height: number = 0;
  @Prop() itemWidth: number = 0;
  @Prop() margin: string = "0 0px 0px";
  @Prop() padding: string = "";
  @Prop() borderRadius: string = "10px";
  @Prop() show: boolean = false;
  @Prop() addTrack: boolean = false;
  @Prop() added: boolean = false;
  imgEl: HTMLElement;

  @Event()
  changeSize: EventEmitter;

  @State() toDisplayArea: boolean = false;

  @State() parentEl: HTMLSakiWaterfallLayoutElement;
  @Element() el: HTMLDivElement;
  componentDidLoad() {
    const resizeObserver = new ResizeObserver(() => {
      const el = this.el;
      // console.log(
      //   "wl getWH11",
      //   this.width,
      //   this.height,
      //   el?.offsetWidth,
      //   el?.offsetHeight,
      //   this.width !== el?.offsetWidth || this.height !== el?.offsetHeight
      // );
      if (this.width !== el?.offsetWidth || this.height !== el?.offsetHeight) {
        // this.width = el?.offsetWidth;
        // this.height = el?.offsetHeight;
        // this.changeSize.emit();
        this.parentEl?.initItemXY();
      }
    });

    resizeObserver.observe(this.el);
  }
  @Method()
  async setParentEl(el: HTMLSakiWaterfallLayoutElement) {
    this.parentEl = el;
  }
  @Method()
  async setLeftTop(params: { left: number; top: number }) {
    this.left = params.left;
    this.top = params.top;
    this.el.style.position = "absolute";
    this.el.style.left = this.left + "px";
    this.el.style.top = this.top + "px";
  }

  @Method()
  async getWH() {
    const el = this.el;
    console.log("wl getWH1", el, el?.offsetWidth, el?.offsetHeight);

    return {
      width: el?.offsetWidth,
      height: el?.offsetHeight,
    };
  }

  render() {
    const width = this.itemWidth;
    const height = (this.itemWidth * this.height) / this.width;

    // console.log("media comp", width, ";", this.width, height, this.height);
    return (
      <div
        ref={(e) => {
          // console.log("getWH", e, e.querySelector(".im-img"), e.offsetHeight);
        }}
        style={{
          width: width + "px",
          minHeight: height + "px",
          display: this.added ? "block" : "none",
          opacity: this.show ? "1" : "0",
          ...["margin", "padding", "borderRadius"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-waterfall-layout-item-component "}
      >
        {/* <div
          style={{
            width: width + "px",
            height: height + "px",
          }}
          class={"wli-img"}
        >
          <slot name="img"></slot>
        </div>
        <div class={"wli-info"}>
          <slot name="info"></slot>
        </div> */}
        <slot></slot>
      </div>
    );
  }
}
