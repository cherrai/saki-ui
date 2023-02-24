import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "saki-chat-layout-contact-item",
  styleUrl: "contact-item.scss",
  shadow: false,
})
export class ChatLayoutContactItemComponent {
  @Prop() avatarText = "";
  @Prop() avatar = "";
  @Prop() avatarSize = "40px";
  @Prop() nickname = "";
  @Prop() nicknameFontSize = "16px";
  @Prop() usernameFontSize = "13px";
  @Prop() timeFontSize = "13px";
  @Prop() username = "";
  @Prop() letter = "";
  @Prop() initials = "";
  @Prop() showInitials = false;
  @Prop() letterPadding = "0 10px";
  @Prop() padding = "10px";
  @Prop() margin = "10px 0";
  @Prop() lastSeenTime = "";
  @Prop() displayIconsLayout = false;
  @Prop() displayCenterLayout = false;

  @Prop() displayIconsLayoutWidth = "auto";
  @Prop() hoverBackgroundColor: string = "#eee";
  @Event({
    eventName: "tap",
    bubbles: false,
  })
  tap: EventEmitter;
  render() {
    return (
      <div
        class={
          "saki-chat-layout-contact-item-component " +
          (this.displayIconsLayout ? " displayIconsLayout" : "")
        }
        style={{
          "--saki-hover-background-color": this.hoverBackgroundColor,

          ...["margin"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
      >
        {this.showInitials ? (
          <div
            style={{
              padding: this.letterPadding,
            }}
            class={"clci-letter"}
          >
            {this.initials}{" "}
          </div>
        ) : (
          ""
        )}

        <div
          class={"clci-container"}
          style={{
            ...["padding"].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
          }}
          onClick={() => {
            this.tap.emit();
          }}
        >
          <saki-row width="100%" alignItems="center">
            <saki-col span={1}>
              <saki-row
                width="100%"
                justifyContent="flex-end"
                alignItems="center"
              >
                <saki-col>
                  <saki-avatar
                    width={this.avatarSize}
                    height={this.avatarSize}
                    border-radius="50%"
                    src={this.avatar}
                    nickname={!this.avatar ? this.avatarText : ""}
                  ></saki-avatar>
                </saki-col>
                <saki-col padding="0 0 0 10px" span={1}>
                  <saki-row
                    width="100%"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <saki-col>
                      <div
                        style={{
                          fontSize: this.nicknameFontSize,
                        }}
                        class="clci-nickname text-elipsis"
                      >
                        {this.nickname}
                      </div>
                    </saki-col>
                    <saki-col>
                      <div
                        style={{
                          fontSize: this.usernameFontSize,
                        }}
                        class="clci-info text-elipsis"
                      >
                        <div class="clci-u-username">{this.username}</div>
                      </div>
                    </saki-col>
                  </saki-row>
                </saki-col>
              </saki-row>
            </saki-col>
            {this.displayCenterLayout ? (
              <saki-col
                justifyContent={
                  this.displayIconsLayout ? "flex-start" : "flex-end"
                }
                span={1}
              >
                <div
                  style={{
                    fontSize: this.timeFontSize,
                  }}
                  class="clci-lasttime text-elipsis"
                >
                  {this.lastSeenTime}
                </div>
              </saki-col>
            ) : (
              ""
            )}

            {this.displayIconsLayout ? (
              <saki-col
                width={this.displayIconsLayoutWidth}
                justifyContent="flex-end"
              >
                <slot name="right"></slot>
              </saki-col>
            ) : (
              ""
            )}
          </saki-row>
        </div>
      </div>
    );
  }
}
