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
// import 'cropperjs/dist/cropper.css';
// import Cropper from "cropperjs";

@Component({
  tag: "saki-images",
  styleUrls: ["images.scss"],
  shadow: true,
})
export class ImagesComponent {
  @Prop() src: string = "";
  @Prop() defaultSrc: string = "";
  @Prop() defaultBackgroundColor: string = "";
  @Prop() width: string = "auto";
  @Prop() height: string = "auto";
  @Prop() fileWidth: number = 0;
  @Prop() fileHeight: number = 0;
  @Prop() maxPixel: number = 0;
  @Prop() border: string = "";
  @Prop() borderRadius: string = "";
  @Prop() padding: string = "";
  @Prop() margin: string = "";
  @Prop() objectFit: string = "cover";

  @State() loaded: boolean = false;

  @Event() tap: EventEmitter;
  @Event() output: EventEmitter;
  @Event() cancel: EventEmitter;
  @Element() el: HTMLElement;
  @Watch("src")
  watchSrc() {
    console.log("watchSrc", this.src);
    this.loaded = false;
  }
  componentDidLoad() {}

  getPixel(width: number, height: number, maxPixel: number) {
    if (!this.maxPixel || !this.fileWidth || !this.fileHeight) {
      return {
        width: 0,
        height: 0,
      };
    }
    if (width > height) {
      if (maxPixel > width) {
        return {
          width,
          height,
        };
      } else {
        return {
          width: maxPixel,
          height: (maxPixel * height) / width,
        };
      }
    } else {
      if (maxPixel > height) {
        return {
          width,
          height,
        };
      } else {
        return {
          width: (maxPixel * width) / height,
          height: maxPixel,
        };
      }
    }
  }
  render() {
    const pixel = this.getPixel(this.fileWidth, this.fileHeight, this.maxPixel);
    return (
      <div
        style={{
          width: pixel.width ? pixel.width + "px" : this.width,
          height: pixel.height ? pixel.height + "px" : this.height,
          ...["margin", "padding", "border", "borderRadius"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          "--saki-images-width": pixel.width ? pixel.width + "px" : this.width,
          "--saki-images-default-background-color": this.defaultBackgroundColor,
        }}
        class={"saki-images-component " + (this.loaded ? "load" : "")}
      >
        {!this.defaultSrc && !this.src ? (
          <div class={"images-default-bg"}></div>
        ) : (
          ""
        )}
        <img
          style={{
            ...["objectFit"].reduce(
              (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
              {}
            ),
          }}
          onLoad={() => {
            this.loaded = true;
          }}
          src={this.src || this.defaultSrc}
          alt="avatar"
        />
        {this.src ? (
          <div class={"loading-wrap"}>
            <div class="loading">
              <div class="bullet"></div>
              <div class="bullet"></div>
              <div class="bullet"></div>
              <div class="bullet"></div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
