import { Component, h, Prop, State } from "@stencil/core";
import { copyText } from "../../modules/methods";

@Component({
  tag: "saki-pages-icon",
  styleUrl: "icon-page.scss",
  shadow: false,
})
export class SakiPagesIconComponent {
  @Prop() color = "#000";
  @Prop() width = "16px";
  @Prop() height = "16px";
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() title = "";
  @State() types = [
    "Train",
    "PublicTransport",
    "Plane",
    "Motorcycle",
    "PowerWalking",
    "Walking",
    "Running",
    "Drive",
    "Bike",
    "Filter",
    "FilterFill",
    "Flag",
    "FlagFill",
    "Index",
    "Route",
    "Layer",
    "Sun",
    "SunFill",
    "Moon",
    "MoonFill",
    "Question",
    "IsLock",
    "Unlock",
    "Lock",
    "Grid",
    "List",
    "Statistics",
    "Email",
    "WeChatFill",
    "UserLine",
    "QRCode",
    "Hook",
    "DeviceList",
    "ChatFill",
    "Chat",
    "Copy",
    "ClearFill",
    "Keyboard",
    "Touch",
    "Erase",
    "Undo",
    "Pause",
    "Play",
    "CurrentPosition",
    "Link",
    "Download",
    "TripRoute",
    "Logout",
    "GPS",
    "GPSFill",
    "ListSort",
    "Countdown",
    "Quit",
    "Terminal",
    "Github",
    "CloudStorage",
    "Share",
    "ShareFill",
    "PasswordFill",
    "TrashFill",
    "Trash",
    "Refresh",
    "Refresh2",
    "Upload",
    "TimeFill",
    "Menu",
    "MicroPhone",
    "MicroPhoneFill",
    "Confirm",
    "BottomTriangle",
    "Bottom",
    "Right",
    "Left",
    "Top",
    "ArrowTop",
    "ArrowBottom",
    "ArrowRight",
    "ArrowLeft",
    "Emoji",
    "Reply",
    "ScreeShareFill",
    "ScreeShare",
    "Eye",
    "EyeSlash",
    "Detail",
    "File",
    "FileFill",
    "Folder",
    "FolderFill",
    "Video",
    "Image",
    "Paperclip",
    "Send",
    "Pen",
    "Magnifier",
    "Close",
    "Message",
    "Call",
    "More",
    "JoinGroup",
    "Group",
    "AddUser",
    "Messages",
    "Settings",
    "User",
    "NotificationsFill",
    "Notifications",
  ];

  render() {
    return (
      <div
        style={{
          ...["margin", "padding"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        title={this.title}
        class={"saki-pages-icon-component "}
      >
        {this.types.map((v) => {
          return (
            <divc class={"pi-item"}>
              <div
                onClick={() => {
                  copyText(v);
                }}
                class={"pi-i-wrap"}
              >
                <div class={"pi-i-icon"}>
                  <saki-icon
                    width="28px"
                    height="28px"
                    type={v as any}
                  ></saki-icon>
                </div>
                <div class={"pi-i-type"}>{v}</div>
              </div>
            </divc>
          );
        })}
      </div>
    );
  }
}
