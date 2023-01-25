import { Component, h, Prop, Element, Method } from "@stencil/core";
import { v4 as uuidv4 } from "uuid";

@Component({
  tag: "saki-row",
  styleUrl: "layout.scss",
  shadow: true,
})
export class MenuItemComponent {
  id: string = uuidv4();
  @Prop() flexDirection = "row";
  @Prop() justifyContent = "";
  @Prop() alignItems = "";
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() width = "";
  @Prop() height = "";
  @Element() el: HTMLDivElement;
  componentWillLoad() {
    this.width && (this.el.style.width = this.width);
    this.height && (this.el.style.height = this.height);
    const observer = new MutationObserver(this.watchDom.bind(this));
    this.watchDom();
    // 以上述配置开始观察目标节点
    observer.observe(this.el, {
      attributes: false,
      childList: true,
      subtree: false,
    });
  }
  componentDidLoad() {}
  @Method()
  async getId() {
    return this.id;
  }
  watchDom() {
    const list = this.el?.children;
    // console.log(list);
    for (let i = 0; i < list.length; i++) {
      if (list[i].localName === "saki-col") {
        const el: HTMLSakiColElement = list[i] as any;
        // console.log(el, el.span);
        el.span && (el.style.flex = String(el.span));
      }
    }
    // list?.forEach((item, index) => {
    //   console.log(item);
    //   console.log(item.parentElement.localName);
    // });
  }
  render() {
    return (
      <div
        style={{
          ...[
            "margin",
            "padding",
            "flexDirection",
            "justifyContent",
            "alignItems",
            "width",
            "height",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-row-component "}
      >
        <slot></slot>
      </div>
    );
  }
}
