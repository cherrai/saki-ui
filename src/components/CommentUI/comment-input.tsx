import {
  Component,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
} from "@stencil/core";
import { t } from "i18next";

@Component({
  tag: "saki-comment-input",
  styleUrl: "comment.scss",
  shadow: true,
})
export class CommentInputComponent {
  editor: any;
  @Prop() nickname = "";
  @Prop() avatar = "";
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() maxLength = 500;
  @Prop() buttonLoading = false;

  @Prop() content = "";
  @Prop() placeholder = "";
  @Prop() confirmText = "";

  @State() inputFocus = false;

  @Event() changevalue: EventEmitter;
  @Event() file: EventEmitter;
  @Event() confirm: EventEmitter;

  @Method()
  async setContent(content: string) {
    console.log("SOC setContent", content);
    this.content = content;
    this.editor?.setValue("");
  }

  render() {
    return (
      <div
        style={{
          ...[
            "margin",
            "padding",
            "flexDirection",
            "justifyContent",
            "alignItems",
            "width",
            "height",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-comment-input-component "}
      >
        <div class={"ci-left"}>
          <saki-avatar
            width="50px"
            height="50px"
            border-radius="50%"
            margin="0 0 10px 0"
            default-icon={"UserLine"}
            lazyload={false}
            // nickname={user.userInfo?.nickname || ''}
            // src={user.userInfo?.avatar || ''}
            nickname={this.nickname || ""}
            src={this.avatar || ""}
          />
        </div>
        <div
          class={
            "ci-right " +
            (this.inputFocus || this.content.length ? "active" : "")
          }
        >
          <div class={"ci-r-input"}>
            <saki-richtext
              ref={(e) => {
                e?.setToolbar?.({
                  container: [],
                });
                this.editor = e;
              }}
              onChangevalue={(e) => {
                this.content = e.detail.richText;
                this.changevalue.emit(e.detail);
              }}
              onFocusfunc={() => {
                this.inputFocus = true;
              }}
              onBlurfunc={() => {
                // this.inputFocus = false;
              }}
              theme="snow"
              editor-padding={"10px 8px"}
              toolbar-padding={""}
              font-size="14px"
              border-radius="0"
              min-length="0"
              max-length={this.maxLength}
              // value={this.content}
              value={""}
              clear-all-styles-when-pasting={true}
              placeholder={
                this.placeholder ||
                t("commentPlaceholder", {
                  ns: "comments",
                })
              }
            />

            <div class={"ci-r-file"}>
              <slot></slot>
            </div>
          </div>
          <div class={"ci-r-tool"}>
            <div class={"ci-r-t-left"}>
              <saki-button
                type="CircleIconGrayHover"
                onTap={() => {
                  // this.inputFocus = true;
                  this.file.emit();
                }}
              >
                <saki-icon
                  width={"18px"}
                  height={"18px"}
                  color={"#666"}
                  type={"Image"}
                ></saki-icon>
              </saki-button>
            </div>
            <div class={"ci-r-t-right"}>
              <saki-button
                onTap={() => {
                  this.confirm.emit({
                    content: this.content,
                  });
                }}
                padding="4px 12px"
                type="Primary"
                loading={this.buttonLoading}
              >
                <span>
                  {this.confirmText || t("comments", { ns: "comments" })}
                </span>
              </saki-button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
