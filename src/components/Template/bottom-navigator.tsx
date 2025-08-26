import { Component, Event, EventEmitter, h, Prop, State } from "@stencil/core";
// import state from "../../store";

interface NavigatorListItem {
  url: string;
  name: string;
  icon: string;
  iconSize: string;
  list: NavigatorListItem[];
  active: boolean;
}

@Component({
  tag: "saki-template-bottom-navigator",
  styleUrl: "template.scss",
  shadow: false,
})
export class TemplateBottomNavigatorComponent {
  @Prop() meowApps = false;
  @Prop() fixed = false;
  @Prop() visible = false;
  @Prop() boxShadow = "";
  @Prop() bgColor = "rgba(255, 255, 255, 1)";
  @Prop() bgHoverColor = "rgba(255, 255, 255, 1)";
  @Prop() bgActiveColor = "rgba(255, 255, 255, 1)";
  @Prop() maxWidth = "";
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() height = "50px";
  @Prop() borderBottom = "";
  @Prop() textColor = "#999";
  @Prop() textActiveColor = "var(--saki-default-color)";
  @Prop() navigatorList: NavigatorListItem[] = [];

  @State() activeSubListDp: number = -1;

  @Event({
    bubbles: false,
  })
  switchNavigator: EventEmitter;

  componentWillLoad() {}
  componentDidLoad() {
    console.log("listlist navigatorList", this.navigatorList);
  }
  render() {
    return (
      <div
        class={
          "saki-template-bottom-navigator-component " +
          (this.fixed ? " fixed " : "") +
          (this.visible ? "show " : "hide ")
        }
        style={{
          ...[
            "margin",
            "padding",
            "flexDirection",
            "justifyContent",
            "alignItems",
            "width",
            "borderBottom",
            "boxShadow",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          "--height": this.height,
          "--text-color": this.textColor,
          "--text-active-color": this.textActiveColor,
          "--bg-color": this.bgColor,
          "--bg-hover-color": this.bgHoverColor,
          "--bg-active-color": this.bgActiveColor,
        }}
      >
        {this.navigatorList.map((v, i) => {
          if (v?.list?.length) {
            return (
              <saki-dropdown
                class={"tbn-item"}
                visible={this.activeSubListDp === i}
                onClose={() => {
                  this.activeSubListDp = -1;
                }}
              >
                <div
                  onClick={() => {
                    if (this.activeSubListDp === i) {
                      this.activeSubListDp = -1;
                      return;
                    }
                    this.activeSubListDp = i;
                  }}
                  class={"tbn-item " + (v.active ? "active" : "")}
                  key={i}
                >
                  <div class={"tbn-icon"}>
                    <saki-icon
                      width={v.iconSize || "20px"}
                      height={v.iconSize || "20px"}
                      color={v.active ? this.textActiveColor : this.textColor}
                      type={v.icon as any}
                    ></saki-icon>
                  </div>
                  {v.name ? <div class={"tbn-name"}>{v.name}</div> : ""}
                </div>
                <div slot="main">
                  <div class={"tbn-i-sublist"}>
                    <saki-menu
                      onSelectvalue={async (e) => {
                        console.log(e.detail.value);
                        this.switchNavigator.emit(
                          v.list[Number(e.detail.value)]
                        );

                        this.activeSubListDp = -1;
                      }}
                    >
                      {v.list.map((sv, si) => {
                        return (
                          <saki-menu-item
                            padding="10px 18px 10px 10px"
                            value={String(si)}
                          >
                            <saki-row
                              justifyContent="flex-start"
                              alignItems="center"
                            >
                              <saki-col
                                margin="0 6px 0 0"
                                width="26px"
                                justifyContent="center"
                              >
                                <saki-icon
                                  width={sv.iconSize || "20px"}
                                  height={sv.iconSize || "20px"}
                                  color={
                                    sv.active
                                      ? this.textActiveColor
                                      : this.textColor
                                  }
                                  type={sv.icon as any}
                                ></saki-icon>
                              </saki-col>
                              <saki-col>
                                {sv.name ? (
                                  <div class={"tgbs-name"}>{sv.name}</div>
                                ) : (
                                  ""
                                )}
                              </saki-col>
                            </saki-row>
                          </saki-menu-item>
                        );
                      })}
                    </saki-menu>
                  </div>
                </div>
              </saki-dropdown>
            );
          }
          return (
            <div
              onClick={() => {
                this.switchNavigator.emit(v);
              }}
              class={"tbn-item " + (v.active ? "active" : "")}
              key={i}
            >
              <div class={"tbn-icon"}>
                <saki-icon
                  width={v.iconSize || "20px"}
                  height={v.iconSize || "20px"}
                  color={v.active ? this.textActiveColor : this.textColor}
                  type={v.icon as any}
                ></saki-icon>
              </div>
              {v.name ? <div class={"tbn-name"}>{v.name}</div> : ""}
            </div>
          );
        })}
      </div>
    );
  }
}
