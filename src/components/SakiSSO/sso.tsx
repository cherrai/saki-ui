import { Debounce } from "@nyanyajs/utils/dist/debounce";
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
} from "@stencil/core";
import { Query } from "../../modules/methods";

@Component({
  tag: "saki-sso",
  styleUrl: "sso.scss",
  shadow: false,
})
export class SSOLoginComponent {
  deb = new Debounce();
  @Prop() url = "";
  @Prop() appId = "";
  // @Prop() appToken = "";
  @Prop() appName = "";
  @Prop() language = "zh-CN";
  @Prop() appearance = "";
  @Prop() redirectUri = "";
  @Prop() appTitle = "";

  @Prop() platform: "Web" | "AndroidApp" = "Web";

  @Prop() disableHeader = false;
  @Event() login: EventEmitter;
  @Event() updateUser: EventEmitter;
  @Event() verifyAccount: EventEmitter;
  @Event() thirdPartyLogin: EventEmitter;
  @Element() el: HTMLElement;
  iframeEl: HTMLIFrameElement;

  // @Method()
  // async dragTo(el: HTMLSakiMenuItemElement) {
  //   console.log(el);
  // }
  componentWillLoad() {}
  componentDidLoad() {
    // window.removeEventListener("message", this.onMessage);
    // window.addEventListener("message", this.onMessage);
  }
  disconnectedCallback() {
    // window.removeEventListener("message", this.onMessage);
  }
  @Listen("message", { target: "window" })
  handleMessage(e: MessageEvent) {
    // console.log("onMessage", e);
    if (this.url.indexOf(e.origin) >= 0) {
      switch (e.data.type) {
        case "login":
          this.login.emit({
            deviceId: e.data.data.deviceId,
            token: e.data.data.token,
            userInfo: e.data.data.userInfo,
          });
          break;

        case "updateUser":
          this.updateUser.emit();
          break;
        case "verifyAccount":
          this.verifyAccount.emit({
            token: e.data.data.token,
          });
          break;
        case "replaceUrl":
          if (e.data?.data?.url) {
            location.href = e.data.data?.url;
          }
          break;
        case "thirdPartyLogin":
          console.log("ssssssssssss sakisso thirdPartyLogin", e.data);
          this.thirdPartyLogin.emit({
            type: e.data.data?.type,
            url: e.data?.data?.url || "",
          });
          break;

        default:
          break;
      }
    }
  }
  @Method()
  async setThirdPartyLoginData(params: {
    type: string;
    user: {
      openId: string;
      name: string;
      avatar: string;
      email: string;
    };
  }) {
    if (this.iframeEl?.contentWindow) {
      const messageData = {
        type: "SET_THIRD_PARTY_LOGIN_DATA", // 自定义的消息类型
        payload: params,
      };

      // 2. 提取出子页面的真实 Origin (例如: https://aiko.club)
      const targetOrigin = new URL(this.url).origin;

      // 3. 发送消息
      this.iframeEl.contentWindow.postMessage(messageData, targetOrigin);
      console.log("父页面消息已发出", messageData);
    }
  }
  render() {
    return (
      <div
        // style={{
        //   padding: this.padding,
        // }}
        class={"saki-sso-login-component "}
      >
        <iframe
          ref={(e) => {
            this.iframeEl = e;
          }}
          src={Query(this.url, {
            appId: this.appId,
            language: this.language,
            appearance: this.appearance,
            appName: this.appName,
            platform: this.platform,
            iframe: "true",
            disableHeader: !this.disableHeader ? "false" : "true",
            redirectUri: encodeURIComponent(this.redirectUri || location.href),
            appTitle: encodeURIComponent(this.appTitle || ""),
          })}
          allow="identity-credentials-get"
          frameborder="0"
        ></iframe>
      </div>
    );
  }
}
