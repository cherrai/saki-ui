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
import { IconType } from "../Icon/icon";
import { deepCopy } from "@nyanyajs/utils/dist/common/common";
import { Debounce } from "@nyanyajs/utils/dist/debounce";

export interface CascaderOptionItem {
  value: string;
  text: string;
  icon?: IconType;
  iconStyle?: {
    color?: string;
    width?: string;
    height?: string;
    margin?: string;
    padding?: string;
  };
  list?: CascaderOptionItem[];
}

export interface CascaderOptionListItem extends CascaderOptionItem {
  active: boolean;
}

// 开发中
@Component({
  tag: "saki-cascader",
  styleUrl: "cascader.scss",
  shadow: true,
})
export class CascaderComponent {
  scrollToArr: number[] = [];
  d = new Debounce();
  init = false;
  @Prop() options = [] as CascaderOptionItem[];
  @State() optionList = [] as CascaderOptionListItem[][];
  // @Prop() padding: string = "";
  // @Prop() margin: string = "";
  @Prop() itemWidth: string = "160px";
  @Prop() itemPadding: string = "";
  @Prop() itemMargin: string = "";
  @Prop() itemFontSize: string = "13px";
  @Prop() values: string[] = [];

  @Prop() changeOnSelect = false;

  @Event({
    bubbles: false,
  })
  changevalue: EventEmitter<{
    values: {
      value: string;
      text: string;
    }[];
    close: boolean;
  }>;
  @Event({
    bubbles: false,
  })
  initvalue: EventEmitter<{
    values: {
      value: string;
      text: string;
    }[];
  }>;
  @Event() dragdone: EventEmitter;
  @Element() el: HTMLElement;
  @State() mainEl: HTMLElement;
  @Watch("values")
  watchValues() {
    this.formatValues();
  }
  @Watch("options")
  watchOptions() {
    this.formatValues();
  }

  @Method()
  async setOptions(options: typeof this.options) {
    this.options = options;
  }
  @Method()
  async initScrollBar() {
    this.mainEl
      .querySelectorAll("saki-cascader-item")
      .forEach(async (el, i) => {
        await el.setScrollTop(this.scrollToArr[i] || 0);
      });
  }

  componentWillLoad() {}
  componentDidLoad() {
    console.log("componentDidLoad");
    this.options = deepCopy(this.options);

    const dpEl = this.getElParent(
      this.el.parentElement,
      1
    ) as HTMLSakiDropdownElement;
    if (dpEl) {
      dpEl.addEventListener("open", () => {
        this.initScrollBar();
      });
    }
  }

  formatValues() {
    this.d.increase(() => {
      this.optionList = [];
      this.formartOptionList(this.options, 0);
      console.log("values", this.options, this.values, this.optionList);

      if (!this.options?.length || !this.values.length) return;
      for (let i = 0; i < this.values.length; i++) {
        this.optionList[i].forEach((sv) => {
          sv.active = false;
          if (sv.value === this.values[i]) {
            sv.active = true;
            sv.list && this.formartOptionList(sv.list, i + 1);
          }
        });
      }

      this.optionList = deepCopy(this.optionList);

      // console.log("values", this.options, this.values, this.optionList);
      if (!this.init) {
        this.init = true;
        this.initvalue.emit({
          values: this.optionList
            .map((v) => {
              const optionItem = v.filter((sv) => sv.active)?.[0];
              return {
                value: optionItem?.value || "",
                text: optionItem?.text || "",
              };
            })
            .filter((v) => v.value),
        });
      }
    }, 100);
  }
  getElParent(el: HTMLElement, level: number) {
    if (el.localName === "saki-dropdown") {
      return el;
    }
    if (level > 6) {
      return undefined;
    }
    return this.getElParent(el.parentElement, level + 1);
  }
  formartOptionList(options: typeof this.options, index: number) {
    const l = options.map((v) => {
      return {
        ...v,
        active: false,
      };
    });
    if (this.optionList[index]) {
      this.optionList[index] = l;
      return;
    }
    this.optionList.push(l);
  }
  render() {
    return (
      <div
        ref={(e) => {
          this.mainEl = e;
        }}
        style={
          {
            // ...["padding"].reduce(
            //   (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            //   {}
            // ),
          }
        }
        class={"saki-cascader-component "}
      >
        {this.optionList.map((options, i) => {
          return (
            <saki-cascader-item
              onScrollto={(e) => {
                this.scrollToArr[i] = e.detail;
              }}
              onChangevalue={(e) => {
                // console.log(e, i);
                this.optionList = deepCopy(this.optionList);
                this.optionList[i].forEach((v, si) => {
                  // console.log(v, si, e.detail.index);
                  if (si === e.detail.index) {
                    v.active = true;

                    if (v.list) {
                      this.formartOptionList(v.list, i + 1);
                      this.mainEl
                        .querySelectorAll("saki-cascader-item")
                        .item(i + 1)
                        ?.setScrollTop(0);
                    }
                    this.optionList.forEach((_, si) => {
                      if (si > i + (v.list ? 1 : 0)) {
                        this.optionList.splice(si, 1);
                      }
                    });

                    if (!v.list?.length || this.changeOnSelect) {
                      this.changevalue.emit({
                        values: this.optionList
                          .map((v) => {
                            const optionItem = v.filter((sv) => sv.active)?.[0];
                            return {
                              value: optionItem?.value || "",
                              text: optionItem?.text || "",
                            };
                          })
                          .filter((v) => v.value),
                        close: this.changeOnSelect ? !v.list?.length : true,
                      });
                    }
                    return;
                  }
                  v.active = false;
                });

                e.stopPropagation();
              }}
              options={options}
              width={this.itemWidth}
              padding={this.itemPadding}
              margin={this.itemMargin}
              fontSize={this.itemFontSize}
            ></saki-cascader-item>
          );
        })}
      </div>
    );
  }
}
