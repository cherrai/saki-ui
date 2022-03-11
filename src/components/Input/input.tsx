import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
  Watch,
  Method,
} from "@stencil/core";

@Component({
  tag: "saki-input",
  styleUrl: "input.scss",
  // shadow: true,
})
export class InputComponent {
  @Prop() backgroundColor: string = "";
  @Prop() type: "Text" | "Textarea" = "Text";
  @Prop() animation: "BottomLineSpreadsOut" | "" = "";
  @State() defaultValue = {
    value: "<p><br></p>",
    content: "",
  };
  @Prop({ mutable: true }) value: string = "";
  @Prop({ mutable: true }) content: string = "";
  // 限制大小通过检测content来实现是否输入
  @Prop() maxLength: number = 100000;
  @Prop() minLength: number = 0;
  @Prop() closeIcon: boolean = false;
  @Prop() borderRadius: string = "";
  @Prop() maxHeight: string = "";
  @Prop() minHeight: string = "";
  @Prop() height: string = "";
  @Prop() textareaHeight: string = "";
  @Prop() width: string = "";
  @Prop() padding: string = "";
  @Prop() fontSize: string = "";
  @Prop() placeholder: string = "";
  @State() editRange = {
    startOffset: 0,
    endOffset: 0,
    el: null,
  };
  @State() lastEditRangeStartOffset: number = 0;
  @State() paddingPixel: string = "";
  @State() paddingLeftPixel: string = "";
  @State() focus: boolean = false;
  @Event() tap: EventEmitter;
  @Event() changevalue: EventEmitter;
  @Event() changecontent: EventEmitter;
  @Event() pressenter: EventEmitter;
  @Event() clearvalue: EventEmitter;

  @State() textareaEl: any | HTMLTextAreaElement;
  @State() keyPressing: number = 0;

  @State() updateTime: number = 0;

  @Element() el: HTMLElement;
  @Watch("value")
  watchValueFunc() {
    // console.log("this.value", this.value, this.content);
    // console.log(this);
    if (!this.value) {
      this.content = "";
      this.focus = true;
      this.setTextareaValue();
    } else {
      this.inputValue({
        content: this.content,
        value: this.value,
      });
    }

    // if (value !== oldvalue) {
    // }
    // this.updateTime = new Date().getTime();
  }
  inputValue({ content, value }: { content: string; value: string }) {
    switch (this.type) {
      case "Textarea":
        if (content === "") {
          this.setTextareaValue();
        }
        this.changevalue.emit({
          content: content || "",
          richText: value || "",
        });
        break;

      default:
        this.content = this.value;
        // console.log("this.content",this.content)
        this.changevalue.emit(this.value || "");
        break;
    }
  }
  componentWillLoad() {
    switch (this.type) {
      case "Text":
        this.content = this.value;
        break;

      default:
        break;
    }
  }
  componentDidLoad() {
    this.setTextareaValue();
  }

