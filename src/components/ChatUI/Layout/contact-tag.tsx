import { Component, h, Event, Prop, EventEmitter } from "@stencil/core";

@Component({
  tag: "saki-chat-layout-contact-tag",
  styleUrl: "contact-tag.scss",
  shadow: false,
})
export class ChatLayoutContactTagComponent {
  @Prop() avatarText = "";
  @Prop() avatar = "";
  @Prop() nickname = "";
  @Prop() padding = "";
  @Prop() margin = "";
  @Prop() deleteIcon = true;
  @Event() delete: EventEmitter;
  render() {
    return (
      <div
        class={
          "saki-chat-layout-contact-tag-component " +
          (this.deleteIcon ? "deleteIcon" : "")
        }
        style={{
          ...["margin", "padding"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
      >
        <div class="item-avatar">
          <saki-avatar
            width="30px"
            height="30px"
            border-radius="50%"
            src={this.avatar}
            nickname={!this.avatar ? this.avatarText : ""}
          ></saki-avatar>
          {this.deleteIcon ? (
            <div
              onClick={() => {
                this.delete.emit();
                
              }}
              class={"delete-icon"}
            >
              <saki-icon
                color="#fff"
                width="16px"
                height="16px"
                margin="3px 0 0 0"
                type={"Close"}
              ></saki-icon>
            </div>
          ) : (
            ""
          )}
        </div>
        <div class="item-info">
          <div class="i-i-nickname text-elipsis">{this.nickname}</div>
        </div>
      </div>
    );
  }
}
