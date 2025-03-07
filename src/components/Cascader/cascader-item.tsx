import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { CascaderOptionListItem } from "./cascader";

// 开发中
@Component({
  tag: "saki-cascader-item",
  styleUrl: "cascader.scss",
  shadow: true,
})
export class CascaderItemComponent {
  @State() scrollTop = 0;
  @Prop() options: CascaderOptionListItem[] = [];
  @Prop() width: string = "160px";
  @Prop() padding: string = "";
  @Prop() margin: string = "";
  @Prop() fontSize: string = "13px";

  @Event({
    bubbles: false,
  })
  changevalue: EventEmitter;
  @Event() scrollto: EventEmitter;
  @Element() el: HTMLElement;
  @State() mainEl: HTMLElement;
  @Watch("options")
  watchOptions() {
    // this.scrollTop = 0;
  }
  componentWillLoad() {}
  componentDidLoad() {
    console.log("cascader-item componentDidLoad");
  }
  // componentDidRender() {
  //   console.log("cascader-item componentDidRender");
  // }
  // componentDidUpdate() {
  //   console.log("cascader-item componentDidUpdate");
  // }
  @Method()
  async initScrollBar() {
    console.log("initScrollBar", this.scrollTop);
    this.mainEl.scrollTop = this.scrollTop;
  }
  @Method()
  async setScrollTop(y: number) {
    console.log("setScrollTop", y);
    this.scrollTop = y;
    this.mainEl.scrollTop = y;
  }
  render() {
    return (
      <div
        ref={(e) => {
          if (!this.mainEl) {
            this.mainEl = e;
          }
        }}
        style={
          {
            // ...["padding", "padding"].reduce(
            //   (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            //   {}
            // ),
          }
        }
        onScroll={() => {
          this.scrollTop = this.mainEl.scrollTop;
          this.scrollto.emit(this.mainEl.scrollTop);
        }}
        class={"saki-cascader-item-component scrollBarHover"}
      >
        <saki-menu
          onSelectvalue={(e) => {
            this.changevalue.emit(e.detail);
            e.stopPropagation();
          }}
          width={this.width}
        >
          {this.options.map((v) => {
            return (
              <saki-menu-item
                value={v.value}
                showIcon={!!v.icon}
                active={v.active}
                padding={this.padding}
                margin={this.margin}
                fontSize={this.fontSize}
              >
                {v.icon ? (
                  <div class={"ci-icon"} slot="icon">
                    <saki-icon
                      color={v.iconStyle?.color || "#666"}
                      width={v.iconStyle?.width || "14px"}
                      height={v.iconStyle?.height || "14px"}
                      margin={v.iconStyle?.margin}
                      padding={v.iconStyle?.padding}
                      type={v.icon}
                    ></saki-icon>
                  </div>
                ) : (
                  ""
                )}
                <div class={"ci-item"}>
                  <div class={"ci-i-content text-two-elipsis"}>{v.text}</div>
                  {v.list?.length ? (
                    <saki-icon
                      type="Right"
                      color="#999"
                      width="12px"
                      height="12px"
                    ></saki-icon>
                  ) : (
                    ""
                  )}
                </div>
              </saki-menu-item>
            );
          })}
        </saki-menu>
      </div>
    );
  }
}
