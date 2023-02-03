import {
  Component,
  Event,
  Element,
  h,
  EventEmitter,
  State,
} from "@stencil/core";

@Component({
  tag: "saki-chat-layout-bottom-navigator",
  styleUrl: "bottom-navigator.scss",
  shadow: true,
})
export class ChatLayoutBottomNavigatorComponent {
  @State() navWidth = "220px";
  @State() activeMenuItemId = "";
  @Element() el: HTMLDivElement;
  menuItems: NodeListOf<HTMLSakiChatLayoutBottomNavigatorItemElement>;

  @Event() change: EventEmitter;

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
    this.menuItems.forEach((v) => {
      v.active = v.id === this.activeMenuItemId;
    });
    this.change.emit(e.detail);
  };
  watchDom() {
    this.menuItems = this.el.querySelectorAll(
      "saki-chat-layout-bottom-navigator-item"
    );
    this.menuItems.forEach((v) => {
      v.removeEventListener("tap", this.tapFunc);
      v.addEventListener("tap", this.tapFunc);
    });
  }
  render() {
    return (
      <div class={"saki-chat-layout-bottom-navigator-component"}>
        <slot></slot>
      </div>
    );
  }
}
