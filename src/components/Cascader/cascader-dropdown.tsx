import {
  Component,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { CascaderOptionItem } from "./cascader";

@Component({
  tag: "saki-cascader-dropdown",
  styleUrl: "cascader.scss",
  shadow: false,
})
export class CascaderDropdownComponent {
  @Prop({
    mutable: true,
  })
  buttonText = "";
  @Prop() options = [] as CascaderOptionItem[];

  @State() visible = false;

  @Prop({
    mutable: true,
  })
  values: string[] = [];

  @Prop() changeOnSelect = false;

  @Prop() width: string = "180px";
  @Prop() height: string = "36px";
  @Prop() padding: string = "0 6px";
  @Prop() margin: string = "";
  @Prop() fontSize: string = "12px";
  @Prop() color: string = "";
  @Prop() border: string = "";
  @Prop() borderRadius: string = "";
  @Prop() placeholder: string = "";

  @Prop() itemWidth: string = "160px";
  @Prop() itemPadding: string = "";
  @Prop() itemMargin: string = "";
  @Prop() itemFontSize: string = "13px";

  @State() cascaderEl: HTMLSakiCascaderElement;

  @Event()
  changevalue: EventEmitter<{
    values: {
      value: string;
      text: string;
    }[];
  }>;
  @Event() close: EventEmitter;

  @Watch("values")
  watchValues() {}

  componentWillLoad() {}
  componentDidLoad() {
    // this.buttonTextRender(this.values.map((v) => v.text).join(" / "));
  }
  @Method()
  async buttonTextRender(buttonText: string) {
    this.buttonText = buttonText;
  }
  render() {
    return (
      <div>
        <saki-dropdown
          floatingDirection="Left"
          onClose={() => {
            this.visible = false;
            this.close.emit();
          }}
          visible={this.visible}
          offsetY={18}
        >
          <div class={"saki-cascader-dropdown-component "}>
            <saki-button
              onTap={async () => {
                this.visible = true;
              }}
              margin={this.margin}
              padding={this.padding}
              width={this.width}
              height={this.height}
              border={this.border}
              borderRadius={this.borderRadius}
            >
              <div class={"scd-button"}>
                <span
                  style={{
                    ...["fontSize", "color"].reduce(
                      (fin, cur) =>
                        this[cur] ? { ...fin, [cur]: this[cur] } : fin,
                      {}
                    ),
                  }}
                  class={"text-elipsis"}
                >
                  {this.buttonText || this.placeholder}
                </span>
                <saki-icon
                  width="28px"
                  height="12px"
                  color="#999"
                  type="Bottom"
                  class={"bottom"}
                ></saki-icon>
                <saki-button
                  onTap={(e) => {
                    console.log("close");
                    this.values = [];
                    this.buttonTextRender("");
                    this.changevalue.emit({
                      values: [],
                    });
                    e.stopPropagation();
                  }}
                  class={"close"}
                  bgColor="transparent"
                  border="none"
                >
                  <saki-icon
                    width="12ox"
                    height="12px"
                    color="#999"
                    type="Close"
                  ></saki-icon>
                </saki-button>
              </div>
            </saki-button>
          </div>

          <div slot="main">
            <saki-cascader
              ref={(e) => {
                this.cascaderEl = e;
              }}
              onInitvalue={(e) => {
                this.buttonTextRender(
                  e.detail.values.map((v) => v.text).join(" / ")
                );
                this.changevalue.emit(e.detail);
                e.stopPropagation();
              }}
              onChangevalue={(e) => {
                this.buttonTextRender(
                  e.detail.values.map((v) => v.text).join(" / ")
                );
                this.changevalue.emit(e.detail);
                if (e.detail.close) {
                  this.visible = false;
                }
                e.stopPropagation();
              }}
              options={this.options}
              itemWidth={this.itemWidth}
              itemPadding={this.itemPadding}
              itemMargin={this.itemMargin}
              itemFontSize={this.itemFontSize}
              values={this.values}
              changeOnSelect={this.changeOnSelect}
            ></saki-cascader>
          </div>
        </saki-dropdown>
      </div>
    );
  }
}
