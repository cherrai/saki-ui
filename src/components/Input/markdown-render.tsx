import {
  Component,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  Watch,
} from "@stencil/core";
import { marked } from "marked";
import DOMPurify from "dompurify";

@Component({
  tag: "saki-markdown-render",
  styleUrl: "markdown-render.scss",
  shadow: false,
})
export class MarkdownRenderComponent {
  // private deb = new Debounce();
  @Prop() markdown = "";
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() color = "";
  @Prop() fontSize = "";
  @Prop() maxHeight = "";
  @Prop() theme = "dark";
  @Prop() keepPositionAt: "Bottom" | "" = "";

  @Event() retry: EventEmitter;

  private msgContainer?: HTMLDivElement;

  @Watch("markdown")
  handleThinkingUpdate() {
    // 只有在折叠模式（即有高度限制）下才执行自动触底

    this.keepPositionAtFunc();
  }

  componentDidLoad() {
    this.keepPositionAtFunc();
  }
  @Method()
  async scrollTo(position: typeof this.keepPositionAt) {
    if (position === "Bottom") {
      this.msgContainer?.scrollTo({
        top: this.msgContainer.scrollHeight,
        // behavior: "smooth",
      });
    }
  }
  keepPositionAtFunc() {
    if (this.msgContainer && this.keepPositionAt) {
      // 关键：必须在下一个渲染帧执行，确保 innerHTML 已经填充完毕

      requestAnimationFrame(() => {
        const el = this.msgContainer;
        if (el) {
          if (this.keepPositionAt === "Bottom") {
            // 强制滚动到底部
            el.scrollTop = el.scrollHeight;

            // this.deb.increase(() => {
            //   el.scrollTo({
            //     top: el.scrollHeight,
            //     behavior: "smooth",
            //   });
            // }, 500);
          }
        }
      });
    }
  }
  formatParsedHtml(message: string) {
    if (!message) {
      // this.parsedHtml = "";
      return "";
    }
    // 1. 将 Markdown 转为 HTML
    const rawHtml = marked.parse(message) as string;
    // 2. 安全过滤，防止 XSS
    // console.log("AI领航员 formatParsedHtml", message, rawHtml);
    return DOMPurify.sanitize(rawHtml);
  }
  render() {
    return (
      <div
        style={{
          // "--horizontal-margin": this.horizontalMargin,
          "--width": "0px",
          ...["padding", "margin"].reduce(
            (fin, cur) =>
              (this as any)[cur] ? { ...fin, [cur]: (this as any)[cur] } : fin,
            {},
          ),
        }}
        class={{
          "saki-markdown-render-component": true,
          "markdown-host": true,
          "dark-mode": this.theme === "dark",
          "light-mode": this.theme === "light",
        }}
      >
        {this.markdown ? (
          <div
            ref={(el) => (this.msgContainer = el as HTMLDivElement)}
            style={{
              maxHeight: this.maxHeight,

              "--tc-m-h": (this.msgContainer?.scrollHeight || 0) + "px",

              ...["color", "fontSize"].reduce(
                (fin, cur) =>
                  (this as any)[cur]
                    ? { ...fin, [cur]: (this as any)[cur] }
                    : fin,
                {},
              ),
            }}
            class={{
              "mr-message": true,
              "markdown-body": true,
            }}
            innerHTML={this.formatParsedHtml(this.markdown)}
          ></div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
