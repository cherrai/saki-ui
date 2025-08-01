import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
} from "@stencil/core";
// import qs from "qs";
// import { Query } from "../../modules/methods";

@Component({
  tag: "saki-sso-init",
  styleUrl: "sso.scss",
  shadow: false,
})
export class SSOInitComponent {
  @Prop() url = "";
  @State() isLogin = false;
  @Event() login: EventEmitter;
  @Element() el: HTMLElement;

  // @Method()
  // async loggedIn() {
  //   setTimeout(() => {
  //     // location.replace(this.url);
  //   }, 50);
  // }
  componentWillLoad() {}
  componentDidLoad() {
    window.removeEventListener("message", this.onMessage);
    window.addEventListener("message", this.onMessage);

    // // Query()
    // const hrefArr = location.href.split("?");
    // const obj = qs.parse(hrefArr?.[1] || hrefArr?.[0]);

    // if (obj?.userInfo) {
    //   obj.userInfo = JSON.parse(
    //     decodeURIComponent(String(obj?.userInfo || "")) || "{}"
    //   );
    // }

    // // console.log("saki-sso-init", obj);
    // if (obj?.sso) {
    //   this.login.emit({
    //     deviceId: obj?.deviceId,
    //     token: obj?.token,
    //     userInfo: obj?.userInfo,
    //   });
    //   delete obj?.token;
    //   delete obj?.sso;
    //   delete obj?.deviceId;
    //   delete obj?.userInfo;
    //   const url = Query(hrefArr[0], obj as any);
    //   // console.log("saki-sso-init", obj, url);

    //   this.url = url;

    //   setTimeout(() => {
    //     this.loggedIn();
    //     // location.href = url;
    //   }, 500);
    // }
  }
  onMessage = (e: MessageEvent) => {
    console.log("onMessage", e);
    switch (e.data.type) {
      case "login":
        this.login.emit({
          deviceId: e.data.data.deviceId,
          token: e.data.data.token,
          userInfo: e.data.data.userInfo,
        });
        this.isLogin = true;
        break;

      default:
        break;
    }
  };
  render() {
    return (
      <div class={"saki-sso-init-component "}>
        {!this.isLogin ? (
          <iframe
            src={this.url + "/oauth?initApp=true"}
            frameborder="0"
          ></iframe>
        ) : (
          ""
        )}
      </div>
    );
  }
}