  @Method()
  async inputfocus() {
    if (this.type === "Textarea") {
      let range: any;
      if (window.getSelection) {
        //ie11 10 9 ff safari
        this.textareaEl.focus(); //解决ff不获取焦点无法定位问题
        range = window.getSelection(); //创建range
        range.selectAllChildren(this.textareaEl); //range 选择obj下所有子内容
        range.collapseToEnd(); //光标移至最后
      } else if (document["selection"]) {
        //ie10 9 8 7 6 5
        range = document["selection"].createRange(); //创建选择对象
        //var range = document.body.createTextRange();
        range.moveToElementText(this.textareaEl); //range定位到obj
        range.collapse(false); //光标移至最后
        range.select();
      }
    }
  }
  @Method()
  async clear() {
    if (this.type === "Textarea") {
      this.textareaEl.clear();
      this.textareaEl.innerText = "";
      // this.value = this.defaultValue.value;
      // this.content = this.defaultValue.content;
      // this.setTextareaValue();
    }
  }
  setTextareaValue() {
    if (!this.textareaEl) return;

    if (this.type === "Textarea") {
      if (!this.value) {
        this.value = this.defaultValue.value;
        this.content = this.defaultValue.content;
      }
      // console.log("setTextareaValue", this.value);
      this.textareaEl.innerHTML = this.value;
      // console.log(this.textareaEl["innerHTML"]);
    }
  }
  setCursorToLastPostion() {
    // console.log("setCursorToLastPostion", this.editRange);
    if (!this.editRange.el) return;
    // setTimeout(() => {
    // console.log("setCursorToLastPostion", this.editRange);
    const selection = getSelection();
    const r = document.createRange();
    selection.removeAllRanges();
    // console.log(this.editRange.el);
    selection.addRange(r);
    selection.collapse(this.editRange.el, this.editRange.endOffset);
    selection?.collapseToEnd();
    // }, 300);
    // if (!this.lastEditRangeStartOffset) return;
    // var selection = getSelection();
    // var r = document.createRange();
    // const textNode = element.childNodes[0];
    // console.log(
    //   "setCursorToLastPostion",
    //   textNode,
    //   this.lastEditRangeStartOffset
    // );
    // // 判断是否有最后光标对象存在
    // // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
    // selection.removeAllRanges();
    // selection.addRange(r);
    // console.log(
    //   "setCursorToLastPostion",
    //   textNode,
    //   this.lastEditRangeStartOffset
    // );
    // selection.collapse(textNode, this.lastEditRangeStartOffset);
    // selection?.collapseToEnd();
  }
  replaceBlank(str: string) {
    // console.log(str);
    var reg = /\n/g;
    return str.replace(reg, "");
  }
  formatContent() {
    // console.log(this.textareaEl.childNodes);
    this.textareaEl.childNodes.forEach((item) => {
      // console.log(item.nodeName);
      // console.log(item.nodeName === "#text" && item.data);
      if (item.nodeName === "#text" && item.data) {
        // console.log("开始替换了TEXT");
        const p = document.createElement("p");
        p.innerHTML = this.replaceBlank(item.data);
        // console.log(item.data, p.innerHTML);
        this.editRange.el = p;
        this.textareaEl.replaceChild(p, item);
      }
      if (item.nodeName === "P") {
        // console.log("开始替换了P");

        // console.log(item.innerHTML.indexOf("\n") >= 0);
        // console.log(
        //   item.innerHTML.indexOf("\n") >= 0,
        //   item,
        //   item.innerHTML,
        //   this.value,
        //   this.textareaEl["innerHTML"]
        // );
        if (item.innerHTML.indexOf("\n") >= 0) {
          const el = document.createElement("p");
          // console.log(item.innerHTML);
          el.innerHTML = this.replaceBlank(item.innerHTML);
          // console.log(el);
          // console.log(item.innerHTML);
          // console.log(el.innerHTML);
          this.editRange.el = el;
          this.textareaEl.replaceChild(el, item);
          // console.log(this.textareaEl.innerHTML);
        }
      }
    });
    this.setCursorToLastPostion();
    // console.log(this.editRange);
    // setTimeout(() => {
    //   const selection = getSelection();
    //   selection.collapse(this.editRange.el, this.editRange.endOffset);
    // }, 300);
    // console.log('this.textareaEl["innerHTML"]', this.textareaEl["innerHTML"]);
  }
  insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    // console.log("insertAfter", targetElement, parent);
    // console.log("insertAfter", parent.lastChild, targetElement);
    if (parent.lastChild === targetElement) {
      parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling);
    }
  }

  insertBr() {
    // console.log("==================");
    const html = "<p><br></p>";
    const el = document.createElement("div");
    el.innerHTML = html;
    let frag = document.createDocumentFragment(),
      node: any;
    while ((node = el.firstChild)) {
      // console.log(node);
      this.editRange = {
        startOffset: 0,
        endOffset: 0,
        el: node,
      };
      frag.appendChild(node);
    }
    if (window.getSelection) {
      // IE9 and non-IE
      const sel = getSelection();
      const range = sel.getRangeAt(0);
      this.insertAfter(frag, range.endContainer);
      this.setCursorToLastPostion();

      // console.log("==================");
      // // }
    }

    // console.log("insetBr", this.value);
  }
  render() {
    return (
      <div
        style={{
          ...["width"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        ref={(e) => {
          this.paddingLeftPixel = e.style.paddingLeft;
          this.paddingPixel =
            Number(e.style.paddingRight.split("px")[0]) +
            Number(e.style.paddingLeft.split("px")[0]) +
            "px";
        }}
        class={
          "saki-input-component " +
          (this.closeIcon ? " closeIcon " : "  ") +
          (this.animation || "") +
          " " +
          this.type +
          " " +
          (this.focus ? " focus " : "") +
          (this.content ? " havaValue " : "noValue")
        }
      >
        {/* {String(!!this.content) + this.content} */}
        {this.type !== "Textarea" ? (
          <input
            style={{
              ...[
                "borderRadius",
                "fontSize",
                "backgroundColor",
                "padding",
                "height",
                "backgroundColor",
              ].reduce(
                (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
                {}
              ),
            }}
            value={this.value}
            type="text"
            onFocus={() => {
              this.focus = true;
            }}
            minLength={this.minLength}
            maxLength={this.maxLength}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                this.pressenter.emit();
              }
            }}
            onInput={(e) => {
              // console.log("value:", e.target["value"]);
              this.value = e.target["value"];
              this.content = e.target["value"];
            }}
            onBlur={() => {
              this.focus = false;
            }}
            placeholder={""}
          />
        ) : (
          <div
            class={"textarea saki-editor scrollBarAuto"}
            style={{
              ...[
                "height",
                "maxHeight",
                "backgroundColor",
                "minHeight",
                "fontSize",
                "borderRadius",
                "padding",
                "backgroundColor",
              ].reduce(
                (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
                {}
              ),
              ...(this.textareaHeight
                ? {
                    height: this.textareaHeight,
                  }
                : {}),
            }}
            ref={(e) => {
              this.textareaEl = e;
            }}
            contenteditable="plaintext-only"
            // min={this.minLength}
            // max={this.maxLength}
            // value={this.value}
            onFocus={() => {
              // console.log("focus: ", this.value);

              this.focus = true;
              // if (!this.value) {
              // setTimeout(() => {
              //   this.insertHtmlAtCaretNew("<p>21</p>");
              // }, 300);
              // }
              switch (this.type) {
                case "Textarea":
                  this.setTextareaValue();
                  break;
              }
              // this.setCursorToLastPostion(this.textareaEl);
            }}
            onKeyUp={(e) => {
              // console.log("放开", e.keyCode);
              if (this.keyPressing === 16 && e.keyCode === 16) {
                this.keyPressing = 0;
              }
              // console.log("KeyWord啊啊啊啊");
              // this.setTextareaValue();
              // this.textareaEl.focus();
            }}
            // onKeyPress={(e) => {
            //   console.log("keypress", e);
            // }}
            onKeyDown={(e) => {
              // console.log(e.key, e);
              // console.log("按下", e.keyCode, this.keyPressing);
              // console.log(e.keyCode === 13 && this.keyPressing === 0);
              if (e.keyCode === 13 && this.keyPressing === 0) {
                // console.log(e);
                // console.log("send");
                this.pressenter.emit();
                // this.textareaEl.blur();
              }
              e.keyCode === 16 && (this.keyPressing = e.keyCode);
            }}
            onChange={(e) => {
              console.log("change", e.target["innerHTML"]);
            }}
            onInput={(e) => {
              // console.log("onInput");
              // console.log(e, this.textareaEl["innerHTML"]);

              // console.log(e);
              // console.log("on input", this.value);
              // console.log(
              //   'e["inputType"] === "insertLineBreak"',
              //   e["inputType"] === "insertLineBreak"
              // );

              // 获取选定对象
              const selection = getSelection();
              // console.log("input: ", selection.getRangeAt(0));
              this.editRange = {
                startOffset: selection.getRangeAt(0).startOffset,
                endOffset: selection.getRangeAt(0).endOffset,
                el: selection.getRangeAt(0).endContainer,
              };
              this.lastEditRangeStartOffset =
                selection.getRangeAt(0).startOffset;

              // console.log(
              //   1,
              //   !!e.target["innerText"],
              //   e.target["innerText"],
              //   e.target["innerHTML"],
              //   "onInput"
              // );
              this.formatContent();
              if (
                e["inputType"] === "insertLineBreak" &&
                this.keyPressing === 16
              ) {
                this.insertBr();
              }
              // console.log(
              //   2,
              //   !!e.target["innerText"],
              //   e.target["innerText"],
              //   e.target["innerHTML"],
              //   "onInput"
              // );
              this.content = e.target["innerText"];
              this.value = e.target["innerHTML"];
              if (this.content === "\n") {
                // console.log(e.target["innerText"]);
                this.content = this.replaceBlank(e.target["innerText"]);
                this.value = this.replaceBlank(e.target["innerHTML"]);
                e.target["innerHTML"] = this.value;
              }
              // console.log("onInput");
              // console.log(e, this.textareaEl["innerHTML"]);
              // this.insertHtmlAtCaretNew("<p>1111</p>");
              // e.target["style"].height = this.minHeight;
              // e.target["style"].height = e.target["scrollHeight"] + "px";
            }}
            onBlur={() => {
              // this.content = "";
              // console.log("this.value", !!this.value, !!this.content);
              this.focus = false;
            }}
            // placeholder={
            //   this.animation !== "BottomLineSpreadsOut" ? this.placeholder : ""
            // }
          ></div>
          // <textarea
          //   style={{
          //     ...[
          //       "height",
          //       "maxHeight",
          //       "minHeight",
          //       "padding",
          //       "fontSize",
          //       "backgroundColor",
          //     ].reduce(
          //       (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
          //       {}
          //     ),
          //     ...(this.textareaHeight
          //       ? {
          //           height: this.textareaHeight,
          //         }
          //       : {}),
          //   }}
          //   minLength={this.minLength}
          //   maxLength={this.maxLength}
          //   value={this.value}
          //   onFocus={() => {
          //     this.focus = true;
          //   }}
          //   onKeyDown={(e) => {
          //     if (e.keyCode === 13) {
          //       this.pressenter.emit();
          //     }
          //   }}
          //   onInput={(e) => {
          //     this.value = e.target["value"];
          //     e.target["style"].height = this.minHeight;
          //     e.target["style"].height = e.target["scrollHeight"] + "px";
          //     console.log(e.target["style"].height);
          //   }}
          //   onBlur={() => {
          //     this.focus = false;
          //   }}
          //   placeholder={
          //     this.animation !== "BottomLineSpreadsOut" ? this.placeholder : ""
          //   }
          // />
        )}
        {this.closeIcon ? (
          <div class="delete-icon">
            <svg
              // t="1639418573603"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1213"
              onClick={() => {
                this.value = "";
                this.content = "";
                this.clearvalue.emit();
              }}
            >
              <path
                d="M556.8 512L832 236.8c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2l-275.2-277.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l275.2 277.333333-277.333333 275.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333L512 556.8 787.2 832c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8L556.8 512z"
                p-id="1214"
              ></path>
            </svg>
          </div>
        ) : (
          ""
        )}

        <div
          style={{
            ...["fontSize", "padding"].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
            left: this.paddingLeftPixel,
          }}
          class="placeholder text-elipsis"
        >
          {this.placeholder}
        </div>
        <div
          style={{
            width: "calc(100% - " + this.paddingPixel + ")",
          }}
          class="line"
        ></div>
      </div>
    );
  }
}
