import {
  Component,
  Event,
  Element,
  h,
  EventEmitter,
  Prop,
  State,
  Watch,
} from "@stencil/core";

import { v5 as uuidv5, v4 as uuidv4 } from "uuid";

@Component({
  tag: "saki-chat-layout-bottom-navigator-item",
  styleUrl: "bottom-navigator.scss",
  shadow: true,
})
export class ChatLayoutBottomNavigatorMenuItemComponent {
  @Prop() id = "";
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() active = false;

  @Prop() iconType: HTMLSakiIconElement["type"] = "";
  @Prop() iconSize = "18px";
  @Prop() count = 0;
  @Prop() name = "";
  @Prop() href = "";

  @Event() tap: EventEmitter;

  componentWillLoad() {
    this.id = uuidv4();
  }
  render() {
    return (
      <div
        class={
          "saki-chat-layout-bottom-navigator-menu-item-component " +
          (this.active ? "active " : "")
        }
        style={{
          ...["margin", "padding"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        onClick={() => {
          this.tap.emit({
            href: this.href,
            id: this.id,
          });
        }}
      >
        <div class="item-icon">
          {this.iconType ? (
            <saki-icon
              style={
                {
                  // transform: "translateY(2px)",
                }
              }
              color={this.active ? "var(--saki-default-color)" : "#999"}
              width={this.iconSize}
              height={this.iconSize}
              type={this.iconType}
            ></saki-icon>
          ) : (
            <slot name="icon"></slot>
          )}
        </div>
        <div class="item-main">
          <div class="item-m-name">{this.name}</div>
          {this.count ? (
            <div class="item-m-count">
              {this.count > 99 ? "99+" : this.count}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
