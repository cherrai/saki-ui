import {
  Component,
  Event,
  EventEmitter,
  Method,
  Prop,
  State,
  Element,
  h,
  Watch,
} from "@stencil/core";
@Component({
  tag: "saki-call-mini-video",
  styleUrl: "mini-video.scss",
  shadow: false,
})
export class CallMiniVideoComponent {
  @State() video: HTMLVideoElement;
  @State() stream: MediaStream;
  @Prop({ mutable: true }) mediaType: "audio" | "video" = "video";
  @Prop({ mutable: true }) frameRate: number = 0;
  @Prop({ mutable: true }) avatar: string = "";
  @Prop({ mutable: true }) nickname: string = "";
  @Prop({ mutable: true }) width: number = 0;
  @Prop({ mutable: true }) height: number = 0;
  @Prop({ mutable: true }) jitter: number = 0;
  @Prop({ mutable: true }) speaker: boolean = false;
  @Prop({ mutable: true }) status: "success" | "wait" = "success";
  @Prop({ mutable: true }) streamType: "local" | "remote" = "local";

  @Prop({ mutable: true }) waitText: string = "Awaiting response...";
  @Element() el: HTMLElement;
  @Event() tap: EventEmitter;
  @Watch("speaker")
  watchSpeakerFunc() {
    if (this.speaker) {
      console.log(this.stream.id, "正在说话");
    }
  }
  @Method()
  async setSrcObject(stream: MediaStream) {
    this.stream = stream;
    // console.log(this.stream);
    const videoEl: any = this.video;
    if (videoEl["srcObject"]?.id !== stream?.id) {
      // console.log("getstream", stream);
      videoEl["srcObject"] = stream;
    } else {
      // console.log(videoEl, videoEl?.paused, videoEl["srcObject"], stream);
    }
  }

  formatStreamTypeText(type: "local" | "remote") {
    switch (type) {
      case "local":
        return "Local";

      case "remote":
        return "Remote";

      default:
        break;
    }
  }
  componentDidLoad() {}
  render() {
    return (
      <div
        onClick={() => {
          this.tap.emit();
        }}
        style={{
          width: "var(--saki-call-mini-video-width)",
          height:
            "calc(var(--saki-call-mini-video-width) * " +
            this.height +
            " / " +
            this.width +
            ")",
        }}
        class={"saki-call-mini-video-component"}
      >
        <div class={"call-userinfo"}>
          <img class={"avatar"} src={this.avatar} alt="" />
          <span class={"nickname text-elipsis"}>{this.nickname}</span>
        </div>
        <video 
          ref={(e) => {
            !this.video &&
              e &&
              ((this.video = e),
              (this.video.onerror = (err) => {
                console.log("sakiui-video", err);
              }));
          }}
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

            {this.streamType === "local" ? (
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
