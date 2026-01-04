import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { copyText, Query } from "../../modules/methods";
import { t } from "../../modules/i18n/i18n";

@Component({
  tag: "saki-app-portal",
  styleUrl: "app-portal.scss",
  shadow: false,
})
export class AppPortalComponent {
  @Prop() entryUrl = "";
  @Prop() language = "zh-CN";
  @Prop() appearance = "";
  @Prop() header = true;
  @Prop() enableGPS = false;

  @Prop() moreButtons: string[] = [];

  @State() appInfo: {
    title: string;
    logo: string;
    logoText: string;
    url: string;
  } = {
    title: "",
    logo: "",
    logoText: "",
    url: "",
  };

  @State() loadPage = true;
  @State() openMoreDropdown = false;

  @State() moreList: {
    name: string;
    color: string;
    bgColor: string;
    iconType: string;
    sort: number;
    click: () => void;
  }[] = [
    {
      name: "重启",
      color: "#666",
      bgColor: "",
      iconType: "Refresh",
      sort: 10,
      click: () => {
        if (this.iframe) {
          this.iframe.src = this.iframe.src;
          this.loadPage = true;
          this.openMoreDropdown = false;
        }
      },
    },
    {
      name: "Copy Url",
      color: "#666",
      bgColor: "",
      iconType: "Link",
      sort: 20,
      click: () => {
        copyText(this.appInfo.url);
        this.openMoreDropdown = false;
      },
    },
    {
      name: "新的窗口打开",
      color: "#666",
      bgColor: "",
      iconType: "Add",
      sort: 20,
      click: () => {
        window.open(this.appInfo.url);
      },
    },
  ];

  @Event() closeApp: EventEmitter;
  @Event() switchEnableGPS: EventEmitter;
  @Event() method: EventEmitter<{
    type: string;
    value: any;
  }>;

  @Element() el: HTMLElement;

  iframe: HTMLIFrameElement;

  @Watch("enableGPS")
  watchmoreList() {
    if (this.moreButtons.includes("enableGPS")) {
      const curIndex = this.moreList.reduce((t, v, i) => {
        if (v.sort === 5) {
          return i;
        }
        return t;
      }, -1);
      const name = this.enableGPS ? "已优先GPS定位" : "启用GPS定位";
      const color = this.enableGPS ? "#fff" : "#666";
      const bgColor = this.enableGPS ? "var(--saki-default-color)" : "";
      const eventClick = () => {
        this.enableGPS = !this.enableGPS;
        this.openMoreDropdown = false;
        this.switchEnableGPS.emit(this.enableGPS);
      };
      if (curIndex >= 0) {
        this.moreList[curIndex].name = name;
        this.moreList[curIndex].color = color;
        this.moreList[curIndex].bgColor = bgColor;
        this.moreList[curIndex].click = eventClick;
      } else {
        this.moreList.push({
          name: name,
          color,
          bgColor,
          iconType: "GPS",
          sort: 5,
          click: eventClick,
        });
      }
    } else {
      this.moreList.filter((v) => v.sort !== 5);
    }

    this.moreList.sort((a, b) => {
      return a.sort - b.sort;
    });
  }

