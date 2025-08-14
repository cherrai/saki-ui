import { Component, h, Prop, State, Watch, Element } from "@stencil/core";

@Component({
  tag: "saki-viewer",
  styleUrl: "viewer.scss",
  shadow: true,
})
export class ViewerComponent {
  static isAddJs = false;
  // 解决刚开始是关闭状态的动画问题
  lg: any;
  @State() load: boolean = false;
  @Element() el: HTMLDivElement;
  // @Prop() animation: string = "SlideInRight";
  @Prop() className: string = "";
  // @Prop() animationEnd: boolean = false;
  @Prop() animationDuration: number = 300;
  // @Prop() visibleStartStyle: string = "";
  // @Prop() visibleEndStyle: string = "";
  // @Prop() hiddenStartStyle: string = "";
  // @Prop() hiddenEndStyle: string = "";
  @Prop() in: boolean = false;
  // @Prop() full: boolean = false;
  timer: NodeJS.Timeout;

  // @State() isVisible: boolean = false;

  @Watch("in")
  watchIn() {
    // console.log("this.in", this.in);
  }
  componentWillLoad() {
    this.addJS();
    // this.isVisible = this.in;
  }
  componentDidLoad() {
    if ((window as any).lightGallery) {
      this.init();
      return;
    }
    const timer = setInterval(() => {
      if ((window as any).lightGallery) {
        this.init();
        clearInterval(timer);
      }
    }, 1000);
  }
  init() {
    const el = this.el.querySelector(".saki-gallery");
    this.loadLightGallery(el);
    new MutationObserver(() => {
      console.log("loadLightGallery MutationObserver");
      this.lg.refresh();
    }).observe(el, {
      attributes: false,
      childList: true,
      subtree: true,
    });
  }
  loadLightGallery(el: Element) {
    const lightGallery = (window as any).lightGallery;

    this.lg = lightGallery(el, {
      plugins: [
        (window as any).lgRotate,
        (window as any).lgThumbnail,
        (window as any).lgZoom,
        (window as any).lgFullscreen,
        (window as any).lgVideo,
        // (window as any).lgThumbnail,
      ], // 启用缩放、全屏、视频支持
      selector: ".saki-viewer, a",
      // selectWithin: ".row", // 限定在 .row 内搜索
      // selector: ".item a", // 选择 .row 内的 .item a 元素
      mode: "lg-fade", // 动画效果
      speed: 500, // 过渡时间
      download: true, // 禁用下载按钮
      videojs: true, // 启用 Video.js 兼容
      rotate: true,
      rotateLeft: true,
      rotateRight: true,
      flipHorizontal: true,
      flipVertical: true,
      rotateSpeed: 400,
      thumbnail: true,
      animateThumb: true,
      thumbWidth: 100,
      thumbHeight: 100,
      // thumbHeight: "auto",
      thumbMargin: 5,
      mobileSettings: {
        showCloseIcon: true, // 启用移动端的关闭按钮
        controls: false, // 可选：启用上一页/下一页控件
        download: true, // 可选：禁用下载按钮
      },

      // animateThumb: false,
      // zoomFromOrigin: false,
      // allowMediaOverlap: true,
      // toggleThumb: true,
    });
    console.log("loadLightGallery", this.lg);
  }
  addJS() {
    if (ViewerComponent.isAddJs) return;

    const styleUrls = [
      "https://cdn.jsdelivr.net/npm/lightgallery/css/lightgallery.css",
      "https://cdn.jsdelivr.net/npm/lightgallery/css/lg-rotate.css",
      "https://cdn.jsdelivr.net/npm/lightgallery/css/lg-thumbnail.css",
    ];

    styleUrls.forEach((v) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = v;
      document.body.appendChild(link);
    });

    const scriptUrls = [
      "https://cdn.jsdelivr.net/npm/lightgallery/lightgallery.umd.js",
      "https://cdn.jsdelivr.net/npm/lightgallery/plugins/zoom/lg-zoom.umd.js",
      "https://cdn.jsdelivr.net/npm/lightgallery/plugins/fullscreen/lg-fullscreen.umd.js",
      "https://cdn.jsdelivr.net/npm/lightgallery/plugins/video/lg-video.umd.js",
      "https://cdn.jsdelivr.net/npm/lightgallery/plugins/rotate/lg-rotate.umd.js",
      "https://cdn.jsdelivr.net/npm/lightgallery/plugins/thumbnail/lg-thumbnail.umd.js",
    ];

    scriptUrls.forEach((v) => {
      const script = document.createElement("script");
      script.src = v;

      document.body.appendChild(script);
    });

    ViewerComponent.isAddJs = true;
  }
  render() {
    return (
      <div class={"saki-viewer-component"}>
        <slot></slot>
      </div>
    );

    // return (
    //   <div>
    //     <div id="gallery">
    //       <a href="image1.jpg">
    //         <img src="image1.jpg" alt="Image 1" />
    //       </a>
    //       <a href="image2.jpg">
    //         <img src="image2.jpg" alt="Image 2" />
    //       </a>

    //       {/* <a
    //         data-src="video.mp4"
    //         data-poster="video-thumbnail.jpg"
    //         class="video-item"
    //       >
    //         <img src="video-thumbnail.jpg" alt="Video" />
    //       </a>

    //       <a data-src="https://www.youtube.com/watch?v=ScMzIvxBSi4">
    //         <img src="youtube-thumbnail.jpg" alt="YouTube Video" />
    //       </a> */}
    //     </div>
    //   </div>
    //   // <div
    //   //   class={
    //   //     "saki-transition-component " +
    //   //     this.animation +
    //   //     (this.isVisible ? " visible " : " hidden ") +
    //   //     (this.full ? " full " : "")
    //   //   }
    //   // >
    //   //   {/* {this.visible ? "true" : "false"} */}
    //   //   {/* <div
    //   //     // onTransitionEndCapture={(e) => {
    //   //     //   console.log("onTransitionEnd", e);
    //   //     //   this.animationEnd = true;
    //   //     //   this.isVisible = this.visible;
    //   //     // }}
    //   //     class={"ra-main"}
    //   //   >
    //   //   </div> */}
    //   // </div>
    // );
  }
}
