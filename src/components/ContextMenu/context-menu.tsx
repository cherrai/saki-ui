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
  @Prop({ mutable: true }) zIndex: number = 1100;
  @Element() el: Element;
  label: string = "";
  compEl: HTMLDivElement;
  contentEl: HTMLDivElement;
  @State() visible: boolean = false;
  @State() updateTime = 0;
  @State() contextMenuObj = {
    left: 0,
    top: 0,
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
    // console.log(
    //   x + this.contentEl.offsetWidth,
    //   y + this.contentEl.offsetHeight,
    //   window.innerWidth,
    //   window.innerHeight,
    //   this.contentEl.offsetWidth,
    //   this.contentEl.offsetHeight
    // );
    this.label = label;
    this.contextMenuObj.left =
      x + this.contentEl.offsetWidth < window.innerWidth - 10
        ? x
        : window.innerWidth - 10 - this.contentEl.offsetWidth;
    this.contextMenuObj.top =
      y + this.contentEl.offsetHeight < window.innerHeight - 10
        ? y
        : window.innerHeight - 10 - this.contentEl.offsetHeight;
    this.visible = true;
    this.updateTime = new Date().getTime();
  }
  @Method()
  async hide() {
    this.addCloseAnimate();
  }
  addCloseAnimate() {
    this.close.emit();
    const animate = this.contentEl.animate(
      [
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
      this.fullclose.emit();
    };
  }
  componentWillLoad() {}
  componentDidLoad() {
    const menuList = this.el.querySelectorAll("saki-context-menu-item");
    if (menuList?.length) {
      menuList.forEach((v, i) => {
        v.addEventListener("tap", () => {
          this.addCloseAnimate();
          this.selectvalue.emit({
            index: i,
            value: v.value,
            label: this.label,
          });
        });
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
          }}
          style={{
            left: this.contextMenuObj.left + "px",
            top: this.contextMenuObj.top + "px",
            zIndex: String(this.zIndex),
          }}
          class={"context-menu-content " + (this.visible ? "show" : "hide")}
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
