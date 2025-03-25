import { Component, Element, h, Prop, State, Watch } from "@stencil/core";
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
  @Prop() backgroundColor: string = "";
  @Prop() backgroundHoverColor: string = "";
  @Prop() backgroundActiveColor: string = "";
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
  @Prop() load: boolean = true;
  @Prop() lazyload: boolean = true;
  imgEl: HTMLElement;

  @State() toDisplayArea: boolean = false;
  @State() loaded: boolean = false;

  // @Event() click: EventEmitter;
  // @Event() output: EventEmitter;
  // @Event() cancel: EventEmitter;
  @Element() el: HTMLElement;
  @Watch("src")
  watchSrc() {
    // console.log("watchSrc", this.src);
    this.loaded = false;
  }
  componentDidLoad() {
    // console.log("this.lazyload", this.lazyload, this.src);
    // if (this.src.indexOf("c61baa0aa19cf71fae58b8f54afc4a60") >= 0) {
    //   console.log("saaaaaaaaaaaa", this.el, this.getParentElement(this.el));
    //   console.log(
    //     "saaaaaaaaaaaa",
    //     this.getParentElement(this.el).style.position
    //   );
    // }
    if (this.lazyload) {
      let options = {
        root: this.getParentElement(this.el),
        rootMargin: "0px",
        threshold: 1.0,
      };

      let observer = new IntersectionObserver((e) => {
        // if (this.src.indexOf("c61baa0aa19cf71fae58b8f54afc4a60") >= 0) {
        //   console.log("saaaaaaaaaaaa", e, e?.[0]?.target);
        // }
        if (e?.[0]?.intersectionRatio === 1 && !this.toDisplayArea) {
          // console.log("imagesssssss obs", e, e?.[0]?.intersectionRatio);
          this.toDisplayArea = true;
          observer.disconnect();
        }
      }, options);
      observer.observe(this.el);
    } else {
      this.toDisplayArea = true;
    }
  }

  getParentElement(el: HTMLElement) {
    if (!el?.parentElement) {
      return el?.localName !== "saki-scroll-view" ? document.body : el;
    }
    // if (this.src.indexOf("c61baa0aa19cf71fae58b8f54afc4a60") >= 0) {
    //   // console.log("saaaaaaaaaaaa 1", el);
    // }
    if (
      el?.parentElement.classList.contains("scrollBarDefault") ||
      el?.parentElement.classList.contains("scrollBarAuto") ||
      el?.parentElement.classList.contains("scrollBarHover") ||
      // el?.parentElement.classList.contains("model-content") ||
      el?.parentElement.classList.contains("saki-images-lazyload")
    ) {
      return el.parentElement;
    }
    return el?.parentElement?.localName === "saki-scroll-view"
      ? el
      : this.getParentElement(el.parentElement);
  }

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
          "--saki-images-background-color": this.backgroundColor,
          "--saki-images-background-hover-color": this.backgroundHoverColor,
          "--saki-images-background-active-color": this.backgroundActiveColor,
        }}
        class={"saki-images-component " + (this.loaded ? "load" : "")}
      >
        {!this.defaultSrc && !this.src ? (
          <div class={"images-default-bg"}></div>
        ) : (
          ""
        )}
        {(this.load && this.toDisplayArea) || this.loaded ? (
          <img
            ref={(e) => {
              this.imgEl = e;

              // console.log("e.scrollTop", e, e.offsetTop);
              // setTimeout(() => {
              //   console.log("e.scrollTop", e, e.getBoundingClientRect());
              // }, 3000);
            }}
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
        ) : (
          ""
        )}

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
