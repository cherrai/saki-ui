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
          ...["padding", "width", "backgroundColor"].reduce(
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
              onTap={() => {
                this.back.emit();
              }}
            >
              <svg
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2530"
                width="14"
                height="14"
              >
                <path
                  d="M748.8 160 390.4 512l358.4 352c19.2 19.2 19.2 57.6 0 76.8-19.2 19.2-57.6 19.2-76.8 0L281.6 556.8c0 0-6.4 0-6.4-6.4C262.4 544 256 524.8 256 512c0-12.8 6.4-32 19.2-38.4 0 0 6.4 0 6.4-6.4l390.4-390.4c19.2-19.2 57.6-19.2 76.8 0C774.4 102.4 774.4 134.4 748.8 160z"
                  p-id="2531"
                ></path>
              </svg>
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
