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
import { Debounce } from "@nyanyajs/utils/dist/debounce";

@Component({
  tag: "saki-slider",
  styleUrl: "slider.scss",
  shadow: true,
})
export class SliderComponent {
  d = new Debounce();
  valuesD = new Debounce();
  observer: IntersectionObserver;

  // x,x,x
  @Prop() value: string = "";
  // x,x,x
  @Prop() trackColor: string = "";
  @Prop() bgColor: string = "#eee";
  @Prop() bgHoverColor: string = "#ddd";
  @Prop() toolTip: boolean = false;
  // 0:x,30:x,40:x (预留
  @Prop() marks: string = "";

  // 最大值和最小值的范围;
  @Prop() min: number = 0;
  @Prop() max: number = 20;

  @Prop() disabled: boolean = false;

  // 轨道宽度
  @Prop() width: string = "200px";
  // 轨道最大宽度
  @Prop() maxWidth: string = "200px";
  // 轨道高度
  @Prop() height: string = "20px";
  @Prop() padding: string = "";
  @Prop() margin: string = "";
  @Prop() border: string = "";
  @Prop() borderRadius: string = "10px";

  @State() values: number[] = [];
  @State() trackColors: string[] = [];
  @State() tracks: {
    value: number;
    width: string;
    left: string;
    color: string;
  }[] = [];
  @State() handle: {
    top: string;
    left: string;
    width: string;
    height: string;
  }[] = [];

  @State() click = false;
  @State() activeHandleIndex = -1;
  @State() newValues: number[] = [];

  @State() rEl: HTMLElement;
  @Element() el: HTMLElement;

  @Event() changevalue: EventEmitter;

  @Watch("value")
  watchValueFunc() {
    this.values = this.value
      .split(";")
      .map((v) => Number(v))
      .sort((a, b) => a - b);
    this.initTrack();
  }
  @Watch("trackColor")
  watchTrackColorsFunc() {
    this.trackColors = this.trackColor.split(";");
    this.initTrack();
  }

  componentWillLoad() {}
  componentDidLoad() {
    this.values = this.value
      .split(";")
      .map((v) => Number(v))
      .sort((a, b) => a - b);
    this.trackColors = this.trackColor.split(";");
    // this.markList = this.marks.split(",");

    // console.log(this.marks);
    this.initTrack();

    this.bindBodyEvent();

    // console.log("this.el 发生了变化", this.el);
    // new MutationObserver((e) => {
    //   console.log("MutationObserver 发生了变化", e);
    // }).observe(this.el, {
    //   attributes: true,
    //   childList: true,
    //   subtree: true,
    // });
  }

  bindBodyEvent() {
    document.body.removeEventListener(
      "mousemove",
      this.mouseMoveEvent.bind(this)
    );
    window.removeEventListener("mouseup", this.mouseUpEvent.bind(this));

    document.body.removeEventListener(
      "touchmove",
      this.touchMoveEvent.bind(this)
    );
    window.removeEventListener("touchend", this.mouseUpEvent.bind(this));

    document.body.addEventListener("mousemove", this.mouseMoveEvent.bind(this));

    window.addEventListener("mouseup", this.mouseUpEvent.bind(this));

    document.body.addEventListener("touchmove", this.touchMoveEvent.bind(this));
    window.addEventListener("touchend", this.mouseUpEvent.bind(this));
  }
  touchMoveEvent(e: TouchEvent) {
    var touch = e.targetTouches[0];
    if (this.click) {
      this.newRailClick({
        x: touch.pageX,
      });
    }
  }
  mouseMoveEvent(e: MouseEvent) {
    if (this.click) {
      this.newRailClick({
        x: e.x,
      });
    }
  }

  mouseUpEvent() {
    // console.log("onmouseup click", e.x);
    this.click = false;
    this.activeHandleIndex = -1;
  }

