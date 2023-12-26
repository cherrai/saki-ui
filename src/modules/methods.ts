import state from "../store";

export const initSakiUIMethods = () => {
  (window as any).sakiui = {
    initLanguage: (
      language: string,
      lang: string,
      languages: string[],
      resources: {
        [lang: string]: {
          k: string;
        };
      }
    ) => {
      state.language = language;
      lang
      state.languages = languages;
      state.resources = resources;
    },
    initAppearances: (
      appearances: {
        value: string;
        color: string;
      }[]
    ) => {
      console.log("appearances", appearances);
      state.appearances = appearances;
    },
  };
};
