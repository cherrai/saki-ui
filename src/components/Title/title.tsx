import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "saki-title",
  styleUrl: "title.scss",
  shadow: true,
})
export class TitleComponent {
  // 改版了。其他项目发现异常记得改一下，尤其是sso和喵笔记
  @Prop() level = 1;
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() align = "left";
  @Prop() color = "";
  componentDidLoad() {}
  render() {
    return (
      <div
        style={{
          textAlign: this.align,
          color:
            this.color === "default" ? "var(--saki-default-color)" : this.color,
          ...["margin", "padding"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-title-component  " + ("h" + this.level)}
      >
        <slot></slot>
      </div>
    );
  }
}
