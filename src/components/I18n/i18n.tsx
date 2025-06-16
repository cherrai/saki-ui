import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop,
  Watch,
  h,
} from "@stencil/core";
import { state } from "../../store";
import { momentLocale } from "../../store/config";

@Component({
  tag: "saki-i18n",
  styleUrl: "i18n.scss",
  shadow: true,
})
export class SakiI18nComponent {
  @Prop() language: string = "";
  @Prop() lang: string = "";
  @Prop() defalutLanguage: string = "";
  @Prop() languages: string[] = [];
  @Prop() resources: {
    [language: string]: {
      [k: string]: any;
    };
  } = {};
  @Event() mounted: EventEmitter;
  @Element() el: HTMLElement;
  @Watch("language")
  watchDisplayLanguage() {
    console.log("i18n", this.language, state.language);
    state.language = this.language;
  }
  @Watch("languages")
  watchLanguages() {
    console.log("i18n", this.languages, state.languages);
    state.languages = this.languages;
  }
  @Watch("resources")
  watchResources() {
    state.resources = this.DeepMergeObject(
      this.resources,
      state.localResources
    );
  }
  @Watch("lang")
  watchLang() {
    state.lang = this.lang;
    momentLocale(state.lang);
  }
  componentWillLoad() {}
  componentDidLoad() {
    setTimeout(() => {
      // console.log("componentDidLoad");
      state.language = this.language;
      state.lang = this.lang;
      state.languages = this.languages;
      state.resources = this.DeepMergeObject(
        this.resources,
        state.localResources
      );
      console.log("i18n", state.lang, state.language, state.languages);

      this.mounted.emit();

      momentLocale(state.lang);
    }, 300);
  }
  @Method()
  async initLanguage(
    languages: string[],
    resources: {
      [lang: string]: {
        [ns: string]: {
          [k: string]: string;
        };
      };
    }
  ) {
    // console.log("initLanguage", languages, resources);
    state.languages = languages;
    this.resources = resources;
    state.resources = this.DeepMergeObject(
      this.resources,
      state.localResources
    );
    state.updateTime = new Date().getTime();
    // console.log("moment", moment.locale("zh-cn"));
  }
  @Method()
  async getResources() {
    return this.DeepMergeObject(
      this.resources,
      Object.fromEntries(
        Object.keys(state.localResources).map((lang) => {
          return [
            lang,
            Object.fromEntries(
              Object.keys(state.localResources[lang]).map((k) => {
                return [
                  "sakiui" + k.slice(0, 1).toUpperCase() + k.slice(1, k.length),
                  state.localResources[lang][k],
                ];
              })
            ),
          ];
        })
      )
    );
  }
  DeepMergeObject(target: any, source: any) {
    if (typeof target === "object" && typeof source === "object") {
      // console.log("i18n", target, source);
      // console.log("i18n", Object.keys(source));
      return Object.fromEntries(
        Object.keys(target)
          .concat(Object.keys(source))
          .map((k) => {
            // console.log("i18n", target[k]);
            if (
              typeof target[k] === "object" &&
              typeof source[k] === "object"
            ) {
              return [k, this.DeepMergeObject(target[k], source[k])];
            }
            return [k, target[k] || source[k]];
          })
      );
    }
    return target;

    // console.log("source", source);
    // return target;
  }

  render() {
    return (
      <div class={"saki-init-language-component " + state.lang}>
        {/* aaaa
        {state.language},{state.lang},{state.updateTime}
        {t("zh-CN", {
          ns: "languages",
        })}
        ,bbbb */}
      </div>
    );
  }
}
