import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
} from "@stencil/core";

export interface BreadcrumbOptionItem {
  value: string;
  text: string;
  click?: boolean;
  style?: {
    margin?: string;
    padding?: string;
    fontSize?: string;
    maxWidth?: string;
    color?: string;
  };
}

// 开发中
@Component({
  tag: "saki-breadcrumb",
  styleUrl: "breadcrumb.scss",
  shadow: true,
})
export class BreadcrumbComponent {
  @Prop() options = [] as BreadcrumbOptionItem[];
  @Prop() padding: string = "";
  @Prop() margin: string = "";
  @Prop() iconSize: string = "10px";
  @Prop() iconColor: string = "#999";
  @Prop() iconPadding: string = "";
  @Prop() iconMargin: string = "0 4px";
  @Prop() iconType: string = "";
  @Prop() customIcon = false;

  @Event({
    bubbles: false,
  })
  clickvalue: EventEmitter<{
    value: string;
  }>;
  @Element() el: HTMLElement;
  @Method()
  async setOptions(options: typeof this.options) {
    this.options = options;
  }
  componentWillLoad() {}
  componentDidLoad() {
    // console.log("breadcrumb", this.options);
  }
  render() {
    return (
      <div
        style={{
          ...["margin", "padding"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-breadcrumb-component "}
      >
        {new Array(this.options.length * 2 - 1).fill(1).map((_, i) => {
          if (i % 2 === 0) {
            const v = this.options[i / 2];
            return (
              <div
                style={{
                  fontSize: "12px",
                  maxWidth: "100px",
                  color: "#666",
                  ...[
                    "margin",
                    "padding",
                    "fontSize",
                    "maxWidth",
                    "color",
                  ].reduce(
                    (fin, cur) =>
                      v.style?.[cur] ? { ...fin, [cur]: v.style?.[cur] } : fin,
                    {}
                  ),
                }}
                onClick={() => {
                  v.click &&
                    this.clickvalue.emit({
                      value: v.value,
                    });
                }}
                class={"sb-item " + (v.click ? "click" : "")}
              >
                <span class={"text-elipsis"}>{v.text}</span>
              </div>
            );
          }

          return this.customIcon ? (
            <slot name="customIcon"></slot>
          ) : (
            <saki-icon
              width={this.iconSize}
              height={this.iconSize}
              color={this.iconColor}
              margin={this.iconMargin}
              padding={this.iconPadding}
              type="Right"
            ></saki-icon>
          );
        })}
      </div>
    );
  }
}
