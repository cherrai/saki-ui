import { createStore } from "@stencil/store";
import { initConfig } from "./config";
// import { t } from "../modules/i18n";

// onChange
export const { state, onChange } = createStore({
  appearance: "",
  appearances: [] as {
    value: string;
    color: string;
  }[],

  initI18n: false,
  language: "",
  lang: "",
  languages: ["system"],

  currentRoute: "",

  networkStatus: false,
  resources: {} as {
    [lang: string]: {
      k: string;
    };
  },
  updateTime: 0,
});

initConfig();

export default state;
