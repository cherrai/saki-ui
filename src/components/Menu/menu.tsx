import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
} from "@stencil/core";

@Component({
  tag: "saki-menu",
  styleUrl: "menu.scss",
  shadow: true,
})
export class MenuComponent {
  @State() left: number = 0;
  @State() top: number = 0;

  @Prop() direction: "Top" | "Bottom" = "Bottom";

  @Event() selectvalue: EventEmitter;
  @Element() el: HTMLElement;
  componentDidLoad() {
    const list: NodeListOf<HTMLSakiMenuItemElement> =
      this.el.querySelectorAll("saki-menu-item");
    list.forEach((item, index) => {
      item.addEventListener("tap", () => {
        this.selectvalue.emit({
          value: item.value,
          index,
        });
      });
    });
  }
  render() {
    return (
      <div class={"saki-menu-component "}>
        <slot></slot>
      </div>
    );
  }
}
