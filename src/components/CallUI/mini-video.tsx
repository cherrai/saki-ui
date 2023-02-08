import {
  Component,
  Event,
  EventEmitter,
  Method,
  Prop,
  Element,
  h,
  Watch,
} from "@stencil/core";

import { SFUStream } from "@nyanyajs/utils/dist/ionSfuSdk";

import { setStream } from "./methods";

@Component({
  tag: "saki-call-mini-video",
  styleUrl: "mini-video.scss",
  shadow: false,
})
export class CallMiniVideoComponent {
  video: HTMLVideoElement;
  @Prop({ mutable: true }) stream: SFUStream;
  @Prop({ mutable: true }) streamId: string = "";
  @Prop({ mutable: true }) mediaType: "audio" | "video" = "video";
  @Prop({ mutable: true }) frameRate: number = 0;
  @Prop({ mutable: true }) avatar: string = "";
  @Prop({ mutable: true }) avatarText: string = "";
  @Prop({ mutable: true }) nickname: string = "";
  @Prop({ mutable: true }) width: string = "0px";
  @Prop({ mutable: true }) height: string = "0px";
  // 自己的不需要音量
  @Prop({ mutable: true }) volume: number = 1;
  @Prop({ mutable: true }) jitter: number = 0;
  @Prop({ mutable: true }) speaker: boolean = false;
  @Prop({ mutable: true }) status: "success" | "wait" = "success";
  @Prop({ mutable: true }) streamType: "Local" | "Remote" | "ScreenShare" =
    "Local";

  @Prop({ mutable: true }) waitText: string = "Awaiting response...";
  @Element() el: HTMLElement;
  @Event() tap: EventEmitter;
  @Event() changestreamid: EventEmitter;
  componentDidLoad() {
    if (this.streamId) {
      this.changestreamid.emit({
        streamId: this.streamId,
      });
    }
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
    console.log("this.stream", this.stream);
    this.setStream(this.stream);
  }
  @Watch("speaker")
  watchSpeakerFunc() {
    if (this.speaker) {
      console.log(this.stream, "正在说话");
    }
  }
  @Watch("volume")
  watchVolumeFunc() {
    this.video && (this.video.volume = this.volume);
  }
  @Method()
  async setStream(stream: SFUStream) {
    this.stream?.id === stream?.id && (this.stream = stream);
    setStream.call(this, stream);
  }
  @Method()
  async setSrcObject(stream: MediaStream) {
    // this.stream = stream;
    // console.log(this.stream);
    const videoEl: any = this.video;
    if (videoEl["srcObject"]?.id !== stream?.id) {
      // console.log("getstream", stream);
      videoEl["srcObject"] = stream;
    } else {
      // console.log(videoEl, videoEl?.paused, videoEl["srcObject"], stream);
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
      <div
        onClick={() => {
          this.tap.emit();
        }}
        style={{
          width: this.width,
          height: this.height,
          // "--saki-call-mini-video-width": this.width,
          // height:
          //   "calc(var(--saki-call-mini-video-width) * " +
          //   this.height +
          //   " / " +
          //   this.width +
          //   ")",
        }}
        class={"saki-call-mini-video-component"}
      >
        <div class={"call-speaker " + (this.speaker ? "active" : "")}>
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2934"
            width="200"
            height="200"
          >
            <path
              d="M196.2527 522.5953m-93.9781 0a4.497 4.497 0 1 0 187.9562 0 4.497 4.497 0 1 0-187.9562 0ZM421.8253 231.1523c0 0-11.264-11.7238-37.6372-11.7238-28.8601 0-52.2449 23.3848-52.2449 52.2449 0 31.7649 25.0567 45.9964 36.7595 49.6327 65.745 42.8617 109.3799 116.7569 109.3799 201.0802 0 84.4904-43.7812 158.511-109.7561 201.31-13.2493 4.2423-36.3833 15.0256-36.3833 49.5282 0 28.8601 23.3848 52.2449 52.2449 52.2449 26.3732 0 37.6372-11.7238 37.6372-11.7238 96.5695-61.1056 160.8934-168.5629 160.8934-291.2967S518.3948 292.2371 421.8253 231.1523zM646.2694 37.6999c0 0-16.9064-6.353-42.6527-6.353-34.6279 0-62.6939 28.0869-62.6939 62.6939 0 24.4924 49.6118 53.3525 66.6854 62.2759 87.855 88.6909 142.2942 210.526 142.2942 345.2343 0 147.9784-65.7868 280.2416-169.3571 370.2282-23.1758 9.1951-39.6225 31.744-39.6225 58.1799 0 34.607 28.066 62.6939 62.6939 62.6939 28.2749 0 45.5784-8.6309 45.5784-8.6309 137.8429-111.0727 226.095-281.2029 226.095-472.0222C875.2901 319.8642 785.7633 148.7099 646.2694 37.6999z"
              p-id="2935"
            ></path>
          </svg>
        </div>
        <div class={"call-userinfo"}>
          <saki-avatar
            width={"20px"}
            height={"20px"}
            borderRadius={"50%"}
            nickname={this.avatarText}
            src={this.avatar}
          ></saki-avatar>

          <span class={"nickname text-elipsis"}>{this.nickname}</span>
        </div>
        <video
          ref={(e) => {
            this.video = e;
            this.video.volume = this.volume;
          }}
          onError={(e) => {
            console.log("sakiui-video", e);
          }}
          data-volume={this.volume}
          data-stream-id={this.streamId}
          class="call-mini-video"
          autoplay
          playsinline
        ></video>
        {this.status === "success" ? (
          <div class={"call-signal"}>
            {/* <svg
              class="call-s-icon"
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

            {this.streamType !== "Remote" ? (
              <div class={"call-s-item"}>
                {this.formatStreamTypeText(this.streamType)}
              </div>
            ) : (
              <div class={"call-s-item"}>{this.jitter}ms</div>
            )}
          </div>
        ) : (
          <div class={"call-awaittext"}>{this.waitText}</div>
        )}
      </div>
    );
  }
}
