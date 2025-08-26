import { Debounce } from "@nyanyajs/utils/dist/debounce";
import {
  Component,
  h,
  Event,
  EventEmitter,
  Prop,
  State,
  Watch,
  Element,
} from "@stencil/core";

// import { debounce } from "../../plugins/methods";
// import { prefix } from "../../../stencil.config";
// console.log(prefix + "-tabs");
@Component({
  tag: "saki-scroll-loading",
  styleUrl: "scroll-loading.scss",
  shadow: true,
})
export class TabsComponent {
  d = new Debounce();
  @Element() el: Element;
  @Prop() type: "loading" | "loaded" | "noMore" = "loading";
  @Prop() language = "en-US";
  @Prop() content = "";
  @Prop() loadingAnimation: boolean = false;
  @State() loadingText: string = "Loading.";
  @Prop() margin: string = "";
  @Prop() padding: string = "";

  @Event() tap: EventEmitter;
  @Event() loadData: EventEmitter;
  @Watch("type")
  watchTypeFunc() {
    this.formatLoadingText();
  }
  @Watch("language")
  watchLanguageFunc() {
    this.formatLoadingText();
  }
  componentWillLoad() {
    this.formatLoadingText();
  }
  componentDidLoad() {
    let options = {
      root: this.el.querySelector(".saki-scroll-loading-component"),
      rootMargin: "0px",
      threshold: 1.0,
    };
    let observer = new IntersectionObserver((e) => {
      // if (this.src.indexOf("c61baa0aa19cf71fae58b8f54afc4a60") >= 0) {
      //   console.log("saaaaaaaaaaaa", e, e?.[0]?.target);
      // }
      // console.log("出现了111", e);
      if (e?.[0]?.intersectionRatio === 1) {
        this.d.increase(() => {
          // console.log("出现了222", e);
          this.loadData.emit();
        }, 50);
      }
    }, options);
    observer.observe(this.el);
  }
  formatLoadingText() {
    switch (this.type) {
      case "loading":
        switch (this.language) {
          case "zh-CN":
            this.loadingText = "正在加载...";

            break;
          case "zh-TW":
            this.loadingText = "正在加载...";

            break;

          default:
            this.loadingText = "Loading...";
            break;
        }
        break;
      case "loaded":
        switch (this.language) {
          case "zh-CN":
            this.loadingText = "加载更多";

            break;
          case "zh-TW":
            this.loadingText = "加載更多";

            break;

          default:
            this.loadingText = "View more";
            break;
        }
        break;
      case "noMore":
        switch (this.language) {
          case "zh-CN":
            this.loadingText = "没有更多内容了";

            break;
          case "zh-TW":
            this.loadingText = "沒有更多內容了";
            break;

          default:
            this.loadingText = "All loaded";
            break;
        }
        break;

      default:
        break;
    }
  }
  render() {
    return (
      <div
        onClick={() => {
          this.tap.emit();
        }}
        style={{
          ...["margin", "padding"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class="saki-scroll-loading-component"
      >
        {this.loadingAnimation ? (
          <div class={"loading-animation"}>
            <saki-animation-loading
              width="30px"
              height="30px"
              type="rotateEaseInOut"
              loading-animation
            ></saki-animation-loading>
          </div>
        ) : (
          this.content || this.loadingText
        )}
      </div>
    );
  }
}

{
  /* <saki-animation-loading
              type="rotateEaseInOut"
              loading-animation
            ></saki-animation-loading> */
}
