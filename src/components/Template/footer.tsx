import {
  Component,
  h,
  Event,
  EventEmitter,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { t } from "../../modules/i18n/i18n";
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
  @Prop() bgColor = "";
  @Prop() textColor = "#000";

  @Prop() appTitle = "";
  @Prop() appLink = "/";

  @Prop() github = false;
  @Prop() githubLink = "";
  @Prop() githubText = "Github";

  @Prop() year = "";

  @Prop() blog = true;
  @Prop() blogLink = "https://aiiko.club/1";
  @Prop() blogText = "Shiina Aiiko";

  @Prop() feedback = true;
  @Prop() feedbackLink = "mailto:shiina@aiiko.club";
  @Prop() feedbackText = "Feedback";

  @Prop() appearance = "";
  @Prop() appearanceName = "";
  @State() showLanguageDropdown = false;
  @State() showAppearanceDropdown = false;
  // @State() appearanceColors = {
  //   Pink: "#f29cb2",
  //   Blue: "#3393ce",
  // };
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
          "background-color": this.bgColor,
          "--text-color": this.textColor,
        }}
        class={"saki-footer-component "}
      >
        <div class="f-left">
          <div class="f-language">
            <div
              style={{
                display: "none",
              }}
            >
              <span>{state.language}</span>
              {state.languages.map((v) => v)}
            </div>
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
                  <saki-icon
                    color={this.textColor}
                    type="BottomTriangle"
                  ></saki-icon>
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
                      {this.appearanceName ||
                        t(state.appearance.toLowerCase(), {
                          ns: "appearance",
                        })}
                    </span>
                    <saki-icon
                      color={this.textColor}
                      type="BottomTriangle"
                    ></saki-icon>
                  </div>
                </saki-button>
                <div slot="main">
                  <saki-menu
                    onSelectvalue={(e) => {
                      const val = state.appearances?.filter(
                        (v) => v.value === e.detail.value
                      )?.[0];
                      this.changeAppearance.emit({
                        ...val,
                      });

                      state.appearance = e.detail.value;
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
                              {v.name ||
                                t(v.value.toLowerCase(), {
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
            {"© " + (this.year || new Date().getFullYear() + " ")}
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

          {this.feedback ? (
            <div class={"f-r-link"}>
              <span>-</span>
              <a target="_blank" href={this.feedbackLink}>
                {this.feedbackText}
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
