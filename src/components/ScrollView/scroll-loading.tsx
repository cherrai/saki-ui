import {
  Component,
  h,
  Event,
  EventEmitter,
  Prop,
  State,
  Watch,
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
  @Prop() type: "loading" | "loaded" | "noMore" = "loading";
  @Prop() language = "en-US";
  @Prop() content = "";
  @Prop() loadingAnimation: boolean = false;
  @State() loadingText: string = "Loading.";
  @Prop() margin: string = "";
  @Prop() padding: string = "";

  @Event() tap: EventEmitter;
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
