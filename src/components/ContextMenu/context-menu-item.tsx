import { Component, h, Event, EventEmitter } from "@stencil/core";

// import { debounce } from "../../plugins/methods";
// import { prefix } from "../../../stencil.config";
// console.log(prefix + "-tabs");
@Component({
  tag: "saki-context-menu-item",
  styleUrl: "context-menu.scss",
  shadow: true,
})
export class ContextMenuItemComponent {
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
          this.tap.emit();
        }}
        class={"saki-context-menu-item-component"}
      >
        <slot></slot>
      </div>
    );
  }
}
