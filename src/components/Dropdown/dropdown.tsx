import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
  Watch,
} from "@stencil/core";

@Component({
  tag: "saki-dropdown",
  styleUrl: "dropdown.scss",
  // shadow: true,
})
export class DropdownComponent {
  @State() left: number = 0;
  @State() top: number = 0;

  @Prop({ mutable: true }) vertical: "Top" | "Bottom" = "Bottom";
  @Prop({ mutable: true }) horizontal: "Left" | "Right" = "Left";
  @Prop({ mutable: true }) floatingDirection: "Left" | "Center" = "Center";

  // @Prop() isLoad: boolean = false;
  @Prop({ mutable: true }) visible: boolean = false;
  @Prop({ mutable: true }) zIndex: number = 999;
  @Prop({ mutable: true }) width = "";
  @Prop({ mutable: true }) height = "";
  @Prop({ mutable: true }) minWidth = "";
  @Prop({ mutable: true }) minHeight = "";
  @Prop({ mutable: true }) maxWidth = "";
  @Prop({ mutable: true }) maxHeight = "";
  @State() isAddVisibleClass: boolean = false;
  @State() visibleStyle: boolean = false;

  @State() coreRect: DOMRect;
  @State() contentRect: DOMRect;

  contentEl: HTMLDivElement;
  mainEl: HTMLDivElement;
  coreEl: HTMLDivElement;
  @State() closing: boolean = false;

