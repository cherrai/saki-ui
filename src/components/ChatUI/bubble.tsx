import {
  Component,
  Event,
  Element,
  h,
  EventEmitter,
  Prop,
  State,
} from "@stencil/core";
// import moment from "moment";
// import "moment/dist/locale/zh-cn";
@Component({
  tag: "saki-chat-bubble",
  styleUrl: "bubble.scss",
  shadow: true,
})
export class ChatBubbleComponent {
  @Prop() direction: "left" | "right" = "right";
  @Prop() timePrompt: string = "";
  @Prop() isShowCenterTime: boolean = false;
  @Prop() avatar: string = "";
  @Prop() maxMargin: string = "60px";
  @State() bubbleEl: HTMLElement = null;
  @State() bubbleElWidth: number;
  @State() language: string = "en";
  @Event() tap: EventEmitter;
  @Element() el: HTMLElement;

  // @Watch("bubbleEl")
  // watchBubbleElFunc(val: HTMLElement, oldval: HTMLElement) {
  //   // console.log(val.getBoundingClientRect());
  //   if (oldval?.offsetWidth) {
  //     console.log("啊啊啊", val.offsetWidth === oldval.offsetWidth);
  //   }
  // }

  componentDidLoad() {}
  render() {
    return (
      <div
        style={{
          "--max-margin": this.maxMargin,
          "--width": "0px",
        }}
        ref={(e) => {
          e && !this.bubbleEl && (this.bubbleEl = e);
        }}
        onClick={() => {
          this.tap.emit();
        }}
        class={
          "saki-chat-bubble-component " +
          this.direction +
          " " +
          (this.isShowCenterTime ? "addtime " : "")
        }
      >
        <div class="bubble-time">{this.timePrompt}</div>
        <div class="bubble-userinfo">
          <div class="bubble-u-avatar">
            <img src={this.avatar} alt="" />
          </div>
        </div>
        <div class="bubble-content">
          <div class="bubble-c-msg">
            <slot></slot>
          </div>
        </div>
        <div class={"bubble-time-hover"}>{this.timePrompt}</div>
      </div>
    );
  }
}
