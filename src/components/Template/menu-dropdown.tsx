import { Component, h, Method, Prop, State } from "@stencil/core";
import state from "../../store";

@Component({
  tag: "saki-template-menu-dropdown",
  styleUrl: "template.scss",
  shadow: false,
})
export class TemplateMenuDropdownComponent {
  @Prop() appText = "";
  @Prop() appLogo = "";
  @Prop() textColor = "#555";
  @Prop() iconColor: string = "#999";
  @Prop() fixed = false;
  @Prop() openNewPage = true;
  @Prop() visible = false;
  @State() openMenuDropDownMenu = false;
  @State() appList: {
    title: {
      [lang: string]: string;
    };
    url: string;
    logo: string;
    logoText: string;
  }[] = [];

  componentWillLoad() {}
  componentDidLoad() {}
  @Method()
  async setAppList(list: typeof this.appList) {
    this.appList = list;
  }
  render() {
    return (
      <div
        style={{
          "--text-color": this.textColor,
          "--icon-color": this.iconColor,
        }}
        class={"saki-menu-dropdown-component "}
      >
        <saki-dropdown
          visible={this.openMenuDropDownMenu}
          floating-direction="Left"
          onClose={() => {
            this.openMenuDropDownMenu = false;
          }}
        >
          <div class="md-button">
            <saki-button
              border="none"
              bg-color="rgba(0,0,0,0)"
              onTap={() => {
                this.openMenuDropDownMenu = !this.openMenuDropDownMenu;
              }}
            >
              {this.appLogo ? (
                <saki-avatar
                  nickname={""}
                  border-radius={"6px"}
                  width="28px"
                  height="28px"
                  margin="0 4px 0 0"
                  lazyload={false}
                  src={this.appLogo || ""}
                ></saki-avatar>
              ) : (
                ""
              )}
              <span class="logo-text">{this.appText}</span>

              <div
                class={"icon " + (this.openMenuDropDownMenu ? "active" : "")}
              >
                <saki-icon color={this.iconColor} type="Bottom"></saki-icon>
              </div>
            </saki-button>
          </div>
          <div class="tool-box-layout-menu-list scrollBarHover" slot="main">
            <saki-menu
              onSelectvalue={() => {
                this.openMenuDropDownMenu = false;
              }}
            >
              {this.appList.map((v, i) => {
                return (
                  <saki-menu-item key={i} padding="0" value={v.url}>
                    <div class="tblml-item">
                      <a
                        target={this.openNewPage ? "_blank" : ""}
                        href={v.url}
                        rel="noopener noreferrer"
                      >
                        <div class={"tblm-i-left"}>
                          <saki-avatar
                            nickname={v.logoText}
                            border-radius={"6px"}
                            width="32px"
                            height="32px"
                            lazyload={false}
                            src={v.logo || ""}
                          ></saki-avatar>
                        </div>

                        <div class={"tblm-i-right"}>
                          <span>
                            {v.title["en-US"] ? v.title[state.lang] : v.title}
                          </span>
                        </div>
                      </a>
                    </div>
                  </saki-menu-item>
                );
              })}
            </saki-menu>
          </div>
        </saki-dropdown>
      </div>
    );
  }
}
