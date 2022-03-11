import {
  Component,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  Element,
  State,
} from "@stencil/core";

// import { debounce } from "../../plugins/methods";
// import { prefix } from "../../../stencil.config";
// console.log(prefix + "-tabs");
@Component({
  tag: "saki-scroll-view",
  styleUrl: "scroll-view.scss",
  // shadow: true,
})
export class ScrollViewComponent {
  @State() observer: IntersectionObserver;
  @State() inheritData = {
    height: 0,
    el: null,
  };
  @State() scrollElHeight: number = 0;
  @State() scrollEl: HTMLElement | any;
  @State() distanceToBottom: number = 0;

  @Prop() height: string = "";
  // 保持距离底部的位置不变
  @Prop() keepDistanceToBottom: boolean = false;
  @Prop() maxHeight: string = "";
  @Prop() proportionalScroll: boolean = false;
  @Prop() mode: "Inherit" | "Custom" | "Normal" | "Auto" = "Normal";
  @Prop() scrollBar: "Default" | "Auto" = "Default";
  @Prop() offsetY: number = 0;
  @State() startScrollY: number = 0;
  @State() scrollDirection: string = "";
  @Prop() position: string = "top";
  @State() isScrollToBottom: boolean = false;
  @State() compEl: Element;
  @Element() el: Element;
  @State() scrollBottom: Element;
  //
  @Event() scrolltobottom: EventEmitter;
  @Event() scrolltotop: EventEmitter;
  @Event() distancetobottom: EventEmitter;
  @Event() mounted: EventEmitter;

  componentWillLoad() {
    // console.log("componentWillLoad");
    this.mounted.emit();
  }
  componentDidLoad() {
    // console.log("componentDidLoad");
    // setTimeout(() => {
    this.init();
    switch (this.position) {
      case "bottom":
        // console.log("bottom",this.compEl.getBoundingClientRect() ,this.compEl.scrollHeight);
        // console.log(
        //   "bottom",
        //   this.scrollBottom.getBoundingClientRect(),
        //   this.compEl.scrollHeight
        // );
        this.scrollToFunc("bottom");
        break;

      default:
        break;
    }
    // }, 100);
  }
  // 主动获取是否到最底部
  @Method()
  async getIsScrollToBottom() {
    const clientHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    return (
      this.scrollBottom.getBoundingClientRect().bottom + this.offsetY <=
      clientHeight
    );
  }
  @Method()
  async scrollToFunc(type: string) {
    // console.log("滚动到底部", type, this.mode);
    switch (type) {
      case "bottom":
        if (this.mode !== "Inherit") {
          // console.log("滚动到底部1");
          this.scrollEl.scrollTo.scrollTo(
            0,
            this.scrollEl.scrollTo.scrollHeight + 100
          );
        } else {
          // 创建一个观察器实例并传入回调函数
          let timer: any;
          const observer = new MutationObserver(() => {
            // console.log("Dom发生了变化", this.scrollEl.scrollHeight);
            clearTimeout(timer);
            timer = setTimeout(() => {
              this.scrollEl.scrollTo(
                0,
                this.scrollEl.scrollHeight - this.scrollEl.offsetHeight
              );
              setTimeout(() => {
                observer.disconnect();
              }, 300);
              clearTimeout(timer);
            }, 0);
          });

          // 以上述配置开始观察目标节点
          observer.observe(this.scrollEl, {
            attributes: true,
            childList: true,
            subtree: true,
          });
        }
        break;

      default:
        break;
    }
  }
  // scrollYToAnimaFunc(el: Element, target: number) {
  //   var y = target;
  //   var tempY = el.scrollTop;
  //   var step = 0;
  //   const dis = Math.abs(target - el.scrollTop);
  //   let tempStep = 2;
  //   console.log(dis);
  //   if (dis > 80) {
  //     tempStep = 2;
  //   }
  //   // if (dis > 150) {
  //   //   tempStep = 1.5;
  //   // }
  //   // if (dis > 300) {
  //   //   tempStep = 1;
  //   // }

  //   var timer = setInterval(() => {
  //     console.log(step);
  //     if (tempY > y) {
  //       if (Math.floor(tempY) <= y + tempStep) {
  //         el.scrollTo(0, y);
  //         clearInterval(timer);
  //       } else {
  //         step = (y - tempY) / 10 > -2 ? -2 : (y - tempY) / 10;

