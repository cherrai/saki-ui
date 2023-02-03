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
  tag: "saki-textarea",
  styleUrl: "textarea.scss",
  // shadow: true,
})
export class TextareaComponent {
  @Prop() backgroundColor: string = "";
  @State() dValue = "<p><br></p>";
  @State() dContent = "";
  @Prop({ mutable: true }) value: string = "";
  @Prop({ mutable: true }) content: string = "";
  // 限制大小通过检测content来实现是否输入
  @Prop() maxLength: number = 100000;
  @Prop() minLength: number = 0;
  @Prop() disabled: boolean = false;
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
  @Prop() padding: string = "";
  @Prop() fontSize: string = "";
  @Prop() placeholder: string = "";

  @State() editRange = {
    startOffset: 0,
    endOffset: 0,
    el: null,
  };
  @State() lastEditRangeStartOffset: number = 0;
  paddingPixel: string = "";
  paddingLeftPixel: string = "";
  @State() focus: boolean = false;
  @Event() tap: EventEmitter;
  @Event() changevalue: EventEmitter;
  @Event() changecontent: EventEmitter;
  @Event() pressenter: EventEmitter;
  @Event() clearvalue: EventEmitter;

  @Event() focusfunc: EventEmitter;
  @Event() blurfunc: EventEmitter;

  textareaEl: any | HTMLTextAreaElement;
  inputEl: any | HTMLInputElement;
  @State() keyEnter: boolean = false;
  @State() keyShift: boolean = false;

  @State() updateTime: number = 0;

  @Element() el: HTMLElement;
  @Watch("dValue")
  watchDValueFunc() {
    // // console.log(this);
    if (!this.dValue) {
      this.content = "";
      this.focus = true;
      // this.setTextareaValue();
    }
    this.inputValue();
    // if (value !== oldvalue) {
    // }
    // this.updateTime = new Date().getTime();
  }
  @Watch("value")
  watchValueFunc() {
    this.setTextareaValue();
    // // console.log("this.value", this.value, this.content);
    // // console.log(this);
    // if (!this.value) {
    //   this.content = "";
    //   this.focus = true;
    //   // this.setTextareaValue();
    //   this.inputValue({
    //     content: this.content,
    //     value: this.value,
    //   });
    // } else {
    //   this.inputValue({
    //     content: this.content,
    //     value: this.value,
    //   });
    // }
    // if (value !== oldvalue) {
    // }
    // this.updateTime = new Date().getTime();
  }
  @Watch("focus")
  watchFocusFunc() {}
  componentWillLoad() {
    this.setTextareaValue();
  }
  componentDidLoad() {}

