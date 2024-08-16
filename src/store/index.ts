import { createStore } from "@stencil/store";
import { initConfig } from "./config";
// import { t } from "../modules/i18n";

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
});

initConfig();

export default state;
