import { Component, h, Prop } from "@stencil/core";

// 开发中
@Component({
  tag: "saki-carousel-item",
  styleUrl: "carousel.scss",
  shadow: true,
})
export class CarouselItemComponent {
  @Prop() width = "";
  @Prop() height = "";
  @Prop() index = 0;
  @Prop() clone = false;
  @Prop() autoplay = false;
  @Prop() autoplayInterval = 3000;

  render() {
    return (
      <div
        style={{
          ...["width", "height"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-cascader-item-component "}
      >
        {/* <span class={"index"}>{this.index}</span> */}
        <slot></slot>
      </div>
    );
  }
}
