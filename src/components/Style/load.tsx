import { Component, h } from "@stencil/core";
import { namespace, styles } from "../../config-temp";
import axios from "axios";
// 暂时弃用
@Component({
  tag: "saki-base-style",
  shadow: false,
})
export class BaseStyleComponent {
  componentWillLoad() {
    // const config = require("../../config.json");
    const s = document.querySelectorAll("script");
    let url = "";
    // const reg = /^http(s)?:\/\/(.*?)\//;
    for (let i = 0; i < s.length; i++) {
      const v = s[i];
      if (v.src.indexOf(namespace) >= 0) {
        // url = reg.exec(v.src)[2];
        // if (v.src.indexOf("https") >= 0) {
        //   url = "https://" + url;
        // } else {
        //   url = "http://" + url;
        // }

        url = v.src.substring(0, v.src.lastIndexOf(namespace));
        break;
      }
    }
    if (url) {
      styles.forEach((v) => {
        // console.log("aaaaaaaaaaaaaaaaa", url + v);
        axios.get(url + v).then((res) => {
          const l = document.createElement("style");
          l.innerHTML = res.data;
          document.head.appendChild(l);
          // console.log("aaaaaaaaaaaaaaaaa", url, res.data);
        });
      });
    }
  }
  render() {
    return <div class={"saki-base-style-component "}></div>;
  }
}
