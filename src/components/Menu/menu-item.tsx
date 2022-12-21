import {
  Component,
  Event,
  EventEmitter,
  h,
  Prop,
  Element,
  State,
} from "@stencil/core";
import { MenuComponent } from "./menu";

@Component({
  tag: "saki-menu-item",
  styleUrl: "menu.scss",
  // shadow: true,
})
export class MenuItemComponent {
  @Prop() value: string = "";
  @Prop() content: string = "";
  @Prop() label: string = "";
  @Prop() showIcon: boolean = false;
  @Prop() rightArrowIcon: boolean = false;
  @Prop() active: boolean = false;
  @Prop() activeStyleType: "LeftLine" | "RightLine" = "RightLine";
  @Prop() subtitle: string = "";
  @Prop() tapHighlightColor: string = "rgba(0, 0, 0, 0)";
  @Prop() width: string = "";
  @Prop() padding: string = "";
  @Prop() fontSize: string = "";
  @Prop() borderRadius: string = "";
  @Prop() color: string = "";
  @Prop() margin: string = "";
  @State() type: MenuComponent["type"] = "List";
  @Element() el: HTMLSakiMenuItemElement;
  @Event() tap: EventEmitter;
  @Event() opencontextmenu: EventEmitter;
  componentDidLoad() {
    setTimeout(() => {
      this.type = this.el?.parentNode?.["type"] || "List";
    });
  }
  render() {
    return (
      <div
        onClick={() => {
          this.tap.emit();
        }}
        onContextMenu={(e) => {
          this.opencontextmenu.emit({
            pageX: e.pageX,
            pageY: e.pageY,
          });
          e.preventDefault();
        }}
        class={
          "saki-menu-item-component " +
          this.type +
          " " +
          (this.active ? " active " : " ") +
          this.activeStyleType
        }
      >
        <div class={"saki-m-i-subtitle"}>{this.subtitle}</div>
        <div
          style={{
            ...[
              "borderRadius",
              "width",
              "margin",
              "fontSize",
              "color",
              "padding",
            ].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
            "-webkit-tap-highlight-color": this.tapHighlightColor,
          }}
          class={"saki-m-i-title"}
        >
          <div class={"item-content "}>
            {this.showIcon ? (
              <div class={"item-c-icon"}>
                <slot name="icon"></slot>
              </div>
            ) : (
              ""
            )}

            <div class={"item-c-main"}>
              <div class={"item-c-content"}>
                {this.content}
                <slot></slot>
              </div>
              <div class={"item-c-label"}>
                {this.label}

                {this.rightArrowIcon ? (
                  <svg
                    class="right-arrow-icon icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3138"
                    width="14"
                    height="14"
                  >
                    <path
                      d="M761.056 532.128c0.512-0.992 1.344-1.824 1.792-2.848 8.8-18.304 5.92-40.704-9.664-55.424L399.936 139.744c-19.264-18.208-49.632-17.344-67.872 1.888-18.208 19.264-17.376 49.632 1.888 67.872l316.96 299.84-315.712 304.288c-19.072 18.4-19.648 48.768-1.248 67.872 9.408 9.792 21.984 14.688 34.56 14.688 12 0 24-4.48 33.312-13.44l350.048-337.376c0.672-0.672 0.928-1.6 1.6-2.304 0.512-0.48 1.056-0.832 1.568-1.344C757.76 538.88 759.2 535.392 761.056 532.128z"
                      p-id="3139"
                    ></path>
                  </svg>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
