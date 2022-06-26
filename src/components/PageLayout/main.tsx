import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-page-main",
  styleUrl: "main.scss",
  shadow: true,
})
export class PageMainComponent {
  @Prop() maxWidth: string = "";
  @Prop() maxHeight: string = "";
  @Prop() align: string = "center";
  @Prop() full: boolean = false;

  formatAlign() {
    switch (this.align) {
      case "center":
        return "center";
      case "left":
        return "flex-left";
      case "right":
        return "flex-right";

      default:
        break;
    }
  }
  render() {
    return (
      <div
        style={{
          "align-items": this.formatAlign(),
        }}
        class={"saki-page-main-component " + (this.full ? "full" : "")}
      >
        <div
          class={"pn-main"}
          style={{
            ...["maxWidth", "maxHeight"].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
          }}
        >
          <slot></slot>
        </div>
      </div>
    );
  }
}
