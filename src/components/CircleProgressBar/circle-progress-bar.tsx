import { Component, h, Prop, Element, State } from "@stencil/core";

@Component({
  tag: "saki-circle-progress-bar",
  styleUrl: "circle-progress-bar.scss",
  shadow: false,
})
export class ChatCircleProgressBar {
  // 0~1
  @Prop() width: string = "80px";
  @Prop() barWidth: string = "8px";
  @Prop() borderWidth: string = "0px";
  @Prop() padding: string = "0px";
  @Prop() progress: number = 0;
  @Prop() animation: boolean = false;
  @Prop() animationSpend: number = 30;
  // @Prop() enableAnimation: boolean = true;
  @Prop() animationDuration: number = 2;
  @Prop() animationDelay: number = 2;
  @Prop() animationIterationCount: "infinite" | number = "infinite";
  @Prop() color: string = "var(--saki-default-color)";
  @State() el: HTMLDivElement;
  @State() leftEl: HTMLDivElement;
  @State() rightEl: HTMLDivElement;
  @Element() ele: HTMLDivElement;
  componentWillLoad() {
    // js animte
    // console.log(this.ele);
    // this.leftEl = this.ele.querySelector(".circle-l-circle");
    // this.rightEl = this.ele.querySelector(".circle-r-circle");
    // if (this.animation) {
    //   console.log(this.leftEl);
    //   console.log(this.rightEl);
    // }
  }
  render() {
    return (
      <div
        // ref={(e) => {
        //   // if (!this.el) {
        //   //   this.el = e;
        //   //   console.log(this.el);
        //   //   this.leftEl = this.el.querySelector(".circle-l-circle");
        //   //   this.rightEl = this.el.querySelector(".circle-r-circle");
        //   //   if (this.animation) {
        //   //     console.log(this.leftEl);
        //   //     console.log(this.rightEl);
        //   //   }
        //   // }
        // }}
        style={{
          ...(false
            ? {
                "--saki-circle-progress-bar-animetion-iteration-count": String(
                  this.animationIterationCount
                ),
                "--saki-circle-progress-bar-animetion-right": this.animation
                  ? `${
                      this.progress <= 0.5
                        ? "circleRightAnime"
                        : "circleRightFullAnime"
                    } linear ${this.animationDuration}s`
                  : "",
                "--saki-circle-progress-bar-animetion-right-start": "-135deg",
                "--saki-circle-progress-bar-animetion-right-end":
                  (this.progress <= 0.5
                    ? -135 + (180 / 0.5) * this.progress
                    : 45) + "deg",
                "--saki-circle-progress-bar-animetion-left": this.animation
                  ? `circleLeftFullAnime linear ${this.animationDuration}s`
                  : "",
                "--saki-circle-progress-bar-animetion-left-start": "-135deg",
                "--saki-circle-progress-bar-animetion-left-end":
                  (this.progress > 0.5
                    ? -135 + (180 / 0.5) * (this.progress - 0.5)
                    : -135) + "deg",
              }
            : {}),
          "--saki-circle-progress-bar-bar-width": this.barWidth,
          "--saki-circle-progress-bar-border-width": this.borderWidth,
          "--saki-circle-progress-bar-padding": this.padding,
          // "--saki-circle-progress-bar-border-spacing-width": "calc(var(--saki-circle-progress-bar-border-width) + "+this.borderSpacingWidth+")",
          "--saki-circle-progress-bar-width": this.width,
          "--saki-circle-progress-bar-height": this.width,
          "--saki-circle-progress-bar-wrap-width":
            "calc(" +
            this.width +
            " - " +
            this.borderWidth +
            " * 2 - " +
            this.padding +
            " * 2 )",
          "--saki-circle-progress-bar-wrap-height":
            "calc(" +
            this.width +
            " - " +
            this.borderWidth +
            " * 2 - " +
            this.padding +
            " * 2 )",
          "--saki-circle-progress-bar-color": this.color,
        }}
        class={"saki-circle-progress-bar"}
      >
        <div class={"circle-wrap"}>
          <div class={"circle-content"}>
            <slot />
          </div>
          <div class={"circle-left-bg"}>
            <div
              style={{
                transform: `rotate(${
                  this.progress > 0.5
                    ? -135 + (180 / 0.5) * (this.progress - 0.5)
                    : -135
                }deg)`,
              }}
              onAnimationEnd={(e) => {
                console.log(e, "start");
                // this.enableAnimation = false;
              }}
              class={"circle-l-circle"}
            ></div>
          </div>
          <div class={"circle-right-bg"}>
            <div
              style={{
                transform: `rotate(${
                  this.progress <= 0.5 ? -135 + (180 / 0.5) * this.progress : 45
                }deg)`,
              }}
              class={"circle-r-circle"}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
