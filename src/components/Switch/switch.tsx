import {
  Component,
  State,
  h,
  Event,
  EventEmitter,
  Prop,
  Watch,
  Element,
} from "@stencil/core";

// 暂时弃用
@Component({
  tag: "saki-switch",
  styleUrl: "switch.scss",
  shadow: true,
})
export class SwitchComponent {
  @Prop() value: boolean = false;
  @Prop() width: string = "44px";
  @Prop() height: string = "22px";
  @Prop() coreWidth: string = "18px";
  @State() timer?: NodeJS.Timeout;
  @State() hide: boolean = true;
  @Element() el: HTMLElement;
  @Event() change: EventEmitter;
  @Watch("value")
  watchVisible() {}
  componentDidLoad() {}
  render() {
    return (
      <div
        onClick={() => {
          this.change.emit(!this.value);
        }}
        class={"saki-switch-component " + (this.value ? "active" : "")}
        style={{
          "--saki-switch-width": this.width,
          "--saki-switch-height": this.height,
          "--saki-switch-core-width": this.coreWidth,
        }}
      >
        <div class={"switch-core"}></div>
      </div>
    );
  }
}
