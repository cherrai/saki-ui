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
// import Keyboard from "quill/modules/keyboard";

export type KeyEvent = "NewLine" | "Submit" | "";

@Component({
  tag: "saki-richtext",
  styleUrl: "richtext.scss",
  // shadow: true,
})
export class RichTextComponent {
  editorEl: HTMLElement;
  quill: Quill;
  @State() focus: boolean = false;
  cursorPosition: number = 0;
  selectionRangeStatic: RangeStatic;
  @State() isInit = false;
  @State() toolBarHeight = "";

  @Prop({ mutable: true }) width: string = "";
  @Prop() padding: string = "";
  @Prop() toolbar: boolean = true;
  @Prop() toolbarPadding: string = "";
  @Prop() toolbarButtonHoverColor: string = "var(--saki-default-hover-color)";
  @Prop() toolbarButtonActiveColor: string = "var(--saki-default-hover-color)";
  @Prop() editorPadding: string = "";
  @Prop() placeholder: string = "";
  @Prop() clearAllStylesWhenPasting: boolean = false;

  @Prop() enter: KeyEvent = "NewLine";
  @Prop() shortEnter: KeyEvent = "NewLine";

  @Prop({ mutable: true }) value: string = "";
  @Prop({ mutable: true }) toolbarConfig: any = {
    // container: [],
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
        console.log("image,val");
        this.handlers.emit({
          handler: "Image",
        });
        if (val) {
          // document.querySelector('.quill-img input').click()
        } else {
        }
      },
      video: (val: boolean) => {
        console.log("video,val");
        this.handlers.emit({
          handler: "Video",
        });
        if (val) {
          // document.querySelector('.quill-img input').click()
        } else {
        }
      },
    },
  };
  @Prop({ mutable: true }) theme: "snow" | "bubble" | "" = "snow";

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
  @Event() submit: EventEmitter;
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
    // this.initValue(this.value);
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
      // this.init();

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
  KeyEvent(t: KeyEvent, range: any, _: any) {
    switch (t) {
      case "Submit":
        this.submit.emit();

        break;
      case "NewLine":
        this.quill.insertText(range.index, "\n");

        break;

      default:
        break;
    }
  }
  // @Method()
  // async setHTML(value: string) {
  //   this.quill.root.innerHTML = this.value;
  // }
  @Method()
  async setToolbar(value: any) {
    this.toolbarConfig = {
      handlers: this.toolbarConfig.handlers,
      ...value,
    };
    this.init();
  }
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

    // const Image = Quill.import("formats/image");
    // Image.className = "mwc-emoji";
    // Quill.register(Image, true);
    let FormatsImage = Quill.import("formats/image");
    let FormatsVideo = Quill.import("formats/video");
    // let Inline = Quill.import("formats/image");
    // let BlockEmbed = Quill.import("blots/block/embed");
    class ImageBlot extends FormatsImage {
      static blotName = "image"; // blot的名称，需要唯一
      static tagName = "img"; // 渲染的标签名
      static create(value) {
        let node = super.create();
        console.log("LinkBlot", value, node);
        node.setAttribute("class", value?.class || "");
        node.setAttribute("alt", value?.alt || "");
        node.setAttribute("title", value?.title || "");
        node.setAttribute("src", value?.src || "");
        node.setAttribute("data-name", value?.name || "");
        // node.onclick = () => {
        //   console.log("点击");
        // };
        const d = document.createElement("p");
        d.appendChild(node);
        d.appendChild(document.createElement("span"));
        return node;
      }

      static value(node) {
        // console.log("valuenode", node);
        return {
          class: node.getAttribute("class"),
          title: node.getAttribute("title"),
          alt: node.getAttribute("alt"),
          src: node.getAttribute("src"),
          name: node.getAttribute("name"),
        };
      }
    }
    Quill.register(ImageBlot);

    class VideoBlot extends FormatsVideo {
      static blotName = "video"; // blot的名称，需要唯一
      static tagName = "iframe"; // 渲染的标签名
      static create(value) {
        let node = super.create();
        console.log("LinkBlot", value, node);
        node.setAttribute("class", value?.class || "");
        node.setAttribute("alt", value?.alt || "");
        node.setAttribute("title", value?.title || "");
        node.setAttribute("src", value?.src || "");
        node.setAttribute("data-name", value?.name || "");
        // node.onclick = () => {
        //   console.log("点击");
        // };
        const d = document.createElement("p");
        d.appendChild(node);
        d.appendChild(document.createElement("span"));
        return node;
      }

      static value(node) {
        // console.log("valuenode", node);
        return {
          class: node.getAttribute("class"),
          title: node.getAttribute("title"),
          alt: node.getAttribute("alt"),
          src: node.getAttribute("src"),
          name: node.getAttribute("name"),
        };
      }
    }
    Quill.register(VideoBlot);

    let Break = Quill.import("blots/break");
    Quill.register(Break);

    // const Video = Quill.import("formats/video");
    // Video.className = "saki-richtext-video";
    // Quill.register(Video, true);

    // class SpanBlock extends Inline {
    //   static create(value) {
    //     console.log(value);
    //     let node = super.create();
    //     node.setAttribute("class", "spanblock");
    //     return node;
    //   }
    // }

    // SpanBlock.blotName = "spanblock";
    // SpanBlock.tagName = "img";
    // Quill.register(SpanBlock);
    // console.log("rrrrrr", this.toolbarConfig);
    this.quill = new Quill(this.editorEl, {
      theme: this.theme,
      modules: {
        history: {
          delay: 2000,
          maxStack: 500,
          userOnly: true,
        },
        clipboard: {
          matchers: [
            [
              Node.ELEMENT_NODE,
              (_: any, delta: any) => {
                if (this.clearAllStylesWhenPasting) {
                  const opsList = [];
                  delta.ops.forEach((op) => {
                    if (op.insert && typeof op.insert === "string") {
                      opsList.push({
                        insert: op.insert,
                      });
                    }
                  });
                  delta.ops = opsList;
                }
                return delta;
              },
            ],
          ],
        },
        toolbar: {
          ...this.toolbarConfig,
        },
        keyboard: {
          bindings: {
            short_enter: {
              key: 13,
              shortKey: true,
              handler: (range: any, ctx: any) => {
                this.KeyEvent(this.shortEnter, range, ctx);
              },
            },
            enter: {
              key: 13,
              handler: (range: any, ctx: any) => {
                console.log("KeyEvent");
                this.KeyEvent(this.enter, range, ctx);
                // submit form }
              },
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
      console.log("oninpuit");
      this.editorChange("text-change");
    };

    this.quill.root.onfocus = () => {
      console.log("onfocus");
      this.focus = true;
    };

    this.quill.root.onblur = () => {
      this.focus = false;
    };


    this.quill.on("editor-change", (eventName: string, params: any) => {
      if (eventName === "selection-change") {
        this.selectionRangeStatic = params;
      }
      console.log(eventName, params);
      this.editorChange(eventName);
    });
    this.quill.on(
      "selection-change",
      (
        range: { index: number; length: Number },
        oldRange: { index: number; length: Number }
      ) => {
        // console.log(range, oldRange);
        this.cursorPosition = range?.index || oldRange?.index || 0;
        // console.log(this.cursorPosition);
      }
    );

    this.quill.keyboard.addBinding(
      {
        key: "Z",
        ctrlKey: true,
      },
      () => {
        console.log("historyUndo");
        // this.historyUndo();
      }
    );

    this.quill.keyboard.addBinding(
      {
        key: "Y",
        ctrlKey: true,
      },
      () => {
        console.log("historyRedo");
        // this.historyRedo();
      }
    );

    const el: HTMLElement = this.editorEl.querySelector(".ql-editor");
    el.classList.add("scrollBarHover");
    this.isInit = true;
  }
  @Method()
  async initValue(value: string) {
    await this.setValue(value);
  }
  @Method()
  async setValue(value: string) {
    if (this.quill) {
      // console.log("initValue", this.value);
      // console.log("initValue", value);
      // console.log("initValue", this.value === value);
      if (!value) {
        this.quill.root.innerHTML = "";
        this.value = "";
        this.cursorPosition = 0;
      } else {
        if (this.quill.root.innerHTML !== value) {
          this.quill.root.innerHTML = value || this.value;
          this.value = value || this.value;
          this.cursorPosition = (value || this.value)?.length - 1;
        }
      }

      this.quill.getModule("history").clear();
    }
  }
  @Method()
  async historyUndo() {
    this.quill.getModule("history").undo();
  }
  @Method()
  async historyRedo() {
    this.quill.getModule("history").redo();
  }
  @Method()
  async getFocus() {
    return this.focus;
  }
  @Method()
  async getQuill() {
    return this.quill;
  }
  @Method()
  async setSelection(
    index: number,
    length: number,
    source?: "api" | "user" | "silent"
  ) {
    return this.quill.setSelection(index, length, source);
  }
  @Method()
  insetNode({
    type,
    className,
    src,
    alt = "",
    title = "",
    name = "",
  }: {
    type: "Video" | "Image";
    className: string;
    src: string;
    alt: string;
    title: string;
    name: string;
  }) {
    let node = "";
    switch (type) {
      case "Image":
        // node = `<div><img class="${
        //   className || "saki-richtext-image"
        // }" title="${title}" name="${name}" alt="${alt}" src="${src}" >
        // ${""}
        //   </img></div>`;

        this.quill.insertEmbed(this.cursorPosition, "image", {
          class: className,
          title,
          alt,
          src,
          name,
        });
        break;
      case "Video":
        // node = `<iframe class="${
        //   className || "saki-richtext-image"
        // }" title="${title}" alt="${alt}" src="${src}"></iframe>`;

        // this.quill.clipboard.dangerouslyPasteHTML(
        //   this.cursorPosition,
        //   // iFrame
        //   node
        // );

        this.quill.insertEmbed(this.cursorPosition, "video", {
          class: className,
          title,
          alt,
          src,
          name,
        });
        break;

      default:
        break;
    }
    // console.log("sadsadasda", this.quill.getContents());
    // console.log(this.cursorPosition);
    // this.cursorPosition = this.quill?.getSelection()?.index || 0;
    // console.log(this.cursorPosition);
    // 插入图片  res.info为服务器返回的图片地址
    // console.log(node);
    console.log(this.quill.clipboard);

    console.log(node);
    // this.quill.clipboard.dangerouslyPasteHTML(this.cursorPosition, node);
    // this.quill.setContents()
    // 调整光标到最后
    setTimeout(() => {
      // this.cursorPosition = this.quill?.getSelection()?.index || 0;
      console.log("this.cursorPosition", this.cursorPosition);
      this.quill.setSelection(this.cursorPosition + 1, 0);
    });

    // this.quill.formatText(this.quill?.getSelection(), "spanblock", true);
  }
  editorChange = (eventName: string) => {
    // console.log("editorChange");
    if (eventName === "text-change" && this.isInit) {
      console.log({
        content: this.quill.getText(),
        richText: this.quill.root.innerHTML,
      });
      this.changevalue.emit({
        content: this.quill.getText(),
        richText: this.quill.root.innerHTML,
      });
      this.value = this.quill.root.innerHTML;
    } else {
      this.isInit = true;
    }
  };
  render() {
    return (
      <div
        style={{
          ...["padding", "minHeight", "minWeight"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          ...["maxHeight", "maxWeight", "minHeight", "minWeight"].reduce(
            (fin, cur) =>
              this[cur] ? { ...fin, ["--editor-" + cur]: this[cur] } : fin,
            {}
          ),
          "--editor-padding": this.editorPadding,
          "--toolbar-padding": this.toolbarPadding,
          "--toolbar-display": this.toolbar ? "block" : "none",

          "--toolbar-button-hover-color": this.toolbarButtonHoverColor,
          "--toolbar-button-active-color": this.toolbarButtonActiveColor,
        }}
        class={"saki-richtext-component "}
      >
        {/* <div
          onClick={() => {
            console.log("撤销");
            let history = this.quill.getModule("history");
            console.log(history);
            history.undo();
          }}
        >
          Undo
        </div>
        <div
          onClick={() => {
            console.log("恢复");
            let history = this.quill.getModule("history");
            console.log(history);
            history.redo();
          }}
        >
          Redo
        </div> */}
        <div
          style={{
            height: "calc(100% - " + this.toolBarHeight + ")",
            // width: this.width,
            ...[].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
          }}
          // onKeyDown={(e) => {
          //   console.log(e);
          //   if (e.code === "Enter") {
          //     if (e.ctrlKey) {
          //       console.log("分行");
          //       return;
          //     }
          //     console.log("发送");
          //     e.preventDefault();
          //     this.quill;
          //     return false;
          //     // richtextEl.current?.historyUndo()
          //   }
          // }}
          // onKeyUp={(e: any) => {}}
          class={"sr-editor"}
        ></div>
      </div>
    );
  }
}
