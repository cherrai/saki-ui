import {
  Component,
  h,
  Event,
  EventEmitter,
  Prop,
  Element,
} from "@stencil/core";

// 暂时弃用
@Component({
  tag: "saki-segmented-item",
  styleUrl: "segmented.scss",
  shadow: false,
})
export class SegmentedItemComponent {
  @Prop() value: string = "";

  @Prop() active: boolean = false;

  @Prop() color: string = "#000";
  @Prop() activeColor: string = "#fff";
  @Prop() height: string = "";
  @Prop() borderRadius: string = "";
  @Prop() margin: string = "";
  @Prop() padding: string = "";

  @Element() el: HTMLElement;
  @Event() tap: EventEmitter;
  componentDidLoad() {}
  render() {
    return (
      <div
        onClick={() => {
          this.tap.emit(this.value);
        }}
        class={"saki-segmented-item-component " + (this.active ? "active" : "")}
        style={{
          ...["height", "borderRadius", "padding", "margin"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          "--color": this.color,
          "--activeColor": this.activeColor,
        }}
      >
        <slot></slot>
      </div>
    );
  }
}
