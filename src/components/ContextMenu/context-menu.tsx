import { getShortId } from "@nyanyajs/utils/dist/shortId";
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
  @Prop() id = getShortId(7);
  list: NodeListOf<HTMLSakiContextMenuItemElement>;
  @Prop({ mutable: true }) zIndex: number = 1100;
  @Element() el: Element;
  @Prop({ mutable: true }) label: string = "";
  compEl: HTMLDivElement;
  contentEl: HTMLDivElement;
  @State() visible: boolean = false;
  @State() showContent: boolean = false;
  @State() contentWidth = 0;
  @State() contentHeight = 0;
  // @State() maxHeight = "";
  @State() updateTime = 0;
  @State() contextMenuObj = {
    left: 0,
    top: 0,
    x: 0,
    y: 0,
  };
  @Event() close: EventEmitter;
  @Event() closeParentMenu: EventEmitter;
  @Event() fullclose: EventEmitter;
  @Event() selectvalue: EventEmitter<{
    index: number;
    value: string;
    label: string;
    values: {
      index: number;
      value: string;
      label: string;
    }[];
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
  async show({
    x,
    y,
    label,
    showContent = true,
  }: {
    x: number;
    y: number;
    label: string;
    showContent?: boolean;
  }) {
    if (window) {
      if (!window["contextMenuStatusMap"]) {
        window["contextMenuStatusMap"] = {};
      }
      window["contextMenuStatusMap"][this.id] = true;
    }
    this.watchDom();
    this.visible = true;

    // console.log("initSubMenu show", this.list);

    // const contentEl = this.el.querySelector(".context-menu-content");

    // this.list = this.el.querySelectorAll("saki-context-menu-item");
    // console.log("initSubMenu watchj list", this.list);

    showContent &&
      setTimeout(() => {
        this.list.forEach((el) => {
          el.show(label);
        });

        if (label) {
          this.label = label;
        }
        // console.log("this.label", this.label, label);
        this.getPosition(x, y);
        this.contextMenuObj.x = x;
        this.contextMenuObj.y = y;
        this.updateTime = new Date().getTime();
        const animate = this.contentEl.animate(
          [
            {
              opacity: "0",
              transform: "translate(-10px,0)",
            },
            {
              opacity: "1",
              transform: "translate(0,0)",
            },
          ],
          {
            duration: 150,
            iterations: 1,
          }
        );
        animate.onfinish = () => {
          this.showContent = true;
          // console.log(this.el.getBoundingClientRect());
        };
      });
  }
  @Method()
  async hide() {
    this.addCloseAnimate();
    this.list.forEach((el) => {
      el.closeSubMenu();
    });
  }
  @Method()
  async hideOnlyMenu() {
    console.log("hideOnlyMenu");
    this.addCloseAnimate();
    this.closeParentMenu.emit();
  }
  getPosition(x: number, y: number) {
    const contentWidth = this.contentWidth;
    const contentHeight = this.contentHeight;
    this.contextMenuObj.left =
      x + contentWidth <= window.innerWidth - 30
        ? x
        : window.innerWidth - 30 - contentWidth;

    // console.log(
    //   this.contentEl,
    //   y,
    //   this.contentEl.clientHeight,
    //   window.innerHeight
    // );
    this.contextMenuObj.top =
      y + contentHeight < window.innerHeight - 20
        ? y
        : window.innerHeight - 20 - contentHeight;

    this.contextMenuObj.left =
      this.contextMenuObj.left < 10
        ? window.innerWidth - contentWidth - 20
        : this.contextMenuObj.left;
    this.contextMenuObj.top =
      this.contextMenuObj.top < 10
        ? window.innerHeight - contentHeight - 20
        : this.contextMenuObj.top;

    this.contextMenuObj.left =
      this.contextMenuObj.left < 10 ? 10 : this.contextMenuObj.left;
    this.contextMenuObj.top =
      this.contextMenuObj.top < 10 ? 10 : this.contextMenuObj.top;

    // 内容超出屏幕
    // console.log("ctm", y, contentHeight, window.innerHeight);
    // console.log(
    //   "ctm",
    //   this.contextMenuObj.top,
    //   this.contextMenuObj.top < 10,
    //   y + contentHeight,
    //   this.contentEl.offsetHeight >= window.innerHeight,
    //   y + contentHeight < window.innerHeight - 20
    // );
    // this.maxHeight = "";
    // if (this.contentEl.offsetHeight >= window.innerHeight) {
    //   this.maxHeight = window.innerHeight - 20 + "px";
    // }
    // console.log("ctm", this.maxHeight);
  }
  addCloseAnimate() {
    window["contextMenuStatusMap"][this.id] = false;
    this.close.emit();
    const animate = this.contentEl.animate(
      [
        {
          opacity: "1",
          transform: "translate(0,0)",
        },
        {
          opacity: "0",
          transform: "translate(-10px,0)",
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
    // const observer = new MutationObserver(this.watchDom.bind(this));
    this.watchDom();
    // 以上述配置开始观察目标节点
    // observer.observe(this.el, {
    //   attributes: false,
    //   childList: true,
    //   subtree: false,
    // });
  }
  watchDom() {
    this.list = document.body.querySelectorAll(
      `.context-menu-content.${this.id}>saki-context-menu-item`
    );
    // console.log("initSubMenu watchj list", this.list);
    if (this.list?.length) {
      this.list.forEach((v, i) => {
        v.setIndex(i);
        v.setParentId(this.id);
        v.removeEventListener("tap", this.tapFunc);
        v.addEventListener("tap", this.tapFunc);
        v.removeEventListener("closeMenu", this.closeMenuFunc);
        v.addEventListener("closeMenu", this.closeMenuFunc);
        v.removeEventListener("closeMenu", this.closeMenuFunc);
        v.addEventListener("closeMenu", this.closeMenuFunc);
        v.removeEventListener("onlyCloseMenu", this.onlyCloseMenuFunc);
        v.addEventListener("onlyCloseMenu", this.onlyCloseMenuFunc);
      });

      // for (const key in this.el.children) {
      //   if (Object.prototype.hasOwnProperty.call(this.el.children, key)) {
      //     const element = this.el.children[key];
      //     element.addEventListener("tap", () => {});
      //   }
      // }
    }
  }
  onlyCloseMenuFunc = () => {
    this.hideOnlyMenu();
  };
  tapFunc = (e: any) => {
    if (e.detail.close) {
      this.addCloseAnimate();
      // this.list.forEach((el) => {
      //   el.closeSubMenu();
      // });
      this.selectvalue.emit({
        index: e.detail.index,
        value: e.detail.value,
        label: this.label,
        values: [
          {
            index: e.detail.index,
            value: e.detail.value,
            label: this.label,
          },
        ],
      });
    }
    // console.log("关闭其他modal", this.list);
    this.list.forEach((el, i) => {
      if (i !== e.detail.index) {
        el.closeSubMenu();
      }
    });
  };
  closeMenuFunc = (e: any) => {
    // console.log("closeMenuFunc", e.detail);
    this.addCloseAnimate();

    const value = e.detail.values.length
      ? e.detail.values[0]
      : {
          index: e.detail.index,
          value: e.detail.value,
          label: this.label,
        };
    this.selectvalue.emit({
      index: value.index,
      value: value.value,
      label: value.label,
      values: e.detail.values.concat([
        {
          index: e.detail.index,
          value: e.detail.value,
          label: this.label,
        },
      ]),
    });
  };
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
          "saki-context-menu-component " +
          this.id +
          " " +
          (this.visible ? "show" : "hide")
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
            // maxHeight: this.maxHeight,
          }}
          class={
            "context-menu-content scrollBarHover " +
            this.id +
            " " +
            (this.showContent ? "show" : "hide")
          }
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
            this.hide();
            this.closeParentMenu.emit();
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
