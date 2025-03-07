import { onChange, state } from "./";
import i18n, { initI18n } from "../modules/i18n/i18n";
import moment from "moment";
// import "moment/dist/locale/en";
import "moment/dist/locale/zh-cn";
import "moment/dist/locale/zh-tw";
import { NEventListener } from "@nyanyajs/utils/dist/common/neventListener";
// // import { storage } from "./storage";

export const sakiuiEventListener = new NEventListener();

export type SakiuiEventListener = typeof sakiuiEventListener

export const initConfig = () => {
  console.log("initConfig");

  window.addEventListener("click", (e) => {
    // console.log(
    //   "bodyClosable body-click:dropdown-event ",
    //   e?.target,

    //   nevent.getEventNames()
    // );
    sakiuiEventListener.getEventNames().forEach((v) => {
      // console.log("eeeeeeee", v);
      if (v.indexOf("body-click:dropdown-event") >= 0) {
        sakiuiEventListener.dispatch(v, e);
      }
    });
  });

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

    if (state.initI18n) {
      i18n.changeLanguage(state.lang);
    }
    momentLocale(state.lang);
  });
  onChange("resources", (v) => {
    v && initI18n();
  });
};

export const momentLocale = (lang: string) => {
  console.log("momentLocale", lang);
  moment.locale(lang);
  console.log("monment", moment.locales(), lang)
};



export let contextMenuTimer: NodeJS.Timeout;

export const setContextMenuTimer = (t: NodeJS.Timeout) => {
  contextMenuTimer = t;
};