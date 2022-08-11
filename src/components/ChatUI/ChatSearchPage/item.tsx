import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
} from "@stencil/core";
import moment from "moment";
@Component({
  tag: "saki-chat-search-item",
  styleUrl: "search.scss",
  shadow: true,
})
export class InputComponent {
  momentConfig = {
    sameDay: "[Today] HH:mm",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Yesterday]",
    lastWeek: "YYYY-MM-DD",
    sameElse: "YYYY-MM-DD",
  };
  @Prop() avatar: string = "";
  @Prop() nickname: string = "";
  @Prop() nicknameFontWeight: string = "";
  @Prop() selected: boolean = false;

  @Prop() nicknameColor: string = "";
  @Prop() backgroundColor: string = "";
  @Prop() backgroundHoverColor: string = "";
  @Prop() backgroundActiveColor: string = "";

  @Prop() desc: string = "";
  @Prop() time: number = 0;

  @Prop() keywords: string = "";

  textareaEl: any | HTMLTextAreaElement;
  @State() keyPressing: number = 0;

  @State() updateTime: number = 0;
  @Event() tap: EventEmitter;

  @Element() el: HTMLElement;
  componentWillLoad() {
    console.log(this.keywords);
  }
  componentDidLoad() {}

  formartKeywords(s: string) {
    return s.split("").map((v) => {
      return (
        <span class={this.keywords.indexOf(v) >= 0 ? "result" : ""}>{v}</span>
      );
    });
  }
  render() {
    return (
      <div
        onClick={() => {
          this.tap.emit();
        }}
        class={
          "saki-chat-search-item-component " +
          (this.selected ? "selected " : "")
        }
      >
        <div class={"si-avatar"}>
          <saki-avatar
            width={"40px"}
            height={"40px"}
            borderRadius={"50%"}
            nickname={this.nickname}
            src={this.avatar}
          ></saki-avatar>
        </div>
        <div class={"si-right"}>
          <div class={"si-r-top"}>
            <div
              style={{
                "font-weight": this.nicknameFontWeight,
              }}
              class={"si-r-t-nickname text-elipsis"}
            >
              {this.formartKeywords(this.nickname)}
            </div>
            <div class={"si-r-t-time"}>
              {moment(this.time * 1000).calendar(this.momentConfig)}
            </div>
          </div>
          <div class={"si-r-desc text-elipsis"}>
            {this.formartKeywords(this.desc)}
          </div>
        </div>
      </div>
    );
  }
}
