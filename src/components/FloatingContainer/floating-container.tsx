import { Component, Element, Prop, h, State, Watch } from "@stencil/core";

@Component({
  tag: "saki-floating-container",
  styleUrl: "floating-container.scss",
  shadow: true,
})
export class FloatingContainerComponent {
  @State() coreEl: HTMLElement;
  @State() windowEl: HTMLElement;
  @State() startMove: boolean = false;
  @State() x: number = 0;
  @State() y: number = 0;
  @State() startX: number = -1;
  @State() startY: number = -1;
  @State() moveX: number = -1;
  @State() moveY: number = -1;
  @State() left: number = 0;
  @State() top: number = 0;
  @Prop() marginY: number = 20;
  @Prop() marginX: number = 20;
  @Prop() margin: number = 0;
  @Prop() defaultX: number = 0;
  @Prop() defaultY: number = 0;
  @Prop() keepAside: boolean = false;
  @Element() el: HTMLElement;

  @Watch("margin")
  watchMarginFunc() {
    if (this.margin) {
      this.marginX = this.margin;
      this.marginY = this.margin;
    }
  }
  @Watch("defaultX")
  watchDefaultXFunc() {
    this.x = this.defaultX;
    this.formart();
  }
  @Watch("defaultY")
  watchDefaultYFunc() {
    this.y = this.defaultY;
    this.formart();
  }
  componentWillLoad() {
    if (this.el.children.length) {
      const el: any = this.el.children[0];
      this.coreEl = el;
    }
  }
  componentDidLoad() {
    if (this.margin) {
      this.marginX = this.margin;
      this.marginY = this.margin;
    }
    this.x = this.defaultX;
    this.y = this.defaultY;

    this.formart();
  }
  formart() {
    const x = window.innerWidth - this.marginX - this.coreEl.offsetWidth;
    const y = window.innerHeight - this.marginY - this.coreEl.offsetHeight;

    let tempX = 0;
    let tempY = 0;

    if (this.keepAside) {
      tempY = this.y < this.marginY ? this.marginY : this.y < y ? this.y : y;

      if (this.x + this.coreEl.offsetWidth / 2 < window.innerWidth / 2) {
        tempX = this.marginX;
      } else {
        tempX = x;
      }
      if (this.windowEl) {
        this.windowEl.animate(
          [
            {
              left: this.x + "px",
              top: this.y + "px",
            },
            {
              left: tempX + "px",
              top: tempY + "px",
            },
          ],
          {
            duration: 100,
            iterations: 1,
          }
        ).onfinish = () => {
          this.x = tempX;
          this.y = tempY;
        };
      } else {
        this.x = tempX;
        this.y = tempY;
      }
      return;
    }
    tempX = this.x < this.marginX ? this.marginX : this.x < x ? this.x : x;
    tempY = this.y < this.marginY ? this.marginY : this.y < y ? this.y : y;

    if (this.windowEl) {
      this.windowEl.animate(
        [
          {
            left: this.x + "px",
            top: this.y + "px",
          },
          {
            left: tempX + "px",
            top: tempY + "px",
          },
        ],
        {
          duration: 100,
          iterations: 1,
        }
      ).onfinish = () => {
        this.x = tempX;
        this.y = tempY;
      };
    } else {
      this.x = tempX;
      this.y = tempY;
    }
  }
  startEvent(e: MouseEvent) {
    console.log(e);
    // if (!this.el) {
    // const el: any = e.target;
    // this.el = el;
    // }
    this.startX = e.pageX;
    this.startY = e.pageY;
  }
  moveEvent(e: MouseEvent) {
    if (this.startMove) {
      this.moveX = e.pageX - this.startX;
      this.moveY = e.pageY - this.startY;
    }
  }
  endEvent(e: MouseEvent) {
    console.log(e);
    if (this.startMove) {
      // const el: Element = e.target;
      if (!this.windowEl) {
        const el: any = e.target;
        this.windowEl = el.parentElement.querySelector(
          ".floating-container-window"
        );
      }
      this.startMove = false;
      this.x = this.x + this.moveX;
      this.y = this.y + this.moveY;
      this.startX = -1;
      this.startY = -1;
      this.moveX = -1;
      this.moveY = -1;
      this.formart();
    }
  }
  render() {
    return (
      <div
        onMouseMove={
          this.startX >= 0 &&
          ((e) => {
            if (e.which === 1 && !this.startMove && this.startX >= 0) {
              this.startMove = true;
            }
          })
        }
        class={
          "saki-floating-container-component " +
          (this.startMove ? "startMove" : "")
        }
      >
        {this.startMove ? (
          <div
            onMouseUp={this.endEvent.bind(this)}
            onMouseLeave={this.endEvent.bind(this)}
            onMouseMove={this.moveEvent.bind(this)}
            class={"floating-container-bg"}
          ></div>
        ) : (
          ""
        )}
        <div
          style={{
            left: this.x + this.moveX + "px",
            top: this.y + this.moveY + "px",
          }}
          onMouseDown={this.startEvent.bind(this)}
          class={"floating-container-window"}
        >
          <slot>
            <slot name="container"></slot>
          </slot>
        </div>
      </div>
    );
  }
}
