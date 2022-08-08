import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
} from "@stencil/core";

@Component({
  tag: "saki-sso",
  styleUrl: "sso.scss",
  shadow: false,
})
export class SSOLoginComponent {
  @Prop() url = "";
  @Prop() appId = "";
  @Prop() disableHeader = false;
  @Event() login: EventEmitter;
  @Event() updateUser: EventEmitter;
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
    console.log("onMessage", e);
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
          src={
            this.url +
            "?appId=" +
            this.appId +
            "&iframe=true&disableHeader=" +
            (!this.disableHeader ? "false" : "true")
          }
          frameborder="0"
        ></iframe>
      </div>
    );
  }
}
