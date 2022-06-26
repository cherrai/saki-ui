import { SFUStream } from "@nyanyajs/utils";
export const setStream = async function (stream: SFUStream) {
  this.stream?.id !== stream?.id && (this.stream = stream);

  const videoEl: any = this.video;

  if (stream?.stream && videoEl["srcObject"]?.id !== stream?.stream?.id) {
    videoEl["srcObject"] = stream.stream;

    // 处理本地
    this.streamType = this.stream.type;
    if (stream.type === "Local") {
      this.streamType = this.stream.type;
      this.avatar = this.stream.clientInfo.userInfo.avatar;
      this.nickname = this.stream.clientInfo.userInfo.nickname;

      this.width = this.stream.stats?.video?.frameWidth || 1920;
      this.height = this.stream.stats?.video?.frameHeight || 1080;
      this.frameRate = this.stream.stats.video.framesPerSecond;

      stream.stream.getTracks().forEach((track) => {
        // console.log(track);
        switch (track.kind) {
          case "audio":
            this.activeAudioDevice = track.label;
            break;
          case "video":
            this.activeVideoDevice = track.label;
            break;

          default:
            break;
        }
      });
    }
    // 处理远程
    if (stream.type === "Remote") {
      this.streamType = this.stream.type;
      this.avatar = this.stream.clientInfo.userInfo.avatar;
      this.nickname = this.stream.clientInfo.userInfo.nickname;

      this.speaker = this.stream.isSpeaker;

      this.width = this.stream.stats?.video?.frameWidth || 1920;
      this.height = this.stream.stats?.video?.frameHeight || 1080;
      this.jitter = Math.floor(
        (this.stream.stats.video.jitter ||
          this.stream.stats.audio.jitter ||
          0) * 1000
      );
      this.frameRate = this.stream.stats.video.framesPerSecond;

      stream.addEventListener("speaker", () => {
        this.speaker = this.stream.isSpeaker;
        // console.log("sfu onSpeaker", this.speaker, e.currentTarget);
      });
      const trackEvent = (track: MediaStreamTrack) => {
        if (!track.enabled) return;
        track.onmute = () => {
          // console.log(track);
          if (track.kind === "video") {
            // console.log("sfu onmute", e);
            videoEl["srcObject"] = undefined;
          }
        };
        track.onunmute = () => {
          // console.log("sfu onunmute", e);
          if (track.kind === "video") {
            // console.log("sfu onmute", e);
            videoEl["srcObject"] = this.stream.stream;
          }
        };
        track.onended = () => {
          // console.log("sfu onended", e);
          if (track.kind === "video") {
            // console.log("sfu onmute", e);
            videoEl["srcObject"] = undefined;
          }
        };
      };
      stream.stream.addEventListener("addtrack", (e) => {
        // console.log("addtrack", e.track);
        trackEvent(e.track);
      });
      stream.stream.getTracks().forEach((track) => {
        // console.log(track);
        trackEvent(track);
      });

      stream.startStats();
      stream.addEventListener("stats", () => {
        // console.log(this.stream.stats)
        this.width = this.stream.stats?.video?.frameWidth || 1920;
        this.height = this.stream.stats?.video?.frameHeight || 1080;
        this.jitter = Math.floor(
          (this.stream.stats.video.jitter ||
            this.stream.stats.audio.jitter ||
            0) * 1000
        );
        this.frameRate = this.stream.stats.video.framesPerSecond;
      });
    }

    if (stream.callType === "ScreenShare") {
      this.streamType = "ScreenShare";
    }
  }
};
