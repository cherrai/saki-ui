import state from "../store";
import qs from "qs";
import { snackbar } from "./saki-ui-core/snackbar/snackbar";
import { sakiuiEventListener } from "../store/config";
import { initI18n } from "./i18n/i18n";
import moment from "moment";
// import { snackbar } from "./saki-ui-core";

export const initSakiUIMethods = () => {
  (window as any)?.loadSakiUI?.();
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
      lang;
      state.languages = languages;
      state.resources = resources;
    },
    initAppearances: (
      appearances: {
        value: string;
        name: string;
        color: string;
      }[]
    ) => {
      console.log("appearances", appearances);
      state.appearances = appearances;
    },
    sakiuiEventListener,
    appPortal: {
      setAppInfo: ({
        title,
        logo,
        logoText,
        url,
      }: {
        title: string;
        logo: string;

        logoText: string;
        url: string;
      }) => {
        window?.parent?.postMessage(
          {
            type: "setAppInfo",
            data: {
              title: title || "",
              logo: logo || "",
              logoText: logoText || "",
              url: url || "",
            },
          },
          "*"
        );
      },
      loaded: () => {
        window?.parent?.postMessage(
          {
            type: "loaded",
          },
          "*"
        );
      },
      dispatch: (method: string, val: any) => {
        window?.parent?.postMessage(
          {
            type: "dispatchMethod",
            data: {
              method: method,
              value: val,
            },
          },
          "*"
        );
      },
    },
    initI18n() {
      initI18n();
    },
    // i18n: {
    //   getResources() {
    //     console.log("initSakiUI", state.resources);
    //     // return state.resources;
    //   },
    // },
  };
};

export const Query = (
  url: string,
  query: {
    [k: string]: string;
  }
) => {
  let obj: {
    [k: string]: string;
  } = {};

  const urlArr = url.split("?");
  if (urlArr?.[1]) {
    url = urlArr?.[0];
    urlArr?.[1].split("&").forEach((v) => {
      const t = v.split("=");
      if (!t?.[0] || !t?.[1]) {
        return;
      }
      obj[t[0]] = t[1];
    });
  }

  let o = Object.assign(obj, query);
  let s = qs.stringify(
    Object.keys(o).reduce(
      (fin, cur) => (o[cur] !== "" ? { ...fin, [cur]: o[cur] } : fin),
      {}
    )
  );
  return url + (s ? "?" + s : "");
};

export const copyText = (text: string) => {
  if (window.isSecureContext && navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.display = "none";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  }
  snackbar({
    message: "Copy successfully!",
    vertical: "top",
    horizontal: "center",
    autoHideDuration: 2000,
    backgroundColor: "var(--saki-default-color)",
    color: "#fff",
  }).open();
};

let zIndex = 1000;
export const getZindex = () => {
  zIndex = zIndex + 1;
  return zIndex;
};

export const formatContentTime = (date: number) => {
  return moment(Number(date) * 1000).calendar(null, {
    sameDay: "[今天] HH:mm",
    nextDay: "[明天] HH:mm",
    nextWeek: "MM月DD日 HH:mm",
    lastDay: "[昨天] HH:mm",
    lastWeek: "[前天] HH:mm",
    sameElse: "YY年MM月DD日",
  });
};
