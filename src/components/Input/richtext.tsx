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

import Quill, { RangeStatic } from "quill";

@Component({
  tag: "saki-richtext",
  styleUrl: "richtext.scss",
  // shadow: true,
})
export class RichTextComponent {
  editorEl: HTMLElement;
  quill: Quill;
  focus: boolean = false;
  cursorPosition: number = 0;
  selectionRangeStatic: RangeStatic;
  @State() isInit = false;
  @State() toolBarHeight = "";

  @Prop({ mutable: true }) width: string = "";
  @Prop() padding: string = "";
  @Prop() toolbarPadding: string = "";
  @Prop() toolbarButtonHoverColor: string = "var(--saki-default-hover-color)";
  @Prop() toolbarButtonActiveColor: string = "var(--saki-default-hover-color)";
  @Prop() editorPadding: string = "";
  @Prop() placeholder: string = "";
  @Prop({ mutable: true }) value: string = "";
  @Prop({ mutable: true }) toolbar: any[] = [];
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
  // @State() focus: boolean = false;
  @Event() tap: EventEmitter;
  @Event() changevalue: EventEmitter;
  @Event() changecontent: EventEmitter;
  @Event() pressenter: EventEmitter;
  @Event() clearvalue: EventEmitter;

  @Event() focusfunc: EventEmitter;
  @Event() blurfunc: EventEmitter;
  @Event() handlers: EventEmitter;

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
      // this.focus = true;
      // this.setTextareaValue();
    }
    this.inputValue();
    // if (value !== oldvalue) {
    // }
    // this.updateTime = new Date().getTime();
  }
  @Watch("value")
  watchValueFunc() {
    // this.cursorPosition = this.value?.length - 1;
    // if (this.cursorPosition === 0 && this.value.length > cursorPosition) {
    // }
  }
  // @Watch("focus")
  // watchFocusFunc() {}
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
    this.isInit = false;
    if (this.quill) {
      return;
    }
    this.width =
      this.el.querySelector(".saki-richtext-component").clientWidth + "px";

    this.editorEl = this.el.querySelector(".sr-editor");
    this.editorEl.innerHTML = this.value;
    this.quill = new Quill(this.editorEl, {
      theme: this.theme,
      modules: {
        toolbar: {
          container: [
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "code-block",
            // { header: 1 },
            // { header: 2 },
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
            "image",
            // "video",
            "clean",
          ],
          handlers: {
            image: (val: boolean) => {
              // console.log("image,val");
              this.handlers.emit({
                handler: "Image",
              });
              if (val) {
                // document.querySelector('.quill-img input').click()
              } else {
              }
            },
            video: (val: boolean) => {
              // console.log("video,val");
              this.handlers.emit({
                handler: "Video",
              });
              if (val) {
                // document.querySelector('.quill-img input').click()
              } else {
              }
            },
          },
        },
        // 加粗 斜体 下划线 删除线  // 引用  代码块
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
        //工具菜单栏配置
      },
      readOnly: this.disabled, //是否只读
      placeholder: this.placeholder, //提示
      // theme: 'snow' //主题 snow/bubble
      // syntax: false, //语法检测
    });

    this.quill.root.oninput = () => {
      // console.log("oninpuit");
      this.editorChange("text-change");
    };

    this.quill.root.onfocus = () => {
      // console.log("oninpuit");
      this.focus = true;
    };

    this.quill.root.onblur = () => {
      this.focus = false;
    };

    this.quill.on("editor-change", (eventName: string, params: any) => {
      console.log(eventName, params);
      if (eventName === "selection-change") {
        this.selectionRangeStatic = params;
      }
      this.editorChange(eventName);
    });
    this.quill.on(
      "selection-change",
      (
        range: { index: number; length: Number },
        oldRange: { index: number; length: Number }
      ) => {
        // console.log(range, oldRange, source);
        this.cursorPosition =
          range?.index || oldRange?.index || this.value?.length - 1;
        // console.log(this.cursorPosition);
      }
    );

    const el: HTMLElement = this.editorEl.querySelector(".ql-editor");
    el.classList.add("scrollBarDefault");
    this.isInit = true;
  }
  @Method()
  async initValue(value: string) {
    this.quill.root.innerHTML = value || this.value;
    this.cursorPosition = (value || this.value)?.length - 1;
  }
  @Method()
  async getFocus() {
    return this.focus;
  }
  @Method()
  insetNode({ type, src }: { type: "Video" | "Image"; src: string }) {
    let node = "";
    switch (type) {
      case "Image":
        node = '<img src="' + src + '" >';
        break;
      case "Video":
        node = '<iframe src="' + src + '"></iframe>';
        break;

      default:
        break;
    }
    // console.log(this.quill?.getSelection()?.index)
    this.cursorPosition = this.quill?.getSelection()?.index || 0;
    // console.log(this.cursorPosition);
    // 插入图片  res.info为服务器返回的图片地址
    // console.log(node);
    this.quill.clipboard.dangerouslyPasteHTML(
      this.cursorPosition,
      // iFrame
      node
    );
    // 调整光标到最后
    this.quill.setSelection(this.cursorPosition + 1, 0);
  }
  editorChange = (eventName: string) => {
    // console.log("editorChange");
    if (eventName === "text-change" && this.isInit) {
      this.changevalue.emit({
        content: this.quill.getText(),
        richText: this.quill.root.innerHTML,
      });
    } else {
      this.isInit = true;
    }
  };
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
