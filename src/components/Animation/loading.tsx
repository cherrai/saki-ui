import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-animation-loading",
  styleUrl: "loading.scss",
  shadow: true,
})
export class SakiAnimationLoadingComponent {
  @Prop() type: "rotateEaseInOut" | "rotateLinear" = "rotateEaseInOut";
  @Prop() width = "20px";
  @Prop() height = "20px";
  @Prop() border = "3px";
  @Prop() borderColor = "var(--saki-default-color)";
  componentWillLoad() {}

  render() {
    return (
      <div
        style={{
          "--saki-loading-width": this.width,
          "--saki-loading-height": this.height,
          "--saki-loading-border": this.border,
          "--saki-loading-border-color": this.borderColor,
        }}
        class={"saki-animation-loading-component " + this.type}
      >
        <div class={"l-loading "}></div>
      </div>
    );
  }
}
