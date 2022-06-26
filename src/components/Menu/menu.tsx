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

  @Prop() direction: "Top" | "Bottom" = "Bottom";

  @Event() selectvalue: EventEmitter;
  @Element() el: HTMLElement;
  componentDidLoad() {
    const observer = new MutationObserver(this.watchDom);
    this.watchDom();
    // 以上述配置开始观察目标节点
    observer.observe(this.el, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }
  watchDom() {
    let valueList: {
      [value: string]: number;
    } = {};

    const tapFunc = (e: any) => {
      this.selectvalue.emit({
        value: e.target.value,
        index: valueList[e.target.value],
      });
    };
    // console.log(this.el);
    const list: NodeListOf<HTMLSakiMenuItemElement> =
      this.el?.querySelectorAll("saki-menu-item");
    list?.forEach((item, index) => {
      valueList[item.value] = index;
      item.removeEventListener("tap", tapFunc);
      item.addEventListener("tap", tapFunc);
    });
  }
  render() {
    return (
      <div class={"saki-menu-component "}>
        <slot></slot>
      </div>
    );
  }
}
