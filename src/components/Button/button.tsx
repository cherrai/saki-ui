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
  tag: "saki-button",
  styleUrl: "button.scss",
  shadow: true,
})
export class ButtonComponent {
  tapTime = 0;
  @Prop() type: "Normal" | "Primary" | "CircleIconGrayHover" = "Normal";
  @Prop({ mutable: true }) bgHoverColor: string = "";
  @Prop({ mutable: true }) bgActiveColor: string = "";
  @Prop({ mutable: true }) bgColor: string = "#fff";
  @Prop({ mutable: true }) border: string = "";
  @Prop({ mutable: true }) margin: string = "";
  @Prop({ mutable: true }) padding: string = "";
  @Prop({ mutable: true }) borderRadius: string = "";
  @Prop({ mutable: true }) width: string = "";
  @Prop({ mutable: true }) height: string = "";
  @Prop({ mutable: true }) fontSize: string = "";
  @Prop({ mutable: true }) fontWeight: string = "";
  @Prop({ mutable: true }) color: string = "";
  @Prop({ mutable: true }) boxShadow: string = "";
  // @Prop({ mutable: true }) hoverColor: string = "";
  // @Prop({ mutable: true }) activeColor: string = "";
  @Prop({ mutable: true }) disabled: boolean = false;
  @Prop({ mutable: true }) loading: boolean = false;
  @Prop({ mutable: true }) loadingColor: string = "";
  @Prop({ mutable: true }) loadingWidth: string = "24px";
  @Prop({ mutable: true }) bindKeys: string[] = [];
  // @Prop() textAlign: string = "center";
  @State() values: {
    [key: string]: any;
  } = {};

  @Event({
    bubbles: false,
  })
  tap: EventEmitter;
  @Event({
    bubbles: false,
  })
  longtap: EventEmitter;
  @Event({
    bubbles: false,
  })
  doubletap: EventEmitter;
  @Element() el: HTMLElement;
  @Watch("disabled")
  watchDisabled() {
    this.setColor();
  }
  componentWillLoad() {
    for (const k in this) {
      this.values[k] = this[k];
    }
    this.setColor();
  }
  setColor() {
    this.getBgColor("bg");
    this.getBgColor("bg-hover");
    this.getBgColor("bg-active");

    switch (this.type) {
      case "Normal":
        if (this.disabled) {
          this.setPramas("border", "none");
          this.setPramas("fontSize", "14px");
          this.setPramas("color", "#aaa");
          this.setPramas("bgColor", "");
          this.setPramas("bgHoverColor", "");
          this.setPramas("bgActiveColor", "");
        } else {
          this.setPramas("border", "1px solid #eee");
          this.setPramas("fontSize", "14px");
          this.setPramas("color", "");
          this.setPramas("loadingColor", "var(--saki-default-color)");
          this.setPramas("bgColor", "");
          this.setPramas("bgHoverColor", "rgb(246, 246, 246)");
          this.setPramas("bgActiveColor", "#eee");
        }
        break;
      case "Primary":
        if (this.disabled) {
          this.border = "1px solid #eee";
          this.color = "#aaa";
          this.bgColor = "#eee";
          this.bgHoverColor = "#eee";
          this.bgActiveColor = "#eee";
          // !this.color && (this.color = "var(--saki-default-color)");
        } else {
          this.border = "1px solid var(--saki-default-color)";
          this.color = "#fff";
          this.loadingColor = "#fff";
          this.bgColor = "var(--saki-default-color)";
          this.bgHoverColor = "var(--saki-default-hover-color)";
          this.bgActiveColor = "var(--saki-default-active-color)";
          this.border = "1px solid var(--saki-default-color)";
          // !this.color && (this.color = "var(--saki-default-color)");
        }
        break;

      case "CircleIconGrayHover":
        if (this.disabled) {
          this.setPramas("border", "none");
          this.setPramas("fontSize", "14px");
          this.setPramas("borderRadius", "50%");
          this.setPramas("width", "36px");
          this.setPramas("height", "36px");
          this.setPramas("color", "#aaa");
          this.setPramas("bgColor", "");
          this.setPramas("bgHoverColor", "");
          this.setPramas("bgActiveColor", "");
        } else {
          this.setPramas("border", "none");
          this.setPramas("fontSize", "14px");
          this.setPramas("borderRadius", "50%");
          this.setPramas("width", "36px");
          this.setPramas("height", "36px");
          this.setPramas("color", "var(--saki-default-color)");
          this.setPramas("loadingColor", "var(--saki-default-color)");
          this.setPramas(
            "bgColor",
            "var(--saki-button-circle-icon-gray-hover-bg-color)"
          );
          this.setPramas(
            "bgHoverColor",
            "var(--saki-button-circle-icon-gray-hover-bg-hover-color)"
          );
          this.setPramas(
            "bgActiveColor",
            "var(--saki-button-circle-icon-gray-hover-bg-active-color)"
          );
        }
        break;

      default:
        break;
    }
  }
  setPramas(key: string, v: any) {
    !this.values[key] && (this[key] = v);
  }
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
        this.bgColor && (color = this.bgColor);
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
  longTap() {
    this.tapTime = new Date().getTime();

    setTimeout(() => {
      if (this.tapTime !== 0) {
        this.longtap.emit();
      }
    }, 700);
  }
  render() {
    return (
      <div
        onClick={(e) => {
          // console.log(21);
          e.stopPropagation();
          if (!this.disabled) {
            this.tap.emit();
            if (new Date().getTime() - this.tapTime <= 700) {
              this.doubletap.emit();

              this.tapTime = 0;
              return;
            }
            this.tapTime = new Date().getTime();
          }
        }}
        onMouseDown={() => {
          this.longTap();
        }}
        onTouchStart={() => {
          this.longTap();
        }}
        style={{
          ...[
            "border",
            "fontSize",
            "margin",
            "padding",
            "width",
            "height",
            "borderRadius",
            "boxShadow",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),

          "--button-bg-color": this.bgColor,
          "--button-bg-hover-color": this.bgHoverColor,
          "--button-bg-active-color": this.bgActiveColor,
          "--button-color": this.color,
          "--button-loading-color": this.loadingColor || "#3874fb",
          "--button-loading-width": this.loadingWidth,

          // "--button-bg-color": this.bgActiveColor this.getBgColor("bg"),
          // "--button-bg-hover-color":  this.getBgColor("bg-hover"),
          // "--button-bg-active-color": this.getBgColor("bg-active"),
          // 'background-color': ,
          // 'border':
        }}
        class={
          "saki-button-component " +
          this.type +
          (this.loading ? " loading" : " ") +
          (this.disabled ? " disabled" : "")
        }
      >
        <div
          style={{
            ...["textAlign", "fontWeight", "color"].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
          }}
          class="button-content"
        >
          <slot></slot>
        </div>
        <div class={"button-loading "}></div>
        {/* <div class="button-loading"></div> */}
      </div>
    );
  }
}
