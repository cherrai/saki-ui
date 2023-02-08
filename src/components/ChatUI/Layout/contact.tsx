import { Component, Element, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-chat-layout-contact",
  styleUrl: "contact.scss",
  shadow: true,
})
export class ChatLayoutContactComponent {
  @Prop() type: "receiver" | "sender" = "sender";
  // 是否展示字母
  @Prop() showLetter = false;
  alphabet: {
    letter: string;
    disable: boolean;
  }[] = [];
  // @Prop() alphabetNavigation = false;
  @Element() el: HTMLDivElement;

  componentWillLoad() {
    if (this.showLetter) {
      const observer = new MutationObserver(this.watchDom.bind(this));
      this.watchDom();
      // 以上述配置开始观察目标节点
      observer.observe(this.el, {
        attributes: false,
        childList: true,
        subtree: false,
      });
    }
    // if (this.alphabetNavigation) {
    //   let a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#";
    //   this.alphabet = a.split("").map((v) => {
    //     return {
    //       letter: v,
    //       disable: true,
    //     };
    //   });
    // }
  }
  componentDidLoad() {}
  watchDom() {
    const list = this.el?.children;
    // console.log(list);
    let alpha = "";
    for (let i = 0; i < list.length; i++) {
      if (list[i].localName === "saki-chat-layout-contact-item") {
        const el: HTMLSakiChatLayoutContactItemElement = list[i] as any;
        console.log(el, el.letter);
        el.initials = this.getInitials(el.letter).toUpperCase();
        if (i === 0) {
          el.showInitials = true;
        } else {
          console.log(el.initials, (list[i - 1] as any).initials);
          if (el.initials !== (list[i - 1] as any).initials) {
            el.showInitials = true;
          }
          alpha = alpha + el.initials;
        }
        //
      }
    }

    // this.alphabet.forEach((v) => {
    //   console.log(alpha.indexOf(v.letter));
    //   if (alpha.indexOf(v.letter) >= 0) {
    //     v.disable = false;
    //   }
    // });
    // list?.forEach((item, index) => {
    //   console.log(item);
    //   console.log(item.parentElement.localName);
    // });
  }
  getInitials(a: string, defaultValue = "#") {
    let z = a?.substring(0, 1) || "";
    let c = z.charCodeAt(0);
    if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) {
      return z;
    }
    return defaultValue;
  }
  render() {
    return (
      <div class={"saki-chat-layout-contact-component"}>
        <div class={"clc-main"}>
          <slot></slot>
        </div>
        {/* {this.alphabetNavigation ? (
          <div class={"clc-alphabet-avigation"}>
            {this.alphabet.map((v) => {
              return !v.disable ? <div class={"an-item "}>{v.letter}</div> : "";
            })}
          </div>
        ) : (
          ""
        )} */}
      </div>
    );
  }
}
