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
  @Prop() type:
    | "Text"
    | "Password"
    | "Number"
    | "Textarea"
    | "Search"
    | "Range" = "Text";
  @Prop() placeholderAnimation: "MoveUp" | "" = "";
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
  @Prop() disabled: boolean = false;
  @Prop() searchContent: boolean = false;

  @Prop() autoComplete: string = "";
  @Prop() textAlign: string = "left";
  @Prop() subtitle: string = "";
  @Prop() borderRadius: string = "";
  @Prop() maxHeight: string = "";
  @Prop() minHeight: string = "";
  @Prop() min: number = 0;
  @Prop() max: number = 0;
  @Prop() height: string = "";
  @Prop() textareaHeight: string = "";
  @Prop() width: string = "";
  @Prop() maxWidth: string = "";
  @Prop() border: string = "";
  @Prop() borderTop: string = "";
  @Prop() borderRight: string = "";
  @Prop() borderBottom: string = "";
  @Prop() borderLeft: string = "";
  @Prop() padding: string = "";
  @Prop() margin: string = "";
  @Prop() fontSize: string = "";
  @Prop() placeholder: string = "";
  @Prop() color: string = "";
  @Prop() error: string = "";
  @Prop() errorColor: string = "";
  @Prop() errorFontSize: string = "";
  @State() passwordIcon: boolean = true;
  @State() editRange = {
    startOffset: 0,
    endOffset: 0,
    el: null,
  };
  @State() lastEditRangeStartOffset: number = 0;
  paddingPixel: string = "";
  paddingLeftPixel: string = "";
  @State() focus: boolean = false;
  @State() showPassword: boolean = false;
  @Event() tap: EventEmitter;
  @Event() changevalue: EventEmitter;
  @Event() changecontent: EventEmitter;
  @Event() pressenter: EventEmitter;
  @Event() clearvalue: EventEmitter;

  @Event() focusfunc: EventEmitter;
  @Event() blurfunc: EventEmitter;

  @Event() inputElement: EventEmitter;

  textareaEl: any | HTMLTextAreaElement;
  inputEl: any | HTMLInputElement;
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
      // this.setTextareaValue();
      this.inputValue({
        content: this.content,
        value: this.value,
      });
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
  @Watch("focus")
  watchFocusFunc() {
    if (this.type === "Number") {
      this.value = this.value.replace(/\D/g, "");

      this.max &&
        Number(this.value) > this.max &&
        (this.value = String(this.max));
      this.min &&
        Number(this.value) < this.min &&
        (this.value = String(this.min));
    }
  }
  inputValue(_: { content: string; value: string }) {
    switch (this.type) {
      case "Textarea":
        // if (content === "") {
        //   this.setTextareaValue();
        // }
        // this.changevalue.emit({
        //   content: content.trim() || "",
        //   richText: value || "",
        // });

        this.content = this.value;
        // console.log("this.content",this.content)
        this.changevalue.emit(this.value || "");
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
      case "Textarea":
        break;

      default:
        this.content = this.value;
        break;
    }
    this.setTextareaValue();
  }
  componentDidLoad() {
    // console.log(this.inputEl);
  }

  @Method()
  async getFocus() {
    return this.focus;
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
    } else {
      this.focus = true;
      this.inputEl?.focus();
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
  // 暂时仅Textare
  @Method()
  async select(startIndex: number, endIndex: number) {
    const el: HTMLTextAreaElement = this.textareaEl;
    el.setSelectionRange(startIndex, endIndex, "forward");
    el.focus();
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
    console.log("setCursorToLastPostion", this.editRange);
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
    // 之前删除的要回复
    // this.setCursorToLastPostion();
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
      // 之前删除的要回复
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
          ...["maxWidth", "width", "margin", "textAlign"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          "--saki-input-range-background-color":
            this.backgroundColor || "var(--saki-default-color)",
          "--saki-input-range-width": this.width || "10px",
          "--saki-input-range-height": this.height || "10px",
          "--saki-input-range-thumb":
            "calc(var(--saki-input-range-height) + 8px)",
          "--saki-input-placeholder-font-size": this.fontSize,
        }}
        ref={(e) => {
          this.paddingLeftPixel = e.style.paddingLeft;
          this.paddingPixel =
            Number(e.style.paddingRight.split("px")[0]) +
            Number(e.style.paddingLeft.split("px")[0]) +
            "px";
        }}
        class={"saki-input-component " + (this.error ? " error " : "")}
      >
        {/* {String(!!this.content) + this.content} */}

        {this.subtitle ? <div class="si-subtitle">{this.subtitle}</div> : ""}
        <div
          class={
            "si-input " +
            (this.closeIcon ? " closeIcon " : "  ") +
            (this.placeholderAnimation || "") +
            " " +
            this.type +
            " " +
            (this.focus ? " focus " : "") +
            (this.value ? " havaValue " : "noValue")
          }
        >
          {this.type !== "Textarea" ? (
            <input
              ref={(e) => {
                this.inputEl = e;
                this.inputElement.emit(this.inputEl);
              }}
              style={{
                ...[
                  "maxWidth",
                  "width",
                  "borderRadius",
                  "fontSize",
                  "height",
                  "padding",
                  "backgroundColor",
                  "border",
                  "borderTop",
                  "borderRight",
                  "borderBottom",
                  "borderLeft",
                  "textAlign",
                  "color",
                ].reduce(
                  (fin, cur) =>
                    this[cur] ? { ...fin, [cur]: this[cur] } : fin,
                  {}
                ),
              }}
              type={
                this.type === "Password"
                  ? this.showPassword
                    ? "text"
                    : "password"
                  : this.type === "Range"
                  ? "range"
                  : "text"
              }
              disabled={this.disabled}
              minLength={this.minLength}
              maxLength={this.maxLength}
              min={this.min}
              max={this.max}
              autocomplete={this.autoComplete}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  this.pressenter.emit();
                }
              }}
              // onKeyUp={(e) => {
              //   console.log(
              //     "CapsLock onKeyUp",
              //     e,
              //     e.getModifierState("CapsLock")
              //   );
              // }}
              // onMouseUp={(e) => {
              //   console.log(
              //     "CapsLock onMouseUp",
              //     e,
              //     e.getModifierState("CapsLock")
              //   );
              // }}
              onInput={(e) => {
                // console.log("value:", this.type, e.target["value"]);
                this.value = e.target["value"];
                if (this.type === "Number") {
                  this.value = this.value.replace(/\D/g, "");
                  e.target["value"] = this.value;
                }
                this.content = this.value;
              }}
              onFocus={() => {
                this.focus = true;
                this.focusfunc.emit();
                // console.log("CapsLock onFocus", e);
              }}
              onBlur={() => {
                this.focus = false;
                this.blurfunc.emit();
                // console.log("CapsLock", e);
              }}
              placeholder={
                this.placeholderAnimation === "" ? this.placeholder : ""
              }
              value={this.value}
            />
          ) : (
            // <div
            //   class={"textarea saki-editor scrollBarAuto"}
            //   style={{
            //     ...[
            //       "height",
            //       "maxHeight",
            //       "minHeight",
            //       "fontSize",
            //       "padding",
            //       "borderRadius",
            //       "backgroundColor",
            //     ].reduce(
            //       (fin, cur) =>
            //         this[cur] ? { ...fin, [cur]: this[cur] } : fin,
            //       {}
            //     ),
            //     ...(this.textareaHeight
            //       ? {
            //           height: this.textareaHeight,
            //         }
            //       : {}),
            //   }}
            //   ref={(e) => {
            //     this.textareaEl = e;
            //     this.setTextareaValue();
            //   }}
            //   contenteditable="plaintext-only"
            //   // min={this.minLength}
            //   // max={this.maxLength}
            //   // value={this.value}
            //   onFocus={() => {
            //     // console.log("focus: ", this.value);

            //     this.focus = true;
            //     // if (!this.value) {
            //     // setTimeout(() => {
            //     //   this.insertHtmlAtCaretNew("<p>21</p>");
            //     // }, 300);
            //     // }
            //     switch (this.type) {
            //       case "Textarea":
            //         this.setTextareaValue();
            //         break;
            //     }
            //     this.focusfunc.emit();
            //     // this.setCursorToLastPostion(this.textareaEl);
            //   }}
            //   onBlur={() => {
            //     this.focus = false;
            //     this.blurfunc.emit();
            //   }}
            //   onKeyUp={(e) => {
            //     // console.log("放开", e.keyCode);
            //     if (this.keyPressing === 16 && e.keyCode === 16) {
            //       this.keyPressing = 0;
            //     }
            //     // console.log("KeyWord啊啊啊啊");
            //     // this.setTextareaValue();
            //     // this.textareaEl.focus();
            //   }}
            //   // onKeyPress={(e) => {
            //   //   console.log("keypress", e);
            //   // }}
            //   onKeyDown={(e) => {
            //     // console.log(e.key, e);
            //     // console.log("按下", e.keyCode, this.keyPressing);
            //     // console.log(e.keyCode === 13 && this.keyPressing === 0);
            //     if (e.keyCode === 13 && this.keyPressing === 0) {
            //       // console.log(e);
            //       // console.log("send");
            //       this.pressenter.emit();
            //       // this.textareaEl.blur();
            //     }
            //     e.keyCode === 16 && (this.keyPressing = e.keyCode);
            //   }}
            //   onChange={(e) => {
            //     console.log("change", e.target["innerHTML"]);
            //   }}
            //   onInput={(e) => {
            //     if (this.disabled) {
            //       e.target["innerHTML"] = this.value;
            //       return;
            //     }
            //     // 获取选定对象
            //     const selection = getSelection();
            //     // console.log("input: ", selection.getRangeAt(0));
            //     this.editRange = {
            //       startOffset: selection.getRangeAt(0).startOffset,
            //       endOffset: selection.getRangeAt(0).endOffset,
            //       el: selection.getRangeAt(0).endContainer,
            //     };
            //     this.lastEditRangeStartOffset =
            //       selection.getRangeAt(0).startOffset;

            //     this.formatContent();
            //     console.log(e["inputType"], this.keyPressing);
            //     console.log(
            //       e["inputType"] === "insertLineBreak" &&
            //         this.keyPressing === 16
            //     );
            //     if (
            //       e["inputType"] === "insertLineBreak" &&
            //       this.keyPressing === 16
            //     ) {
            //       this.insertBr();
            //     }
            //     this.content = e.target["innerText"];
            //     this.value = e.target["innerHTML"];
            //     if (this.content === "\n") {
            //       this.content = this.replaceBlank(e.target["innerText"]);
            //       this.value = this.replaceBlank(e.target["innerHTML"]);
            //       e.target["innerHTML"] = this.value;
            //     }
            //   }}
            //   // placeholder={
            //   //   this.animation !== "BottomLineSpreadsOut" ? this.placeholder : ""
            //   // }
            // ></div>

            <textarea
              style={{
                ...[
                  "height",
                  "maxHeight",
                  "minHeight",
                  "padding",
                  "fontSize",
                  "backgroundColor",
                  "border",
                  "borderTop",
                  "borderRight",
                  "borderBottom",
                  "borderLeft",
                  "borderRadius",
                  "textAlign",
                  "color",
                ].reduce(
                  (fin, cur) =>
                    this[cur] ? { ...fin, [cur]: this[cur] } : fin,
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
              minLength={this.minLength}
              maxLength={this.maxLength}
              value={this.value}
              onFocus={() => {
                this.focus = true;
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  this.pressenter.emit();
                }
              }}
              onInput={(e) => {
                this.value = e.target["value"];
                e.target["style"].height = this.minHeight;
                e.target["style"].height = e.target["scrollHeight"] + "px";
                // console.log(e.target["style"].height);
              }}
              onBlur={() => {
                this.focus = false;
              }}
                placeholder={this.placeholder}
                class={"scrollBarHover"}
            />
          )}
          {this.type === "Search" ? (
            this.searchContent ? (
              <slot name="searchContent"></slot>
            ) : (
              <div
                onClick={() => {
                  this.pressenter.emit();
                }}
                class="search-icon"
              >
                <svg
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3078"
                >
                  <path
                    d="M662.635 460.563q0-87.1-61.912-149.013t-149.013-61.912-149.013 61.912-61.912 149.013 61.912 149.013 149.013 61.912 149.013-61.912 61.912-149.013zM903.69 852.278q0 24.482-17.891 42.373t-42.373 17.891q-25.424 0-42.373-17.891l-161.488-161.017q-84.276 58.381-187.853 58.381-67.326 0-128.768-26.13t-105.933-70.622-70.622-105.933-26.13-128.768 26.13-128.768 70.622-105.933 105.933-70.622 128.768-26.13 128.767 26.13 105.933 70.622 70.622 105.933 26.13 128.768q0 103.578-58.381 187.853l161.488 161.488q17.421 17.421 17.421 42.373z"
                    p-id="3079"
                  ></path>
                </svg>
              </div>
            )
          ) : (
            ""
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
          {this.type === "Password" && this.passwordIcon ? (
            <div class={"showpassword-icon "}>
              {this.showPassword ? (
                <svg
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2816"
                  onClick={() => {
                    this.showPassword = false;
                  }}
                >
                  <path
                    d="M895.887692 510.817058l-0.124843 0c-29.429263-75.876108-78.742389-141.076062-141.17737-188.484815l34.131355-30.912034c10.169617-9.215896 10.918677-24.899086 1.654686-35.036981l-3.435239-3.749394c-9.247618-10.137895-24.993231-10.887978-35.161824-1.671059l-44.488237 40.316218c-58.170864-32.661887-124.650975-51.204196-195.302081-51.204196-173.684738 0-322.204329 112.030539-383.764384 270.742261l-0.109494 0c0.016373 0.062422 0.031722 0.093121 0.062422 0.155543-0.030699 0.031722-0.046049 0.094144-0.062422 0.125867l0.109494 0c28.210505 73.291237 74.680886 136.709615 133.476991 183.884031l-41.565674 37.676088c-10.169617 9.216919-10.918677 24.899086-1.671059 35.021631l3.436262 3.780093c9.247618 10.122545 24.993231 10.871605 35.177174 1.655709l50.735521-45.986357c60.232826 36.145222 129.899512 56.795541 204.175169 56.795541 173.714414 0 322.218656-112.873744 383.77871-272.826735l0.124843 0c-0.030699-0.031722-0.046049-0.094144-0.062422-0.125867C895.841643 510.910179 895.856993 510.87948 895.887692 510.817058L895.887692 510.817058zM184.906825 510.972601c58.248635-128.017652 182.619224-216.71067 327.077314-216.71067 54.686507 0 106.46887 12.715603 152.892179 35.443233l-76.024487 68.870554c-21.963221-14.69877-48.4075-23.258727-76.853365-23.258727-76.258825 0-138.084938 61.575404-138.084938 137.561006 0 23.681352 5.998621 45.955658 16.588817 65.418942l-88.427982 80.101339C252.10632 620.75289 211.586464 570.017368 184.906825 510.972601L184.906825 510.972601zM595.241354 512.87902c0 45.768393-37.286208 82.913385-83.241866 82.913385-16.511046 0-31.896454-4.779863-44.831045-13.059434l118.903064-107.718327C591.945285 486.354923 595.241354 499.226069 595.241354 512.87902L595.241354 512.87902zM428.773995 512.87902c0-45.807279 37.254485-82.936921 83.225493-82.936921 12.184507 0 23.759123 2.608407 34.193777 7.29515L433.210028 539.590382C430.33556 531.216667 428.773995 522.219759 428.773995 512.87902L428.773995 512.87902zM511.984139 729.284745c-58.280358 0-113.279996-14.558577-162.000628-40.36329l75.759451-68.636217c23.617907 18.869766 53.609988 30.147624 86.256526 30.147624 76.258825 0 138.084938-61.575404 138.084938-137.553842 0-27.835975-8.31027-53.741995-22.586414-75.407434l86.661755-78.493725c53.532217 37.879726 96.878444 90.3651 124.933407 151.99474C780.828167 639.935788 656.457578 729.284745 511.984139 729.284745L511.984139 729.284745zM511.984139 729.284745"
                    p-id="2817"
                  ></path>
                </svg>
              ) : (
                <svg
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3572"
                  onClick={() => {
                    this.showPassword = true;
                  }}
                >
                  <path
                    d="M895.887692 510.808872l-0.12382 0c-61.560054-158.704558-210.064296-270.734074-383.779733-270.734074-173.684738 0-322.204329 112.030539-383.764384 270.734074l-0.109494 0c0.01535 0.063445 0.030699 0.109494 0.062422 0.155543-0.031722 0.047072-0.047072 0.094144-0.062422 0.141216l0.109494 0c61.560054 159.946852 210.064296 272.818549 383.764384 272.818549 173.715437 0 322.219679-112.87272 383.779733-272.818549l0.12382 0c-0.030699-0.047072-0.046049-0.094144-0.062422-0.141216C895.841643 510.918365 895.856993 510.872317 895.887692 510.808872zM511.984139 729.284745c-144.458089 0-268.829701-89.348957-327.077314-218.320331 58.248635-128.009466 182.619224-216.703507 327.077314-216.703507 144.473439 0 268.844028 88.694041 327.108013 216.703507C780.828167 639.935788 656.457578 729.284745 511.984139 729.284745zM623.779318 447.920566c0 35.302017-28.647457 63.950498-63.981197 63.950498-35.349089 0-63.981197-28.64848-63.981197-63.950498s28.632107-63.949474 63.981197-63.949474c0.177032 0 0.352017 0.01228 0.529049 0.013303-15.042601-5.599532-31.324426-8.667404-48.327682-8.667404-76.258825 0-138.084938 61.576427-138.084938 137.553842 0 75.986625 61.826114 137.562029 138.084938 137.562029 76.259848 0 138.084938-61.575404 138.084938-137.562029 0-32.108279-11.04352-61.644989-29.550013-85.049025C622.629121 434.144818 623.779318 440.897615 623.779318 447.920566z"
                    p-id="3573"
                  ></path>
                </svg>
              )}
            </div>
          ) : (
            ""
          )}

          {this.placeholderAnimation === "MoveUp" ? (
            <div
              style={{
                ...["fontSize", "color"].reduce(
                  (fin, cur) =>
                    this[cur] ? { ...fin, [cur]: this[cur] } : fin,
                  {}
                ),
                left: this.paddingLeftPixel,
              }}
              class="placeholder text-elipsis"
            >
              {this.placeholder}
            </div>
          ) : (
            ""
          )}

          {this.placeholderAnimation === "MoveUp" ? (
            <div
              style={{
                width: "calc(100% - " + this.paddingPixel + ")",
              }}
              class="line"
            ></div>
          ) : (
            ""
          )}
        </div>
        <div
          style={{
            color: this.errorColor,
            fontSize: this.errorFontSize,
          }}
          class={"si-error"}
        >
          {this.error}
        </div>
      </div>
    );
  }
}
