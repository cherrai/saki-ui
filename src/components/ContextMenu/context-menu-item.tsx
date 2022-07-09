import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";

// import { debounce } from "../../plugins/methods";
// import { prefix } from "../../../stencil.config";
// console.log(prefix + "-tabs");
@Component({
  tag: "saki-context-menu-item",
  styleUrl: "context-menu.scss",
  shadow: true,
})
export class ContextMenuItemComponent {
  @Prop() width: string = "";
  @Prop() padding: string = "";
  @Prop() fontSize: string = "";
  @Prop() color: string = "";
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
  render() {
    return (
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          return false;
        }}
        onClick={() => {
          !this.disabled && this.tap.emit();
        }}
        style={{
          ...["padding", "fontSize", "color"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          ...(this.width ? { width: this.width } : {}),
        }}
        class={
          "saki-context-menu-item-component " +
          (this.disabled ? "disabled" : "")
        }
      >
        <slot></slot>
      </div>
    );
  }
}
