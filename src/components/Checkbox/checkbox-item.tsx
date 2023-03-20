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
  @Prop() height: string = "";
  @Prop() margin: string = "0 16px 0 0";
  @Prop() padding: string = "";
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
        onClick={() => {
          if (!this.onlyIconClickable) {
            // e.stopPropagation();
            if (!this.disabled) {
              this.tap.emit({
                value: this.value,
              });
            }
          }
        }}
        style={{
          "--saki-background-color": this.backgroundColor,
          "--saki-background-hover-color": this.backgroundHoverColor,
          "--saki-background-active-color": this.backgroundActiveColor,
          ...[
            "border",
            "fontSize",
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
        {this.type === "Radio" ? <div class={"ci-radio"}></div> : ""}
        {this.type === "Checkbox" ? (
          <div
            onClick={(e) => {
              if (this.onlyIconClickable) {
                e.stopPropagation();
                if (!this.disabled) {
                  this.tap.emit({
                    value: this.value,
                  });
                }
              }
            }}
            class={"ci-checkbox"}
          >
            <svg
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2004"
            >
              <path
                d="M931.013 225.08c-24.632-25.896-65.015-26.383-90.194-1.1l-434.627 436.279-224.469-230.763c-23.31-23.987-62.392-22.656-87.316 2.946-24.923 25.606-26.221 65.795-2.883 89.777l274.385 282.069c23.304 23.954 62.391 22.623 87.31-2.978 5.71-5.865 9.985-12.514 13.192-19.545 2.467-1.846 4.928-3.597 7.163-5.865l456.373-458.092c25.213-25.308 25.668-66.8 1.071-92.727l-0.005 0zM931.013 225.08z"
                p-id="2005"
              ></path>
            </svg>
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
