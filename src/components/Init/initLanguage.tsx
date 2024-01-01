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

@Component({
  tag: "saki-init-language",
  styleUrl: "init.scss",
  // shadow: true,
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
  }
  componentWillLoad() {}
  componentDidLoad() {
    // console.log("componentDidLoad");
    state.language = this.language;
    state.lang = this.lang;
  }
  @Method()
  async initLanguage(
    languages: string[],
    resources: {
      [lang: string]: {
        k: string;
      };
    }
  ) {
    // console.log("initLanguage", languages, resources);
    state.languages = languages;
    state.resources = resources;
    state.updateTime = new Date().getTime();
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
