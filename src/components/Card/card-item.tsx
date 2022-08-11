import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";

@Component({
  tag: "saki-card-item",
  styleUrl: "card.scss",
  shadow: true,
})
export class CardItemComponent {
  @Prop() type: "Defalut" | "Flex" = "Defalut";
  @Prop() border: boolean = false;
  @Prop() backIcon: boolean = false;
  @Prop() disabledTap: boolean = false;
  @Prop() backgroundColor: string = ""
  @Prop() backgroundHoverColor: string = "#eee"
  @Prop() backgroundActiveColor: string = "#ddd"
  @Prop() margin = "";
  @Prop() padding = "";
  // Flex
  @Prop() rightWidth = "";
  @Prop() title = "";
  @Prop() subtitle = "";
  @Event({
    bubbles: false,
  })
  tap: EventEmitter;
  componentDidLoad() {}
  render() {
    if (this.type === "Flex") {
      return (
        <div
          style={{
            ...["border", "margin", "padding"].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
            "--saki-card-item-bg-color":this.backgroundColor,
            "--saki-card-item-bg-hover-color":this.backgroundHoverColor,
            "--saki-card-item-bg-active-color":this.backgroundActiveColor,
          }}
          onClick={() => {
            !this.disabledTap && this.tap.emit();
          }}
          class={
            "saki-card-item-component Flex " +
            (this.border ? "border " : "") +
            (this.disabledTap ? "  " : " tap ")
          }
        >
          <div class={"ci-main"}>
            <div class={"ci-m-left"}>
              <slot name="left"></slot>
            </div>
            <div class={"ci-m-center"}>
              <slot name="center"></slot>
            </div>
          </div>
          <div
            style={{
              width: this.rightWidth,
            }}
            class={"ci-right"}
          >
            <slot name="right"></slot>
            {this.backIcon ? (
              <svg
                class="back-icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2337"
              >
                <path
                  d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
                  p-id="2338"
                ></path>
              </svg>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    }
    return (
      <div
        style={{
          ...["border", "margin", "padding"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        onClick={() => {
          !this.disabledTap && this.tap.emit();
        }}
        class={
          "saki-card-item-component Default " +
          (this.border ? "border " : "") +
          (this.disabledTap ? "  " : " tap ")
        }
      >
        <div class={"ci-left"}>
          <div class="ci-title">
            <slot name="title"></slot>
          </div>
          {/* <div class="c-subtitle">
          <slot name="subtitle"></slot>
        </div> */}
          <div class="ci-main">
            <slot></slot>
          </div>
        </div>
        <div class={"ci-center"}>
          <slot name="center"></slot>
        </div>
        <div class={"ci-right"}>
          <slot name="right"></slot>
          {this.backIcon ? (
            <svg
              class="back-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2337"
            >
              <path
                d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
                p-id="2338"
              ></path>
            </svg>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
