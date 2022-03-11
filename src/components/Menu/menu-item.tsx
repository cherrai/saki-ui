import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-menu-item",
  styleUrl: "menu.scss",
  shadow: true,
})
export class MenuItemComponent {
  @Prop() value: string = "";
  @Event() tap: EventEmitter;
  componentDidLoad() {}
  render() {
    return (
      <div
        onClick={() => {
          this.tap.emit();
        }}
        class={"saki-menu-item-component "}
      >
        <slot></slot>
      </div>
    );
  }
}
