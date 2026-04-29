import { Component, Event, EventEmitter, h, Prop, Watch } from "@stencil/core";
import { marked } from "marked";
import DOMPurify from "dompurify";

@Component({
  tag: "saki-chat-ai-bubble",
  styleUrl: "ai-bubble.scss",
  shadow: false,
})
export class ChatAIBubbleComponent {
  @Prop() model = "Gemini 2.5 Flash";
  @Prop() loadingText = "";
  // 0 尚未发起成功 1 正在分析 2 思考中 3 正在获取message 4 完毕
  @Prop() status = 0;
  @Prop() textType: "Markdown" | "Richtext" = "Markdown";
  @Prop() thinkingMessage = "";
  @Prop() message = "";
  @Prop() errorMessage = "";
  @Prop() wariningMessage = "";
  @Prop() margin = "";
  @Prop() padding = "0 10px";
  @Prop() isExpanded = false;

  @Event() retry: EventEmitter;

  private thinkingContainer?: HTMLDivElement;

  @Watch("status")
  watchStatus() {
    if (this.status === 0) {
      this.isExpanded = false;
    }
  }
  @Watch("thinkingMessage")
  handleThinkingUpdate() {
    // 只有在折叠模式（即有高度限制）下才执行自动触底

    if (!this.isExpanded && this.thinkingContainer) {
      // 关键：必须在下一个渲染帧执行，确保 innerHTML 已经填充完毕
      requestAnimationFrame(() => {
        const el = this.thinkingContainer;
        if (el) {
          // 强制滚动到底部
          el.scrollTop = el.scrollHeight;
        }
      });
    }
  }

  @Watch("message")
  handleContentChange() {}
  componentWillLoad() {
    // console.log("AIRoadbook rawHtml", this.formatParsedHtml(this.message));
  }
  formatParsedHtml(message: string) {
    if (!message) {
      // this.parsedHtml = "";
      return "";
    }
    // 1. 将 Markdown 转为 HTML
    const rawHtml = marked.parse(message) as string;
    // 2. 安全过滤，防止 XSS
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
        class={"saki-chat-ai-bubble-component markdown-host " + " "}
      >
        <div
          class={{
            "ab-loading-text": true,
            "is-expanded": this.isExpanded,
          }}
        >
          <saki-button
            height="40px"
            borderRadius="20px"
            padding="0 10px"
            border="none"
            onTap={() => {
              if (this.thinkingMessage) {
                this.isExpanded = !this.isExpanded;
              }

              // console.log("AIRoadbook  retry", this.status);
              if (this.status === -1) {
                this.retry.emit();
              }
            }}
          >
            {this.status === 0 ? (
              <saki-animation-loading margin="0 10px 0 0"></saki-animation-loading>
            ) : (
              ""
            )}
            <span>{this.loadingText}</span>
            {this.thinkingMessage ? (
              <saki-icon
                type="Bottom"
                width="14px"
                height="14px"
                color="#666"
              ></saki-icon>
            ) : (
              ""
            )}
          </saki-button>
        </div>
        {this.errorMessage ? (
          <div
            title={this.errorMessage}
            class={"ab-error-message text-two-elipsis"}
          >
            {this.errorMessage}
          </div>
        ) : (
          ""
        )}
        {this.thinkingMessage ? (
          <div
            ref={(el) => (this.thinkingContainer = el as HTMLDivElement)}
            style={{
              "--tc-m-h": this.thinkingContainer?.scrollHeight + "px",
            }}
            class={{
              "ab-thinking-message": true,
              "markdown-body": true,
              "is-expanded": this.isExpanded,
              "loaded-message": !!this.message,
            }}
            innerHTML={this.formatParsedHtml(this.thinkingMessage)}
          ></div>
        ) : (
          ""
        )}
        {this.message ? (
          <div
            class={"ab-message markdown-body"}
            innerHTML={this.formatParsedHtml(this.message)}
          ></div>
        ) : (
          ""
        )}
        {this.wariningMessage ? (
          <div
            class={"ab-warning-message markdown-body"}
            innerHTML={this.formatParsedHtml(this.wariningMessage)}
          ></div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
