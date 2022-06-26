import {
  Component,
  Watch,
  Element,
  h,
  Prop,
  State,
  Method,
  Event,
  EventEmitter,
} from "@stencil/core";

import { SFUStream } from "@nyanyajs/utils";

import { setStream } from "./methods";
@Component({
  tag: "saki-call-main-video",
  styleUrl: "main-video.scss",
  shadow: false,
})
export class CallMainVideoComponent {
  @State() video: HTMLVideoElement;
  @Prop({ mutable: true }) stream: SFUStream;
  @Prop({ mutable: true }) streamId: string = "";
  @Prop({ mutable: true }) mediaType: "audio" | "video" = "video";
  @Prop({ mutable: true }) frameRate: number = 0;
  @Prop({ mutable: true }) width: number = 0;
  @Prop({ mutable: true }) height: number = 0;
  @Prop({ mutable: true }) avatar: string = "";
  @Prop({ mutable: true }) nickname: string = "";
  @Prop({ mutable: true }) jitter: number = 0;
  @Prop({ mutable: true }) speaker: boolean = false;
  @Prop({ mutable: true }) status: "success" | "wait" = "success";
  @Prop({ mutable: true }) streamType: "Local" | "Remote" | "ScreenShare" = "Local";
  @Prop({ mutable: true }) mediaDevices: MediaDeviceInfo[] = [];
  @Prop({ mutable: true }) activeAudioDevice: string = "";
  @Prop({ mutable: true }) activeVideoDevice: string = "";
  @Element() el: HTMLElement;
  @Event() changestreamid: EventEmitter;
  componentDidLoad() {
    this.video = this.el.querySelector(".call-main-video");

    if (this.streamId) {
      this.changestreamid.emit({
        streamId: this.streamId,
      });
    }
  }
  @Watch("mediaDevices")
  watchMediaDevicesFunc() {
    console.log("mediaDevices", JSON.parse(JSON.stringify(this.mediaDevices)));
  }
  @Watch("streamId")
  watchStreamIdFunc() {
    if (this.streamId) {
      this.changestreamid.emit({
        streamId: this.streamId,
      });
    }
  }
  @Watch("stream")
  watchStreamFunc() {
    this.stream && this.setStream(this.stream);
  }
  @Watch("speaker")
  watchSpeakerFunc() {
    if (this.speaker) {
      console.log(this.stream, "正在说话");
    }
  }
  @Method()
  async setMediaDevices(mediaDevices: MediaDeviceInfo[]) {
    this.mediaDevices = mediaDevices;
  }
  @Method()
  async setStream(stream: SFUStream) {
    setStream.call(this, stream);
  }
  @Method()
  async setSrcObject(stream: MediaStream) {
    // this.stream = stream;
    const videoEl: any = this.video;
    if (videoEl["srcObject"]?.id !== stream?.id) {
      videoEl["srcObject"] = stream;
    }
  }
  formatStreamTypeText(type: "Local" | "Remote" | "ScreenShare") {
    switch (type) {
      case "Local":
        return "Local";

      case "Remote":
        return "Remote";
      case "ScreenShare":
        return "Screen share";

      default:
        break;
    }
  }
  render() {
    return (
      <div class={"saki-call-main-video-component"}>
        <video
          // ref={(e) => {
          //   !this.video &&
          //     e &&
          //     ((this.video = e),
          //     (this.video.onerror = (err) => {
          //       console.log("sakiui-main-video", err);
          //     }));
          // }}
          class="call-main-video"
          autoplay
          playsinline
        ></video>
        {this.jitter ? (
          <div class={"video-signal"}>
            {/* <svg
              class="video-s-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5218"
              width="13"
              height="13"
            >
              <path
                d="M656.83456 355.1232h-91.3408c-11.264 0-20.31616 11.4688-20.31616 25.8048V860.16c0 14.29504 9.05216 25.8048 20.2752 25.8048h91.3408c11.264 0 20.31616-11.50976 20.31616-25.8048V380.928c0-14.336-9.05216-25.8048-20.2752-25.8048z m195.3792-192.18432h-91.3408c-11.22304 0-20.31616 11.55072-20.31616 25.8048V860.16c0 14.29504 9.09312 25.8048 20.31616 25.8048h91.3408c11.264 0 20.31616-11.50976 20.31616-25.8048V188.74368c0-14.25408-9.05216-25.8048-20.2752-25.8048z m-390.79936 378.42944h-91.3408c-11.264 0-20.31616 11.50976-20.31616 25.8048V860.16c0 14.29504 9.05216 25.8048 20.2752 25.8048h91.3408c11.264 0 20.35712-11.50976 20.35712-25.8048v-292.98688c0-14.29504-9.09312-25.8048-20.31616-25.8048zM171.78624 685.13792h91.3408c11.22304 0 20.31616 11.55072 20.31616 25.8048V860.16c0 14.29504-9.09312 25.8048-20.31616 25.8048h-91.3408c-11.22304 0-20.31616-11.50976-20.31616-25.8048v-149.17632c0-14.29504 9.09312-25.8048 20.31616-25.8048z"
                p-id="5219"
              ></path>
            </svg> */}
            {/* <div class={"video-s-ms"}>{this.jitter}ms</div> */}
          </div>
        ) : (
          ""
        )}
        {/* <div class={"video-user-info"}>
          {this.avatar ? (
            <div class={"v-i-item avatar"}>
              <img src={this.avatar} alt="" />
            </div>
          ) : (
            ""
          )}
          {this.nickname ? <div class={"v-i-item"}>{this.nickname}</div> : ""}
        </div> */}
        <div class={"video-parameter-info"}>
          {this.streamType ? (
            <div class={"v-i-item"}>
              {this.formatStreamTypeText(this.streamType)}
            </div>
          ) : (
            ""
          )}
          {this.frameRate ? (
            <div class={"v-i-item"}>{this.frameRate}fps</div>
          ) : (
            ""
          )}
          {this.width && this.height ? (
            <div class={"v-i-item"}>
              {this.width}×{this.height}
            </div>
          ) : (
            ""
          )}
          {this.jitter && this.streamType === "Remote" ? (
            <div class={"v-i-item"}>{this.jitter}ms</div>
          ) : (
            ""
          )}
          {/* <slot name="parameter-layout"></slot> */}
          {/* Video device not found */}
          {/* <div class={"v-i-item"}>40ms</div> */}
        </div>
      </div>
    );
  }
}
