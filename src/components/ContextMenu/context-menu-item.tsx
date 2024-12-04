import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  Method,
  Element,
  State,
} from "@stencil/core";
import { contextMenuTimer, setContextMenuTimer } from "../../store/config";

// let contextMenuTimer: NodeJS.Timeout;

// const setContextMenuTimer = (t: NodeJS.Timeout) => {
//   contextMenuTimer = t;
// };
// import { debounce } from "../../plugins/methods";
// import { prefix } from "../../../stencil.config";
// console.log(prefix + "-tabs");
@Component({
  tag: "saki-context-menu-item",
  styleUrl: "context-menu.scss",
  shadow: true,
})
export class ContextMenuItemComponent {
  @Element() el: Element;
  @State() submenuEl: HTMLSakiContextMenuElement;
  @State() label: string = "";
  @State() parentId: string = "";

  index = -1;
  @Prop() width: string = "";
  @Prop() padding: string = "10px 12px";
  @Prop() fontSize: string = "";
  @Prop() color: string = "";
  @Prop() hide: boolean = false;
  @Prop() disabled: boolean = false;
  @State() showMenu: boolean = false;
  @Prop() active: boolean = false;
  @Prop() value: string = "";
  @Event({
    eventName: "tap",
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tap: EventEmitter;
  @Event()
  closeMenu: EventEmitter;
  @Event()
  onlyCloseMenu: EventEmitter;
  componentWillLoad() {}
  componentDidLoad() {}
  @Method()
  async setIndex(i: number) {
    this.index = i;
  }
  @Method()
  async setParentId(id: string) {
    this.parentId = id;
  }
  @Method()
  async show(label: string) {
    this.initSubMenu();
    this.label = label;
    // console.log("show", this.label);
  }
  @Method()
  async closeSubMenu() {
    this.submenuEl?.hide();
    this.showMenu = false;
  }
  initSubMenu() {
    this.showMenu = false;
    if (!this.submenuEl) {
      this.submenuEl = this.el.querySelector("saki-context-menu");
    }
    // console.log(
    //   "initSubMenu",
    //   this.submenuEl,
    //   this.el,
    //   this.el.querySelector("saki-context-menu")
    // );
    if (this.submenuEl) {
      // this.submenuEl.onclose = this.closeEvent.bind(this);
      this.submenuEl.removeEventListener("selectvalue", this.selectValueEvent);
      this.submenuEl.addEventListener("selectvalue", this.selectValueEvent);
      this.submenuEl.removeEventListener(
        "closeParentMenu",
        this.closeParentMenuFunc
      );
      this.submenuEl.addEventListener(
        "closeParentMenu",
        this.closeParentMenuFunc
      );
    }
  }
  closeParentMenuFunc = () => {
    console.log("closeParentMenuFunc");
    this.onlyCloseMenu.emit();
  };
  selectValueEvent = (e: any) => {
    // console.log("eeeeeeeee", e.detail);
    this.closeMenu.emit({
      index: this.index,
      value: this.value,
      values: e.detail.values,
    });
  };
  async clickFunc(close: boolean) {
    // console.log(1, !this.disabled);
    clearTimeout(contextMenuTimer);
    if (
      !this.disabled &&
      !this.showMenu &&
      window["contextMenuStatusMap"][this.parentId]
    ) {
      this.tap.emit({
        index: this.index,
        value: this.value,
        close,
      });

      if (this.submenuEl) {
        this.showMenu = true;
        const rect = this.el.getBoundingClientRect();
        const submenuCoreEl = document.body.querySelector(
          ".context-menu-content." + this.submenuEl.id
        );
        await this.submenuEl.show({
          x: rect.x,
          y: rect.y,
          label: "",
          showContent: false,
        });
        setTimeout(async () => {
          const submenuCoreElRect = submenuCoreEl.getBoundingClientRect();
          await this.submenuEl.show({
            x:
              rect.x + rect.width >=
              window.innerWidth - 30 - submenuCoreElRect.width
                ? rect.x - submenuCoreElRect.width
                : rect.x + rect.width,
            y:
              rect.y + rect.height >=
              window.innerHeight - 30 - submenuCoreElRect.height
                ? rect.y - submenuCoreElRect.height
                : rect.y,
            label: "",
          });
        }, 10);
      }
    }
  }
  render() {
    return (
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          return false;
        }}
        onClick={() => {
          this.clickFunc(!this.submenuEl);
        }}
        onMouseEnter={() => {
          clearTimeout(contextMenuTimer);
          !this.showMenu &&
            setContextMenuTimer(
              setTimeout(() => {
                this.clickFunc(false);
              }, 300)
            );
        }}
        class={
          "saki-context-menu-item-component " +
          (this.disabled ? "disabled " : "") +
          (this.hide ? "hide " : "") +
          (this.showMenu || this.active ? "active " : "")
        }
      >
        <div
          style={{
            ...(this.width ? { width: this.width } : {}),
          }}
          class={"mi-content"}
        >
          <div
            style={{
              color: this.color || (this.disabled ? "#999" : "#000"),
              ...["padding", "fontSize"].reduce(
                (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
                {}
              ),
            }}
            class={"mi-c-left"}
          >
            <slot></slot>
          </div>
          {this.submenuEl ? (
            <saki-icon
              width="12px"
              height="12px"
              color="#999"
              margin="0 8px"
              type="Right"
            ></saki-icon>
          ) : (
            ""
          )}
        </div>
        <div class={"mi-submenu"}>
          <slot name="SubMenu"></slot>
        </div>
      </div>
    );
  }
}
