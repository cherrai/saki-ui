import { createStore } from "@stencil/store";
import { initConfig } from "./config";
// import { t } from "../modules/i18n";

import enUS from "../modules/i18n/en-US.json";
import zhCN from "../modules/i18n/zh-CN.json";
import zhTW from "../modules/i18n/zh-TW.json";

export const localResources = {
  "zh-CN": {
    ...zhCN,
  },
  "zh-TW": {
    ...zhTW,
  },
  "en-US": {
    ...enUS,
  },
};

// onChange
export const { state, onChange } = createStore({
  appearance: "",
  appearances: [] as {
    value: string;
    name: string;
    color: string;
  }[],

  initI18n: false,
  language: "",
  lang: "",
  languages: ["system"],

  currentRoute: "",

  networkStatus: false,
  localResources,
  resources: {
    // "zh-CN": {
    //   template: {
    //     feedback: "反馈",
    //   },
    // },
    // "en-US": {
    //   template: {
    //     feedback: "Feedback",
    //   },
    // },
  } as any,
  // {
  //   [lang: string]: {
  //     [ns: string]: {
  //       [k: string]: string;
  //     };
  //   };
  // },
  updateTime: 0,
  // sakiuiEventListener
});

// initConfig();
setTimeout(() => {
  initConfig();
});

export default state;
