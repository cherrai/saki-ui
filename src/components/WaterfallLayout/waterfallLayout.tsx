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
  shadow: false,
})
export class WaterfallLayoutComponent {
  d = new Debounce();
  imgEl: HTMLElement;
  observer: MutationObserver;
  resizeObserver: ResizeObserver;

  list: HTMLSakiWaterfallLayoutItemElement[] = [];

  @State() layoutItemWidth = 0;
  @State() toDisplayArea: boolean = false;
  @State() loaded: boolean = false;
  @Prop() margin: string = "0 0 50px 0";
  // @Prop() padding: string = "0 0";
  @Prop() trackMargin: string = "";
  @Prop() trackPadding: string = "0 5px";
  @Prop() trackSpacing: number = 10;
  @Prop() columnLength = 0;

  @State() renderList: {
    height: number;
    list: HTMLSakiWaterfallLayoutItemElement[];
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
    this.initRenderList(3);

    setTimeout(() => {
      this.watchDom();

      this.bindEvent();
      // window.addEventListener("resize", () => {
      //   this.watchDomResize();
      // });
    }, 300);
  }

  @Method()
  watchDom() {
    this.d.increase(() => {
      const list = this.el?.querySelectorAll(
        "saki-waterfall-layout-item"
      ) as NodeListOf<HTMLSakiWaterfallLayoutItemElement>;

      // console.log("wlist111", list);

      list.forEach((v) => {
        // !v.show && this.addItem(v);

        // console.log("wlist111", v.added);
        if (!v.added) {
          v.added = true;
          this.list.push(v);
        }
      });
      // console.log("wlist111", this.list, list, this.renderList);
      this.initList();
    }, 100);
  }

  bindEvent() {
    this.observer?.disconnect();
    this.resizeObserver?.disconnect();

    setTimeout(() => {
      this.watchDomResize();
    }, 300);

    this.observer = new MutationObserver(this.watchDom.bind(this));
    this.observer.observe(this.el, {
      attributes: false,
      childList: true,
      subtree: false,
    });

    let lastWidth = null;
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        if (width !== lastWidth) {
          console.log(`Width changed to: ${width}`);
          lastWidth = width;

          setTimeout(() => {
            this.watchDomResize();
          }, 300);
          // 执行宽度相关逻辑
        }
      }
    });

    this.resizeObserver.observe(
      document.body.querySelector(".saki-waterfall-layout-component")
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
    const layoutEl: HTMLDivElement = this.el.querySelector(
      ".saki-waterfall-layout-component"
    );

    const w = layoutEl.offsetWidth;

    const list = this.el?.querySelectorAll(
      "saki-waterfall-layout-item"
    ) as NodeListOf<HTMLSakiWaterfallLayoutItemElement>;

    list.forEach((el) => {
      el.itemWidth = w / this.renderList.length - this.trackSpacing;
    });

    let length = this.getColumnLength(w);
    // console.log(
    //   "this.renderList.length wla ",
    //   list,
    //   w,
    //   length,
    //   this.renderList.length,
    //   w / this.renderList.length - this.trackSpacing
    // );

    if (length !== this.renderList.length || b) {
      this.initRenderList(length);

      setTimeout(() => {
        this.initList();
      }, 300);
    }
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

  initList() {
    // console.log("dddd", "initList");
    this.list.forEach((v) => {
      // console.log("dddd", v.addTrack);

      !v.addTrack && this.addItem(v);
    });
  }

  addItem(el: HTMLSakiWaterfallLayoutItemElement) {
    // console.log("wlist", el);

    let index = 0;
    // let h = 100000;

    let hObj: Record<number, number> = {};

    this.renderList.forEach((v, i) => {
      hObj[v.height] = i;
      // if (h > v.height) {
      //   index = i;
      //   h = v.height;
      // }
    });

    index = hObj[Math.min(...Object.keys(hObj).map((v) => Number(v)))];

    const items: NodeListOf<HTMLDivElement> =
      this.el.querySelectorAll(".wl-item");
    const itemEl = items.item(index);

    const w = itemEl.offsetWidth;
    // const tw = w - 10;
    const th = Math.max(160, ((w - 10) * el.height) / el.width || 0);

    // console.log(
    //   "v.height 111 wla",
    //   hObj,
    //   w,
    //   el.width,
    //   el.height,
    //   th,
    //   index,
    //   this.renderList[index].height,
    //   el,
    //   this.trackSpacing,
    //   el.itemWidth
    // );
    this.renderList[index].height += th;
    this.renderList[index].list.push(el);

    // console.log("wlist", items, itemEl, el, index);

    el.show = true;
    el.addTrack = true;

    el.itemWidth =
      this.el.offsetWidth / this.renderList.length - this.trackSpacing;

    // el.itemWidth = w - this.trackSpacing;

    itemEl.appendChild(el as any);
  }

  render() {
    return (
      <div
        style={{
          ...["margin", "padding"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-waterfall-layout-component " + (this.loaded ? "load" : "")}
      >
        {this.renderList.map((v) => {
          console.log("v.height", v.height);
          return (
            <div
              // style={{
              //   width: `calc(100% - ${this.renderList.length})`,
              // }}
              style={{
                margin: this.trackMargin,
                padding: this.trackPadding,
              }}
              data-h={v.height}
              class={"wl-item"}
            >
              {/* {v.list.map((v) => {
                return v;
              })} */}
            </div>
          );
        })}
        {/* <div class={"waterfall"}>
          <slot></slot>
        </div> */}
      </div>
    );
  }
}
