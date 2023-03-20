import {
  Component,
  State,
  h,
  Event,
  EventEmitter,
  Prop,
  Watch,
  Element,
  Method,
} from "@stencil/core";

// 暂时弃用
@Component({
  tag: "saki-table-column-item",
  styleUrl: "table.scss",
  shadow: true,
})
export class TableColumnItemComponent {
  @Prop() prop: string = "";
  @Prop({
    mutable: true,
  })
  tempWidth: string = "44px";
  @Prop() width: string = "auto";
  @Prop() height: string = "height";
  @Element() el: HTMLElement;
  @Watch("width")
  watchWidth() {
    this.tempWidth = this.width;
    if (this.width === "auto") {
      this.el.style.flex = "1";
    }
  }
  componentWillLoad() {
    this.tempWidth = this.width;
    if (this.width === "auto") {
      this.el.style.flex = "1";
    }
  }
  @Method()
  async setWidth(w: string) {
    this.tempWidth = w;
  }
  render() {
    return (
      <div
        style={{
          width: this.tempWidth,
          height: this.height,
        }}
        class={"saki-table-column-item-component "}
      >
        <slot></slot>
      </div>
    );
  }
}
