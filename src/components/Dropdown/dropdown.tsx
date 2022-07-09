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
  @Event() close: EventEmitter;
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
        // console.log("this.contentEl", this.contentEl);

        // setTimeout(() => {
        this.isAddVisibleClass = true;
        // }, 10);
        this.open.emit();
      }
    } else {
      this.close.emit();
      this.isAddVisibleClass = false;
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
            10 -
            (clientWidth - this.coreRect.right);
        }
        break;
      case "Left":
        this.left = this.formartLeft(
          this.coreRect.left 
        );
        if (this.left + this.contentRect.width > clientWidth) {
          this.left =
            clientWidth -
            this.contentRect.width -
            // this.coreRect.width -
            10 -
            (clientWidth - this.coreRect.right);
        }
        break;

      default:
        break;
    }
    this.top = this.formartTop(this.coreRect.top + this.coreRect.height / 2);

    if (this.top + this.contentRect.height > clientHeight) {
      this.top =
        clientHeight -
        this.coreRect.height / 2 -
        this.contentRect.height -
        10 -
        (clientHeight - this.coreRect.bottom);
    }
    // console.log(this.coreRect.left, this.coreRect.top);
    // console.log(this.left, this.top);
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
            class={"main-bg "}
          ></div>
          <div
            ref={(e) => {
              this.contentEl = e;
            }}
            style={{
              left: this.left + "px",
              top: this.top + "px",
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
            class={"main-content "}
          >
            <slot name="main"></slot>
          </div>
        </div>
      </div>
    );
  }
}
