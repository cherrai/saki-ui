import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
} from "@stencil/core";

@Component({
  tag: "saki-menu",
  styleUrl: "menu.scss",
  shadow: true,
})
export class MenuComponent {
  @State() left: number = 0;
  @State() top: number = 0;
  @State() valueList: {
    [value: string]: number;
  } = {};

  @Prop() direction: "Top" | "Bottom" = "Bottom";
  @Prop() padding: string = "6px 0";

  @Event() selectvalue: EventEmitter;
  @Event() dragdone: EventEmitter;
  @Element() el: HTMLElement;

  // @Method()
  // async dragTo(el: HTMLSakiMenuItemElement) {
  //   console.log(el);
  // }
  componentWillLoad() {}
  componentDidLoad() {
    // console.log("this.el", this.el);
    const observer = new MutationObserver(this.watchDom.bind(this));
    this.watchDom();
    // 以上述配置开始观察目标节点
    observer.observe(this.el, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }
  tapFunc = (e: any) => {
    this.selectvalue.emit({
      value: e.target.value,
      index: this.valueList[e.target.value],
    });
  };
  watchDom() {
    // console.log(this.el);
    const list: NodeListOf<HTMLSakiMenuItemElement> =
      this.el?.querySelectorAll("saki-menu-item");
    list?.forEach((item, index) => {
      this.valueList[item.value] = index;

      item.removeEventListener("tap", this.tapFunc);
      item.addEventListener("tap", this.tapFunc);
    });
  }
  render() {
    return (
      <div
        style={{
          padding: this.padding,
        }}
        class={"saki-menu-component "}
      >
        <slot></slot>
      </div>
    );
  }
}
