import { Component, Element, h, Method, Prop } from "@stencil/core";

@Component({
  tag: "saki-tabs-nav-item",
  styleUrl: "tabs-nav-item.scss",
  shadow: false,
})
export class SakiTabsNavItemComponent {
  @Element() el: HTMLElement;

  @Prop() value: string = "";
  @Prop() badge: boolean = false;
  @Prop() badgeContent = "!";

  // private isActive = false;

  @Method()
  setActive(active: boolean) {
    // this.isActive = active;
    this.el.classList.toggle("active", active);
  }

  render() {
    return (
      <div class="saki-tabs-nav-item-component">
        <slot />
        {this.badge && <span class="nav-item-badge">{this.badgeContent}</span>}
      </div>
    );
  }
}
