import { onChange, state } from "./";
import i18n, { initI18n } from "../modules/i18n";
// import { storage } from "./storage";

export const initConfig = () => {
  onChange("language", (v) => {
    state.language = v;
    if (v === "system") {
      if (state.languages.indexOf(navigator.language) >= 0) {
        state.lang = navigator.language;
      } else {
        switch (navigator.language.substring(0, 2)) {
          case "zh":
            state.lang = "zh-CN";
            break;
          case "en":
            state.lang = "en-US";
            break;
          case "ja":
            state.lang = "ja-JP";
            break;

          default:
            state.lang = "en-US";
            break;
        }
      }
    } else {
      state.lang = v;
    }
    initI18n();
    state.initI18n && i18n.changeLanguage(state.lang);
  });
  onChange("resources", (v) => {
    v && initI18n();
  });
};