  initTrack() {
    const f = () => {
      this.observer?.unobserve(this.rEl);
      this.observer?.disconnect();

      const rRect = this.rEl.getBoundingClientRect();
      // console.log("rRect", rRect, this.rEl.offsetLeft);

      if (!rRect?.width) {
        this.observer = new IntersectionObserver(() => {
          // console.log("rRect", rRect, this.rEl.offsetLeft);
          if (this.rEl.getBoundingClientRect()?.width) {
            this.initTrack();
            this.observer?.unobserve(this.rEl);
            this.observer?.disconnect();
          }
        });
        this.observer.observe(this.rEl);
        return;
      }

      this.tracks = [];
      this.handle = [];
      const rW = rRect.width;
      const w = rW / (this.max - this.min);

      const handleWidth = rRect.height * 1.6;

      // console.log("initTrack", rW, w);
      this.values.forEach((v, i) => {
        if (i < this.values.length - 1) {
          const nextV = this.values[i + 1];
          // console.log(v, nextV);
          this.tracks.push({
            value: v,
            width: w * (nextV - v) + "px",
            left: (v - this.min) * w + "px",
            color: this.trackColors[i],
          });
        }
        this.handle.push({
          top: -((handleWidth - rRect.height) / 2) + "px",
          left: (v - this.min) * w - handleWidth / 2 + "px",
          width: handleWidth + "px",
          height: handleWidth + "px",
        });
      });
      // console.log(this.tracks);
      // console.log("slider", this.handle);
      // console.log("slider", this.values, this.value);
    };

    if (this.click) {
      f();
      return;
    }

    this.d.increase(() => {
      f();
    }, 10);
  }

  dragStartEvent(el: HTMLElement, page: { x: number }) {
    // console.log(el.className, e.target);
    if (
      el.className === "s-track" ||
      el.className === "s-rail" ||
      el.className === "s-mark" ||
      el.className === "s-handle"
    ) {
      this.click = true;
      this.newRailClick({
        x: page.x,
      });
    }
  }

  newRailClick(e: { x: number }) {
    const rRect = this.rEl.getBoundingClientRect();

    const percent = (e.x - rRect.x) / rRect.width;
    // console.log(percent);
    console.log(
      "onmousemove ",
      this.rEl,
      this.rEl.getBoundingClientRect(),
      this.rEl.getBoundingClientRect().x,
      e.x,
      this.rEl.offsetLeft,
      this.rEl.offsetWidth,
      percent
    );
    // let v = Math.round(this.max * percent) ;
    let v = Math.round((this.max - this.min) * percent) + this.min;

    // console.log("railClick", v);
    if (v < this.min) {
      v = this.min;
    } else if (v > this.max) {
      v = this.max;
    }
    // console.log("railClick", v);

    // 最大
    if (this.activeHandleIndex < 0) {
      if (v > this.values[this.values.length - 1]) {
        this.activeHandleIndex = this.values.length - 1;
      } else if (v < this.values[0]) {
        this.activeHandleIndex = 0;
      } else {
        this.values.some((sv, si) => {
          if (si < this.values.length - 1) {
            const nextSv = this.values[si + 1];
            if (v > nextSv) {
              return false;
            }
            const half = sv + (nextSv - sv) / 2;
            if (v <= half) {
              this.activeHandleIndex = si;
            } else {
              this.activeHandleIndex = si + 1;
            }
            return true;
          }
        });
      }

      this.newValues = this.values.filter((_, i) => {
        return i !== this.activeHandleIndex;
      });
    }

    this.values = this.newValues.concat(v);

    this.values.sort((a, b) => a - b);
    this.valuesD.increase(() => {
      this.changevalue.emit(this.values);
    }, 10);
    // console.log(this.activeHandleIndex, this.values);

    this.initTrack();
  }

