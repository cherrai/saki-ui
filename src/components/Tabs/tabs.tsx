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

// import { prefix } from "../../../stencil.config";
// console.log(prefix + "-tabs");
import { Debounce } from "@nyanyajs/utils/dist/debounce";
@Component({
  tag: "saki-tabs",
  styleUrl: "tabs.scss",
  shadow: true,
})
export class TabsComponent {
  debounce = new Debounce();
  timer: NodeJS.Timeout;
  mutationObserver?: MutationObserver;
  navElMutationObserver?: ResizeObserver;
  navElDropdown: HTMLSakiDropdownElement;
  disableUpdate = false;
  navItemList: NodeListOf<HTMLDivElement> | undefined;

  // Flex
  @State() navSubLineWidth = "";
  @State() navLineWidth = "";
  @State() navLineLeft = "";
  @State() navMoreIcon = false;
  @State() dropdownStartIndex = -1;
  @State() navMoreShowDropDown = false;

  @Prop() type: "Flex" | "Default" = "Default";
  @Prop() headerBackgroundColor = "";
  @Prop() full = false;
  @Prop() disableMoreButton = false;
  @Prop() moreContentWidthDifference = -80;

  @Prop() headerMaxWidth = "";
  @Prop() activeTabLabel = "";
  @Prop() headerBorderBottom = "1px solid #eee";

  // Flex
  @Prop() headerItemMinWidth = "auto";
  @Prop() headerItemHeight = "50px";
  @Prop() headerItemPadding = "0px 2px";

  // Default
  @Prop() headerPadding = "0 6px";

  @State() itemComponents: NodeListOf<HTMLSakiTabsItemElement>;
  @State() itemList: {
    id: string;
    label: string;
    name: string;
    fontSize: string;
    color: string;
    fontWeight: string;

    dropdown?: boolean;

    // Default
    width?: number;
    left?: number;
  }[] = [];

  // Default
  navWidth = 0;
  navEl: HTMLElement;
  navWrapEl: HTMLElement;
  @State() navScrollX = 0;

  @State() activeIndex: number = 0;
  @State() updateTime: number = 0;
  @Event({
    bubbles: false,
  })
  tap: EventEmitter;
  @Element() el: HTMLElement;
  // @Watch("navEl")
  // watchItemList() {}
  @Watch("activeIndex")
  watchActiveIndex() {
    // console.log(this.activeIndex);
    setTimeout(() => {
      this.getLineStyle.call(this, this.activeIndex);
    }, 50);
  }
  @Watch("activeTabLabel")
  watchActiveTabLabel() {
    // console.log("activeTabLabel", this.activeTabLabel, this.itemComponents);
    this.activeTabLabel &&
      this.itemComponents?.length &&
      this.itemComponents.forEach((item, index) => {
        if (this.activeTabLabel === item.label) {
          this.activeIndex = index;
          item.switchActiveFunc(true);
        } else {
          item.switchActiveFunc(false);
        }
      });
  }
  handleResize = () => {
    // this.initNavRef();
    this.getLineStyle(this.activeIndex);
  };
  componentDidLoad() {
    this.init();
    this.initNavRef();
    this.mutationObserver = new MutationObserver(this.init.bind(this));

    this.mutationObserver.observe(this.el, {
      attributes: false,
      childList: true,
      subtree: false,
    });
    window.addEventListener("resize", this.handleResize.bind(this));

    this.navElMutationObserver?.disconnect();
    this.navElMutationObserver = undefined;
  }
  disconnectedCallback() {
    // 2. 解绑 ResizeObserver
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = undefined;
    }
    if (this.navElMutationObserver) {
      this.navElMutationObserver.disconnect();
      this.navElMutationObserver = undefined;
    }

    // 3. 解绑 window 事件
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  init() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      // console.log("initNavRef init");
      clearTimeout(this.timer);
      this.itemComponents = this.el.querySelectorAll("saki-tabs-item");
      this.itemList = [];

