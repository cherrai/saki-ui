import { Component, State, Prop, Element, h } from "@stencil/core";

@Component({
  tag: "saki-chat-message-header",
  styleUrl: "message-header.scss",
  shadow: true,
})
export class ChatMessageHeaderComponent {
  @Prop() avatar: string = "";
  @Prop() nickname: string = "";
  @Prop() desc: string = "";
  @State() updateTime: number = 0;
  @Element() el: HTMLElement;
  // @Watch("avatar")
  // watchAvatar() {
  //   console.log(this.avatar);
  //   this.updateTime = new Date().getTime();
  // }

  componentDidLoad() {}
  render() {
    return (
      <div class="saki-chat-message-header-component">
        <div class="message-header-left">
          <div class="message-header-l-avatar">
            <img class="message-header-l-avatar-img" src={this.avatar} alt="" />
          </div>
          <div class="message-header-l-info">
            <div class="message-header-l-i-info">
              <div class="message-header-l-i-i-nickname text-elipsis">
                {this.nickname}
              </div>
            </div>
            <div class="message-header-l-i-status text-elipsis">
              <div class="sign">{this.desc}</div>
            </div>
          </div>
        </div>
        <div class="message-header-right">
          <slot name="header-right"></slot>
        </div>
      </div>
    );
  }
}