  //         tempY += step;
  //         el.scrollTo(0, tempY);
  //       }
  //     } else {
  //       // console.log(tempY, y, tempStep);
  //       if (Math.ceil(tempY) >= y - 2) {
  //         el.scrollTo(0, y);
  //         clearInterval(timer);
  //       } else {
  //         step = (y - tempY) / 10 < 2 ? 2 : (y - tempY) / 10;
  //         tempY += step;
  //         el.scrollTo(0, tempY);
  //       }
  //     }
  //   }, 30);
  // }
  init() {
    // console.log(this.mode);
    switch (this.mode) {
      case "Inherit":
        if (this.compEl) {
          new ResizeObserver((entries) => {
            if (entries?.length) {
              this.inheritData.height = entries[0].contentRect.height;
              this.scrollElHeight = entries[0].contentRect.height;
            }
          }).observe(this.compEl);
        }

        if (this.scrollEl) {
          new ResizeObserver(() => {
            this.keepScrollPosition();
          }).observe(this.scrollEl);

          new MutationObserver(() => {
            // console.log("Dom发生了变化", this.scrollEl.scrollHeight);
            if (this.keepDistanceToBottom) {
              // console.log(this.distanceToBottom);
              this.keepScrollPosition();
            }
          }).observe(this.scrollEl, {
            attributes: true,
            childList: true,
            subtree: true,
          });
        }
        // Start observing the target node for configured mutations
        break;
      case "Auto":
        this.getScrollHeight();
        window.removeEventListener(
          "resize",
          this.getScrollHeight.bind(this),
          !0
        );
        window.addEventListener("resize", this.getScrollHeight.bind(this), !0);

        break;
      case "Normal":
        window.removeEventListener("scroll", this.scrollEvent.bind(this), !0);
        window.addEventListener("scroll", this.scrollEvent.bind(this), !0);

        break;

      default:
        break;
    }
  }
  // 继承模式
  onScrollFunc(e: Event) {
    // console.log("滚动事件", e);
    // console.log(this.proportionalScroll);
    if (this.proportionalScroll) {
      // console.log(this.inheritData.el.scrollTop);

      !this.scrollEl && (this.scrollEl = e.target);
      // console.log(
      //   e.target["scrollTop"],
      //   this.scrollElHeight,
      //   e.target["offsetHeight"]
      // );
      // if (this.scrollElHeight !== e.target["offsetHeight"]) {
      this.distanceToBottom =
        e.target["scrollHeight"] -
        e.target["offsetHeight"] -
        e.target["scrollTop"];
      // }
      // console.log("滚动了一下！！！");
      // console.log(this.distanceToBottom);
      this.distancetobottom.emit(this.distanceToBottom);

      if (
        e.target["scrollHeight"] -
          e.target["offsetHeight"] -
          e.target["scrollTop"] ===
        0
      ) {
        this.scrolltobottom.emit();
      }
      if (e.target["scrollTop"] === 0) {
        this.scrolltotop.emit();
      }
    }
  }
  // 滚动El还没来得及更新就设置了就会出现偏差
  // 通过监听滚动El ResizeObserver来解决
  keepScrollPosition() {
    // console.log('keepScrollPosition')
    if (this.proportionalScroll) {
      switch (this.mode) {
        case "Inherit":
          this.scrollEl.scrollTo(
            0,
            this.scrollEl.scrollHeight -
              this.scrollElHeight -
              this.distanceToBottom
          );

          break;
      }
    }
  }
  getScrollHeight() {
    const clientHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    // console.log(this.el, this.el.clientHeight);
    // console.log(this.el.getBoundingClientRect());
    // console.log(clientHeight, this.el.getBoundingClientRect(), this.maxHeight);

    // console.log(
    //   this.scrollBottom.getBoundingClientRect().bottom + this.offsetY <=
    //     clientHeight
    // );
    // console.log(this.el.getBoundingClientRect());
    // console.log((clientHeight - this.el.getBoundingClientRect().top) / 1);
    // console.log(this.compEl);
    // console.log("line 103", this.compEl.getBoundingClientRect());
    if (this.compEl.getBoundingClientRect().top) {
      this.maxHeight =
        (clientHeight - this.compEl.getBoundingClientRect().top) / 1 + "px";
    }
    // console.log(this.maxHeight);
    if (
      this.scrollBottom.getBoundingClientRect().bottom + this.offsetY <=
      clientHeight
    ) {
      // this.scrolltobottom.emit();
    }
    // if(this.bottom)
  }
  // 普通模式
  scrollEvent() {
    const clientHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    // console.log(
    //   this.scrollBottom.getBoundingClientRect(),
    //   this.offsetY,
    //   clientHeight
    // );
    if (this.scrollDirection === "top") {
      this.isScrollToBottom = false;
    }
    if (
      this.scrollBottom.getBoundingClientRect().bottom + this.offsetY <=
      clientHeight
    ) {
      // 满足
      // console.log("bottom");
      if (!this.isScrollToBottom) {
        if (this.scrollDirection === "bottom") {
          this.scrolltobottom.emit();
          this.isScrollToBottom = true;
        }
      }
    }
  }
  render() {
    return (
      <div
        ref={(e) => {
          !this.compEl && e && (this.compEl = e);
        }}
        onScroll={() => {
          // console.log(this.el.scrollTop);
          // console.log(this.startScrollY - this.el.scrollTop);
          if (this.startScrollY - this.compEl.scrollTop < 0) {
            this.scrollDirection = "bottom";
          } else {
            this.scrollDirection = "top";
          }
          switch (this.mode) {
            case "Auto":
              this.scrollEvent.call(this);
              break;
            case "Custom":
              this.scrollEvent.call(this);
              break;

            default:
              break;
          }

          this.startScrollY = this.compEl.scrollTop;
        }}
        style={{
          ...["height", "maxHeight"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={
          "saki-scroll-view-component " +
          this.mode +
          " scrollBar" +
          this.scrollBar
        }
      >
        {this.mode === "Inherit" ? (
          <div
            ref={(e) => {
              if (this.mode === "Inherit") {
                e && (this.scrollEl = e);
                e && (this.inheritData.el = e);
              }
            }}
            onScroll={this.onScrollFunc.bind(this)}
            style={{
              height: this.inheritData.height
                ? this.inheritData.height + "px"
                : "100%",
            }}
            class={"view-inherit " + " scrollBar" + this.scrollBar}
          >
            <slot></slot>
          </div>
        ) : (
          <slot></slot>
        )}

        <div
          ref={(e) => {
            !this.scrollBottom && e && (this.scrollBottom = e);
          }}
          class="scroll-bottom"
        ></div>
      </div>
    );
  }
}
