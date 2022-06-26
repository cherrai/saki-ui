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
  tag: "saki-modal",
  styleUrl: "modal.scss",
  // shadow: true,
})
export class ModalComponent {
  @Prop() visible: boolean = false;
  @State() isAddVisibleClass: boolean = false;
  @State() visibleStyle: boolean = false;
  contetnEl: HTMLElement;
  @Prop() backgroundColor: string = "";
  @Prop() width: string = "";
  @Prop() height: string = "";
  @Prop() minWidth: string = "";
  @Prop() minHeight: string = "";
  @Prop() maxWidth: string = "";
  @Prop() maxHeight: string = "";
  @Prop() mask: boolean = false;
  @Prop() maskBackgroundColor: string = "";
  @Prop() maskClosable: boolean = false;
  @State() closing: boolean = false;

  @Event({
    bubbles: false,
  })
  tap: EventEmitter;

  @Event({
    bubbles: false,
  })
  open: EventEmitter;

  @Event({
    bubbles: false,
  })
  close: EventEmitter;
  @Element() el: HTMLElement;
  @Watch("visible")
  watchVisibleFunc() {
    if (this.visible) {
      this.closing = false;
      this.open.emit();
      this.visibleStyle = true;
      document.body.appendChild(this.contetnEl);
      setTimeout(() => {
        this.isAddVisibleClass = true;
      });
    } else {
      this.close.emit();
      this.isAddVisibleClass = false;
      this.closing = true;
    }
  }
  componentDidLoad() {}
  render() {
    return (
      <div
        ref={(e) => {
          this.contetnEl = e;
          // if (!this.contetnEl && e) {
          //   this.contetnEl = e;
          // }
        }}
        style={
          {
            // display: this.visibleStyle ? "block" : "none",
          }
        }
        class={
          "saki-modal-component " +
          (this.visibleStyle ? "visibleStyle " : "") +
          (this.isAddVisibleClass ? "visible" : "")
        }
      >
        {this.mask ? (
          <div
            onClick={() => {
              if (this.maskClosable) {
                this.visible = false;
              }
            }}
            style={{
              backgroundColor: this.maskBackgroundColor,
            }}
            class={"model-bg " + (this.isAddVisibleClass ? "visible" : "")}
          ></div>
        ) : (
          ""
        )}

        <div
          style={{
            ...[
              "maxWidth",
              "maxHeight",
              "minWidth",
              "minHeight",
              "height",
              "width",
              "backgroundColor",
            ].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
          }}
          onTransitionEnd={() => {
            if (this.closing && document.body.contains(this.contetnEl)) {
              this.visibleStyle = false;
              this.el.appendChild(this.contetnEl);
              // document.body.removeChild(this.contetnEl);
            }
          }}
          class={"model-content " + (this.isAddVisibleClass ? "visible" : "")}
        >
          <slot></slot>
        </div>
      </div>
    );
  }
}
