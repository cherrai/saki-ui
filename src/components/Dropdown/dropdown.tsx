import { getShortId } from "@nyanyajs/utils/dist/shortId";
import { Debounce } from "@nyanyajs/utils/dist/debounce";
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
import { sakiuiEventListener } from "../../store/config";

@Component({
  tag: "saki-dropdown",
  styleUrl: "dropdown.scss",
  // shadow: true,
})
export class DropdownComponent {
  @State() d = new Debounce();

  @State() left: number = 0;
  @State() top: number = 0;
  @State() id = getShortId(9);

  @Prop({ mutable: true }) vertical: "Top" | "Bottom" = "Bottom";
  @Prop({ mutable: true }) horizontal: "Left" | "Right" = "Left";
  @Prop({ mutable: true }) floatingDirection: "Left" | "Center" = "Center";

  // @Prop() isLoad: boolean = false;
  @Prop({ mutable: true }) visible: boolean = false;
  @Prop({ mutable: true }) zIndex: number = 1099;
  @Prop({ mutable: true }) width = "";
  @Prop({ mutable: true }) height = "";
  @Prop({ mutable: true }) minWidth = "";
  @Prop({ mutable: true }) minHeight = "";
  @Prop({ mutable: true }) maxWidth = "";
  @Prop({ mutable: true }) maxHeight = "";

  @Prop({ mutable: true }) offsetX = 0;
  @Prop({ mutable: true }) offsetY = 0;

  @Prop() mask: boolean = false;
  @Prop() maskClosable: boolean = false;
  @Prop() bodyClosable: boolean = true;
  @Prop() displayNone: boolean = false;

  @State() bodyPosition: string = "";

  @State() isAddVisibleClass: boolean = false;
  @State() visibleStyle: boolean = false;

  @State() positionAnimation: boolean = false;

  @State() coreRect: DOMRect;
  @State() contentRect: DOMRect;

  contentEl: HTMLDivElement;
  mainEl: HTMLDivElement;
  coreEl: HTMLDivElement;
  @State() closing: boolean = false;

