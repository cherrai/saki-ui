import i18n from "i18next";
import state from "../store";

export const initI18n = () => {
  console.log(state.resources, state.lang);
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
  console.log("i18n", i18n);
  if (state.lang) {
    i18n.changeLanguage(state.lang);
  }
};
export const t = i18n.t;

export default i18n;
