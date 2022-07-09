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
  tag: "saki-checkbox",
  styleUrl: "checkbox.scss",
  shadow: true,
})
export class CheckboxComponent {
  @Prop() type: "Radio" | "Checkbox" = "Radio";
  @Prop() flexDirection: "Row" | "Column" = "Row";
  @Prop() disabled: boolean = false;
  @Prop() value: string = "";
  @State() values: string[] = [];
  @State() list: NodeListOf<HTMLSakiCheckboxItemElement>;

  @Event() tap: EventEmitter;
  @Event() selectvalue: EventEmitter;
  @Element() el: HTMLElement;
  @Watch("value")
  watchValue() {
    // console.log(this.value);
    this.values = this.value.split(",").filter((v) => !!v);

    this.initData();
  }

  componentWillLoad() {
    setTimeout(() => {
      this.values = this.value.split(",").filter((v) => !!v);
      const observer = new MutationObserver(this.watchDom);
      this.watchDom();
      // 以上述配置开始观察目标节点
      observer.observe(this.el, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    });
  }
  componentDidLoad() {}
  initData() {
    this.list?.forEach((v) => {
      v.active = false;
      this.values.some((sv) => {
        if (v.value == sv) {
          v.active = true;
          return true;
        }
      });
    });
  }
  watchDom() {
    let valueList: {
      [value: string]: number;
    } = {};

    const tapFunc = (e: any) => {
      switch (this.type) {
        case "Radio":
          this.values = [e.target.value];
          this.list.forEach((v) => {
            if (v.value === e.target.value) {
              v.active = true;
            } else {
              v.active = false;
            }
          });
          break;
        case "Checkbox":
          let index = -1;
          this.values.some((v, i) => {
            if (v === e.target.value) {
              index = i;
              return true;
            }
          });
          if (index === -1) {
            this.values.push(e.target.value);
          } else {
            this.values = this.values.filter((v) => {
              return v !== e.target.value;
            });
          }
          Object.keys(valueList).forEach((k) => {
            this.list[valueList[k]].active = false;
            this.values.some((sv) => {
              if (k === sv) {
                this.list[valueList[k]].active = true;
                return true;
              }
            });
          });
          break;

        default:
          break;
      }
      // console.log(this.values, e.target.value);
      this.selectvalue.emit({
        value: e.target.value,
        index: valueList[e.target.value],
        values: this.values,
      });
    };
    // console.log(this.el);
    const list: NodeListOf<HTMLSakiCheckboxItemElement> =
      this.el?.querySelectorAll("saki-checkbox-item");
    list?.forEach((item, index) => {
      valueList[item.value] = index;

      item.type = this.type;
      item.removeEventListener("tap", tapFunc);
      item.addEventListener("tap", tapFunc);
    });
    this.list = list;
    this?.initData?.();
  }
  render() {
    return (
      <div
        onClick={(e) => {
          // console.log(21);
          e.stopPropagation();
          if (!this.disabled) {
            this.tap.emit();
          }
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
            "flexDirection",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-checkbox-component "}
      >
        <slot></slot>
      </div>
    );
  }
}
