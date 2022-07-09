import {
  Component,
  Event,
  EventEmitter,
  Element,
  h,
  State,
  Method,
  Watch,
} from "@stencil/core";

@Component({
  tag: "saki-context-menu",
  styleUrl: "context-menu.scss",
})
export class ContextMenuComponent {
  @Element() el: Element;
  label: string = "";
  @State() compEl: Element;
  @State() contentEl: Element;
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
      if (!this.compEl) {
        this.compEl = this.el.querySelector(".saki-context-menu-component");

        this.contentEl = this.el.querySelector(".context-menu-content");
        // console.log("this.contextEl", this.el, this.contentEl);
      }
      document.body.appendChild(this.compEl);
    } else {
      document.body.removeChild(this.compEl);
    }
  }
  @Method()
  async show({ x, y, label }: { x: number; y: number; label: string }) {
    // console.log(x, y);
    this.label = label;
    this.contextMenuObj.left = x;
    this.contextMenuObj.top = y;
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
        class={"saki-context-menu-component"}
      >
        <div
          // ref={(e) => {
          //   !this.contentEl && e && (this.contentEl = e);
          // }}
          style={{
            left: this.contextMenuObj.left + "px",
            top: this.contextMenuObj.top + "px",
          }}
          class={"context-menu-content " + (this.visible ? "show" : "hide")}
        >
          <slot></slot>
        </div>
        <div
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
