import { Component, Element, h, Prop } from "@stencil/core";
@Component({
  tag: "saki-call-info",
  styleUrl: "call-info.scss",
  shadow: true,
})
export class CallInfoComponent {
  @Prop() frameRate: number = 0;
  @Prop() avatar: string = "";
  @Prop() nickname: string = "";
  @Prop() jitter: number = 0;
  @Element() el: HTMLElement;
  componentDidLoad() {}
  render() {
    return (
      <div class={"saki-call-info-component"}>
        <div class={"ci-userinfo"}>
          <div class={"ci-u-item avatar"}>
            <saki-avatar
              width={"80px"}
              height={"80px"}
              borderRadius={"50%"}
              nickname={this.nickname}
              src={this.avatar}
            ></saki-avatar>
          </div>
          <div class={"ci-u-item nickname text-elipsis"}>{this.nickname}</div>
        </div>
      </div>
    );
  }
}