  render() {
    return (
      <div
        style={{
          ...["maxWidth", "width", "height", "padding", "margin"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          "--height": this.height,
          "--bg-color": this.bgColor,
          "--bg-hover-color": this.bgHoverColor,
          "--border-radius": this.borderRadius,
          "--border": this.border,
        }}
        class={"saki-slider-component "}
      >
        <div
          onMouseDown={(e) => {
            // console.log(e.target);
            this.dragStartEvent(e.target as HTMLElement, {
              x: e.x,
            });
          }}
          onTouchStart={(e) => {
            var touch = e.targetTouches[0];
            this.dragStartEvent(e.target as HTMLElement, {
              x: touch.pageX,
            });
            // this.dragStartEvent(e);
          }}
          // onMouseMove={(e) => {
          //   if (this.click) {
          //     this.railClick({
          //       x: e.x,
          //     });
          //   }
          // }}
          onMouseUp={this.mouseUpEvent.bind(this)}
          onTouchEnd={this.mouseUpEvent.bind(this)}
          class={"s-rail"}
          style={{
            ...["maxWidth", "width", "height", "padding", "margin"].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
            "--height": this.height,
            "--bg-color": this.bgColor,
            "--bg-hover-color": this.bgHoverColor,
            "--border-radius": this.borderRadius,
            "--border": this.border,
          }}
          ref={(e) => {
            this.rEl = e;
          }}
        >
          {this.marks.split(";").map((v, i) => {
            const rRect = this.rEl?.getBoundingClientRect();
            if (!rRect) return "";
            const rW = rRect.width || 0;
            const rH = rRect.height || 0;

            const mark = JSON.parse(v);

            const val = mark.val;
            const text = mark.text;
            const style = mark.style || {};

            const w = rW / (this.max - this.min);
            const handleWidth = rH * 1;

            const left = (val - this.min) * w - handleWidth / 2;
            // console.log("rw", rW, val, left);
            return (
              <div
                class={"s-mark"}
                key={i}
                style={{
                  top: -((handleWidth - rH) / 2) + "px",
                  left: left + "px",
                  width: handleWidth + "px",
                  height: handleWidth + "px",
                }}
                onClick={() => {
                  this.newRailClick({
                    x: (val - this.min) * w + rRect.left,
                  });
                }}
              >
                {text ? (
                  <div
                    class={"s-m-text"}
                    style={{
                      top: rH + 10 + "px",
                      ...style,
                    }}
                  >
                    {text}
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
          {this.tracks.map((v, i) => {
            return (
              <div
                key={i}
                style={{
                  width: v.width,
                  ...(v.color.indexOf("gradient") >= 0
                    ? {
                        background: v.color,
                      }
                    : {
                        backgroundColor: v.color,
                      }),
                  height: this.height,
                  left: v.left,
                }}
                class={"s-track"}
              ></div>
            );
          })}

          {this.handle.map((v, i) => {
            const rRect = this.rEl?.getBoundingClientRect();
            if (!rRect) return "";
            const rH = rRect.height || 0;
            return (
              <div
                class={
                  "s-handle " + (this.activeHandleIndex === i ? "active" : "")
                }
                key={i}
                style={{
                  top: v.top,
                  left: v.left,
                  width: v.width,
                  height: v.height,
                }}
              >
                {this.toolTip ? (
                  <div
                    style={{
                      top: -(rH + 32) + "px",
                    }}
                    class={"s-h-toolTip "}
                  >
                    {this.values[i]}
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // railClick(e: { x: number }) {
  //   const percent = (e.x - this.rEl.offsetLeft) / this.rEl.offsetWidth;
  //   console.log(percent);
  //   // let v = Math.round(this.max * percent) ;
  //   let v = Math.round((this.max - this.min) * percent) + this.min;

  //   console.log("railClick", v);
  //   if (v < this.min) {
  //     v = this.min;
  //   } else if (v > this.max) {
  //     v = this.max;
  //   }
  //   console.log("railClick", v);

  //   // 最大
  //   if (v > this.values[this.values.length - 1]) {
  //     this.values[this.values.length - 1] = v;
  //   } else if (v < this.values[0]) {
  //     this.values[0] = v;
  //   } else {
  //     this.values.some((sv, si) => {
  //       if (si < this.values.length - 1) {
  //         const nextSv = this.values[si + 1];

  //         // console.log(sv, nextSv);
  //         if (v > nextSv) {
  //           return false;
  //         }

  //         const half = sv + (nextSv - sv) / 2;
  //         console.log("half", half, v, sv, nextSv, si);
  //         if (v <= half) {
  //           this.values[si] = v;
  //         } else {
  //           this.values[si + 1] = v;
  //         }
  //         return true;
  //       }
  //     });
  //   }
  //   this.initTrack();
  // }
}
