import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  State,
  Prop,
  Watch,
  Method,
} from "@stencil/core";

@Component({
  tag: "saki-checkbox-item",
  styleUrl: "checkbox.scss",
  shadow: true,
})
export class CheckboxItemComponent {
  @Prop() type: "Radio" | "Checkbox" = "Radio";
  @Prop() flexDirection: "Row" | "Column" = "Row";
  // SelectAll
  @Prop() value: string = "";
  @Prop() content: string = "";
  @Prop() width: string = "";
  @Prop() height: string = "";
  @Prop() margin: string = "0 16px 0 0";
  @Prop() padding: string = "";
  @Prop() iconSize: string = "14px";
  @Prop() borderRadius: string = "";
  @Prop() border: string = "";
  @Prop() borderBottom: string = "";
  @Prop() borderTop: string = "";
  @Prop() borderRight: string = "";
  @Prop() borderLeft: string = "";
  @Prop() backgroundColor: string = "";
  @Prop() backgroundHoverColor: string = "";
  @Prop() backgroundActiveColor: string = "";
  @Prop() activeColor: string = "var(--saki-default-color)";
  @Prop() iconActiveColor: string = "var(--saki-default-color)";
  // @Prop() textAlign: string = "center";
  @Prop() disabled: boolean = false;
  @Prop() onlyIconClickable: boolean = false;
  @Prop({
    mutable: true,
  })
  active: boolean = false;
  @Prop() loading: boolean = false;
  @State() values: {
    [key: string]: any;
  } = {};

  @Event({
    eventName: "tap",
    bubbles: false,
  })
  tap: EventEmitter;
  @Element() el: HTMLElement;
  @Watch("disabled")
  watchDisabled() {}
  componentDidLoad() {}
  @Method()
  async setActive(b: boolean) {
    this.active = b;
    console.log("setActive", this.active, this);
  }
  render() {
    return (
      <div
        onClick={(e) => {
          if (!this.onlyIconClickable) {
            // e.stopPropagation();
            if (!this.disabled) {
              this.tap.emit({
                value: this.value,
              });
            }
          }
          e.stopPropagation();
        }}
        style={{
          "--saki-background-color": this.backgroundColor,
          "--saki-background-hover-color": this.backgroundHoverColor,
          "--saki-background-active-color": this.backgroundActiveColor,
          ...["fontSize"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          "--saki-checkbox-item-icon-color": this.iconActiveColor,
          "--saki-checkbox-item-color": this.activeColor,
        }}
        class={
          "saki-checkbox-item-component " +
          this.type +
          (this.active ? " active " : " ") +
          (this.disabled ? " disabled " : " ") +
          this.flexDirection
        }
      >
        {this.type === "Radio" ? (
          <div
            style={{
              ...[
                "margin",
                "padding",
                "width",
                "height",
                "borderRadius",
                "border",
                "borderTop",
                "borderBottom",
                "borderRight",
                "borderLeft",
              ].reduce(
                (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
                {}
              ),
            }}
            class={"ci-radio"}
          ></div>
        ) : (
          ""
        )}
        {this.type === "Checkbox" ? (
          <div
            onClick={(e) => {
              console.log(this.borderRadius);
              if (this.onlyIconClickable) {
                e.stopPropagation();
                if (!this.disabled) {
                  this.tap.emit({
                    value: this.value,
                  });
                }
              }
            }}
            style={{
              ...[
                "margin",
                "padding",
                "width",
                "height",
                "borderRadius",
                "border",
                "borderTop",
                "borderBottom",
                "borderRight",
                "borderLeft",
              ].reduce(
                (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
                {}
              ),
            }}
            class={"ci-checkbox"}
          >
            <saki-icon
              width={this.iconSize}
              height={this.iconSize}
              color="#fff"
              type={"Hook"}
            ></saki-icon>
          </div>
        ) : (
          ""
        )}
        <div class={"ci-content"}>
          {this.content}
          <slot></slot>
        </div>
      </div>
    );
  }
}
