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
  tag: "saki-table-column",
  styleUrl: "table.scss",
  shadow: true,
})
export class TableColumnComponent {
  @State() dragIndex = -1;
  @State() dragStartX = -1;
  @State() dragWidth = 0;
  @Prop() value: boolean = false;
  @Prop() width: string = "44px";
  @Prop() height: string = "40px";
  @Prop() padding: string = "0px";
  @Prop() margin: string = "0px";
  @Prop() border: string = "";
  @Prop() borderBottom: string = "";
  @Prop() borderTop: string = "";
  @Prop() borderRight: string = "";
  @Prop() borderLeft: string = "";
  @Prop() coreWidth: string = "18px";
  @Prop() backgroundColor: string = "";
  @Prop() backgroundHoverColor: string = "";
  @Prop() backgroundActiveColor: string = "";
  @State() timer?: NodeJS.Timeout;
  @State() hide: boolean = true;
  @State() list: HTMLSakiTableHeaderItemElement[] = [];
  @Element() el: HTMLElement;
  @Event() change: EventEmitter;
  @Watch("value")
  watchVisible() {}
  componentDidLoad() {}

  watchList() {
    this.list = [];
    this.el.querySelectorAll("saki-table-header-item").forEach((v) => {
      this.list.push(v);
    });
  }

  watchEl() {}
  render() {
    return (
      <div
        style={{
          height: this.height,
          "--saki-background-color": this.backgroundColor,
          "--saki-background-hover-color": this.backgroundHoverColor,
          "--saki-background-active-color": this.backgroundActiveColor,
          ...[
            "margin",
            "padding",
            "border",
            "borderTop",
            "borderBottom",
            "borderRight",
            "borderLeft",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-table-column-component"}
      >
        {/* <div class={"sth-wrap"}> */}
        <slot></slot>
        {/* </div> */}
      </div>
    );
  }
}
