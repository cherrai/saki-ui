import { Component, Element, h, Prop, State } from "@stencil/core";
// import 'cropperjs/dist/cropper.css';
// import Cropper from "cropperjs";

@Component({
  tag: "saki-waterfall-layout-item",
  styleUrls: ["waterfallLayout.scss"],
  shadow: true,
})
export class WaterfallLayoutItemComponent {
  @Prop() width: number = 0;
  @Prop() height: number = 0;
  @Prop() itemWidth: number = 0;
  @Prop() margin: string = "0 0px 10px";
  @Prop() padding: string = "";
  @Prop() borderRadius: string = "10px";
  @Prop() show: boolean = false;
  @Prop() addTrack: boolean = false;
  @Prop() added: boolean = false;
  imgEl: HTMLElement;

  @State() toDisplayArea: boolean = false;

  @Element() el: HTMLElement;
  componentDidLoad() {}

  render() {
    const width = this.itemWidth - 10;
    const height = Math.max(
      160,
      ((this.itemWidth - 10) * this.height) / this.width
    );

    return (
      <div
        style={{
          width: width + "px",
          height: height + "px",
          display: this.show ? "flex" : "none",
          ...["margin", "padding", "borderRadius"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-waterfall-layout-item-component "}
      >
        <slot></slot>
      </div>
    );
  }
}
