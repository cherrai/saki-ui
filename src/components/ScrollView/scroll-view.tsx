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
// //console.log(prefix + "-tabs");
import { Debounce } from "@nyanyajs/utils/dist/debounce";

@Component({
  tag: "saki-scroll-view",
  styleUrl: "scroll-view.scss",
  shadow: false,
})
export class ScrollViewComponent {
  debounce = new Debounce();
  scrollToDebounce = new Debounce();
  observer: IntersectionObserver;
  @State() inheritData = {
    height: 0,
    el: null,
  };
  @State() scrollElHeight: number = 0;
  scrollEl: HTMLElement | any;

  @State() distanceToBorder: {
    top: number;
    bottom: number;
  } = {
    top: 0,
    bottom: 0,
  };

  @Prop() height: string = "";
  // 保持距离底部的位置不变
  @Prop() keepScrollPosition: boolean = false;
  @Prop({
    mutable: true,
  })
  maxHeight: string = "";

  scrollToY: number = -1;

  // Inherit 继承上一级的宽高
  @Prop() mode: "Inherit" | "Custom" | "Normal" | "Auto" = "Normal";

  @Prop() scrollBar: "Default" | "Auto" = "Default";

  // 距离底部的偏移量
  @Prop() offsetY: number = 0;
  @State() startScrollY: number = 0;
  @State() scrollDirection: string = "";

  // 位置 Top/Bottom
  @Prop() position: "Top" | "Bottom" = "Top";
  // 是否保持位置不变。如聊天记录，发生了dom变化自动到底部
  // @Prop() keepPosition: boolean = false;

  @State() isScrollToBottom: boolean = false;
  compEl: Element;
  @Element() el: Element;
  scrollBottom: Element;
  keepScrollPositionTimer: NodeJS.Timeout;
  disableSetScrollData = false;
  //
  @Event() scrolltobottom: EventEmitter;
  @Event() scrolltotop: EventEmitter;
  @Event() distancetoborder: EventEmitter<typeof this.distanceToBorder>;
  @Event() watchscrollto: EventEmitter;
  @Event() mounted: EventEmitter;

  scrollToObserverTimer: NodeJS.Timeout;
  scrollToMutationObserverTimer: NodeJS.Timeout;

