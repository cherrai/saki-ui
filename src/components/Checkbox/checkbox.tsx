import { Debounce } from "@nyanyajs/utils/dist/debounce";
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
  d = new Debounce();
  @Prop() type: "Radio" | "Checkbox" = "Radio";
  @Prop() flexDirection: "Row" | "Column" = "Row";
  @Prop() disabled: boolean = false;
  @Prop() value: string = "";
  @State() values: string[] = [];
  @State() isSelectAll: boolean = false;
  @State() list: NodeListOf<HTMLSakiCheckboxItemElement>;

  @Event() tap: EventEmitter;
  @Event() selectvalue: EventEmitter;
  @Element() el: HTMLElement;
  @Watch("value")
  watchValue() {
    // console.log(this.value);
    this.values = this.value.split(",").filter((v) => !!v);

    let valueListKeys = Object.keys(this.valueList).filter(
      (v) => v !== "SelectAll"
    );
    if (valueListKeys.length && this.values.length === valueListKeys.length) {
      this.values.push("SelectAll");
      this.isSelectAll = true;
    } else {
      this.isSelectAll = false;
      this.values.filter((v) => v !== "SelectAll");
    }
    this.initData();
  }

  componentWillLoad() {
    setTimeout(() => {
      this.values = this.value.split(",").filter((v) => !!v);

      const observer = new MutationObserver(this.watchDom.bind(this));
      this.watchDom();
      // 以上述配置开始观察目标节点
      observer.observe(this.el, {
        attributes: false,
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
  @State() valueList: {
    [value: string]: number;
  } = {};
  tapFunc(e: any) {
    this.d.increase(() => {
      // console.log("tapFunc", e);
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
          let valueListKeys = Object.keys(this.valueList);
          if (this.list.length) {
            // console.log(e.target, e.target.value);
            // console.log(this.list, valueListKeys);

            if (e.target.value === "SelectAll") {
              if (this.isSelectAll) {
                this.values = [];
                // console.log("valueListKeys", valueListKeys);
                valueListKeys.forEach((k) => {
                  this.list[this.valueList[k]].active = false;
                });
              } else {
                this.values = valueListKeys.map((k) => {
                  // console.log(this.list[this.valueList[k]], k);
                  return this.list[this.valueList[k]]?.value;
                });
                valueListKeys.forEach((k) => {
                  // console.log(this.list[this.valueList[k]], k);
                  this.list[this.valueList[k]].active = true;
                });
              }
              this.isSelectAll = !this.isSelectAll;
            } else {
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
              this.isSelectAll =
                this.values.length ===
                valueListKeys.filter((v) => v !== "SelectAll").length;

              valueListKeys.forEach((k) => {
                if (k === "SelectAll") {
                  // this.list[this.valueList[k]].active = this.isSelectAll;
                  this.list[this.valueList[k]]?.setActive(this.isSelectAll);
                  console.log(
                    this.list[this.valueList[k]],
                    this.list[this.valueList[k]].active
                  );
                  return;
                }
                this.list[this.valueList[k]].active = false;
                this.values.some((sv) => {
                  if (k === sv) {
                    this.list[this.valueList[k]].active = true;
                    return true;
                  }
                });
              });
              // console.log(this.values, valueListKeys, this.isSelectAll);
              // valueListKeys.some((k) => {});
            }
          }
          break;

        default:
          break;
      }
      // console.log(this.values, e.target.value);
      this.selectvalue.emit({
        value: e.target.value,
        index: this.valueList[e.target.value],
        values: this.values.filter((v) => v !== "SelectAll"),
      });
    }, 50);
  }
  watchDom() {
    const list: NodeListOf<HTMLSakiCheckboxItemElement> =
      this.el?.querySelectorAll("saki-checkbox-item");
    this.valueList = {};
    list?.forEach((item, index) => {
      this.valueList[item.value] = index;

      item.flexDirection = this.flexDirection;

      item.type = this.type;
      item.removeEventListener("tap", this.tapFunc.bind(this));
      item.addEventListener("tap", this.tapFunc.bind(this));
    });
    this.list = list;

    let valueListKeys = Object.keys(this.valueList).filter(
      (v) => v !== "SelectAll"
    );
    if (valueListKeys.length && this.values.length === valueListKeys.length) {
      this.values.push("SelectAll");
    }

    this?.initData?.();
  }
  render() {
    return (
      <div
        // onClick={(e) => {
        //   // console.log(21);
        //   e.stopPropagation();
        //   if (!this.disabled) {
        //     this.tap.emit();
        //   }
        // }}
        style={{
          ...[
            "border",
            "fontSize",
            "margin",
            "padding",
            "width",
            "height",
            "borderRadius",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={
          "saki-checkbox-component " +
          this.flexDirection +
          (this.disabled ? "disabled " : "")
        }
      >
        <slot></slot>
      </div>
    );
  }
}