  @Event() tap: EventEmitter;
  @Event() open: EventEmitter;
  @Event()
  close: EventEmitter;
  // @Event() close1: EventEmitter;
  @Element() el: HTMLElement;
  @Watch("visible")
  watchVisibleFunc() {
    // console.log("dropdown watch", this.el, this.mainEl, this.visible);
    if (this.visible) {
      this.getRect();
      if (this.coreRect.width) {
        this.getDropDownElePosition();
        this.visibleStyle = true;
        this.closing = false;
        document.body.appendChild(this.mainEl);
        // console.log("this.mainEl", this.mainEl);

        // setTimeout(() => {
        this.isAddVisibleClass = true;
        // }, 10);
        this.open.emit();
      }
    } else {
      // console.log("this.close");
      this.close.emit();
      // this.close1.emit();
      this.isAddVisibleClass = false;
      // this.left = -9999;
      // this.top = -9999;

      this.closing = true;
    }
  }
  getDropDownElePosition() {
    this.getRect();
    const clientWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const clientHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    // - this.contentRect.width / 2

    // console.log(this.contentRect);
    // console.log(this.coreRect, this.coreEl.children[0]);
    switch (this.floatingDirection) {
      case "Center":
        this.left = this.formartLeft(
          this.coreRect.left + this.coreRect.width / 2
        );

        // console.log(this.contentRect);
        // console.log(this.coreRect, this.coreEl.children[0]);
        // console.log(this.coreRect.left + this.coreRect.width / 2);
        // 算右边
        // console.log(this.left, this.contentRect.width, clientWidth);
        if (this.left + this.contentRect.width > clientWidth) {
          this.left =
            clientWidth -
            this.contentRect.width -
            // this.coreRect.width -
            this.coreRect.width / 2 -
            25 -
            (clientWidth - this.coreRect.right);
        }
        break;
      case "Left":
        this.left = this.formartLeft(this.coreRect.left);
        // console.log(
        //   this.left,
        //   this.contentRect,
        //   this.contentEl,
        //   this.contentEl.offsetWidth,
        //   this.contentEl.getBoundingClientRect(),
        //   this.contentRect.width,
        //   clientWidth,
        //   this.left + this.contentRect.width > clientWidth
        // );

        if (this.left + this.contentRect.width > clientWidth) {
          this.left =
            clientWidth -
            this.contentRect.width -
            // this.coreRect.width -
            25 -
            (clientWidth - this.coreRect.right);
        }
        break;

      default:
        break;
    }
    this.top = this.formartTop(this.coreRect.top + this.coreRect.height / 2);

    // console.log(this.top);
    // 当内容在顶部、且高度超过浏览器高度、则会出现内容在顶部之上的情况
    // console.log(
    //   "this.top +",
    //   this.top,
    //   this.contentRect,
    //   this.coreRect.height,
    //   this.coreRect,
    //   clientHeight
    // );
    if (this.top + this.contentRect.height > clientHeight) {
      this.top =
        // clientHeight -
        this.coreRect.top +
        // this.coreRect.height / 2 -
        +10 -
        // this.coreRect.height / 2 -
        // 10 -
        this.contentRect.height;
      // -
      //   (clientHeight - this.coreRect.bottom);
    }
    // console.log(this.coreRect.left, this.coreRect.top);
    // console.log(this.left, this.top);
    // console.log(
    //   "",
    //   this.coreRect,
    //   this.contentRect,
    //   clientHeight,
    //   this.top,
    //   this.coreRect.top > this.top,
    //   this.top + this.contentRect.height > clientHeight
    // );
    if (this.coreRect.top > this.top) {
      this.vertical = "Bottom";
    } else {
      this.vertical = "Top";
    }
    if (this.coreRect.left > this.left) {
      this.horizontal = "Left";
    } else {
      this.horizontal = "Right";
    }
    // console.log(this.direction);
  }
  formartTop(top: number) {
    return top < 10 ? 10 : top;
  }
  formartLeft(left: number) {
    return left < 10 ? 10 : left;
  }
  getRect() {
    this.contentRect = this.contentEl.getBoundingClientRect();
    this.contentRect.width = this.contentEl.offsetWidth;
    this.contentRect.height = this.contentEl.offsetHeight;
    // console.log(this.coreEl.children[0])
    this.coreRect = this.coreEl.children[0].getBoundingClientRect();
  }
  removeRect() {
    this.contentRect = null;
    this.coreRect = null;
  }
  componentWillLoad() {
    // console.log("componentWillLoad");
    window.addEventListener("resize", () => {
      this.getRect();
      this.getDropDownElePosition();
    });
  }
  componentDidLoad() {
    // console.log("componentDidLoad");
    // setTimeout(() => {
    // }, 1000);
  }
  render() {
    return (
      <div class={"saki-dropdown-component "}>
        <div
          ref={(e) => {
            this.coreEl = e;
          }}
          class={"dropdown-core "}
        >
          <slot></slot>
        </div>
        <div
          ref={(e) => {
            !this.mainEl && e && (this.mainEl = e);
          }}
          style={{
            "--saki-dropdown-x": this.horizontal === "Left" ? "10px" : "-10px",
            "--saki-dropdown-y": this.vertical === "Top" ? "-10px" : "10px",
          }}
          class={
            "saki-dropdown-main " +
            (this.visibleStyle ? "visibleStyle " : " ") +
            (this.isAddVisibleClass ? "visible " : " ") +
            this.vertical +
            " " +
            this.horizontal
          }
        >
          <div
            onContextMenu={(e) => {
              e.preventDefault();
              return false;
            }}
            onMouseDown={() => {
              this.visible = false;
            }}
            style={{
              zIndex: String(this.zIndex - 1),
            }}
            class={"main-bg "}
          ></div>
          <div
            ref={(e) => {
              this.contentEl = e;
            }}
            style={{
              left: this.left + "px",
              top: this.top + "px",
              ...[
                "width",
                "height",
                "minWidth",
                "minHeight",
                "maxWidth",
                "maxHeight",
              ].reduce(
                (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
                {}
              ),
              zIndex: String(this.zIndex),
            }}
            onTransitionEnd={() => {
              if (this.closing && document.body.contains(this.mainEl)) {
                this.visibleStyle = false;
                this.el
                  .querySelector(".saki-dropdown-component")
                  .appendChild(this.mainEl);
                // document.body.removeChild(this.mainEl);
              }
            }}
            class={"main-content scrollBarDefault saki-images-lazyload"}
          >
            <slot name="main"></slot>
          </div>
        </div>
      </div>
    );
  }
}
