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
// import { Debounce } from "@nyanyajs/utils";
@Component({
  tag: "saki-tabs",
  styleUrl: "tabs.scss",
  shadow: true,
})
export class TabsComponent {
  // debounce = new Debounce();
  timer: NodeJS.Timeout;
  navElMutationObserver: MutationObserver;
  navElDropdown: HTMLSakiDropdownElement;
  disableUpdate = false;
  navItemList: NodeListOf<HTMLDivElement>;

  // Flex
  @State() navSubLineWidth = "";
  @State() navLineWidth = "";
  @State() navLineLeft = "";
  @State() navMoreIcon = false;
  @State() dropdownStartIndex = -1;
  @State() navMoreShowDropDown = false;
  @Prop() type: "Flex" | "Default" = "Default";
  @Prop() headerBackgroundColor = "";

  @Prop() headerMaxWidth = "";
  @Prop() headerBorderBottom = "1px solid #eee";

  // Flex
  @Prop() headerItemMinWidth = "auto";
  // Default
  @Prop() headerPadding = "";
  @State() itemComponents: NodeListOf<HTMLSakiTabsItemElement>;
  @State() itemList: {
    id: string;
    label: string;
    name: string;
    fontSize: string;
    fontWeight: string;
    borderBottom: boolean;

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
  @Watch("navEl")
  watchItemList() {}
  @Watch("activeIndex")
  watchActiveIndex() {
    setTimeout(() => {
      this.getLineStyle.call(this, this.activeIndex);
    }, 50);
  }
  componentWillLoad() {
    this.init();
    new MutationObserver(this.init.bind(this)).observe(this.el, {
      attributes: false,
      childList: true,
      subtree: true,
    });
    window.addEventListener("resize", () => {
      this.getLineStyle(this.activeIndex);
    });
  }
  init() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      clearTimeout(this.timer);

      this.itemComponents = this.el.querySelectorAll("saki-tabs-item");
      this.itemList = [];

      this.itemComponents.forEach(async (item, index) => {
        item.switchActiveFunc(this.activeIndex === index);
        // item.addEventListener("changename", () => {
        //   this.itemList[index].name = item.name;
        //   this.updateTime = new Date().getTime();
        // });
        this.itemList.push({
          id: await item.getId(),
          name: item.name,
          label: item.label,
          fontSize: item.fontSize,
          fontWeight: item.fontWeight,
          borderBottom: item.borderBottom,
          dropdown: false,
          width: 0,
        });
      });
      // console.log(this.navEl);
    }, 10);
  }
  getLineStyle(index: number) {
    // console.log(this.navItemList);
    // console.log(index, this.itemList);
    const el = this.navItemList?.[index];
    // console.log(el, el?.offsetWidth, this.itemList);
    // console.log(this.activeIndex);
    if (!el?.offsetWidth) {
      this.navSubLineWidth = "60px";
      this.navLineWidth = "60px";
      this.navLineLeft = "60px";
      return;
    }
    let wObj = {};
    this.navItemList.forEach((v: HTMLDivElement, index) => {
      wObj[index] = index === 0 ? 0 : wObj[index - 1] + v.offsetWidth;
    });
    // console.log(wObj, el.querySelector("span").offsetWidth);

    this.navSubLineWidth = el.querySelector("span").offsetWidth + "px";
    this.navLineWidth = el.offsetWidth + "px";
    this.navLineLeft = wObj[index] + "px";
    return;
  }
  initNavRef = () => {
    this.navItemList = this.navEl
      .querySelector(".nav-list")
      .querySelectorAll(".nav-item");
    if (!this.navItemList.length) return;
    let wObj = {};
    this.dropdownStartIndex = -1;
    this.navItemList.forEach((v: HTMLDivElement, index) => {
      wObj[index] = (index - 1 >= 1 ? wObj[index - 1] : 0) + v.offsetWidth;
      this.itemList[index] = {
        ...this.itemList[index],
        width: v.offsetWidth,
        dropdown: wObj[index] - this.navEl.offsetWidth >= -100,
        left: wObj[index],
      };

      if (this.itemList[index].dropdown) {
        // v.style.display = "none";
        this.navMoreIcon = true;

        this.dropdownStartIndex === -1 && (this.dropdownStartIndex = index);
      } else {
        // v.style.display = "flex";
        this.navMoreIcon = false;
      }
    });
    // console.log(" this.itemList", this.itemList);
    if (!this.navMoreIcon) {
      this.dropdownStartIndex = -1;
    }
    this.getLineStyle.call(this, this.activeIndex);

    this.tap.emit({
      name: this.itemList[this.activeIndex].name,
      label: this.itemList[this.activeIndex].label,
      activeIndex: this.activeIndex,
    });
  };
  render() {
    switch (this.type) {
      case "Flex":
        return (
          <div class="saki-tabs-component flex">
            {/* {this.activeIndex},{this.dropdownStartIndex} */}
            <div
              style={{
                backgroundColor: this.headerBackgroundColor,
                borderBottom: this.headerBorderBottom,
                // padding: this.headerPadding,
              }}
              ref={(e) => {
                if (this.navEl && !this.navElMutationObserver) {
                  this.navElMutationObserver = new MutationObserver(
                    this.initNavRef.bind(this)
                  );
                  this.navElMutationObserver.observe(
                    this.navEl.querySelector(".nav-list"),
                    {
                      attributes: false,
                      childList: true,
                      subtree: true,
                    }
                  );
                  return;
                }
                this.navEl = e;
              }}
              class={"s-nav " + (this.navMoreIcon ? "more" : "")}
            >
              <div
                style={{
                  maxWidth: this.headerMaxWidth,
                }}
                class={"nav-wrap"}
              >
                <div class={"nav-list"}>
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
                          fontSize: v.fontSize || "14px",
                          fontWeight: v.fontWeight || "500",
                          display:
                            this.dropdownStartIndex === -1
                              ? "flex"
                              : i < this.dropdownStartIndex - 1
                              ? "flex"
                              : // "none"
                              this.activeIndex >= this.dropdownStartIndex - 1
                              ? i === this.activeIndex
                                ? "flex"
                                : "none"
                              : i === this.dropdownStartIndex - 1
                              ? "flex"
                              : "none",
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
                        class={"nav-item "}
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
                      this.navElDropdown = e;
                    }}
                    visible={this.navMoreShowDropDown}
                    floating-direction="Center"
                    onClose={() => {
                      this.navMoreShowDropDown = false;
                    }}
                  >
                    <div
                      class={"more-button"}
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
        return (
          <div class="saki-tabs-component defalut">
            <div
              style={{
                backgroundColor: this.headerBackgroundColor,
                padding: this.headerPadding,
                maxWidth: this.headerMaxWidth,
                borderBottom: this.headerBorderBottom,
              }}
              ref={(e) => {
                this.navEl = e;
              }}
              class="s-nav"
            >
              <div
                ref={(e) => {
                  this.navWrapEl = e;
                }}
                class={"s-n-wrap"}
              >
                {this.itemList.map((item, index) => {
                  return (
                    <div
                      ref={(e) => {
                        if (e?.offsetWidth) {
                          !item.width &&
                            (this.updateTime = new Date().getTime());
                          item.width = e.offsetWidth || 0;
                        }
                      }}
                      onClick={() => {
                        // console.log(e);
                        this.tap.emit({
                          name: item.name,
                          label: item.label,
                          activeIndex: index,
                        });
                        this.itemComponents.forEach((subItem, subIndex) => {
                          subItem.switchActiveFunc(index === subIndex);
                        });
                        this.activeIndex = index;
                        const tempWidth = this.itemList.reduce((a, c, i) => {
                          if (i >= this.activeIndex) {
                            return a;
                          }
                          return a + (c.width || 0);
                        }, 0 - this.navScrollX);

                        // console.log(tempWidth);
                        // console.log(tempWidth - this.navEl.offsetWidth / 2);

                        if (tempWidth / this.navEl.offsetWidth >= 0.6) {
                          this.navScrollX =
                            this.navScrollX +
                            (tempWidth - this.navEl.offsetWidth / 2);
                        }
                        if (tempWidth / this.navEl.offsetWidth <= 0.3) {
                          this.navScrollX =
                            this.navScrollX - this.navEl.offsetWidth / 2;
                        }
                        this.navScrollX =
                          this.navScrollX <= 0 ? 0 : this.navScrollX;
                        // console.log(tempWidth / this.navEl.offsetWidth >= 0.6);
                        // console.log(this.navScrollX);
                        this.navWrapEl.scrollTo(this.navScrollX, 0);
                        this.navScrollX = this.navWrapEl.scrollLeft;
                        // console.log(this.navEl.offsetWidth);
                      }}
                      style={{
                        fontSize: item.fontSize || "14px",
                        fontWeight: item.fontWeight || "500",
                      }}
                      class={
                        "nav-item " +
                        (item.borderBottom ? "borderBottom " : "") +
                        (this.activeIndex === index ? "active " : "")
                      }
                      key={index}
                    >
                      <div>
                        <span>{item.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <div
                style={{
                  width: this.itemList[this.activeIndex].width + "px",
                  left: "0px",
                }}
                class="nav-line"
              >
                <div class="line"></div>
              </div> */}
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