  @Event() tap: EventEmitter;
  @Event() open: EventEmitter;
  @Event({
    bubbles: false,
    composed: false,
  })
  close: EventEmitter;
  // @Event() close1: EventEmitter;
  @Element() el: HTMLElement;
  // @Watch("width")
  // watchWidth() {
  //   setTimeout(() => {
  //     this.getDropDownElePosition();
  //   }, 300);
  // }
  // @Watch("height")
  // watchHeight() {
  //   setTimeout(() => {
  //     this.getDropDownElePosition();
  //   }, 300);
  // }
  @Watch("visible")
  watchVisibleFunc() {
    // console.log("dropdown watch bodyClosable", this, this.mainEl, this.visible);
    if (this.visible) {
      // console.log(this.mask);
      if (!this.mask) {
        this.bodyPosition = document.body.style.position;
        if (!this.bodyPosition) {
          document.body.style.position = "relative";
        }
      }

      document.body.style.display = "rep";
      // console.log(this.coreRect.width);
      this.getRect();
      this.getDropDownElePosition();
      if (this.coreRect.width) {
        this.visibleStyle = true;
        this.closing = false;
        document.body.appendChild(this.mainEl);
        // console.log("this.mainEl", this.mainEl);

        setTimeout(() => {
          this.getRect();
          this.getDropDownElePosition();
          this.open.emit();

          const animate = this.contentEl.animate(
            [
              {
                opacity: "0",
                transform: ` translate(${
                  this.horizontal === "Left" ? "10px" : "-10px"
                },${this.vertical === "Top" ? "-10px" : "10px"})`,
              },
              {
                opacity: "1",
                transform: "translate(0,0)",
              },
            ],
            {
              duration: 100,
              iterations: 1,
            }
          );
          animate.onfinish = () => {
            this.isAddVisibleClass = true;

            this.bodyClosable &&
              sakiuiEventListener.on(
                "body-click:dropdown-event-" + this.id,
                this.bodyClientEvent.bind(this)
              );
            // console.log(this.el.getBoundingClientRect());
          };
          // setTimeout(() => {
          //   this.bodyClosable &&
          //     sakiuiEventListener.on(
          //       "body-click:dropdown-event-" + this.id,
          //       this.bodyClientEvent.bind(this)
          //     );
          //   // console.log("this.bodyClosable",this.bodyClosable,this.id)
          // }, 300);
        }, 10);
      }
    } else {
      if (!this.mask) {
        if (!this.bodyPosition) {
          document.body.style.position = "";
        }
      }
      // console.log("this.close");
      // this.close1.emit();
      this.isAddVisibleClass = false;
      // this.left = -9999;
      // this.top = -9999;
      this.bodyClosable &&
        sakiuiEventListener.removeEvent("body-click:dropdown-event-" + this.id);

      this.closing = true;

      const animate = this.contentEl.animate(
        [
          {
            opacity: "1",
            transform: "translate(0,0)",
          },
          {
            opacity: "0",
            transform: ` translate(${
              this.horizontal === "Left" ? "10px" : "-10px"
            },${this.vertical === "Top" ? "-10px" : "10px"})`,
          },
        ],
        {
          duration: 100,
          iterations: 1,
        }
      );
      animate.onfinish = () => {
        this.removeMainEl();
        this.close.emit();
      };
    }
  }
  removeMainEl() {
    if (document.body.contains(this.mainEl)) {
      this.visibleStyle = false;
      this.el
        .querySelector(".saki-dropdown-component")
        .appendChild(this.mainEl);
      // document.body.removeChild(this.mainEl);
    }
  }
  getDropDownElePosition() {
    // console.log("getDropDownElePosition", this.contentRect);
    if (!this.contentRect?.width) return;
    // this.getRect();
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
    // console.log("dddddd", this.floatingDirection);
    switch (this.floatingDirection) {
      case "Center":
        this.left = this.formartLeft(
          this.coreRect.left + this.coreRect.width / 2
        );

        // 算右边
        break;
      case "Left":
        this.left = this.formartLeft(this.coreRect.left);

        break;

      default:
        break;
    }
    // console.log("cccccccccccccccccc", this.left, this.contentRect);
    if (this.left + this.contentRect.width > clientWidth) {
      this.left =
        clientWidth -
        this.contentRect.width -
        // this.coreRect.width -
        this.coreRect.width / 2 -
        25 -
        (clientWidth - this.coreRect.right);
    }
    // console.log("this.formartLeft(this.left)",this.left, this.formartLeft(this.left));
    this.left = this.formartLeft(this.left) + this.offsetX;
    // console.log(this.top);
    // 当内容在顶部、且高度超过浏览器高度、则会出现内容在顶部之上的情况

    // console.log("ttttttt", this.coreRect, this.top);
    // console.log("ttttttt", this.top + this.contentRect.height > clientHeight);
    // console.log("ttttttt", this.top + this.contentRect.height, clientHeight);
    // console.log("ttttttt", this.top, this.contentRect.height, clientHeight);
    // console.log("ttttttt", this.top > this.contentRect.height);

    // if (this.top > this.contentRect.height) {
    //   this.vertical = "Top";
    //   // 顶部已超出
    //   // if (this.top + this.contentRect.height > clientHeight) {
    //   //   this.top = clientHeight - this.contentRect.height - 10;
    //   // }
    // } else {
    //   this.vertical = "Bottom";
    //   // 底部已超出
    //   if (this.top + this.contentRect.height > clientHeight) {
    //     this.top = clientHeight - this.contentRect.height - 10;
    //   }
    // }

    this.top = this.formartTop(this.coreRect.top + this.coreRect.height / 2);

    // console.log("ddddd", this.top, this.contentRect, clientHeight);
    // console.log(this.top + this.contentRect.height > clientHeight);
    // 当在底部超出的时候
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
    // console.log(this.top);

    this.top = this.formartTop(this.top) + this.offsetY;
    // console.log(this.top);

    if (this.coreRect.top > this.top) {
      this.vertical = "Bottom";
    } else {
      this.vertical = "Top";
    }
    // console.log(this.vertical);
    // console.log(this.coreRect.left >= this.left);
    if (this.coreRect.left >= this.left) {
      this.horizontal = "Left";
    } else {
      this.horizontal = "Right";
    }
  }
  formartTop(top: number) {
    return top < 10 ? 10 : top;
  }
  formartLeft(left: number) {
    return left < 10 ? 10 : left;
  }
  getRect() {
    const cr = this.contentEl.getBoundingClientRect();

    if (cr?.width) {
      this.displayNone = true;
      this.contentRect = cr;

      this.contentRect.width = this.contentEl.offsetWidth;
      this.contentRect.height = this.contentEl.offsetHeight;
    }
    // console.log(this.coreEl.children[0])
    this.coreRect = this.coreEl.children[0].getBoundingClientRect();

    // console.log(
    //   "contentElcccc",
    //   this.contentEl,
    //   this.coreEl,
    //   cr,
    //   this.contentEl.offsetWidth,
    //   !!cr?.width,
    //   this.displayNone
    // );
  }
  removeRect() {
    this.contentRect = null;
    this.coreRect = null;
  }
  componentWillLoad() {
    // console.log("body-click:dropdown-event");
  }
  componentDidLoad() {
    setTimeout(() => {
      // console.log("ddddddddddd", this.d);
      this.getRect();
      const d = new Debounce();
      window.addEventListener("resize", () => {
        d.increase(() => {
          this.getRect();
          this.getDropDownElePosition();
        }, 300);
      });
      // console.log("componentDidLoad");
      // setTimeout(() => {
      // }, 1000);
    });
  }
  watchDom() {
    this.d.increase(() => {
      // this.observer?.disconnect();
      const observer = new ResizeObserver(() => {
        // console.log(
        //   "Dom发生了变化",
        //   this.contentEl.offsetHeight,
        //   this.contentEl.offsetWidth,
        //   this.contentEl
        // );

        this.positionAnimation = true;
        this.d.increase(() => {
          this.getRect();
          this.getDropDownElePosition();

          // this.positionAnimation = false
        }, 30);
      });
      // console.log("this.contentEl", this.contentEl);
      observer.observe(this.contentEl);
      // this.observer?.disconnect();
    }, 300);
  }
  bodyClientEvent(e: MouseEvent) {
    // console.log("body-click:dropdown-event bodyClosable", e.target);
    this.getParentEl.call(this, e.target);
  }
  getParentEl(el: HTMLElement) {
    // console.log(el.localName, el.dataset, el, el.getAttribute("data-id"));
    if (el?.localName === "body") {
      // console.log("this.bodyClosable ", this, el, this.bodyClosable);
      this.bodyClosable && (this.visible = false);
      return;
    }
    if (this.id === el?.getAttribute("data-id")) {
      return;
    }
    return this.getParentEl.call(this, el.parentElement);
  }
  render() {
    return (
      <div data-id={this.id} class={"saki-dropdown-component "}>
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
          data-id={this.id}
          class={
            "saki-dropdown-main " +
            (this.visibleStyle ? "visibleStyle " : " ") +
            (this.isAddVisibleClass ? "visible " : " ") +
            (this.displayNone ? "displayNone " : " ") +
            this.vertical +
            " " +
            this.horizontal
          }
        >
          {this.mask ? (
            <div
              onContextMenu={(e) => {
                e.preventDefault();
                return false;
              }}
              onMouseDown={() => {
                if (!this.maskClosable) return;
                this.visible = false;
              }}
              style={{
                zIndex: String(this.zIndex - 1),
              }}
              class={"main-bg "}
            ></div>
          ) : (
            ""
          )}

          <div
            ref={(e) => {
              // console.log("contentEl", e);
              if (!this.contentEl) {
                this.contentEl = e;
                this.watchDom();
              }
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
              if (this.closing) {
                this.removeMainEl();
              }
            }}
            class={
              "main-content scrollBarDefault saki-images-lazyload " +
              (this.positionAnimation ? "positionAnimation" : "")
            }
          >
            <slot name="main"></slot>
          </div>
        </div>
      </div>
    );
  }
}