  @Method()
  async getFocus() {
    return this.focus;
  }
  @Method()
  async inputfocus() {
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
  @Method()
  async clear() {
    // console.log("clear");
    this.textareaEl.innerHTML = "<p><br></p>";
    this.dContent = "";
    this.value = "<p><br></p>";
    this.dValue = "<p><br></p>";
    // console.log(this.value, this.dValue);
  }
  inputValue() {
    if (this.dContent === "") {
      this.setTextareaValue();
    }

    // console.log(this.dContent, this.dValue);
    this.changevalue.emit({
      content: this.dContent.trim() || "",
      richText: this.dValue || "",
    });
  }
  setTextareaValue() {
    console.log(this.value, this.dValue, this.dContent);
    if (!this.textareaEl) return;
    // || !this.dContent.trim()
    if (!this.value) {
      this.clear();
      return;
    }
    if (this.textareaEl.innerHTML !== this.value) {
      this.textareaEl.innerHTML = this.value;
      this.dContent = this.value.replace(/<[^>]+>/g, "").trim();
      this.dValue = this.value;
    }

    // console.log(
    //   this.textareaEl.innerHTML !== this.value,
    //   this.textareaEl.innerHTML,
    //   this.value,
    //   this.dContent,
    //   this.value,
    //   this.dValue
    // );

    // console.log(this.value, this.dValue);
    // console.log("setTextareaValue", this.dValue);
    // setTimeout(() => {
    //   this.dContent = this.textareaEl.innerText.trim();
    // });
    // // console.log(this.textareaEl["innerHTML"]);
  }
  setCursorToLastPostion() {
    // console.log("setCursorToLastPostion", this.editRange);
    if (!this.editRange.el) return;
    // setTimeout(() => {
    // // console.log("setCursorToLastPostion", this.editRange);
    const selection = getSelection();
    const r = document.createRange();
    selection.removeAllRanges();
    // // console.log(this.editRange.el);
    selection.addRange(r);
    selection.collapse(this.editRange.el, this.editRange.endOffset);
    selection?.collapseToEnd();
  }
  replaceBlank(str: string) {
    // // console.log(str);
    var reg = /\n/g;
    return str.replace(reg, "");
  }
  formatContent() {
    // // console.log(this.textareaEl.childNodes);
    this.textareaEl.childNodes.forEach((item) => {
      // // console.log(item.nodeName);
      // // console.log(item.nodeName === "#text" && item.data);
      if (item.nodeName === "#text" && item.data) {
        // // console.log("开始替换了TEXT");
        const p = document.createElement("p");
        p.innerHTML = this.replaceBlank(item.data);
        // // console.log(item.data, p.innerHTML);
        this.editRange.el = p;
        this.textareaEl.replaceChild(p, item);
      }
      if (item.nodeName === "P") {
        if (item.innerHTML.indexOf("\n") >= 0) {
          const el = document.createElement("p");
          // // console.log(item.innerHTML);
          el.innerHTML = this.replaceBlank(item.innerHTML);
          // // console.log(el);
          // // console.log(item.innerHTML);
          // // console.log(el.innerHTML);
          this.editRange.el = el;
          this.textareaEl.replaceChild(el, item);
          // // console.log(this.textareaEl.innerHTML);
        }
      }
    });
    // 之前删除的要回复
    this.setCursorToLastPostion();
    // // console.log(this.editRange);
    // setTimeout(() => {
    //   const selection = getSelection();
    //   selection.collapse(this.editRange.el, this.editRange.endOffset);
    // }, 300);
    // // console.log('this.textareaEl["innerHTML"]', this.textareaEl["innerHTML"]);
  }
  insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    // // console.log("insertAfter", targetElement, parent);
    // // console.log("insertAfter", parent.lastChild, targetElement);
    if (parent.lastChild === targetElement) {
      parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling);
    }
  }

  insertBr() {
    // // console.log("==================");
    const html = "<p><br></p>";
    const el = document.createElement("div");
    el.innerHTML = html;
    let frag = document.createDocumentFragment(),
      node: any;
    while ((node = el.firstChild)) {
      // // console.log(node);
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

      // // console.log("==================");
      // // }
    }

    // // console.log("insetBr", this.value);
  }
  render() {
    return (
      <div
        style={{
          ...["width", "height", "textAlign"].reduce(
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
        class={"saki-textarea-component "}
      >
        {/* {String(!!this.content) + this.content} */}

        <div
          style={{
            ...["width", "height"].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
          }}
          class={
            "si-textarea " +
            (this.focus ? " focus " : "") +
            (this.dContent ? " havaValue " : "noValue")
          }
        >
          <div
            class={"textarea saki-editor scrollBarAuto"}
            style={{
              ...[
                "height",
                "maxHeight",
                "minHeight",
                "fontSize",
                "padding",
                "borderRadius",
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
              if (!this.textareaEl) {
                this.textareaEl = e;
                this.setTextareaValue();
              }
            }}
            contenteditable="plaintext-only"
            // min={this.minLength}
            // max={this.maxLength}
            // value={this.value}
            onFocus={() => {
              // // console.log("focus: ", this.value);

              this.focus = true;
              this.setTextareaValue();
              this.focusfunc.emit();
              // this.setCursorToLastPostion(this.textareaEl);
            }}
            onBlur={() => {
              this.focus = false;
              this.blurfunc.emit();
            }}
            onKeyUp={(e) => {
              if (e.key === "Shift") {
                this.keyShift = false;
              }
              if (e.key === "Enter") {
                this.keyEnter = false;
              }
              // // console.log("放开", e.keyCode);
              // if (this.keyPressing === 16 && e.keyCode === 16) {
              //   this.keyPressing = 0;
              // }
              // // console.log("KeyWord啊啊啊啊");
              // this.setTextareaValue();
              // this.textareaEl.focus();
            }}
            // onKeyPress={(e) => {
            //   // console.log("keypress", e);
            // }}
            onKeyDown={(e) => {
              // console.log(e.key, e);
              if (e.key === "Shift") {
                this.keyShift = true;
              }
              if (e.key === "Enter") {
                this.keyEnter = true;
              }
              // // console.log(e.keyCode === 13 && this.keyPressing === 0);
              // if (e.keyCode === 13 && this.keyPressing === 0) {
              //   // // console.log(e);
              //   // // console.log("send");
              //   this.pressenter.emit();
              //   // this.textareaEl.blur();
              // }
              if (this.keyEnter) {
                if (this.keyShift) {
                  // this.insertBr();
                } else {
                  this.pressenter.emit();
                }
              }

              // if (e.keyCode === 13) {
              //   this.keyPressing = 13;
              // } else {
              //   this.keyPressing = 0;
              // }
            }}
            // onChange={(e) => {
            //   // console.log("change", e.target["innerHTML"]);
            // }}
            onInput={(e) => {
              // console.log(e.target["innerHTML"]);
              if (this.disabled) {
                e.target["innerHTML"] = this.value;
                return;
              }
              // // 获取选定对象
              const selection = getSelection();
              // // console.log("input: ", selection.getRangeAt(0));
              this.editRange = {
                startOffset: selection.getRangeAt(0).startOffset,
                endOffset: selection.getRangeAt(0).endOffset,
                el: selection.getRangeAt(0).endContainer,
              };
              this.lastEditRangeStartOffset =
                selection.getRangeAt(0).startOffset;

              this.formatContent();
              // console.log(e["inputType"]);
              if (e["inputType"] === "insertLineBreak") {
                this.insertBr();
              }
              this.dContent = e.target["innerText"];
              this.dValue = e.target["innerHTML"];
              // console.log(this.content, this.content === "\n");
              if (this.content === "\n") {
                this.dContent = this.replaceBlank(e.target["innerText"]);
                this.dValue = this.replaceBlank(e.target["innerHTML"]);
                e.target["innerHTML"] = this.dValue;
              }
              // console.log(this.dValue, e.target["innerHTML"]);
              // console.log(this.dContent);
            }}
            // placeholder={this.placeholder}
          ></div>

          <div
            style={{
              ...["fontSize"].reduce(
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
      </div>
    );
  }
}
