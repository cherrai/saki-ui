import {
  Component,
  h,
  Event,
  EventEmitter,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { t } from "../../modules/i18n";
import state from "../../store";

@Component({
  tag: "saki-template-footer",
  styleUrl: "template.scss",
  shadow: false,
})
export class TemplateFooterComponent {
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() width = "";
  @Prop() height = "";

  @Prop() appTitle = "";
  @Prop() appLink = "/";

  @Prop() github = false;
  @Prop() githubLink = "";
  @Prop() githubText = "Github";

  @Prop() blog = true;
  @Prop() blogLink = "https://aiiko.club/1";
  @Prop() blogText = "Shiina Aiiko";

  @Prop() appearance = "";
  @State() showLanguageDropdown = false;
  @State() showAppearanceDropdown = false;
  @State() appearanceColors = {
    Pink: "#f29cb2",
    Blue: "#3393ce",
  };
  @Event() changeLanguage: EventEmitter;
  @Event() changeAppearance: EventEmitter;
  @Watch("appearance")
  watchAppearance() {
    state.appearance = this.appearance;
  }

  componentWillLoad() {}
  componentDidLoad() {
    state.appearance = this.appearance;
  }
  render() {
    return (
      <div
        style={{
          ...[
            "margin",
            "padding",
            "flexDirection",
            "justifyContent",
            "alignItems",
            "width",
            "height",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-footer-component "}
      >
        <div class="f-left">
          <div class="f-language">
            <saki-dropdown
              visible={this.showLanguageDropdown}
              floating-direction="Center"
              onClose={() => {
                this.showLanguageDropdown = false;
              }}
            >
              <saki-button
                onTap={() => {
                  this.showLanguageDropdown = true;
                }}
                bg-color="transparent"
                padding="10px 6px 10px 12px"
                title="Language"
                border="none"
                type="Normal"
              >
                <div class="f-l-button">
                  <span>
                    {t(state.language, {
                      ns: "languages",
                    })}
                  </span>
                  <saki-icon type="BottomTriangle"></saki-icon>
                </div>
              </saki-button>
              <div slot="main">
                <saki-menu
                  onSelectvalue={async (e) => {
                    this.changeLanguage.emit(e.detail.value);

                    this.showLanguageDropdown = false;
                  }}
                >
                  {state.languages.map((v) => {
                    return (
                      <saki-menu-item
                        key={v}
                        padding="10px 18px"
                        font-size="14px"
                        value={v}
                        active={state.language === v}
                      >
                        <div
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <span>
                            {v !== "system"
                              ? t(v, {
                                  ns: "languages",
                                }) +
                                " - " +
                                t(v, {
                                  ns: "languages",
                                  lng: v,
                                })
                              : t(v, {
                                  ns: "languages",
                                })}
                          </span>
                        </div>
                      </saki-menu-item>
                    );
                  })}
                </saki-menu>
              </div>
            </saki-dropdown>
          </div>
          {this.appearance ? (
            <div class="f-appearance">
              <saki-dropdown
                visible={this.showAppearanceDropdown}
                floating-direction="Center"
                onClose={() => {
                  this.showAppearanceDropdown = false;
                }}
              >
                <saki-button
                  onTap={() => {
                    this.showAppearanceDropdown = true;
                  }}
                  bg-color="transparent"
                  padding="10px 6px 10px 12px"
                  title="Language"
                  border="none"
                  type="Normal"
                >
                  <div class="f-l-button">
                    <span>
                      {t(state.appearance.toLowerCase(), {
                        ns: "appearance",
                      })}
                    </span>
                    <saki-icon type="BottomTriangle"></saki-icon>
                  </div>
                </saki-button>
                <div slot="main">
                  <saki-menu
                    onSelectvalue={(e) => {
                      this.changeAppearance.emit({
                        appearance: e.detail.value,
                        color: this.appearanceColors[e.detail.value],
                      });

                      // state.appearance = e.detail.value;
                      this.showAppearanceDropdown = false;
                    }}
                  >
                    {state.appearances.map((v) => {
                      return (
                        <saki-menu-item
                          key={v.value}
                          padding="10px 18px"
                          font-size="14px"
                          value={v.value}
                          active={state.appearance === v.value}
                        >
                          <div
                            style={{
                              cursor: "pointer",
                              color: v.color,
                            }}
                          >
                            <span>
                              {t(v.value.toLowerCase(), {
                                ns: "appearance",
                              })}
                            </span>
                          </div>
                        </saki-menu-item>
                      );
                    })}
                  </saki-menu>
                </div>
              </saki-dropdown>
            </div>
          ) : (
            ""
          )}
        </div>
        <div class="f-right">
          <span class="f-r-copyright">
            {"© " + new Date().getFullYear() + " "}
          </span>

          {this.appTitle ||
          t("appTitle", {
            ns: "common",
          }) ? (
            <div class={"f-r-link"}>
              <a target="_blank" class={"f-r-link"} href={this.appLink}>
                {this.appTitle ||
                  t("appTitle", {
                    ns: "common",
                  })}
              </a>
            </div>
          ) : (
            ""
          )}

          {this.github ? (
            <div class={"f-r-link"}>
              <span>-</span>
              <a target="_blank" class={"f-r-link"} href={this.githubLink}>
                {/* {t('aiikoBlog', {
                       ns: 'common',
                     })} */}
                {this.githubText}
              </a>
            </div>
          ) : (
            ""
          )}

          {this.blog ? (
            <div class={"f-r-link"}>
              <span>-</span>
              <a target="_blank" href={this.blogLink}>
                {this.blogText}
              </a>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
