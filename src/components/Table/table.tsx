import {
  Component,
  State,
  h,
  Event,
  EventEmitter,
  Prop,
  Watch,
  Element,
} from "@stencil/core";

// 暂时弃用
@Component({
  tag: "saki-table",
  styleUrl: "table.scss",
  shadow: true,
})
export class TableComponent {
  @Prop() value: boolean = false;
  @Prop() width: string = "44px";
  @Prop() height: string = "22px";
  @Prop() coreWidth: string = "18px";
  @State() timer?: NodeJS.Timeout;
  @State() hide: boolean = true;
  @Element() el: HTMLElement;
  @Event() change: EventEmitter;
  @Watch("value")
  watchVisible() {}
  componentDidLoad() {
    const header = this.el.querySelector("saki-table-header");
    const columnItems = this.el.querySelectorAll("saki-table-column-item");
    header?.addEventListener("changesize", (e: any) => {
      console.log(e, columnItems);
      columnItems.forEach((v) => {
        v.setWidth(e.detail[v.prop] || "0px");
      });
    });
  }
  render() {
    return (
      <div
        onClick={() => {
          this.change.emit(!this.value);
        }}
        class={"saki-table-component "}
      >
        <div class={"st-header"}>
          <slot name="header"></slot>
        </div>
        <div class={"st-main"}>
          <slot name="main"></slot>
        </div>
      </div>
    );
  }
}
