import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-menu-item-content",
  styleUrl: "menu.scss",
  shadow: true,
})
export class MenuItemComponent {
  @Prop() content: string = "";
  @Prop() label: string = "";
  componentDidLoad() {}
  render() {
    return (
      <div class={"saki-menu-item-content-component "}>
        <div class={"item-c-icon"}>
          <slot name="icon"></slot>
        </div>
        <div class={"item-c-main"}>
          <div class={"item-c-content"}>{this.content}</div>
          <div class={"item-c-label"}>{this.label}</div>
        </div>
      </div>
    );
  }
}
