import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
} from "@stencil/core";
import { initSakiUIMethods } from "../../modules/methods";
import { state } from "../../store";
import { sakiuiEventListener } from "../../store/config";
import { Debounce } from "@nyanyajs/utils/dist/debounce";
import { snackbar } from "@saki-ui/core";

@Component({
  tag: "saki-init",
  styleUrl: "init.scss",
  shadow: false,
})
export class SakiInitComponent {
  @Prop() debug = false;
  @Prop() debugWSUrl = "ws://192.168.204.132:32300";
  @Event() mounted: EventEmitter;
  @Element() el: HTMLElement;
  watchFocusFunc() {}
  inputValue() {}
  componentWillLoad() {}
  componentDidLoad() {
    console.log("[Saki UI] initialization");
    state;
    initSakiUIMethods();
    this.mounted.emit();
    sakiuiEventListener.dispatch("mounted", "");

    this.oldBlogTip();

    if (this.debug) {
      const socket = new WebSocket(this.debugWSUrl);

      // Listen for messages
      const d = new Debounce();
      socket.addEventListener("message", function (event) {
        const data = JSON.parse(event.data || "{}");
        console.log("[Saki UI] rebuild... ", data);

        d.increase(() => {
          console.log("[Saki UI] reload... ", data?.buildResults?.isRebuild);
          if (data?.buildResults?.isRebuild) {
            window.location.reload();
          }
        }, 100);
      });
    }

    // window.addEventListener("message", (e) => {
    //   console.log("iframemessage", e.data);
    // });
  }
  @Method()
  async getSakiuiEventListener() {
    return (window as any)?.sakiui?.sakiuiEventListener;
  }
  oldBlogTip() {
    if (location.origin === "https://v1-blog.aiiko.club") {
      // snackbar({})

      const url = "https://aiiko.club";
      snackbar({
        message: `老博客已弃用，请前往新博客~ 点击此消息可直接前往！`,
        horizontal: "center",
        vertical: "top",
        backgroundColor: "var(--saki-default-color)",
        color: "#fff",
        onTap() {
          window.open(url);
        },
      }).open();
    }
  }
  render() {
    return <div class={"saki-init"}></div>;
  }
}
