import { Component, h, Prop, State } from "@stencil/core";
import { copyText } from "../../modules/methods";

@Component({
  tag: "saki-pages-icon",
  styleUrl: "icon-page.scss",
  shadow: false,
})
export class SakiPagesIconComponent {
  @State() contextmenu: HTMLSakiContextMenuElement;

  @Prop() color = "#000";
  @Prop() width = "16px";
  @Prop() height = "16px";
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() title = "";
  @State() types = [
    "MoveTo",
    "Sort",
    "MoveTop",
    "MoveBottom",
    "Sound",
    "SoundFill",
    "SoundDisable",
    "SoundDisableFill",
    "StarFill",
    "Star",
    "BlankPageFill",
    "BlankPage",
    "TodoListFill",
    "TodoList",
    "Rocket",
    "Position",
    "PositionFill",
    "PositionShare",
    "Truck",
    "Camera",
    "Shutdown",
    "Shutdown",
    "Backup",
    "BackupFill",
    "Add",
    "ZoomIn",
    "ZoomOut",
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
    "Refresh3",
    "Upload",
    "TimeFill",
    "Menu",
    "MicroPhoneDisable",
    "MicroPhoneDisableFill",
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
    "SettingsFill",
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
        <div
          style={{
            padding: "20px",
          }}
        >
          <div
            style={{
              margin: "0px 0 0 500px",
            }}
            onClick={(e) => {
              console.log(e);
              this.contextmenu.show({
                x: e.pageX,
                y: e.pageY,
                label: "ces1",
              });
            }}
          >
            <span>测试contextmenu</span>
          </div>
          <saki-context-menu
            ref={(e) => {
              this.contextmenu = e;
              console.log(this.contextmenu);
            }}
            onSelectvalue={(e) => {
              console.log("onSelectvalue", e.detail);
            }}
          >
            <saki-context-menu-item value={"1"} width="120px">
              <span>1</span>
            </saki-context-menu-item>
            <saki-context-menu-item value={"2"} width="120px">
              <span>2</span>

              <div slot="SubMenu">
                <saki-context-menu>
                  <saki-context-menu-item value={"2.1"} width="120px">
                    <span>2.1</span>
                  </saki-context-menu-item>
                  <saki-context-menu-item value={"2.2"} width="120px">
                    <span>2.2</span>

                    <div slot="SubMenu">
                      <saki-context-menu>
                        <saki-context-menu-item value={"2.1.1"} width="120px">
                          <span>2.1.1</span>
                        </saki-context-menu-item>
                        <saki-context-menu-item value={"2.1.2"} width="120px">
                          <span>2.1.2</span>
                        </saki-context-menu-item>
                      </saki-context-menu>
                    </div>
                  </saki-context-menu-item>
                </saki-context-menu>
              </div>
            </saki-context-menu-item>
            <saki-context-menu-item value={"3"} width="120px">
              <span>3</span>
              <div slot="SubMenu">
                <saki-context-menu>
                  <saki-context-menu-item value={"3.1"} width="120px">
                    <span>3.1</span>
                  </saki-context-menu-item>
                  <saki-context-menu-item value={"3.2"} width="120px">
                    <span>3.2</span>
                  </saki-context-menu-item>
                </saki-context-menu>
              </div>
            </saki-context-menu-item>
          </saki-context-menu>

          {/* <saki-cascader>
            <saki-cascader-item>1</saki-cascader-item>
            <saki-cascader-item>
              <span>2</span>
              <div slot="SubCascade">
                <saki-cascader-item>2.1</saki-cascader-item>
                <saki-cascader-item>
                  <saki-cascader-item>
                    <span>2.2</span>
                    <div slot="SubCascade">
                      <saki-cascader-item>2.2.1</saki-cascader-item>
                      <saki-cascader-item>2.2.2</saki-cascader-item>
                    </div>
                  </saki-cascader-item>
                </saki-cascader-item>
              </div>
            </saki-cascader-item>
            <saki-cascader-item>3</saki-cascader-item>
            <saki-cascader-item>
              <span>4</span>
              <div slot="SubCascade">
                <saki-cascader-item>4.1</saki-cascader-item>
                <saki-cascader-item>4.2</saki-cascader-item>
              </div>
            </saki-cascader-item>
          </saki-cascader> */}

          <saki-tooltip
            title={"列表中被选择的行程将会依据行程明细的速度展示对应的轨迹颜色"}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                margin: "20px 0 20px",
              }}
            >
              <saki-icon
                width="18px"
                height="18px"
                color="#999"
                type="Detail"
              ></saki-icon>
            </div>
          </saki-tooltip>
          {/* <saki-segmented
            width="300px"
            height="40px"
            border-radius="20px"
            value={"Normal"}
          >
            <saki-segmented-item padding="0 10px" value="Normal">
              <span>{"normalMode"}</span>
            </saki-segmented-item>
            <saki-segmented-item padding="0 10px" value="Gray">
              <span>{"grayMode"}</span>
            </saki-segmented-item>
            <saki-segmented-item padding="0 10px" value="Dark">
              <span>{"darkMode"}</span>
            </saki-segmented-item>
            <saki-segmented-item padding="0 10px" value="Black">
              <span>{"blackMode"}</span>
            </saki-segmented-item>
          </saki-segmented> */}
          {/* <saki-slider
            min={30}
            max={120}
            value={[45, 60, 100].join(";")}
            bgColor="#eee"
            bgHoverColor="#ddd"
            trackColor={["red", "green"].join(";")}
            marks={[
              {
                val: 30,
                text: "30km/h",
                style: {
                  color: "blue",
                  fontWeight: 700,
                },
              },
              {
                val: 40,
                text: "40km/h",
              },
              {
                val: 80,
                text: "80km/h",
              },
              {
                val: 120,
                text: "120km/h",
                style: {
                  color: "blue",
                  fontWeight: 700,
                },
              },
            ]
              .map((v) => JSON.stringify(v))
              .join(";")}
            toolTip={true}
            disabled={false}
            width={"100%"}
            maxWidth={"100%"}
            height={"12px"}
            margin="40px 0"
            borderRadius="6px"
            onChangevalue={(e) => {
              console.log("onChangevalue", e);
            }}
          ></saki-slider> */}
          <saki-slider
            onChangevalue={(e) => {
              console.log("onChangevalue", e);
            }}
            min={0}
            max={500}
            value={[0, 500].join(";")}
            bg-color="rgb(243,243,243)"
            bg-hover-color="#eee"
            track-color={["var(--saki-default-color)"].join(";")}
            marks={[
              {
                val: 0,
                text: 0 + "km",
                style: {
                  color: "var(--saki-default-color)",
                  // fontWeight: 700,
                },
              },
              {
                val: 100,
                text: 100 + "km",
                style: {
                  color: "var(--saki-default-color)",
                  // fontWeight: 700,
                },
              },
              {
                val: 500,
                text: "500km+",
                style: {
                  color: "var(--saki-default-color)",
                  // fontWeight: 700,
                },
              },
            ]
              .map((v) => JSON.stringify(v))
              .join(";")}
            tool-tip={true}
            disabled={false}
            width={"100%"}
            max-width={"100%"}
            height={"12px"}
            margin="10px 0 16px"
            padding="0 15px 0 24px"
            border-radius="6px"
          ></saki-slider>
        </div>

        <div class={"pl-main"}>
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
      </div>
    );
  }
}
