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
  @Prop() loadingAnimation: boolean = false;
  @State() loadingText: string = "Loading.";
  @Prop() margin: string = "";
  @Event() tap: EventEmitter;
  @Watch("type")
  watchTypeFunc() {
    this.formatLoadingText();
  }
  componentWillLoad() {
    this.formatLoadingText();
  }
  formatLoadingText() {
    switch (this.type) {
      case "loading":
        this.loadingText = "Loading...";
        break;
      case "loaded":
        this.loadingText = "Load more";
        break;
      case "noMore":
        this.loadingText = "No more";
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
          ...["margin"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class="saki-scroll-loading-component"
      >
        {this.loadingAnimation ? (
          <div class={"loading-animation"}></div>
        ) : (
          this.loadingText
        )}
      </div>
    );
  }
}
