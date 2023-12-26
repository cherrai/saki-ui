import { WebStorage } from "@nyanyajs/utils";
export let storage = {
  global: new WebStorage({
    // 改为ls
    storage: "LocalStorage",
    baseLabel: "global",
  }),
};
