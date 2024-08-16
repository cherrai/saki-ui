import { Component, h, Method, Prop, State } from "@stencil/core";
import state from "../../store";

@Component({
  tag: "saki-template-feedback-dropdown",
  styleUrl: "feedback-dropdown.scss",
  shadow: false,
})
export class TemplateFeedbackDropdownComponent {
  @Prop() appText = "";
  @Prop() fixed = false;
  @Prop() openNewPage = true;
  @Prop() visible = false;
  @State() openMenuDropDownMenu = false;
  @State() appList: {
    title: {
      [lang: string]: string;
    };
    url: string;
  }[] = [];

  componentWillLoad() {}
  componentDidLoad() {}
  @Method()
  async setAppList(list: typeof this.appList) {
    this.appList = list;
  }
  render() {
    return (
      <div class={"saki-feedback-dropdown-component "}>
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
              <span class="logo-text">{this.appText}</span>

              <div
                class={"icon " + (this.openMenuDropDownMenu ? "active" : "")}
              >
                <saki-icon color="#999" type="Bottom"></saki-icon>
              </div>
            </saki-button>
          </div>
          <div class="tool-box-layout-menu-list" slot="main">
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
                        {v.title["en-US"] ? v.title[state.lang] : v.title}
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
