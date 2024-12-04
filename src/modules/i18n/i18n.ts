import i18n from "i18next";
import state from "../../store";
import { sakiuiEventListener } from "../../store/config";

export const initI18n = () => {
  // state.initI18n || 
  if (!Object.keys(state.resources).length) return;


  console.log("[Saki UI] Initialize i18n", state);
  if (state.initI18n) {
  }
  i18n.init({
    resources: state.resources,
    ns: ["common"],
    defaultNS: "common",
    fallbackLng: "en-US",
    lng: state.lang,
    // fallbackLng: 'en-US',
    // lng: 'en-US',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
  if (state.lang) {
    i18n.changeLanguage(state.lang);
  }
  state.initI18n = true;
  (window as any).sakiui = {
    ... (window as any).sakiui,
    i18n
  };

  sakiuiEventListener.dispatch("loadI18n", i18n)
  sakiuiEventListener.on('mounted', () => {
    sakiuiEventListener.dispatch("loadI18n", i18n)
  })
};
export const t = i18n.t;


export default i18n;
