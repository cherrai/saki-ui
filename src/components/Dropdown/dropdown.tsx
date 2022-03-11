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

  @Prop() direction: "Top" | "Bottom" = "Bottom";
  // @Prop() isLoad: boolean = false;
  @Prop({ mutable: true }) visible: boolean = false;
  @State() isAddVisibleClass: boolean = false;
  @State() visibleStyle: boolean = false;

  @State() coreRect: DOMRect;
  @State() contentRect: DOMRect;

  @State() contentEl: HTMLDivElement;
  @State() mainEl: HTMLDivElement;
  @State() coreEl: HTMLDivElement;
  @State() closing: boolean = false;

  @Event() tap: EventEmitter;
  @Event() open: EventEmitter;
  @Event() close: EventEmitter;
  @Element() el: HTMLElement;
  @Watch("visible")
  watchVisibleFunc() {
    // console.log("watch", this.visible);
    if (this.visible) {
      this.getRect();
      this.visibleStyle = true;
      this.closing = false;
      document.body.appendChild(this.mainEl);
      this.getDropDownElePosition();
      // console.log("this.contentEl", this.contentEl);

      // setTimeout(() => {
      this.isAddVisibleClass = true;
      // }, 10);
      this.open.emit();
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

    this.left = this.formartLeft(
      this.coreRect.left - this.contentRect.width / 2
    );
    // 算右边
    if (this.left + this.contentRect.width > clientWidth) {
      this.left =
        clientWidth -
        this.contentRect.width -
        this.coreRect.width / 2 -
        10 -
        (clientWidth - this.coreRect.right);
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
  }
  formartTop(top: number) {
    return top < 10 ? 10 : top;
  }
  formartLeft(left: number) {
    return left < 10 ? 10 : left;
  }
  getRect() {
    this.contentRect = this.contentEl.getBoundingClientRect();
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
            !this.coreEl && e && (this.coreEl = e);
          }}
          class="dropdown-core"
        >
          <slot></slot>
        </div>
        <div
          ref={(e) => {
            !this.mainEl && e && (this.mainEl = e);
          }}
          class={
            "saki-dropdown-main " +
            (this.visibleStyle ? "visibleStyle " : "") +
            (this.isAddVisibleClass ? "visible" : "")
          }
        >
          <div
            onClick={() => {
              this.visible = false;
            }}
            class={"main-bg "}
          ></div>
          <div
            ref={(e) => {
              !this.contentEl && e && (this.contentEl = e);
            }}
            style={{
              left: this.left + "px",
              top: this.top + "px",
            }}
            onTransitionEnd={() => {
              if (this.closing && document.body.contains(this.mainEl)) {
                this.visibleStyle = false;
                document.body.removeChild(this.mainEl);
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
