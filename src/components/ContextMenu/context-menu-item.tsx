import { Component, h, Prop, Event, EventEmitter, Method } from "@stencil/core";

// import { debounce } from "../../plugins/methods";
// import { prefix } from "../../../stencil.config";
// console.log(prefix + "-tabs");
@Component({
  tag: "saki-context-menu-item",
  styleUrl: "context-menu.scss",
  shadow: true,
})
export class ContextMenuItemComponent {
  index = -1;
  @Prop() width: string = "";
  @Prop() padding: string = "10px 12px";
  @Prop() fontSize: string = "";
  @Prop() color: string = "";
  @Prop() hide: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() value: string = "";
  @Event({
    eventName: "tap",
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tap: EventEmitter;
  componentWillLoad() {}
  @Method()
  async setIndex(i: number) {
    this.index = i;
  }
  render() {
    return (
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          return false;
        }}
        onClick={() => {
          console.log(1, !this.disabled);
          !this.disabled &&
            this.tap.emit({
              index: this.index,
              value: this.value,
            });
        }}
        style={{
          color: this.color || (this.disabled ? "#999" : "#000"),
          ...["padding", "fontSize"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          ...(this.width ? { width: this.width } : {}),
        }}
        class={
          "saki-context-menu-item-component " +
          (this.disabled ? "disabled " : "") +
          (this.hide ? "hide " : "")
        }
      >
        <slot></slot>
      </div>
    );
  }
}
