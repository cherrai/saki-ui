import { Component, h, Prop, State } from "@stencil/core";
import state from "../../store";

@Component({
  tag: "saki-template-header",
  styleUrl: "template.scss",
  shadow: false,
})
export class TemplateHeaderComponent {
  @Prop() meowApps = false;
  @Prop() fixed = false;
  @Prop() visible = false;
  @Prop() bgColor = "";
  @Prop() height = "";
  @Prop() borderBottom = "";
  @Prop() textColor = "";
  @State() showLanguageDropdown = false;

  componentWillLoad() {}
  componentDidLoad() {}
  render() {
    return (
      <div
        class={
          "saki-header-component " +
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
            "height",
            "borderBottom",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          "background-color": this.bgColor,
          "--text-color": this.textColor,
        }}
      >
        <div class="tb-h-left">
          <slot name="left"></slot>
          <div class="logo-text">
            {/* {layout.headerLogoText} */}
            {/* {t("appTitle", {
              ns: "common",
            })} */}

            {/* <MenuDropdownComponent /> */}
          </div>
        </div>
        <div class="tb-h-center">
          <slot name="center"></slot>
        </div>
        <div class="tb-h-right">
          <slot name="right"></slot>
          {/* {game.generateKillerSudokuStatus === 0 ? (
            <div class="tb-h-r-generating">
              <saki-animation-loading
                type="rotateEaseInOut"
                width="20px"
                height="20px"
                border="3px"
                border-color="var(--saki-default-color)"
              />
              <span
                style={{
                  color: "#555",
                  fontSize: "12px",
                }}
              >
                {t("generatingBackground", {
                  ns: "prompt",
                })}
              </span>
            </div>
          ) : (
            ""
          )} */}
          {this.meowApps ? (
            <meow-apps-dropdown
              bg-color="rgba(0,0,0,0)"
              language={state.lang}
            ></meow-apps-dropdown>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
