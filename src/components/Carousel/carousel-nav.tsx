import { Element, EventEmitter, Method } from "@stencil/core";
import { Component, Event, h, Prop } from "@stencil/core";
// 开发中
@Component({
  tag: "saki-carousel-nav",
  styleUrl: "carousel.scss",
  shadow: true,
})
export class CarouselNavComponent {
  list: NodeListOf<HTMLSakiCarouselNavItemElement>;
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() width = "";
  @Prop() height = "";
  @Prop() justifyContent = "flex-start";
  @Prop() defaultIndex = 0;
  @Event({
    bubbles: false,
  })
  switchIndex: EventEmitter;
  @Element() el: HTMLDivElement;

  componentWillLoad() {}
  componentDidLoad() {
    this.initListEl();
    new MutationObserver(() => {
      this.initListEl();
    }).observe(this.el, {
      attributes: false,
      childList: true,
      subtree: false,
    });
  }
  initListEl() {
    this.list = this.el.querySelectorAll("saki-carousel-nav-item");

    // console.log("carousellist", this.list);
    this.list.forEach((v, i) => {
      v.index = i;
      v.removeEventListener("tap", this.tapFunc);
      v.addEventListener("tap", this.tapFunc);
    });
    this.switch(this.defaultIndex);
  }
  tapFunc = (e: any) => {
    this.switch(e.detail);
    this.switchIndex.emit(e.detail);
  };
  @Method()
  switch(index: number) {
    this.list.forEach((v) => {
      v.active = v.index === index;
    });
  }
  render() {
    return (
      <div
        style={{
          ...["margin", "padding", "width", "height"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-cascader-nav-component scrollBarHover"}
      >
        <div
          style={{
            ...["justifyContent"].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
          }}
          class={"nav-list "}
        >
          <slot></slot>
        </div>
      </div>
    );
  }
}
