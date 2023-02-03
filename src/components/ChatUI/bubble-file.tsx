import {
  Component,
  Event,
  Element,
  h,
  EventEmitter,
  Prop,
  Watch,
} from "@stencil/core";
// import * as nyanyalog from "nyanyajs-log";
// import "moment/dist/locale/zh-cn";
@Component({
  tag: "saki-chat-bubble-file",
  styleUrl: "bubble.scss",
  shadow: false,
})
export class ChatBubbleFileComponent {
  @Prop() type: "Audio" | "Image" | "Video" | "File" = "Image";
  @Prop() src: string = "";
  @Prop() fileWidth: number = 0;
  @Prop() fileHeight: number = 0;
  @Prop() width: string = "100%";
  @Prop() maxWidth: number = 120;
  @Prop() name: string = "";
  //  unit byte
  @Prop() size: number = 0;
  @Prop() expirationTime: number = -1;
  @Prop() progress: number = 0;
  @Prop() suffix: number = 0;
  @Prop() time: number = 0;
  @Event() tap: EventEmitter;
  @Event() download: EventEmitter;
  @Event() load: EventEmitter;
  @Element() el: HTMLElement;
  @Watch("progress")
  watchProgress() {
    if (this.progress >= 1) {
      setTimeout(() => {
        this.el.querySelector("video")?.load();
      }, 300);
    }
  }

  componentDidLoad() {
    // console.log("componentDidLoad", this);
  }
  formartSize() {
    if (this.size > 1024 * 1024 * 1024) {
      return ((this.size / 1024) * 1024 * 1024).toFixed(2) + "Gb";
    }
    if (this.size > 1024 * 1024) {
      return ((this.size / 1024) * 1024).toFixed(2) + "Mb";
    }
    if (this.size > 1024) {
      return (this.size / 1024).toFixed(2) + "Kb";
    }
    return this.size.toFixed(2) + "b";
  }
  formartExpirationTime() {
    const time = this.expirationTime - Math.floor(new Date().getTime() / 1000);

    if (time > 3600 * 24 * 1) {
      return "within " + Math.floor(time / (3600 * 24)) + " days";
    }
    if (time > 3600 * 1) {
      return "within " + Math.floor(time / (3600 * 1)) + " hours";
    }
    if (time > 60) {
      return "within " + Math.floor(time / 60) + " mins";
    }
    if (time > 0) {
      return "within " + Math.floor(time / 1) + " sec";
    }
    return "expired";
  }
  render() {
    // console.log(
    //   "bubbbbb",
    //   this.fileWidth > this.fileHeight
    //     ? `calc(${this.maxWidth} * ${this.fileWidth}px / ${this.fileHeight}px)`
    //     : "0px"
    // );

    // console.log("getPixel", this.getPixel());
    return (
      <div
        style={{
          "--saki-chat-bubble-file-width": this.width,
          "--saki-chat-bubble-file-max-width": this.maxWidth + "px",
        }}
        class={"saki-chat-bubble-file-component "}
      >
        {this.type === "Image" ? (
          <div
            class={"cbf-image"}
            data-file-width={this.fileWidth}
            data-file-height={this.fileHeight}
            // style={{
            //   height:
            //     this.fileWidth > this.fileHeight
            //       ? `calc(${this.maxWidth} * ${this.fileHeight} / ${this.fileWidth})`
            //       : `calc(${this.maxWidth} * ${this.fileHeight} / ${this.fileWidth})`,
            // }}
          >
            <saki-images
              maxPixel={this.maxWidth}
              fileWidth={this.fileWidth}
              fileHeight={this.fileHeight}
              src={this.src}
            ></saki-images>
            {/* <img
              onLoad={(e) => {
                console.log("eeeeeeee", e);
                setTimeout(() => {
                  this.el
                    .querySelector(".cbf-image")
                    .setAttribute("data-load", "true");
                }, 100);
                this.load.emit();
              }}
              src={this.src}
            ></img> */}
          </div>
        ) : this.type === "File" ? (
          <div class={"cbf-file"}>
            <div class={"cbf-f-icon"}>
              {/* <i class="icon fa fa-file"></i> */}
              <svg
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1007"
              >
                <path
                  d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2z"
                  p-id="1008"
                ></path>
              </svg>
            </div>
            <div class={"cbf-f-right"}>
              <div class={"cbf-f-r-top"}>{this.name}</div>
              <div class={"cbf-f-r-bottom"}>
                <div class={"cbf-f-r-b-size"}>{this.formartSize()}</div>
                {this.expirationTime > 0 ? (
                  <span class={"cbf-f-r-b-tag"}>-</span>
                ) : (
                  ""
                )}
                {this.expirationTime > 0 ? (
                  <div class={"cbf-f-r-b-expiration"}>
                    {this.formartExpirationTime()}
                  </div>
                ) : (
                  ""
                )}
                {this.progress < 1 ? (
                  <span class={"cbf-f-r-b-tag"}>-</span>
                ) : (
                  ""
                )}
                {this.progress < 1 ? (
                  <div class={"cbf-f-r-b-progress"}>
                    {Math.floor(this.progress * 100)}%
                  </div>
                ) : (
                  ""
                )}
                {this.progress >= 1 ? (
                  <span class={"cbf-f-r-b-tag"}>-</span>
                ) : (
                  ""
                )}
                {this.progress >= 1 ? (
                  <div
                    onClick={() => {
                      this.download.emit();
                    }}
                    class={"cbf-f-r-b-download"}
                  >
                    Download
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : this.type === "Video" ? (
          <div class={"cbf-video"}>
            <video src={this.src} controls></video>
          </div>
        ) : this.type === "Audio" ? (
          <div>Audio</div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
