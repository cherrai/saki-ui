import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  State,
  Prop,
  Watch,
} from "@stencil/core";

@Component({
  tag: "saki-loading",
  styleUrl: "loading.scss",
  shadow: true,
})
export class SakiLoadingComponent {
  @Prop() type: "rotateEaseInOut" | "rotateLinear" = "rotateEaseInOut";
  @Prop() width = "20px";
  @Prop() height = "20px";
  @Prop() border = "3px";
  @Prop() borderColor = "var(--saki-default-color)";
  @State() values: {
    [key: string]: any;
  } = {};

  @Event({
    bubbles: false,
  })
  tap: EventEmitter;
  @Element() el: HTMLElement;
  @Watch("disabled")
  watchDisabled() {}
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
        class={"saki-loading-component " + this.type}
      >
        {this.type === "rotateEaseInOut" ? (
          <div class={"l-loading "}></div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
