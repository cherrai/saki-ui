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
import state from "../../store";
import { momentLocale } from "../../store/config";

@Component({
  tag: "saki-init-language",
  styleUrl: "init.scss",
  shadow: true,
})
export class SakiInitLanguageComponent {
  @Prop() language: string = "";
  @Prop() lang: string = "";
  @Prop() defalutLanguage: string = "";
  @Prop() languages: string = "";
  @Event() mounted: EventEmitter;
  @Element() el: HTMLElement;
  @Watch("language")
  watchDisplayLanguage() {
    console.log("state.language", this.language, state.language);
    state.language = this.language;
  }
  @Watch("lang")
  watchLang() {
    state.lang = this.lang;
    momentLocale(state.lang);
  }
  componentWillLoad() {}
  componentDidLoad() {
    // console.log("componentDidLoad");
    state.language = this.language;
    state.lang = this.lang;
    setTimeout(() => {
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
    state.resources = resources;
    state.updateTime = new Date().getTime();
    // console.log("moment", moment.locale("zh-cn"));
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
