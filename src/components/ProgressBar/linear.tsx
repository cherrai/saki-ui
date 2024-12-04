import { Component, h, Prop, EventEmitter, Event } from "@stencil/core";

@Component({
  tag: "saki-linear-progress-bar",
  styleUrl: "progress-bar.scss",
  shadow: false,
})
export class LinearProgressBarComponent {
  @Prop() width: string = "80px";
  @Prop() maxWidth: string = "";
  @Prop() minWidth: string = "";
  @Prop() height: string = "0px";
  @Prop() borderRadius: string = "0px";
  @Prop() progress: number = 0;
  @Prop() trackColor: string = "#eee";
  @Prop() color: string = "var(--saki-default-color)";
  @Prop() transition: string = "width 0.5s linear 0s";
  @Event() loaded: EventEmitter;
  @Event() jump: EventEmitter;
  @Event() transitionEnd: EventEmitter;
  componentDidLoad() {
    this.loaded.emit();
  }
  getMainEl(el: HTMLElement) {
    if (el.className != "saki-linear-progress-bar") {
      return this.getMainEl(el.parentElement);
    }
    return el;
  }
  render() {
    return (
      <div
        style={{
          ...["height", "maxWidth", "minWidth", "width", "borderRadius"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          backgroundColor: this.trackColor,
          "--saki-circle-progress-bar-color": this.color,
        }}
        onClick={(e) => {
          let el = this.getMainEl(e.target as HTMLElement);

          this.jump.emit(
            (e.x - el.getBoundingClientRect().left) / el.clientWidth
          );
          // console.log(e, el, el.clientWidth);
          // console.log(
          //   (e.x - el.getBoundingClientRect().left) / el.clientWidth,
          //   el.getBoundingClientRect().left,
          //   el.scrollLeft,
          //   el.offsetLeft,
          //   el.style.left,
          //   el.clientLeft
          // );
        }}
        class={"saki-linear-progress-bar"}
      >
        <div
          style={{
            ...["borderRadius", "transition"].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
            width:
              (this.progress >= 1
                ? 1
                : this.progress <= 0
                ? 0
                : this.progress) *
                100 +
              "%",
          }}
          onTransitionEnd={() => {
            this.transitionEnd.emit(this.progress);
          }}
          class={"lpb-inner"}
        ></div>
      </div>
    );
  }
}
