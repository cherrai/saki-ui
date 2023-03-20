import {
  Component,
  State,
  h,
  Event,
  EventEmitter,
  Prop,
  Watch,
  Element,
} from "@stencil/core";

// 暂时弃用
@Component({
  tag: "saki-table-header",
  styleUrl: "table.scss",
  shadow: true,
})
export class TableHeaderComponent {
  @State() dragIndex = -1;
  @State() dragStartX = -1;
  @State() dragWidth = 0;
  @Prop() value: boolean = false;
  @Prop() border: string = "";
  @Prop() borderBottom: string = "";
  @Prop() borderTop: string = "";
  @Prop() borderRight: string = "";
  @Prop() borderLeft: string = "";
  @Prop() width: string = "44px";
  @Prop() height: string = "40px";
  @Prop() padding: string = "0px";
  @Prop() margin: string = "0px";
  @Prop() coreWidth: string = "18px";
  @State() timer?: NodeJS.Timeout;
  @State() hide: boolean = true;
  @State() list: HTMLSakiTableHeaderItemElement[] = [];
  @Element() el: HTMLElement;
  @Event() change: EventEmitter;
  @Event() changesize: EventEmitter;
  @Watch("value")
  watchVisible() {}
  componentDidLoad() {
    // this.list =  as any;
    // console.log("elelelel", this.list);
    // this.watchList();
    // this.watchEl();
    // new MutationObserver(() => {
    //   this.watchList();
    // }).observe(this.el, {
    //   attributes: false,
    //   childList: true,
    //   subtree: false,
    // });
    // window.addEventListener("resize", () => {
    //   this.watchEl();
    //   console.log("tww", this.el.offsetWidth);
    // });
    // window.addEventListener("mousemove", (e) => {
    //   if (this.dragIndex >= 0) {
    //     document.body.style.cursor = "ew-resize";
    //     document.body.style.userSelect = "none";
    //     this.list[this.dragIndex].setWidth(
    //       String(this.dragWidth + e.x - this.dragStartX) + "px"
    //     );
    //   }
    // });
    // window.addEventListener("mouseup", (e) => {
    //   if (this.dragIndex >= 0) {
    //     document.body.style.cursor = "";
    //     this.list[this.dragIndex].setWidth(
    //       String(this.dragWidth + e.x - this.dragStartX) + "px"
    //     );
    //     this.list[this.dragIndex].isResize = true;
    //     document.body.style.userSelect = "";
    //     this.list[this.dragIndex].startDrag = false;
    //     this.dragIndex = -1;
    //   }
    // });
  }

  // dragEvent(e: any) {
  //   console.log(e);
  //   this.dragStartX = e.detail.x;
  //   this.dragIndex = e.detail.index;
  //   this.dragWidth = Number(e.detail.width.replace("px", ""));
  // }
  watchList() {
    this.list = [];
    this.el.querySelectorAll("saki-table-header-item").forEach((v) => {
      this.list.push(v);
    });

    // this.list.forEach((v, i) => {
    //   v.index = i;
    //   v.removeEventListener("drag", this.dragEvent.bind(this));
    //   v.addEventListener("drag", this.dragEvent.bind(this));
    // });
  }

  watchEl() {
    console.log("this.el.offsetWidth", this.el.offsetWidth);

    if (!this.list.length) {
      return;
    }
    let tw = 0;
    // let otw = 0;
    let autoTotal = 0;
    // let oautoTotal = 0;
    this.list.forEach((v) => {
      v.height = this.height;
      // console.log(v.tempWidth);
      // if (v.width.indexOf("px") < 0) {
      //   oautoTotal++;
      // }
      // if (v.isResize) {
      //   tw += Number(v.tempWidth.replace("px", ""));

      //   return;
      // }
      if (v.width.indexOf("px") >= 0) {
        tw += Number(v.width.replace("px", ""));
        // otw += Number(v.tempWidth.replace("px", ""));
      } else {
        autoTotal++;
      }
    });
    let aw = String((this.el.offsetWidth - tw) / (autoTotal || 1)) + "px";

    // if (this.el.offsetWidth <= tw) {
    //   aw = String((this.el.offsetWidth - otw) / (oautoTotal || 1)) + "px";
    // }
    console.log("tww", aw, this.el.offsetWidth, tw, autoTotal);
    let changesizeObj = {};
    this.list.forEach((v) => {
      if (v.width.indexOf("px") < 0) {
        v.setWidth(aw);
      }
      changesizeObj[v.prop] = v.tempWidth;
    });
    this.changesize.emit(changesizeObj);
  }
  render() {
    return (
      <div
        style={{
          height: this.height,
          ...[
            "margin",
            "padding",
            "border",
            "borderTop",
            "borderBottom",
            "borderRight",
            "borderLeft",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-table-header-component "}
      >
        {/* <div class={"sth-wrap"}> */}
        <slot></slot>
        {/* </div> */}
      </div>
    );
  }
}
