import {
  Component,
  Event,
  EventEmitter,
  Element,
  h,
  State,
  Method,
  Watch,
  Prop,
} from "@stencil/core";

@Component({
  tag: "saki-context-menu",
  styleUrl: "context-menu.scss",
})
export class ContextMenuComponent {
  list: NodeListOf<HTMLSakiContextMenuItemElement>;
  @Prop({ mutable: true }) zIndex: number = 1100;
  @Element() el: Element;
  label: string = "";
  compEl: HTMLDivElement;
  contentEl: HTMLDivElement;
  @State() visible: boolean = false;
  @State() showContent: boolean = false;
  @State() contentWidth = 0;
  @State() contentHeight = 0;
  @State() updateTime = 0;
  @State() contextMenuObj = {
    left: 0,
    top: 0,
    x: 0,
    y: 0,
  };
  @Event() close: EventEmitter;
  @Event() fullclose: EventEmitter;
  @Event() selectvalue: EventEmitter<{
    index: number;
    value: string;
    label: string;
  }>;
  @Watch("visible")
  watchVisible() {
    if (this.visible) {
      // if (!this.compEl) {
      //   this.compEl = this.el.querySelector(".saki-context-menu-component");

      //   this.contentEl = this.el.querySelector(".context-menu-content");
      //   // console.log("this.contextEl", this.el, this.contentEl);
      // }
      document.body.appendChild(this.compEl);
    } else {
      document.body.removeChild(this.compEl);
      this.el.appendChild(this.compEl);
    }
  }
  @Method()
  async show({ x, y, label }: { x: number; y: number; label: string }) {
    this.visible = true;
    setTimeout(() => {
      // console.log(
      //   x,
      //   y,
      //   x + this.contentEl.offsetWidth,
      //   y + this.contentEl.offsetHeight,
      //   window.innerWidth,
      //   window.innerHeight,
      //   this.contentEl,
      //   document.body.querySelector(".context-menu-content"),
      //   document.body.querySelector(".context-menu-content").clientWidth,
      //   this.contentEl.clientWidth,
      //   this.contentEl.offsetWidth,
      //   this.contentEl.offsetHeight
      // );
      // console.log(x + this.contentEl.offsetWidth < window.innerWidth - 10);

      this.label = label;
      this.getPosition(x, y);
      this.contextMenuObj.x = x;
      this.contextMenuObj.y = y;
      this.updateTime = new Date().getTime();
      const animate = this.contentEl.animate(
        [
          {
            opacity: "0",
          },
          {
            opacity: "1",
          },
        ],
        {
          duration: 150,
          iterations: 1,
        }
      );
      animate.onfinish = () => {
        this.showContent = true;
      };
    });
  }
  @Method()
  async hide() {
    this.addCloseAnimate();
  }
  getPosition(x: number, y: number) {
    this.contextMenuObj.left =
      x + this.contentWidth < window.innerWidth - 10
        ? x
        : window.innerWidth - 10 - this.contentWidth;

    // console.log(
    //   this.contentEl,
    //   y,
    //   this.contentEl.clientHeight,
    //   window.innerHeight
    // );
    this.contextMenuObj.top =
      y + this.contentHeight < window.innerHeight - 10
        ? y
        : window.innerHeight - 10 - this.contentHeight;
  }
  addCloseAnimate() {
    this.close.emit();
    const animate = this.contentEl.animate(
      [
        {
          opacity: "1",
        },
        {
          opacity: "0",
        },
      ],
      {
        duration: 150,
        iterations: 1,
      }
    );
    animate.onfinish = () => {
      this.visible = false;
      this.showContent = false;
      this.fullclose.emit();
    };
  }
  componentWillLoad() {}
  componentDidLoad() {
    const observer = new MutationObserver(this.watchDom.bind(this));
    this.watchDom();
    // 以上述配置开始观察目标节点
    observer.observe(this.el, {
      attributes: false,
      childList: true,
      subtree: false,
    });
  }
  tapFunc = (e: any) => {
    this.addCloseAnimate();
    this.selectvalue.emit({
      index: e.detail.index,
      value: e.detail.value,
      label: this.label,
    });
  };
  watchDom() {
    this.list = this.el.querySelectorAll("saki-context-menu-item");
    if (this.list?.length) {
      this.list.forEach((v, i) => {
        v.setIndex(i);
        v.removeEventListener("tap", this.tapFunc);
        v.addEventListener("tap", this.tapFunc);
      });

      // for (const key in this.el.children) {
      //   if (Object.prototype.hasOwnProperty.call(this.el.children, key)) {
      //     const element = this.el.children[key];
      //     element.addEventListener("tap", () => {});
      //   }
      // }
    }
  }
  render() {
    return (
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          return false;
        }}
        ref={(e) => {
          e && (this.compEl = e);
        }}
        class={
          "saki-context-menu-component " + (this.visible ? "show" : "hide")
        }
      >
        <div
          ref={(e) => {
            e && (this.contentEl = e);
            if (
              (e.offsetWidth && e.offsetWidth !== this.contentWidth) ||
              (e.offsetHeight && e.offsetHeight !== this.contentHeight)
            ) {
              setTimeout(() => {
                e.offsetWidth &&
                  e.offsetWidth !== this.contentWidth &&
                  (this.contentWidth = e.offsetWidth);
                e.offsetHeight &&
                  e.offsetHeight !== this.contentHeight &&
                  (this.contentHeight = e.offsetHeight);
                this.getPosition(this.contextMenuObj.x, this.contextMenuObj.y);
              });
            }
          }}
          style={{
            left: this.contextMenuObj.left + "px",
            top: this.contextMenuObj.top + "px",
            zIndex: String(this.zIndex),
          }}
          class={"context-menu-content " + (this.showContent ? "show" : "hide")}
        >
          <slot></slot>
        </div>
        <div
          style={{
            zIndex: String(this.zIndex - 1),
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            return false;
          }}
          onMouseDown={() => {
            this.addCloseAnimate();
          }}
          onClick={() => {
            // this.visible = false;
            // this.close.emit();
          }}
          class={"context-menu-content-bg " + (this.visible ? "show" : "hide")}
        ></div>
      </div>
    );
  }
}
