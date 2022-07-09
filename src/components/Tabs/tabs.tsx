import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
} from "@stencil/core";

// import { prefix } from "../../../stencil.config";
// console.log(prefix + "-tabs");
@Component({
  tag: "saki-tabs",
  styleUrl: "tabs.scss",
  shadow: true,
})
export class TabsComponent {
  @Prop() type: "Flex" | "Default" = "Default";
  @Prop() headerBackgroundColor = "";
  @Prop() headerPadding = "";
  @State() itemComponents: NodeListOf<HTMLSakiTabsItemElement>;
  @State() itemList: {
    name: string;
    fontSize: string;
    fontWeight: string;

    // Default
    width?: number;
  }[] = [];

  // Default
  navWidth = 0;
  navEl: HTMLElement;
  navWrapEl: HTMLElement;
  @State() navScrollX = 0;

  @State() activeIndex: number = 0;
  @State() updateTime: number = 0;
  @Event() tap: EventEmitter;
  @Element() el: HTMLElement;
  componentWillLoad() {
    this.itemComponents = this.el.querySelectorAll("saki-tabs-item");
    this.itemComponents.forEach((item, index) => {
      item.switchActiveFunc(this.activeIndex === index);
      item.addEventListener("changename", () => {
        this.itemList[index].name = item.name;
        this.updateTime = new Date().getTime();
      });
      this.itemList.push({
        name: item.name,
        fontSize: item.fontSize,
        fontWeight: item.fontWeight,
        width: 0,
      });
    });
  }
  render() {
    switch (this.type) {
      case "Flex":
        return (
          <div class="saki-tabs-component flex">
            <div
              style={{
                backgroundColor: this.headerBackgroundColor,
                padding: this.headerPadding,
              }}
              class="s-nav"
            >
              {this.itemList.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      this.tap.emit({
                        name: item.name,
                        activeIndex: index,
                      });
                      this.itemComponents.forEach((subItem, subIndex) => {
                        subItem.switchActiveFunc(index === subIndex);
                      });
                      this.activeIndex = index;
                    }}
                    style={{
                      fontSize: item.fontSize || "14px",
                      fontWeight: item.fontWeight || "500",
                    }}
                    class="nav-item"
                    key={index}
                  >
                    {item.name}
                  </div>
                );
              })}
              <div
                style={{
                  width: 100 / this.itemList.length + "%",
                  left: (100 / this.itemList.length) * this.activeIndex + "%",
                }}
                class="nav-line"
              >
                <div class="line"></div>
              </div>
            </div>
            <div class="s-main">
              <slot></slot>
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
                        // console.log(e)
                        !item.width && (this.updateTime = new Date().getTime());
                        item.width = e.offsetWidth || 0;
                      }}
                      onClick={(e) => {
                        console.log(e);
                        this.tap.emit({
                          name: item.name,
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

                        console.log(tempWidth);
                        console.log(tempWidth - this.navEl.offsetWidth / 2);

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
                        console.log(tempWidth / this.navEl.offsetWidth >= 0.6);
                        console.log(this.navScrollX);
                        this.navWrapEl.scrollTo(this.navScrollX, 0);
                        this.navScrollX = this.navWrapEl.scrollLeft;
                        console.log(this.navEl.offsetWidth);
                      }}
                      style={{
                        fontSize: item.fontSize || "14px",
                        fontWeight: item.fontWeight || "500",
                      }}
                      class={
                        "nav-item " +
                        (this.activeIndex === index ? "active" : "")
                      }
                      key={index}
                    >
                      {item.name}
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
