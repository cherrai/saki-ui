import {
  Component,
  Event,
  Element,
  h,
  EventEmitter,
  Prop,
  State,
} from "@stencil/core";

@Component({
  tag: "saki-chat-layout-side-navigator",
  styleUrl: "side-navigator.scss",
  shadow: true,
})
export class ChatLayoutSideNavigatorComponent {
  @Prop() expand = true;
  @Prop() foreverExpand = false;
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
          (this.foreverExpand ? "expand" : this.expand ? "expand" : "")
        }
      >
        <div class="sn-top">
          <div class="sn-t-menu">
            <saki-button
              onTap={() => {
                if (!this.foreverExpand) {
                  this.expand = !this.expand;
                  this.navWidth = this.expand ? "220px" : "68px";
                  this.menuItems.forEach((v) => {
                    v.expand = this.expand;
                  });
                }
                this.expandStatus.emit(this.expand);
              }}
              width="40px"
              height="40px"
              type="CircleIconGrayHover"
            >
              <saki-icon color="#999" type="Menu"></saki-icon>
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
