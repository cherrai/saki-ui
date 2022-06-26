import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-page-container",
  styleUrl: "container.scss",
  shadow: true,
})
export class PageContainerComponent {
  @Prop() padding: string = "0px";
  @Prop() margin: string = "0px";
  @Prop() full: boolean = false;
  render() {
    return (
      <div
        style={{
          ...["padding", "margin"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-page-container-component " + (this.full ? "full" : "")}
      >
        <div class="pc-header">
          <slot name="header"></slot>
        </div>
        <div class="pc-main">
          <slot name="main"></slot>
        </div>
        <div class="pc-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    );
  }
}
