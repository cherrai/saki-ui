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
  @Prop() width: string = "40px";
  @Prop() height: string = "40px";
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
    this.loaded = false;
  }
  componentDidLoad() {}
  render() {
    return (
      <div
        style={{
          ...[
            "width",
            "height",
            "margin",
            "padding",
            "border",
            "borderRadius",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          "--saki-images-width": this.width,
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
