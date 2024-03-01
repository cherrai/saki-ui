import {
  Component,
  Element,
  Method,
  Prop,
  State,
  Watch,
  h,
} from "@stencil/core";

@Component({
  tag: "saki-color",
  styleUrl: "color.scss",
  // shadow: true,
})
export class SakiColorComponent {
  @Prop() defaultColor = "#f29cb2";
  @Prop() defaultHoverColor = "#f185a0";
  @Prop() defaultActiveColor = "#ce5d79";
  @Prop() defaultBorderColor = "#f1f1f1";
  @Prop() appearance: "Pink" | "Blue" = "Pink";
  @State() timer: NodeJS.Timeout;
  @Element() el: HTMLElement;
  @Watch("appearance")
  watchStyle() {
    if (this.appearance === "Pink") {
      this.defaultColor = "#f29cb2";
      this.defaultHoverColor = "#f185a0";
      this.defaultActiveColor = "#ce5d79";
      this.defaultBorderColor = "#f1f1f1";
    }
    if (this.appearance === "Blue") {
      this.defaultColor = "#3493cd";
      this.defaultHoverColor = "#abd6f3";
      this.defaultActiveColor = "#89c7f0";
      this.defaultBorderColor = "#f1f1f1";
    }
  }
  @Watch("defaultColor")
  watchDefaultColor() {
    this.changeAppearance();
  }
  @Watch("defaultHoverColor")
  watchDefaultHoverColor() {
    this.changeAppearance();
  }
  @Watch("defaultActiveColor")
  watchDefaultActiveColor() {
    this.changeAppearance();
  }
  @Watch("defaultBorderColor")
  watchDefaultBorderColor() {
    this.changeAppearance();
  }
  componentWillLoad() {}
  componentDidLoad() {
    // this.changeAppearance();
    // (window as any).changeStyle = (v: any) => {
    //   console.log(v, this.style);
    //   this.style = v;
    // };
  }
  @Method()
  async changeAppearance() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      // console.log("changeAppearance");
      const html = document.querySelector("html");

      let color = {};

      html
        .getAttribute("style")
        ?.split(";")
        ?.forEach((v) => {
          const arr = v?.split(":");
          arr[0].trim() && (color[arr[0].trim()] = arr[1].trim());
        });

      color = {
        ...color,
        ...{
          "--saki-default-color": this.defaultColor,
          "--saki-default-hover-color": this.defaultHoverColor,
          "--saki-default-active-color": this.defaultActiveColor,
          "--saki-defalut-border-color": this.defaultBorderColor,
        },
      };

      // 暂时没兼容已有style
      html.setAttribute(
        "style",
        Object.keys(color)
          .map((k) => {
            return k + ":" + color[k];
          })
          .join(";") + ";"
      );
    }, 10);
  }
  render() {
    return <div class={"saki-color"}></div>;
  }
}
