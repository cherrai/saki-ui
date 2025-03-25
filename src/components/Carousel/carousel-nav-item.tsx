import { EventEmitter } from "@stencil/core";
import { Component, Event, h, Prop } from "@stencil/core";

// 开发中
@Component({
  tag: "saki-carousel-nav-item",
  styleUrl: "carousel.scss",
  shadow: true,
})
export class CarouselNavItemComponent {
  @Prop() margin = "0 0 0 10px";
  @Prop() padding = "2px";
  @Prop() width = "";
  @Prop() height = "";
  @Prop() borderRadius = "";
  @Prop() border = "2px solid #fff";
  @Prop() borderActive = "2px solid var(--saki-default-color)";
  @Prop() index = 0;
  @Prop() active = false;
  @Event() tap: EventEmitter;

  render() {
    return (
      <div
        onClick={() => {
          console.log("this.index", this.index);
          this.tap.emit(this.index);
        }}
        style={{
          "--border": this.border,
          "--borderActive": this.borderActive,
          ...["margin", "padding", "width", "height", "borderRadius"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={
          "saki-cascader-nav-item-component " + (this.active ? "active" : "")
        }
      >
        <slot></slot>
      </div>
    );
  }
}