  // @Method()
  // async dragTo(el: HTMLSakiMenuItemElement) {
  //   console.log(el);
  // }
  componentWillLoad() {
    // console.log("appportal componentWillLoad");
  }
  componentDidLoad() {
    this.watchmoreList();
    // this.moreList = [
    //   {
    //     name: "重启",
    //     iconType: "Refresh",
    //     sort: 10,
    //     click: () => {
    //       if (this.iframe) {
    //         this.iframe.src = this.iframe.src;
    //         this.loadPage = true;
    //         this.openMoreDropdown = false;
    //       }
    //     },
    //   },
    //   {
    //     name: "Copy Url",
    //     iconType: "Link",
    //     sort: 20,
    //     click: () => {
    //       copyText(this.appInfo.url);
    //       this.openMoreDropdown = false;
    //     },
    //   },
    // ];

    // console.log("appportal componentDidLoad");
    window.addEventListener("message", this.onMessage);
  }
  disconnectedCallback() {
    // console.log("appportal disconnectedCallback");
    this.loadPage = true;
  }
  onMessage = (e: MessageEvent) => {
    if (this.entryUrl.indexOf(e.origin) >= 0) {
      console.log("onMessage SelectFilesModal", e.data, e.data?.data);
      switch (e.data.type) {
        case "setAppInfo":
          this.appInfo = e.data?.data || {
            title: "",
            logo: "",
            logoText: "",
            url: "",
          };
          // this.login.emit({
          //   deviceId: e.data.data.deviceId,
          //   token: e.data.data.token,
          //   userInfo: e.data.data.userInfo,
          // });
          break;

        case "loaded":
          this.loadPage = false;
          // this.updateUser.emit();
          break;

        case "dispatchMethod":
          e.data?.data?.type &&
            this.method.emit({
              type: e.data?.data?.type,
              value: e.data?.data?.value,
            });
          break;
        case "verifyAccount":
          // this.verifyAccount.emit({
          //   token: e.data.data.token,
          // });
          break;

        default:
          break;
      }
    }
  };
  // @Method()
  // async initMoreList(, targetIndex: number) {
  //   this.moreList = this.moreList
  //     .slice(0, targetIndex)
  //     .concat(moreList)
  //     .concat(this.moreList.slice(targetIndex, this.moreList.length));
  // }
  render() {
    let moreMenuItemWidth = 70;
    let moreMenuRowCount = 5;
    return (
      <div class={"saki-app-portal-component "}>
        <div class={"ap-header " + (this.header ? "show" : "hide")}>
          <div class={"ap-h-left"}>
            <saki-avatar
              nickname={this.appInfo.logoText?.toUpperCase()}
              border-radius={"6px"}
              width="26px"
              height="26px"
              margin="0 6px 0 0"
              src={this.appInfo.logo}
            ></saki-avatar>
            <span class={"ap-title text-elipsis"}>{this.appInfo.title}</span>
          </div>
          <div class={"ap-h-right"}></div>
        </div>
        <saki-transition
          animation-duration={500}
          class-name="load-page"
          in={this.loadPage}
        >
          <div
            class={
              "loading-page " +
              (this.header ? "headerShow" : "headerHide") +
              " "
            }
          >
            <div class="loading-dots">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
        </saki-transition>

        <div class={"ap-button"}>
          <saki-dropdown
            visible={this.openMoreDropdown}
            // width={window.innerWidth > 768 ? "378px" : "284px"}
            width="100%"
            max-width={moreMenuItemWidth * moreMenuRowCount + 20 + "px"}
            // height="100%"
            max-height="500px"
            floating-direction="Left"
            mask={false}
            body-closable
            zIndex={1010}
            onClose={() => {
              this.openMoreDropdown = false;
            }}
          >
            <div
              onClick={() => {
                console.log(" this.openMoreDropdown", this.openMoreDropdown);
                this.openMoreDropdown = true;
              }}
              class={"ap-b-item"}
            >
              <saki-icon color="#444" type="More"></saki-icon>
            </div>
            <div
              style={{
                "--saki-ap-more-menu-item-width": moreMenuItemWidth + "px",
                "--saki-ap-more-menu-row-count": String(moreMenuRowCount),
              }}
              class={"saki-app-portal-dp "}
              slot="main"
            >
              <div class={"ap-header"}>
                <div class={"ap-h-left"}>
                  <saki-avatar
                    nickname={this.appInfo.logoText?.toUpperCase()}
                    border-radius={"6px"}
                    width="40px"
                    height="40px"
                    margin="0 6px 0 0"
                    src={this.appInfo.logo}
                  ></saki-avatar>
                  <span class={"text-elipsis"}>{this.appInfo.title}</span>
                </div>
                <div class={"ap-h-right"}></div>
              </div>
              <div
                style={
                  {
                    // "grid-template-columns": `repeat(${moreMenuRowCount}, 1fr)`,
                  }
                }
                class={"ap-list"}
              >
                {this.moreList.map((v, i) => {
                  return (
                    <div
                      onClick={() => {
                        v.click();
                      }}
                      style={
                        {
                          // "grid-template-columns": `repeat(${moreMenuRowCount}, 1fr)`,
                        }
                      }
                      class={"ap-l-item"}
                      key={i}
                    >
                      <div
                        style={{
                          "background-color": v.bgColor,
                        }}
                        class={"ap-l-i-icon"}
                      >
                        <saki-icon
                          width={moreMenuItemWidth / 3.5 + "px"}
                          height={moreMenuItemWidth / 3.5 + "px"}
                          color={v.color || "#666"}
                          type={v.iconType as any}
                        ></saki-icon>
                      </div>
                      <span class={"ap-l-i-name text-two-elipsis"}>
                        {" "}
                        {v.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              <saki-button
                onTap={() => {
                  this.openMoreDropdown = false;
                }}
                margin="4px 0 0"
                padding="6px 6px"
              >
                <span
                  style={{
                    "font-size": "14px",
                    color: "#666",
                  }}
                >
                  {t("cancel", {
                    ns: "prompt",
                  }) || "Cancel"}
                </span>
              </saki-button>
            </div>
          </saki-dropdown>
          <div
            onClick={() => {
              this.closeApp.emit();
              this.loadPage = true;
            }}
            class={"ap-b-item"}
          >
            <saki-icon
              width="14px"
              height="14px"
              color="#444"
              type="Close"
            ></saki-icon>
          </div>
        </div>

        <iframe
          ref={(e) => {
            this.iframe = e;
          }}
          src={Query(this.entryUrl, {
            language: this.language,
            appearance: this.appearance,
            iframe: "true",
            sakiAppPortal: "true",
          })}
          frameborder="0"
        ></iframe>
      </div>
    );
  }
}
