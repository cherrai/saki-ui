import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
} from "@stencil/core";

// 开发中
@Component({
  tag: "saki-carousel",
  styleUrl: "carousel.scss",
  shadow: true,
})
export class CarouselComponent {
  timer: NodeJS.Timeout;
  list: HTMLSakiCarouselItemElement[] = [];
  @State() scrollIndex = 0;
  direction = 1;
  @State() listWidth = "";
  @State() listHeight = "";
  @State() scrollX = "";
  @Prop() width = "";
  @Prop() height = "";
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() border = "";
  @Prop() borderRadius = "";
  @Prop() arrows = false;
  @Prop() dots = false;
  @Prop() dotClass = "";
  @Prop() autoplay = false;
  @Prop() autoplayInterval = 3000;
  @Prop() draggable = false;

  @Element() el: HTMLDivElement;

  @Event() resizeChange: EventEmitter;
  @Event() switchIndex: EventEmitter;
  compEl: HTMLDivElement;
  listEl: HTMLDivElement;

  componentWillLoad() {}
  componentDidLoad() {
    this.initListEl();

    new MutationObserver(() => {
      this.initListEl();
    }).observe(this.el, {
      attributes: false,
      childList: true,
      subtree: true,
    });
    new ResizeObserver(() => {
      // console.log("carousel ", entries);
      this.initListEl();
    }).observe(this.el);
  }
  initListEl() {
    const ciList = this.el.querySelectorAll("saki-carousel-item");

    const compElRect = this.compEl.getBoundingClientRect();
    this.list = [];
    ciList.forEach((el, i) => {
      if (!el.clone) {
        el.width = compElRect.width + "px";
        el.height = compElRect.height + "px";
        el.index = i + 1;
        this.list.push(el);
      }
    });
    // console.log(
    //   "carousel",
    //   this.el.querySelector(".saki-cascader-component"),
    //   this.el.getBoundingClientRect(),
    //   this.list,
    //   this.list[0].getBoundingClientRect(),
    //   this.compEl
    // );

    // const cloneEl: HTMLSakiCarouselItemElement = this.list[
    //   this.list.length - 1
    // ].cloneNode() as any;
    // cloneEl.clone = true;

    // this.el.prepend(cloneEl);

    this.listEl = this.compEl.querySelector(".c-list");

    // console.log(
    //   "carousel",
    //   this.list,
    //   this.scrollIndex >= this.list.length - 1
    // );

    this.listWidth = compElRect.width * this.list.length + "px";
    this.listHeight = compElRect.height + "px";

    clearInterval(this.timer);
    if (this.autoplay) {
      this.scrollIndex = 0;
      this.timer = setInterval(() => {
        this.scrollIndex =
          this.scrollIndex === this.list.length - 1 ? 0 : this.scrollIndex + 1;

        this.direction = 1;
        this.switch(this.scrollIndex);
      }, this.autoplayInterval);
    }

    this.resizeChange.emit(compElRect);
  }

  @Method()
  async getScrollIndex() {
    return this.scrollIndex
  }
  @Method()
  async switch(index: number) {
    if (this.scrollIndex !== index) {
      this.direction = this.scrollIndex >= index ? 0 : 1;
      this.scrollIndex = index;
    }
    const compElRect = this.compEl.getBoundingClientRect();
    let scrollOldX =
      -1 * (index === 0 ? this.list.length - 1 : index - 1) * compElRect.width;

    let scrollNewX = -1 * index * compElRect.width;

    if (this.direction === 0) {
      scrollOldX =
        -1 *
        (index === this.list.length - 1 ? 0 : index + 1) *
        compElRect.width;
    }

    // this.scrollX = scrollNewX;

    // console.log(
    //   "carousel 切换",
    //   this.list,
    //   index,
    //   index === this.list.length - 1,
    //   scrollOldX,
    //   scrollNewX
    // );

    this.switchIndex.emit(this.scrollIndex);

    const animate = this.listEl.animate(
      [
        {
          left: `${scrollOldX}px`,
        },
        {
          left: `${scrollNewX}px`,
        },
      ],
      {
        duration: 300,
        iterations: 1,
      }
    );
    animate.onfinish = () => {
      this.scrollX = scrollNewX + "px";
    };
  }

  render() {
    return (
      <div
        ref={(e) => {
          if (!this.compEl) {
            this.compEl = e;
          }
        }}
        style={{
          ...[
            "width",
            "height",
            "margin",
            "padding",
            "border",
            "borderRadius",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-cascader-component "}
      >
        <div
          // ref={(e) => {
          //   if (!this.listEl) {
          //     this.listEl = e;
          //   }
          //   this.initListEl();
          // }}
          style={{
            width: this.listWidth,
            height: this.listHeight,
            left: this.scrollX,
          }}
          class={"c-list"}
        >
          <slot></slot>
        </div>
        {this.arrows ? (
          <saki-button
            class={"c-btn-left"}
            onTap={() => {
              this.direction = 0;
              this.scrollIndex =
                this.scrollIndex <= 0
                  ? this.list.length - 1
                  : this.scrollIndex - 1;

              this.switch(this.scrollIndex);
            }}
            bg-color="rgba(255,255,255,0.5)"
            type="CircleIconGrayHover"
          >
            <saki-icon type="ArrowLeft"></saki-icon>
          </saki-button>
        ) : (
          ""
        )}
        {this.arrows ? (
          <saki-button
            class={"c-btn-right"}
            type="CircleIconGrayHover"
            bg-color="rgba(255,255,255,0.5)"
            onTap={() => {
              this.direction = 1;
              // console.log(
              //   "carousel",
              //   this.list,
              //   this.scrollIndex >= this.list.length - 1
              // );
              this.scrollIndex =
                this.scrollIndex >= this.list.length - 1
                  ? 0
                  : this.scrollIndex + 1;

              this.switch(this.scrollIndex);
            }}
          >
            <saki-icon type="ArrowRight"></saki-icon>
          </saki-button>
        ) : (
          ""
        )}

        {this.dots ? (
          <div class={this.dotClass + " c-dots"}>
            {this.list.map((_, i) => {
              return (
                <div
                  onClick={() => {
                    i !== this.scrollIndex && this.switch(i);
                  }}
                  class={"c-d-item " + (this.scrollIndex === i ? "active" : "")}
                ></div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
