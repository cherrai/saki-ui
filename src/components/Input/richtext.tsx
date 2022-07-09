import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";

import Quill from "quill";

@Component({
  tag: "saki-richtext",
  styleUrl: "richtext.scss",
  // shadow: true,
})
export class RichTextComponent {
  editorEl: HTMLElement;
  quill: Quill;
  @State() toolBarHeight = "";

  @Prop({ mutable: true }) width: string = "";
  @Prop() padding: string = "";
  @Prop() toolbarPadding: string = "";
  @Prop() toolbarButtonHoverColor: string = "var(--saki-default-hover-color)";
  @Prop() toolbarButtonActiveColor: string = "var(--saki-default-hover-color)";
  @Prop() editorPadding: string = "";
  @Prop() placeholder: string = "";
  @Prop({ mutable: true }) value: string = "";
  @Prop({ mutable: true }) theme: "snow" | "bubble" | "" = "";

  @Prop() backgroundColor: string = "";
  @State() dValue = "<p><br></p>";
  @State() dContent = "";

  // 限制大小通过检测content来实现是否输入
  @Prop() maxHeight: string = "";
  @Prop() minHeight: string = "";
  @Prop() maxLength: number = 100000;
  @Prop() minLength: number = 0;
  @Prop() disabled: boolean = false;

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
    // // console.log("this.value", this.value, this.content);
    // // console.log(this);
    if (!this.dValue) {
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
    // this.quill.root.innerHTML = this.value;
    // this.editorEl.innerHTML = this.value;
    // console.log("watchValueFuncF", this.value);
    // this.editorEl = this.el.querySelector(".sr-editor");
    // this.editorEl.innerHTML = this.value;
  }
  @Watch("focus")
  watchFocusFunc() {}
  inputValue() {}
  componentWillLoad() {}
  componentDidLoad() {
    setTimeout(() => {
      this.init();

      const toolbarEl: HTMLElement = this.el.querySelector(".ql-toolbar");
      this.toolBarHeight = toolbarEl.clientHeight + "px";

      new ResizeObserver(() => {
        this.toolBarHeight = toolbarEl.clientHeight + "px";
      }).observe(toolbarEl);
      new MutationObserver(() => {
        this.toolBarHeight = toolbarEl.clientHeight + "px";
      }).observe(toolbarEl, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    });
  }
  // @Method()
  // async setHTML(value: string) {
  //   this.quill.root.innerHTML = this.value;
  // }
  @Method()
  async init() {
    if (this.quill) {
      setTimeout(() => {
        this.quill.root.innerHTML = this.value;
      });
      return;
    }
    this.width =
      this.el.querySelector(".saki-richtext-component").clientWidth + "px";

    this.editorEl = this.el.querySelector(".sr-editor");
    this.editorEl.innerHTML = this.value;
    this.quill = new Quill(this.editorEl, {
      theme: this.theme,
      modules: {
        toolbar: [
          [
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "code-block",
            { header: 1 },
            { header: 2 },
            { script: "sub" },
            { script: "super" },
            { indent: "-1" },
            { indent: "+1" },
            { size: ["small", false, "large", "huge"] },
            { header: [1, 2, 3, 4, 5, 6, false] },
            { color: [] },
            { background: [] },
            { list: "ordered" },
            { list: "bullet" },
            { direction: "rtl" },
            { align: [] },
            "link",
            // "image",
            // "video",
            "clean",
          ], // 加粗 斜体 下划线 删除线  // 引用  代码块
          // [], // 1、2 级标题
          // [], // 上标/下标
          // [], // 缩进
          // // [{ direction: "rtl" }], // 文本方向
          // [], // 字体大小
          // // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
          // [],
          // [], // 有序、无序列表
          // [], // 对齐方式
          // [], // 清除文本格式
          // ["link", "image", "video"], // 链接、图片 'image'、视频, "video"
        ], //工具菜单栏配置
      },
      readOnly: this.disabled, //是否只读
      placeholder: this.placeholder, //提示
      // theme: 'snow' //主题 snow/bubble
      // syntax: false, //语法检测
    });
    console.log(this.quill);

    this.quill.on("editor-change", () => {
      // console.log(eventName, ags);
      this.changevalue.emit({
        content: this.quill.getText(),
        richText: this.quill.root.innerHTML,
      });
    });

    const el: HTMLElement = this.editorEl.querySelector(".ql-editor");
    el.classList.add("scrollBarDefault");
  }
  render() {
    return (
      <div
        style={{
          ...["padding"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          "--editor-padding": this.editorPadding,
          "--toolbar-padding": this.toolbarPadding,
          "--toolbar-button-hover-color": this.toolbarButtonHoverColor,
          "--toolbar-button-active-color": this.toolbarButtonActiveColor,
        }}
        class={"saki-richtext-component "}
      >
        <div
          style={{
            height: "calc(100% - " + this.toolBarHeight + ")",
            // width: this.width,
            ...[].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
          }}
          class={"sr-editor"}
        ></div>
      </div>
    );
  }
}
