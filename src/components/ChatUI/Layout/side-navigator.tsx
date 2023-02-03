import {
  Component,
  Event,
  Element,
  h,
  EventEmitter,
  Prop,
  State,
  Watch,
} from "@stencil/core";

@Component({
  tag: "saki-chat-layout-side-navigator",
  styleUrl: "side-navigator.scss",
  shadow: true,
})
export class ChatLayoutSideNavigatorComponent {
  @Prop() expand = true;
  @State() navWidth = "220px";
  @State() activeMenuItemId = "";
  @Element() el: HTMLDivElement;
  menuItems: NodeListOf<HTMLSakiChatLayoutSideNavigatorMenuItemElement>;

  @Event() change: EventEmitter;
  @Event() expandStatus: EventEmitter;

  componentWillLoad() {
    const observer = new MutationObserver(this.watchDom.bind(this));
    this.watchDom();
    // 以上述配置开始观察目标节点
    observer.observe(this.el, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }
  tapFunc = (e: any) => {
    this.activeMenuItemId = e.target.id;
    // this.menuItems.forEach((v) => {
    //   v.active = v.id === this.activeMenuItemId;
    // });
    this.change.emit(e.detail);
  };
  watchDom() {
    this.menuItems = this.el.querySelectorAll(
      "saki-chat-layout-side-navigator-menu-item"
    );
    this.navWidth = this.expand ? "220px" : "68px";
    this.menuItems.forEach((v) => {
      v.expand = this.expand;
      v.removeEventListener("tap", this.tapFunc);
      v.addEventListener("tap", this.tapFunc);
    });
  }
  render() {
    return (
      <div
        style={{
          width: this.navWidth,
        }}
        class={
          "saki-chat-layout-side-navigator-component " +
          (this.expand ? "expand" : "")
        }
      >
        <div class="sn-top">
          <div class="sn-t-menu">
            <saki-button
              onTap={() => {
                this.expand = !this.expand;
                this.navWidth = this.expand ? "220px" : "68px";
                this.expandStatus.emit(this.expand);
                this.menuItems.forEach((v) => {
                  v.expand = this.expand;
                });
              }}
              width="40px"
              height="40px"
              type="CircleIconGrayHover"
            >
              <svg
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2528"
                fill="#999"
                width="18"
                height="18"
              >
                <path
                  d="M950.857143 768l0 73.142857q0 14.857143-10.857143 25.714286t-25.714286 10.857143l-804.571429 0q-14.857143 0-25.714286-10.857143t-10.857143-25.714286l0-73.142857q0-14.857143 10.857143-25.714286t25.714286-10.857143l804.571429 0q14.857143 0 25.714286 10.857143t10.857143 25.714286zm0-292.571429l0 73.142857q0 14.857143-10.857143 25.714286t-25.714286 10.857143l-804.571429 0q-14.857143 0-25.714286-10.857143t-10.857143-25.714286l0-73.142857q0-14.857143 10.857143-25.714286t25.714286-10.857143l804.571429 0q14.857143 0 25.714286 10.857143t10.857143 25.714286zm0-292.571429l0 73.142857q0 14.857143-10.857143 25.714286t-25.714286 10.857143l-804.571429 0q-14.857143 0-25.714286-10.857143t-10.857143-25.714286l0-73.142857q0-14.857143 10.857143-25.714286t25.714286-10.857143l804.571429 0q14.857143 0 25.714286 10.857143t10.857143 25.714286z"
                  p-id="2529"
                ></path>
              </svg>
            </saki-button>
          </div>
          <div class="sn-t-nav">
            <slot name="top"></slot>
          </div>
        </div>
        <div class="sn-bottom">
          <slot name="bottom"></slot>
        </div>
      </div>
    );
  }
}
