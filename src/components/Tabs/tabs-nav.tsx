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
  tag: "saki-tabs-nav",
  styleUrl: "tabs-nav.scss",
  shadow: true,
})
export class SakiTabsNavComponent {
  @Element() el: HTMLElement;
  navContainer: HTMLElement;
  lineEl: HTMLElement;
  itemComponents: NodeListOf<HTMLSakiTabsNavItemElement>;
  mutationObserver: MutationObserver;
  resizeObserver: ResizeObserver;

  @Prop() defaultValue: string = "";
  @Prop() showLine: boolean = false;
  @Prop() lineColor: string = "var(--saki-default-color)";
  @Prop() lineHeight: string = "4px";
  @Prop() lineWidth: string = "";
  @Prop() lineGap: string = "0px"; // 线条与item的间距，宽度减少 gap*2，left 增加 gap
  @Prop() lineRadius: string = "2px";
  @Prop() gap: string = "8px";
  @Prop() padding: string = "0 12px 12px";
  @Prop() margin: string = "";

  @State() lineStyle = {
    width: "0px",
    left: "0px",
  };

  @Event({ bubbles: false })
  tabChange: EventEmitter<{ value: string; index: number }>;

  @State() isScrollable = false;

  @Watch("defaultValue")
  watchDefaultValue() {
    this.updateActiveState();
    setTimeout(() => {
      this.scrollToActiveItem();
      this.updateLineStyle();
    }, 50);
  }

  @Watch("showLine")
  watchShowLine() {
    this.updateLineStyle();
  }

  componentWillLoad() {
    this.mutationObserver = new MutationObserver(() => {
      this.initItems();
    });
    this.mutationObserver.observe(this.el, {
      childList: true,
      subtree: true,
    });
  }

  componentDidLoad() {
    this.initItems();
    window.addEventListener("resize", () => {
      this.checkScrollable();
      this.updateLineStyle();
    });

    // 创建 ResizeObserver 监听 item 尺寸变化
    this.resizeObserver = new ResizeObserver(() => {
      this.updateLineStyle();
    });
  }

  componentWillUnload() {
    this.mutationObserver.disconnect();
    this.resizeObserver?.disconnect();
  }

  initItems() {
    this.itemComponents = this.el.querySelectorAll("saki-tabs-nav-item");
    this.checkScrollable();
    this.updateActiveState();
    setTimeout(() => {
      this.scrollToActiveItem();
      this.updateLineStyle();
    }, 100);

    // 监听所有 item 的尺寸变化
    this.resizeObserver?.disconnect();
    this.itemComponents.forEach((item) => {
      this.resizeObserver?.observe(item);
      item.addEventListener("click", () => {
        const index = Array.from(this.itemComponents).indexOf(item);
        this.handleItemClick(item, index);
      });
    });
  }

  checkScrollable() {
    if (this.navContainer) {
      this.isScrollable =
        this.navContainer.scrollWidth > this.navContainer.clientWidth;
    }
  }

  updateActiveState() {
    if (!this.itemComponents?.length) return;

    this.itemComponents.forEach((item) => {
      const isActive = item.value === this.defaultValue;
      item.setActive(isActive);
    });
  }

  updateLineStyle() {
    if (!this.showLine || !this.navContainer) {
      this.lineStyle = { width: "0px", left: "0px" };
      return;
    }

    const activeEl = Array.from(this.itemComponents || []).find(
      (item) => item.value === this.defaultValue,
    );
    if (!activeEl) {
      this.lineStyle = { width: "0px", left: "0px" };
      return;
    }

    // 计算active item之前的所有item的宽度之和，包括gap
    const items = Array.from(this.itemComponents || []);
    const activeIndex = items.indexOf(activeEl);
    let leftOffset = 0;
    const gapValue = parseInt(this.gap) || 0;
    const lineGapValue = parseInt(this.lineGap) || 0;

    for (let i = 0; i < activeIndex; i++) {
      leftOffset += items[i].offsetWidth + gapValue;
    }

    // 加上左侧 padding
    const paddingValues = this.padding.split(" ");
    const paddingLeft =
      parseInt(
        paddingValues[3] || paddingValues[1] || paddingValues[0] || "0",
      ) || 0;
    leftOffset += paddingLeft;

    // 加上 lineGap（线条宽度减少，两侧各偏移 gap）
    leftOffset += lineGapValue;
    const lineWidth =
      this.lineWidth || `${activeEl.offsetWidth - lineGapValue * 2}px`;
    const lineLeft = `${leftOffset}px`;

    this.lineStyle = { width: lineWidth, left: lineLeft };
  }

  scrollToActiveItem() {
    if (!this.defaultValue || !this.navContainer) return;

    const activeEl = Array.from(this.itemComponents || []).find(
      (item) => item.value === this.defaultValue,
    );
    if (!activeEl) return;

    // 获取滚动容器（父盒子）
    const scrollContainer = this.navContainer; // 或者 this.navContainer.querySelector('.nav-list')
    if (!scrollContainer) return;

    // 获取 activeEl 的 DOM 元素
    const activeDom = activeEl || activeEl;

    // 计算滚动位置
    const containerRect = scrollContainer.getBoundingClientRect();
    const activeRect = activeDom.getBoundingClientRect();

    // 计算需要滚动的距离（让 active 居中）
    const scrollOffset =
      activeRect.left -
      containerRect.left +
      scrollContainer.scrollLeft -
      containerRect.width / 2 +
      activeRect.width / 2;

    // 只滚动父盒子
    scrollContainer.scrollTo({
      left: scrollOffset,
      behavior: "smooth",
    });
  }

  handleItemClick(item: HTMLSakiTabsNavItemElement, index: number) {
    if (item.value === this.defaultValue) return;

    this.defaultValue = item.value;
    this.tabChange.emit({
      value: item.value,
      index,
    });
  }

  render() {
    return (
      <div class="saki-tabs-nav-component">
        <div
          ref={(e) => {
            if (e) {
              this.navContainer = e as HTMLElement;
            }
          }}
          class={
            "nav-container" + (this.isScrollable || true ? " scrollable " : "")
          }
          style={{
            "--tabs-nav-gap": this.gap,
            "--tabs-nav-padding": this.padding,
            ...["margin"].reduce(
              (fin, cur) =>
                (this as any)[cur]
                  ? { ...fin, [cur]: (this as any)[cur] }
                  : fin,
              {},
            ),
          }}
        >
          <slot />
          {this.showLine && (
            <div
              ref={(e) => {
                if (e) {
                  this.lineEl = e as HTMLElement;
                }
              }}
              class="nav-line"
              style={{
                width: this.lineStyle.width,
                left: this.lineStyle.left,
                backgroundColor: this.lineColor,
                height: this.lineHeight,
                borderRadius: this.lineRadius,
              }}
            />
          )}
        </div>
      </div>
    );
  }
}