      this.itemComponents.forEach((item, index) => {
        item.full = this.full;
        if (this.activeTabLabel && this.activeTabLabel === item.label) {
          this.activeIndex = index;
        }
        item.addEventListener("changename", () => {
          this.itemList[index].name = item.name;
          this.updateTime = new Date().getTime();
        });

        this.itemList.push({
          id: "",
          name: item.name,
          label: item.label,
          fontSize: item.fontSize,
          color: item.color,
          fontWeight: item.fontWeight,
          dropdown: false,
          width: 0,
        });
        item.getId().then((v) => {
          this.itemList[index].id = v;
        });
      });

      this.itemComponents.forEach((item, index) => {
        item.switchActiveFunc(this.activeIndex === index);
      });
      // console.log(this.navEl);
    }, 10);
  }
  getLineStyle(index: number) {
    let tempIndex = 0;
    this.itemList.some((v, i) => {
      if (!v.dropdown) {
        tempIndex = i;
      }
      return v.dropdown;
    });
    console.log("getLineStyle", index, tempIndex);
    const el = this.navItemList?.[index];
    // console.log(el, el?.offsetWidth, this.itemList);
    // console.log(this.activeIndex);
    if (!el?.offsetWidth) {
      this.navSubLineWidth = "60px";
      this.navLineWidth = "60px";
      this.navLineLeft = "60px";
      return;
    }
    let wObj: Record<number, number> = {};
    this.navItemList?.forEach((_: HTMLDivElement, index) => {
      wObj[index] =
        index === 0
          ? 0
          : wObj[index - 1] + (this.navItemList?.[index - 1]?.offsetWidth || 0);

      // console.log(
      //   "wObj",
      //   index,
      //   wObj[index],
      //   wObj[index - 1],
      //   this.navItemList[index - 1].offsetWidth
      // );
    });
    // console.log("wObj", wObj, el.querySelector("span").offsetWidth);

    this.navSubLineWidth = el?.querySelector("span")?.offsetWidth + "px";
    this.navLineWidth = el.offsetWidth + "px";
    this.navLineLeft = wObj[tempIndex < index ? tempIndex : index] + "px";
    return;
  }
  initNavRef = () => {
    this.debounce.increase(() => {
      // console.log("initNavRef", this.navEl, this.itemList, this.type);

      this.navItemList = this.navEl
        ?.querySelector(".nav-list")
        ?.querySelectorAll(".nav-item");
      if (!this.navItemList?.length) return;
      let wObj: Record<number, number> = {};
      this.dropdownStartIndex = -1;
      this.navItemList.forEach((v: HTMLDivElement, index) => {
        wObj[index] = (index - 1 >= 1 ? wObj[index - 1] : 0) + v.offsetWidth;
        this.itemList[index] = {
          ...this.itemList[index],
          width: v.offsetWidth,
          dropdown:
            wObj[index] - this.navEl.offsetWidth >=
            this.moreContentWidthDifference,
          left: wObj[index],
        };

        // console.log(
        //   "initNavRef",
        //   wObj[index],
        //   v.offsetWidth,
        //   this.navEl.offsetWidth,
        //   this.itemList[index],
        // );

        // console.log(this.itemList[index].dropdown)

        if (!this.disableMoreButton) {
          if (this.itemList[index].dropdown) {
            // v.style.display = "none";
            this.navMoreIcon = true;

            this.dropdownStartIndex === -1 && (this.dropdownStartIndex = index);
          } else {
            // v.style.display = "flex";
            this.navMoreIcon = false;
          }
        }
      });
      // console.log(" this.itemList", this.itemList);
      if (!this.navMoreIcon) {
        this.dropdownStartIndex = -1;
      }
      this.getLineStyle.call(this, this.activeIndex);
      this.navMoreIcon &&
        setTimeout(() => {
          this.getLineStyle.call(this, this.activeIndex);
        }, 500);

      // this.tap.emit({
      //   name: this.itemList[this.activeIndex].name,
      //   label: this.itemList[this.activeIndex].label,
      //   activeIndex: this.activeIndex,
      // });
    }, 700);
  };
  render() {
    switch (this.type) {
      case "Flex":
        return (
          <div class={"saki-tabs-component flex " + (this.full ? "full" : "")}>
            {/* {this.activeIndex},{this.dropdownStartIndex} */}
            <div
              style={{
                backgroundColor: this.headerBackgroundColor,
                borderBottom: this.headerBorderBottom,
                // padding: this.headerPadding,
              }}
              ref={(e) => {
                if (!e) return;

                this.navEl = e;
              }}
              class={"s-nav " + (this.navMoreIcon ? "more" : "")}
            >
              <div
                style={{
                  maxWidth: this.headerMaxWidth,
                  height: this.headerItemHeight,
                }}
                class={"nav-wrap"}
              >
                <div
                  ref={(e) => {
                    if (e && this.navEl && !this.navElMutationObserver) {
                      this.navElMutationObserver = new ResizeObserver(
                        this.initNavRef.bind(this),
                      );
                      this.navElMutationObserver.observe(e as any);
                    }
                  }}
                  class={"nav-list"}
                >
                  {this.itemList.map((v, i) => {
                    return (
                      <div
                        ref={(e) => {
                          if (e && !v.width) {
                            // console.log(e.offsetWidth);
                          }
                        }}
                        onClick={() => {
                          this.tap.emit({
                            name: v.name,
                            label: v.label,
                            activeIndex: i,
                          });
                          this.itemComponents.forEach((subItem, subIndex) => {
                            subItem.switchActiveFunc(i === subIndex);
                          });
                          this.activeIndex = i;
                        }}
                        style={{
                          minWidth: this.headerItemMinWidth,
                          padding: this.headerItemPadding,
                          fontSize: v.fontSize || "14px",
                          fontWeight: v.fontWeight || "500",
                          color: v.color || "",
                          // this.activeIndex>this.dropdownStartIndex?
                          // this.activeIndex < this.dropdownStartIndex ? "flex" : (
                          //   "none"
                          // )
                          // this.activeIndex >= this.dropdownStartIndex
                          //   ? i === this.activeIndex
                          //     ? "flex"
                          //     : "none"
                          //   : this.dropdownStartIndex === -1
                          //   ? "flex"
                          //   : i < this.dropdownStartIndex
                          //   ? "flex"
                          //   : "none",
                        }}
                        data-a={this.dropdownStartIndex}
                        data-ai={this.activeIndex}
                        data-aii={i}
                        class={{
                          "nav-item": true,
                          "hover-background-color-eee": true,

                          dpActive: this.activeIndex === i,

                          flex:
                            this.dropdownStartIndex === -1
                              ? true
                              : i < this.dropdownStartIndex - 1
                                ? true
                                : this.activeIndex >=
                                    this.dropdownStartIndex - 1
                                  ? i === this.activeIndex
                                  : i === this.dropdownStartIndex - 1,
                          none: !(this.dropdownStartIndex === -1
                            ? true
                            : i < this.dropdownStartIndex - 1
                              ? true
                              : this.activeIndex >= this.dropdownStartIndex - 1
                                ? i === this.activeIndex
                                : i === this.dropdownStartIndex - 1),
                          // active: i === this.activeIndex,
                        }}
                        key={i}
                      >
                        <span>{v.name}</span>
                      </div>
                    );
                  })}
                </div>
                <div class={"nav-more"}>
                  <saki-dropdown
                    ref={(e) => {
                      if (!e) return;
                      this.navElDropdown = e;
                    }}
                    visible={this.navMoreShowDropDown}
                    floating-direction="Center"
                    onClose={() => {
                      this.navMoreShowDropDown = false;
                    }}
                    z-index={1200}
                  >
                    <div
                      class={"more-button hover-background-color-eee"}
                      onClick={() => {
                        this.navMoreShowDropDown = !this.navMoreShowDropDown;
                      }}
                    >
                      <svg
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2999"
                      >
                        <path
                          d="M512 416c53.02 0 96 42.98 96 96s-42.98 96-96 96-96-42.98-96-96 42.98-96 96-96z m320 0c53.02 0 96 42.98 96 96s-42.98 96-96 96-96-42.98-96-96 42.98-96 96-96z m-640 0c53.02 0 96 42.98 96 96s-42.98 96-96 96-96-42.98-96-96 42.98-96 96-96z"
                          p-id="3000"
                        ></path>
                      </svg>
                    </div>
                    <div slot="main">
                      <saki-menu
                        onSelectvalue={(v) => {
                          console.log(v);
                          if (v.detail.value) {
                            const index = Number(v.detail.value);
                            const item = this.itemList[index];
                            this.tap.emit({
                              name: item.name,
                              label: item.label,
                              activeIndex: index,
                            });
                            this.itemComponents.forEach((subItem, subIndex) => {
                              subItem.switchActiveFunc(index === subIndex);
                            });
                            this.activeIndex = index;
                          }
                          this.navMoreShowDropDown = false;
                          setTimeout(() => {
                            if (
                              this.activeIndex >=
                              this.dropdownStartIndex - 1
                            ) {
                              this.updateTime = new Date().getTime();
                            }
                          }, 10);
                        }}
                      >
                        {this.itemList.map((v, i) => {
                          return (
                            i >= this.dropdownStartIndex && (
                              <saki-menu-item
                                padding="10px 18px"
                                value={i.toString()}
                              >
                                <div class="qv-h-r-u-item">
                                  <span>{v.name}</span>
                                </div>
                              </saki-menu-item>
                            )
                          );
                        })}
                      </saki-menu>
                    </div>
                  </saki-dropdown>
                </div>
                <div
                  style={{
                    "--line-width": this.navSubLineWidth,
                    width: this.navLineWidth,
                    left: this.navLineLeft,
                  }}
                  // style={this.getLineStyle.call(this, this.activeIndex)}
                  class="nav-line"
                >
                  <div class="line"></div>
                </div>
              </div>
            </div>
            <div class="s-main">
              <slot />
            </div>
          </div>
        );

      case "Default":
        const paddingValues = this.headerItemPadding.split(" ");
        const lineGap =
          parseInt(
            paddingValues[3] || paddingValues[1] || paddingValues[0] || "0",
          ) || 0;
        return (
          <div
            class={"saki-tabs-component defalut " + (this.full ? "full" : "")}
          >
            <div
              style={{
                backgroundColor: this.headerBackgroundColor,
                maxWidth: this.headerMaxWidth,
                borderBottom: this.headerBorderBottom,
              }}
              class={"s-nav"}
            >
              <saki-tabs-nav
                defaultValue={this.activeTabLabel}
                showLine={true}
                lineGap={lineGap + "px"}
                padding={this.headerPadding}
                gap={"4px"}
                onTabChange={(e) => {
                  const item = this.itemList[e.detail.index];
                  this.tap.emit({
                    name: item.name,
                    label: item.label,
                    activeIndex: e.detail.index,
                  });
                  this.itemComponents.forEach((subItem, subIndex) => {
                    subItem.switchActiveFunc(e.detail.index === subIndex);
                  });
                  this.activeIndex = e.detail.index;
                }}
              >
                {this.itemList.map((item) => {
                  return (
                    <saki-tabs-nav-item value={item.label}>
                      <div
                        style={{
                          color: item.color || "",
                          fontSize: item.fontSize || "14px",
                          fontWeight: item.fontWeight || "500",
                          minWidth: this.headerItemMinWidth,
                          height: this.headerItemHeight,
                          padding: this.headerItemPadding,
                        }}
                        class={"nav-item"}
                      >
                        <span>{item.name}</span>
                      </div>
                    </saki-tabs-nav-item>
                  );
                })}
              </saki-tabs-nav>
            </div>
            <div class="s-main">
              <slot></slot>
            </div>
          </div>
        );

      default:
        break;
    }
  }
}
