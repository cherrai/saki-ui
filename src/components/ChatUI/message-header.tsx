import {
  Component,
  State,
  Prop,
  Element,
  h,
  Event,
  EventEmitter,
} from "@stencil/core";

@Component({
  tag: "saki-chat-message-header",
  styleUrl: "message-header.scss",
  shadow: true,
})
export class ChatMessageHeaderComponent {
  @Prop() avatar: string = "";
  @Prop() avatarText: string = "";
  @Prop() nickname: string = "";
  @Prop() anonymous: boolean = false;
  @Prop() encryption: boolean = false;
  @Prop() desc: string = "";
  @Prop() online: number = -1;
  @Prop() members: number = -1;
  @State() updateTime: number = 0;
  @Event() clickinfo: EventEmitter;
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
          <div
            onClick={() => {
              this.clickinfo.emit();
            }}
            class="message-header-l-avatar"
          >
              <saki-avatar
                width="36px"
                height="36px"
                borderRadius="50%"
                nickname={!this.avatar ? this.avatarText : ""}
                src={this.avatar}
              ></saki-avatar>
          </div>
          <div class="message-header-l-info">
            <div class="message-header-l-i-info">
              <div
                onClick={() => {
                  this.clickinfo.emit();
                }}
                class="message-header-l-i-i-nickname"
              >
                {this.encryption ? (
                  <div class={"message-header-l-i-i-n-lock"}>
                    <svg
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="9856"
                    >
                      <path
                        d="M846.237 455.584V334.237C846.237 149.023 697.214 0 512 0S177.763 149.023 177.763 334.237v121.347c-57.48 4.258-104.316 53.223-104.316 112.832V909.04c0 63.866 51.094 114.96 114.96 114.96h649.314c63.867 0 114.96-51.094 114.96-114.96V568.416c-2.128-59.61-48.964-108.574-106.444-112.832z m-102.187 0H282.079V334.237c0-127.734 104.316-232.05 232.05-232.05s232.05 104.316 232.05 232.05v121.347z m0 0"
                        p-id="9857"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  ""
                )}
                <span class={"text-elipsis"}>{this.nickname}</span>{" "}
                {this.anonymous ? (
                  <div class={"message-header-l-i-i-n-anonymous"}>
                    <svg
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="36691"
                    >
                      <path
                        d="M511.671 112c205.821 0 372.672 166.85 372.672 372.671v339.2c0 34.19-27.717 61.906-61.906 61.906a61.906 61.906 0 0 1-30.872-8.247l-31.819-18.306c-37.746-21.716-84.188-21.743-121.959-0.069l-64.185 36.832c-37.693 21.63-84.03 21.651-121.743 0.055L386.994 858.9c-37.601-21.532-83.785-21.579-121.43-0.123l-32.907 18.754c-30.056 17.13-68.309 6.651-85.439-23.405A62.64 62.64 0 0 1 139 823.108V484.671C139 278.851 305.85 112 511.671 112zM386.034 426.035c-37.21 0-67.373 30.128-67.373 67.293 0 37.166 30.164 67.294 67.373 67.294s67.373-30.128 67.373-67.294c0-37.165-30.164-67.293-67.373-67.293z m260.87 0c-37.21 0-67.373 30.128-67.373 67.293 0 37.166 30.164 67.294 67.373 67.294s67.373-30.128 67.373-67.294c0-37.165-30.164-67.293-67.373-67.293z"
                        p-id="36692"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div class="message-header-l-i-status text-elipsis">
              {/* {this.online} */}
              {this.members >= 0 ? (
                <div class="item">{this.members} members</div>
              ) : (
                ""
              )}
              {this.online >= 0 ? (
                <div class="item">{this.online} online</div>
              ) : (
                ""
              )}
              {/* {this.online >= 2 ? <div class="item">online, </div> : ""}, */}
              {this.desc ? (
                <div class="item sign text-elipsis">{this.desc}</div>
              ) : (
                ""
              )}
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