  componentWillLoad() {
    // //console.log("componentWillLoad");
    this.mounted.emit();
  }
  componentDidLoad() {
    // //console.log("componentDidLoad");
    // setTimeout(() => {
    this.init();
    switch (this.position) {
      case "Top":
        break;
      case "Bottom":
        //console.log("componentDidLoad bottom");
        // //console.log(
        //   "bottom",
        //   this.scrollBottom.getBoundingClientRect(),
        //   this.compEl.scrollHeight
        // );
        this.scrollTo("bottom");
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

  // watchTimeout -> 监听dom多久
  @Method()
  async scrollTo(v: string, options?: { watchTimeout: number }) {
    console.log("滚动到 =>", v, this.mode);
    switch (v) {
      case "top":
        switch (this.mode) {
          case "Custom":
            this.el
              ?.querySelector(".saki-scroll-view-component")
              ?.scrollTo(0, 0);
            break;

          default:
            break;
        }
        break;
      case "bottom":
        if (this.mode !== "Inherit") {
          // //console.log("滚动到底部1");
          this.scrollEl.scrollTo(0, this.scrollEl.scrollHeight + 100);
        } else {
          // 创建一个观察器实例并传入回调函数
          this.scrollEl.scrollTo(
            0,
            this.scrollEl.scrollHeight - this.scrollEl.offsetHeight
          );

          // let disconnecttimer: any;
          // console.log("开始监听", this.scrollEl);
          const observer = new MutationObserver(() => {
            // console.log("Dom发生了变化", this.scrollEl.scrollHeight);
            clearTimeout(this.scrollToMutationObserverTimer);
            // clearTimeout(disconnecttimer);
            this.scrollToMutationObserverTimer = setTimeout(() => {
              // console.log("开始滚动到底部");
              this.scrollEl.scrollTo(
                0,
                this.scrollEl.scrollHeight - this.scrollEl.offsetHeight
              );
              // clearTimeout(disconnecttimer);
              // disconnecttimer = setTimeout(() => {
              //   observer.disconnect();
              this.watchscrollto.emit(v);
              // }, 300);
              clearTimeout(this.scrollToMutationObserverTimer);
            }, 0);
          });

          clearTimeout(this.scrollToObserverTimer);
          this.scrollToObserverTimer = setTimeout(() => {
            observer.disconnect();
          }, options?.watchTimeout || 500);

          // 以上述配置开始观察目标节点
          observer.observe(this.scrollEl, {
            attributes: true,
            childList: true,
            subtree: true,
          });
        }
        break;

      default:
        this.scrollEl.scrollTo(0, v);
        this.scrollToY = Number(v);
        this.scrollToDebounce.increase(() => {
          // console.log("获取一下", this.distanceToBorder);
          if (Math.abs(Number(v) - this.distanceToBorder.top) >= 2) {
            console.log("超出了距离", this.distanceToBorder);
            this.scrollEl.scrollTo(0, v);
          }
        }, 50);

        break;
    }
  }
  // scrollYToAnimaFunc(el: Element, target: number) {
  //   var y = target;
  //   var tempY = el.scrollTop;
  //   var step = 0;
  //   const dis = Math.abs(target - el.scrollTop);
  //   let tempStep = 2;
  //   //console.log(dis);
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
  //     //console.log(step);
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
  //       // //console.log(tempY, y, tempStep);
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
    // //console.log(this.mode);
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
          if (this.keepScrollPosition) {
            new ResizeObserver(() => {
              // console.log("ResizeObserver 发生了变化", this.scrollEl);
              this.keepScrollPositionFunc({});
            }).observe(this.scrollEl);

            // 渲染的时候务须调整位置，让用户自己主动
            new MutationObserver(() => {
              // console.log("MutationObserver 发生了变化", e, this.scrollEl);
              // console.log(this.scrollEl.scrollHeight);
              // //console.log(this.distanceToBottom);

              this.keepScrollPositionFunc({});
            }).observe(this.scrollEl, {
              attributes: true,
              childList: true,
              subtree: true,
            });
          }
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

        new ResizeObserver(() => {
          this.getScrollHeight();
        }).observe(this.compEl);

        // 渲染的时候务须调整位置，让用户自己主动
        new MutationObserver(() => {
          this.getScrollHeight();
        }).observe(this.compEl, {
          attributes: true,
          childList: true,
          subtree: true,
        });
        // new ResizeObserver(() => {
        //   this.getScrollHeight();
        // }).observe(this.compEl);

        // // 渲染的时候务须调整位置，让用户自己主动
        // new MutationObserver(() => {
        //   this.getScrollHeight();
        // }).observe(this.compEl, {
        //   attributes: false,
        //   childList: true,
        //   subtree: true,
        // });
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
  onScrollFunc() {
    if (this.disableSetScrollData) return;
    // console.log("滚动事件", this.distanceToBorder.bottom);
    // //console.log(this.proportionalScroll);

    // 当有新的dom内容的时候，保持之前的滚动距离
    if (this.keepScrollPosition) {
      if (this.scrollToY >= 0) {
        this.scrollEl.scrollTo(0, this.scrollToY);
        this.scrollToY = -1;
      }
    }
    this.distanceToBorder.bottom =
      this.scrollEl["scrollHeight"] -
      this.scrollEl["offsetHeight"] -
      this.scrollEl["scrollTop"];
    this.distanceToBorder.top = this.scrollEl["scrollTop"];
    // }
    // console.log("滚动了一下！！！", this.distanceToBorder);
    // console.log(this.distanceToBottom);

    // console.log(
    //   this.scrollEl.scrollHeight,
    //   this.scrollElHeight,
    //   this.distanceToBottom
    // );
    // this.distanceToBottom
    // console.log(this.distancetoborder);
    this.distancetoborder.emit(this.distanceToBorder);
    if (this.distanceToBorder.bottom === 0) {
      this.scrolltobottom.emit();
    }
    if (this.scrollEl["scrollTop"] === 0) {
      this.scrolltotop.emit();
    }
  }
  // 滚动El还没来得及更新就设置了就会出现偏差
  // 通过监听滚动El ResizeObserver来解决
  @Method()
  async keepScrollPositionFunc({ oldHeight }: { oldHeight?: number }) {
    this.disableSetScrollData = true;
    !oldHeight && (oldHeight = this.scrollEl.scrollHeight);

    if (this.keepScrollPosition) {
      switch (this.mode) {
        case "Inherit":
          // console.log("keepScrollPosition");

          // 保持一致滚动在底部
          // if (this.keepDistanceToBottom) {
          // if (this.keepScrollPositionTimer) {
          //   clearTimeout(this.keepScrollPositionTimer);
          // }
          // this.keepScrollPositionTimer = setTimeout(() => {

          // }, 0);
          this.scrollToY =
            this.scrollEl.scrollHeight -
            this.scrollElHeight -
            this.distanceToBorder.bottom;
          this.scrollToY <= 0 && (this.scrollToY = 0);
          this.scrollEl.scrollTo(0, this.scrollToY);
          // }

          break;
      }
    }
    this.debounce.increase(() => {
      // setTimeout(() => {
      // console.log(
      //   "oldHeight",
      //   oldHeight,
      //   this.scrollEl,
      //   this.scrollEl.scrollHeight
      // );
      if (oldHeight !== this.scrollEl.scrollHeight) {
        this.keepScrollPositionFunc({
          oldHeight: this.scrollEl.scrollHeight,
        });
      } else {
        this.disableSetScrollData = false;
      }
      // });
    }, 50);
  }
  getScrollHeight() {
    const clientHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    // //console.log(this.el, this.el.clientHeight);
    // //console.log(this.el.getBoundingClientRect());
    // //console.log(clientHeight, this.el.getBoundingClientRect(), this.maxHeight);

    // //console.log(
    //   this.scrollBottom.getBoundingClientRect().bottom + this.offsetY <=
    //     clientHeight
    // );
    // //console.log(this.el.getBoundingClientRect());
    // //console.log((clientHeight - this.el.getBoundingClientRect().top) / 1);
    // //console.log(this.compEl);
    // console.log("line 103", this.compEl.getBoundingClientRect());
    if (this.compEl.getBoundingClientRect().top) {
      this.maxHeight =
        (clientHeight - this.compEl.getBoundingClientRect().top) / 1 + "px";
    }
    // //console.log(this.maxHeight);
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

    // //console.log(
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
      // //console.log("bottom");
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
          this.compEl = e;
        }}
        onScroll={() => {
          // //console.log(this.el.scrollTop);
          // //console.log(this.startScrollY - this.el.scrollTop);
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
              this.scrollEl = e;
              this.inheritData.el = e;
              !this.scrollEl && this.onScrollFunc();
            }}
            onScroll={() => {
              this.onScrollFunc();
            }}
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
            this.scrollBottom = e;
          }}
          class="scroll-bottom"
        ></div>
      </div>
    );
  }
}
