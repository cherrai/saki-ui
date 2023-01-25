import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-col",
  styleUrl: "layout.scss",
  shadow: false,
})
export class MenuItemComponent {
  @Prop() span = 0;
  @Prop() flexDirection = "row";
  @Prop() justifyContent = "";
  @Prop() alignItems = "";
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() width = "";
  @Prop() height = "";

  render() {
    return (
      <div
        style={{
          ...[
            "margin",
            "padding",
            "flexDirection",
            "justifyContent",
            "alignItems",
            "width",
            "height",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-col-component "}
      >
        <slot></slot>
      </div>
    );
  }
}
