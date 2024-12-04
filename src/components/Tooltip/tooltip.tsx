import { Component, Prop, h, Element, State } from "@stencil/core";

@Component({
  tag: "saki-tooltip",
  styleUrl: "tooltip.scss",
  shadow: false,
})
export class TooltipComponent {
  // 改版了。其他项目发现异常记得改一下，尤其是sso和喵笔记

  @Prop() placement = "Top";

  @Prop() margin = "";
  @Prop() padding = "";

  @Prop() textAlign = "left";
  @Prop() backgroundColor = "left";
  @Prop() color = "";
  @Prop() fontWeight = "";
  @Prop() fontSize = "";

  @Prop() title = "";

  @State() active = false;

  contentElRect: DOMRect;
  titleElRect: DOMRect;

  @State() contentEl: HTMLElement;
  @Element() el: HTMLElement;
  componentDidLoad() {
    this.initEl();
  }
  initEl() {
    console.log("tooltip", document.querySelectorAll(".tooltip"));

    // data-sakiui-tooltip
  }
  render() {
    return <div></div>;
    // return (
    //   <div
    //     class={
    //       "saki-tooltip-component  " +
    //       this.placement +
    //       " " +
    //       (this.active ? "show" : "hide")
    //     }
    //     style={{
    //       "--saki-c-w": this.contentElRect?.width + "px",
    //       "--saki-c-h": this.contentElRect?.height + "px",
    //       "--saki-c-x": this.contentElRect?.x + "px",
    //       "--saki-c-y": this.contentElRect?.y + "px",

    //       "--saki-t-x":
    //         this.contentElRect?.x +
    //         this.contentElRect?.width / 2 -
    //         this.titleElRect?.width / 2 +
    //         "px",
    //       "--saki-t-y": this.contentElRect?.y + "px",
    //     }}
    //   >
    //     <div
    //       ref={(e) => {
    //         if (!e.children?.[0]) return;

    //         this.contentEl = e.children?.[0] as HTMLElement;
    //         this.contentElRect = this.contentEl.getBoundingClientRect();

    //         console.log("this.contentElRect", this.contentElRect);
    //         // this.initEl();
    //       }}
    //       onMouseEnter={() => {
    //         console.log("onMouseEnter");
    //         this.active = true;
    //       }}
    //       onMouseLeave={() => {
    //         console.log("onMouseLeave");
    //         this.active = false;
    //       }}
    //       class={"st-content"}
    //     >
    //       <slot></slot>
    //     </div>
    //     <div
    //       style={{
    //         ...[
    //           "textAlign",
    //           "margin",
    //           "padding",
    //           "fontWeight",
    //           "fontSize",
    //           "backgroundColor",
    //         ].reduce(
    //           (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
    //           {}
    //         ),
    //         color:
    //           this.color === "default"
    //             ? "var(--saki-default-color)"
    //             : this.color,
    //       }}
    //       class={"st-title"}
    //       onTransitionEnd={() => {
    //         console.log("onTransitionEnd");
    //       }}
    //       ref={(e) => {
    //         if (!e) return;

    //         this.titleElRect = e?.getBoundingClientRect();
    //       }}
    //     >
    //       {this.title}
    //     </div>
    //   </div>
    // );
  }
}
