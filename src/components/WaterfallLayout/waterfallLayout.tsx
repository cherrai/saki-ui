import { deepCopy } from "@nyanyajs/utils/dist/common/common";
import { Debounce } from "@nyanyajs/utils/dist/debounce";
import {
  Component,
  Element,
  h,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
// import 'cropperjs/dist/cropper.css';
// import Cropper from "cropperjs";

@Component({
  tag: "saki-waterfall-layout",
  styleUrls: ["waterfallLayout.scss"],
  shadow: true,
})
export class WaterfallLayoutComponent {
  initTimer: NodeJS.Timeout;
  d = new Debounce();
  itemD = new Debounce();
  imgEl: HTMLElement;
  observer: MutationObserver;
  resizeObserver: ResizeObserver;

  @State() layoutEl: HTMLDivElement;
  layoutWidth: number = 0;

  list: HTMLSakiWaterfallLayoutItemElement[] = [];

  @State() layoutItemWidth = 0;
  @State() toDisplayArea: boolean = false;
  @State() loaded: boolean = false;
  @Prop() margin: string = "0 0 10px 0";
  @Prop() padding: string = "0 0";
  @Prop() trackMargin: string = "";
  @Prop() trackPadding: string = "0 5px";
  @Prop() trackSpacing: number = 10;
  @Prop() columnLength = 0;

  @State() renderList: {
    height: number;
    list: HTMLSakiWaterfallLayoutItemElement[];
  }[] = [];

  @State() listXY: {
    x: number;
    y: number;
    length: number;
  }[] = [];

  @Watch("columnLength")
  watchcolumnLength() {
    this.watchDomResize();
  }

  @Watch("trackSpacing")
  watchtrackSpacing() {
    console.log("thistrackSpacing", this.trackSpacing);
    this.bindEvent();
  }

  @Element() el: HTMLElement;

  componentDidLoad() {
    // this.initRenderList(3);

    this.el.style.position = "relative";

    // setTimeout(() => {
    this.bindEvent();
    // window.addEventListener("resize", () => {
    //   this.watchDomResize();
    // });
    // }, 300);
  }

  // @Method()
  // watchDom() {
  //   // this.d.increase(() => {
  //   const list = this.el?.querySelectorAll(
  //     "saki-waterfall-layout-item"
  //   ) as NodeListOf<HTMLSakiWaterfallLayoutItemElement>;

  //   // console.log("wlist111", list);

  //   list.forEach((v) => {
  //     // !v.show && this.addItem(v);

  //     // console.log("wlist111", v.added);
  //     if (!v.added) {
  //       v.added = true;
  //       this.list.push(v);
  //     }
  //   });
  //   // console.log("wlist111", this.list, list, this.renderList);
  //   // this.initList();
  //   // }, 100);
  // }

  bindEvent() {
    this.observer?.disconnect();
    this.resizeObserver?.disconnect();

    setTimeout(() => {
      this.watchDomResize();
    }, 300);

    this.observer = new MutationObserver(() => {
      // console.log("MutationObserver");
      this.watchDomResize();
    });
    // console.log("MutationObserver", this.observer, this.el);
    this.observer.observe(this.el, {
      attributes: false,
      childList: true,
      subtree: false,
    });

    let lastWidth = null;
    this.resizeObserver = new ResizeObserver((entries) => {
      console.log(`Width changed to: `, this.el.offsetWidth);
      for (const entry of entries) {
        const { width } = entry.contentRect;
        if (width !== lastWidth) {
          lastWidth = width;

          setTimeout(() => {
            this.watchDomResize();
          }, 300);
          // 执行宽度相关逻辑
        }
      }
    });

    this.resizeObserver.observe(
      this.layoutEl
      // document.body.querySelector(".saki-waterfall-layout-component")
    );
  }

  getColumnLength(width: number): number {
    if (this.columnLength) return this.columnLength;
    if (width <= 400) {
      return 2;
    }
    return 2 + Math.floor((width - 400) / 300);
  }
  watchDomResize(b: boolean = false) {
    this.list = [];
    const layoutEl = this.layoutEl;
    // const layoutEl: HTMLDivElement = this.el.querySelector(
    //   ".saki-waterfall-layout-component"
    // );

    const w =
      layoutEl.offsetWidth -
      parseFloat(layoutEl.style.paddingLeft) -
      parseFloat(layoutEl.style.paddingRight);

    let length = this.getColumnLength(w);

    this.layoutItemWidth = (w - this.trackSpacing * (length - 1)) / length;

    console.log(
      "layoutEl.offsetWidth",
      layoutEl,
      w,
      parseFloat(layoutEl.style.paddingLeft),
      this.layoutItemWidth,
      this.trackSpacing
    );
    const list = this.el?.querySelectorAll(
      "saki-waterfall-layout-item"
    ) as NodeListOf<HTMLSakiWaterfallLayoutItemElement>;

    list.forEach((el) => {
      el.setParentEl(this.el as any);
      // el.removeEventListener("changeSize", this.watchItemChangeSize.bind(this));
      // el.addEventListener("changeSize", this.watchItemChangeSize.bind(this));
      el.itemWidth = this.layoutItemWidth;
      el.added = true;
      this.list.push(el);
    });

    this.initItemXY();
  }

  watchItemChangeSize() {
    console.log("getWH11 changeSize");
    this.initItemXY();
  }
  @Method()
  async initItemXY() {
    this.itemD.increase(async () => {
      const layoutEl = this.layoutEl;
      // const layoutEl: HTMLDivElement = this.el.querySelector(
      //   ".saki-waterfall-layout-component"
      // );

      let length = this.getColumnLength(layoutEl.offsetWidth);

      const w = this.layoutItemWidth;

      this.listXY = [];

      for (let i = 0; i < length; i++) {
        // console.log("initItemXY", w, i, i * (w + this.trackSpacing));
        this.listXY.push({
          x: i * (w + this.trackSpacing),
          y: 0,
          length: 0,
        });
      }
      for (let i = 0; i < this.list.length; i++) {
        let index = this.listXY.reduce((t, v, i) => {
          if (v.y < this.listXY[t].y) {
            t = i;
          }

          return t;
        }, 0);

        const el = this.list[i];
        const wh = await el.getWH();

        // const tw = w - 10;
        const th = (w * wh.height) / wh.width || 0;

        el.setLeftTop({
          left: this.listXY[index].x,
          top: this.listXY[index].y,
        });
        el.show = true;
        // console.log("initItemXY wh", el, index, wh, th, deepCopy(this.listXY));
        this.listXY[index].y += th + this.trackSpacing;
        this.listXY[index].length++;
      }
      console.log("initItemXY", length, this.listXY);
    }, 50);
  }

  initRenderList(len: number) {
    // console.log("dddd", "initRenderList");
    this.renderList = [];
    for (let i = 0; i < len; i++) {
      this.renderList.push({
        height: i,
        list: [],
      });
    }

    this.list.forEach((el) => {
      // el.itemWidth = w / this.renderList.length;
      el.addTrack = false;
    });
  }

  render() {
    return (
      <div
        ref={(e) => {
          this.layoutEl = e;
          if (this.layoutWidth !== e?.offsetWidth) {
            this.layoutWidth = e?.offsetWidth || 0;
            // this.watchDomResize();
          }
        }}
        style={{
          ...["margin", "padding"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-waterfall-layout-component " + (this.loaded ? "load" : "")}
      >
        {/* {this.renderList.map((v) => {
          console.log("v.height", v.height);
          return (
            <div
              style={{
                margin: this.trackMargin,
                padding: this.trackPadding,
              }}
              data-h={v.height}
              class={"wl-item"}
            ></div>
          );
        })} */}
        <div
          style={{
            height: Math.max(...this.listXY.map((v) => v.y)) + "px",
          }}
          class={"waterfall"}
        >
          <slot></slot>
        </div>
      </div>
    );
  }
}
