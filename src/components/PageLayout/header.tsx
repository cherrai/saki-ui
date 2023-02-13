import {
  Component,
  Event,
  EventEmitter,
  Element,
  h,
  Prop,
} from "@stencil/core";

@Component({
  tag: "saki-page-header",
  styleUrl: "header.scss",
  shadow: true,
})
export class PageHeaderComponent {
  @Prop() title: string = "";
  @Prop() titleAlign: string = "left";
  @Prop() titleFontSize: string = "22px";
  @Prop() titleFontWeight: string = "700";
  @Prop() padding: string = "0 10px";
  @Prop() border: string = "0 10px";
  @Prop() height: string = "";
  @Prop() backIcon: boolean = false;
  @Prop() left: boolean = false;
  @Prop() center: boolean = false;
  @Prop() right: boolean = false;
  @Prop() backgroundColor: string = "";
  @Event() back: EventEmitter;

  @Element() el: HTMLElement;

  render() {
    return (
      <div
        style={{
          ...["padding", "border", "width", "backgroundColor"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={
          "saki-page-header-component " +
          (this.left ? "left " : "") +
          (this.center ? "center " : "") +
          (this.right ? "right " : "")
        }
      >
        <div class="pn-left">
          {this.backIcon ? (
            <saki-button
              type="CircleIconGrayHover"
              margin="0 4px 0 0"
              onTap={() => {
                this.back.emit();
              }}
            >
              <saki-icon type="ArrowLeft"></saki-icon>
            </saki-button>
          ) : (
            ""
          )}
          {this.title && this.titleAlign === "left" ? (
            <div
              style={{
                fontSize: this.titleFontSize,
                fontWeight: this.titleFontWeight,
              }}
              class="pn-title"
            >
              {this.title}
            </div>
          ) : (
            ""
          )}

          <slot name="left"></slot>
        </div>
        <div class={"pn-center"}>
          {this.title && this.titleAlign === "center" ? (
            <div
              style={{
                fontSize: this.titleFontSize,
                fontWeight: this.titleFontWeight,
              }}
              class="pn-title"
            >
              {this.title}
            </div>
          ) : (
            ""
          )}
          <slot name="center"></slot>
        </div>
        <div class="pn-right">
          <slot name="right"></slot>
        </div>
      </div>
    );
  }
}
