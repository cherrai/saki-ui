import {
  Component,
  State,
  h,
  Event,
  EventEmitter,
  Prop,
  Watch,
  Element,
} from "@stencil/core";
import { Debounce } from "@nyanyajs/utils/dist/debounce";

// 暂时弃用
@Component({
  tag: "saki-segmented",
  styleUrl: "segmented.scss",
  shadow: false,
})
export class SegmentedComponent {
  d = new Debounce();
  observer: IntersectionObserver;

  @Prop() value: string = "";

  @Prop() flexDirection: "row" | "column" = "row";
  @Prop() width: string = "100%";
  @Prop() maxWidth: string = "";
  @Prop() height: string = "30px";
  @Prop() borderRadius: string = "15px";
  @Prop() margin: string = "";
  @Prop() padding: string = "";
  @Prop() bgColor: string = "rgb(243,243,243)";
  @Prop() bgActiveColor: string = "var(--saki-default-color)";

  @State() itemList: {
    value: string;
    active: boolean;
    width: number;
    left: number;
    item: HTMLSakiSegmentedItemElement;
  }[] = [];

  @Element() el: HTMLElement;
  @Event() changevalue: EventEmitter;
  @Watch("value")
  watchValue() {
    this.getItems();
  }
  componentDidLoad() {
    this.getItems();

    // const observer = new MutationObserver(() => {
    //   console.log("MutationObserver");
    //   // this.d.increase(() => {
    //   //   this.getItems();
    //   // }, 20);
    // });
    // // 以上述配置开始观察目标节点
    // observer.observe(this.el, {
    //   attributes: true,
    //   childList: true,
    //   subtree: true,
    // });
  }
  getItems() {
    this.d.increase(() => {
      this.observer?.unobserve(this.el);
      this.observer?.disconnect();

      this.itemList = [];

      const items: NodeListOf<HTMLSakiSegmentedItemElement> =
        this.el?.querySelectorAll("saki-segmented-item");
      // console.log("items", items, this.el, items?.[0]?.offsetWidth);

      if (items.length && !items?.[0]?.offsetWidth) {
        this.observer = new IntersectionObserver(() => {
          if (items?.[0]?.offsetWidth) {
            this.getItems();
            this.observer?.unobserve(this.el);
            this.observer?.disconnect();
          }
        });
        this.observer.observe(this.el);
        return;
      }

      let left = 0;

      items?.forEach((item, index) => {
        left += index === 0 ? 0 : items[index - 1].offsetWidth;
        this.itemList.push({
          value: item.value,
          active: item.value === this.value,
          width: item.offsetWidth,
          left,
          item,
        });

        // console.log(
        //   "items",
        //   item,
        //   item.getBoundingClientRect(),
        //   item.offsetWidth
        // );
        item.active = item.value === this.value;
        item.height = this.height;
        item.borderRadius = this.borderRadius;

        item.removeEventListener("tap", this.tapFunc);
        item.addEventListener("tap", this.tapFunc);
      });
      // console.log("items", this.itemList, items, this.value);
    }, 20);
  }
  tapFunc = (e: CustomEvent) => {
    // this.value = e.detail;
    this.itemList = [...this.itemList];

    this.itemList.forEach((v, i) => {
      this.itemList[i].active = v.value === e.detail;
      this.itemList[i].item.active = v.value === e.detail;
    });

    // console.log(e, this.itemList, this);
    // this.selectvalue.emit({
    //   value: e.target.value,
    //   index: this.valueList[e.target.value],
    // });

    this.changevalue.emit(e.detail);
  };
  render() {
    const activeItem = this.itemList.filter((v) => v.active)?.[0];
    // console.log("activeItem items", activeItem);

    return (
      <div
        class={"saki-segmented-component " + (this.value ? "active" : "")}
        style={{
          ...["padding", "margin"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          "--saki-flex-direction": this.flexDirection,
          "--saki-width": this.width,
          "--saki-maxWidth": this.maxWidth,
          "--saki-height": this.height,
          "--saki-borderRadius": this.borderRadius,
          "--saki-bgColor": this.bgColor,
          "--saki-bgActiveColor": this.bgActiveColor,
        }}
      >
        <div
          style={{
            width: activeItem?.width + "px",
            left: activeItem?.left + "px",
          }}
          class={"s-active"}
        ></div>
        <div class={"s-list"}>
          <slot></slot>
        </div>
      </div>
    );
  }
}
