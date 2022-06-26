import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-linear-progress-bar",
  styleUrl: "progress-bar.scss",
  shadow: false,
})
export class LinearProgressBarComponent {
  @Prop() width: string = "80px";
  @Prop() height: string = "0px";
  @Prop() borderRadius: string = "0px";
  @Prop() progress: number = 0;
  @Prop() trackColor: string = "#eee";
  @Prop() color: string = "var(--saki-default-color)";
  componentWillLoad() {}
  render() {
    return (
      <div
        style={{
          ...["height", "width", "borderRadius"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          backgroundColor: this.trackColor,
          "--saki-circle-progress-bar-color": this.color,
        }}
        class={"saki-linear-progress-bar"}
      >
        <div
          style={{
            ...["borderRadius"].reduce(
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
          class={"lpb-inner"}
        ></div>
      </div>
    );
  }
}
