import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
} from "@stencil/core";
import { Query } from "../../modules/methods";

@Component({
  tag: "saki-sso",
  styleUrl: "sso.scss",
  shadow: false,
})
export class SSOLoginComponent {
  @Prop() url = "";
  @Prop() appId = "";
  // @Prop() appToken = "";
  @Prop() appName = "";
  @Prop() language = "zh-CN";
  @Prop() appearance = "";

  @Prop() disableHeader = false;
  @Event() login: EventEmitter;
  @Event() updateUser: EventEmitter;
  @Event() verifyAccount: EventEmitter;
  @Element() el: HTMLElement;

  // @Method()
  // async dragTo(el: HTMLSakiMenuItemElement) {
  //   console.log(el);
  // }
  componentWillLoad() {}
  componentDidLoad() {
    window.addEventListener("message", this.onMessage);
  }
  onMessage = (e: MessageEvent) => {
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

        default:
          break;
      }
    }
  };
  render() {
    return (
      <div
        // style={{
        //   padding: this.padding,
        // }}
        class={"saki-sso-login-component "}
      >
        <iframe
          src={Query(this.url, {
            appId: this.appId,
            language: this.language,
            appearance: this.appearance,
            appName: this.appName,
            iframe: "true",
            disableHeader: !this.disableHeader ? "false" : "true",
          })}
          frameborder="0"
        ></iframe>
      </div>
    );
  }
}
