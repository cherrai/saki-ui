import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
} from "@stencil/core";

@Component({
  tag: "saki-button",
  styleUrl: "button.scss",
  // shadow: true,
})
export class TabsComponent {
  @Prop() type: "Normal" | "Primary" = "Normal";
  @Prop() bgHoverColor: string = "";
  @Prop() bgActiveColor: string = "";
  @Prop() border: string = "";
  @Prop() margin: string = "";
  @Prop() padding: string = "";
  @Prop() width: string = "";
  @Prop() height: string = "";
  @Prop() fontSize: string = "";
  // @Prop() textAlign: string = "center";
  @Prop() loading: boolean = false;

  @Event() tap: EventEmitter;
  @Element() el: HTMLElement;
  // @Watch("loading")
  // watchLoadingFunc() {
  //   console.log("loading", this.loading);
  // }
  componentWillLoad() {}
  getBgColor(type: string) {
    let color = "";
    switch (type) {
      case "bg":
        switch (this.type) {
          case "Normal":
            color = "rgba(0, 0, 0, 0)";
            break;
          case "Primary":
            color = "var(--saki-default-color)";
            break;

          default:
            break;
        }
        break;
      case "bg-hover":
        switch (this.type) {
          case "Normal":
            color = "var(--saki-button-normal-bg-hover-color)";
            break;
          case "Primary":
            color = "var(--saki-default-hover-color)";
            break;

          default:
            break;
        }
        this.bgHoverColor && (color = this.bgHoverColor);
        break;
      case "bg-active":
        switch (this.type) {
          case "Normal":
            color = "var(--saki-button-normal-bg-active-color)";
            break;
          case "Primary":
            color = "var(--saki-default-active-color)";
            break;

          default:
            break;
        }
        this.bgActiveColor && (color = this.bgActiveColor);
        break;

      default:
        break;
    }
    return color;
  }
  render() {
    return (
      <div
        onClick={() => {
          this.tap.emit();
        }}
        style={{
          ...[
            "border",
            "fontSize",
            "margin",
            "padding",
            "width",
            "height",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          "--button-bg-color": this.getBgColor("bg"),
          "--button-bg-hover-color": this.getBgColor("bg-hover"),
          "--button-bg-active-color": this.getBgColor("bg-active"),
          // 'background-color': ,
          // 'border':
        }}
        class={
          "saki-button-component " +
          this.type +
          (this.loading ? " loading" : " ")
        }
      >
        <div
          style={{
            ...["textAlign"].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
          }}
          class="button-content"
        >
          <slot></slot>
        </div>
        <div class="button-loading"></div>
      </div>
    );
  }
}
