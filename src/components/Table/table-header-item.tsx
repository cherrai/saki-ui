import {
  Component,
  h,
  Event,
  EventEmitter,
  Prop,
  Watch,
  Element,
  Method,
} from "@stencil/core";

// 暂时弃用
@Component({
  tag: "saki-table-header-item",
  styleUrl: "table.scss",
  shadow: true,
})
export class TableHeaderItemComponent {
  // @State() startX: number = 0;
  // @State() moveX: number = 0;
  // @Prop() startDrag = false;
  // @Prop() isResize = false;
  @Prop() prop: string = "";
  @Prop({
    mutable: true,
  })
  tempWidth: string = "";
  @Prop() width: string = "44px";
  @Prop() height: string = "100%";
  @Element() el: HTMLElement;
  @Event() drag: EventEmitter;
  @Watch("width")
  watchWidth() {
    this.tempWidth = this.width;
    if (this.width === "auto") {
      this.el.style.flex = "1";
    }
  }
  componentWillLoad() {
    this.tempWidth = this.width;
    if (this.width === "auto") {
      this.el.style.flex = "1";
    }
  }
  @Method()
  async setWidth(w: string) {
    this.tempWidth = w;
  }
  render() {
    return (
      <div
        style={{
          width: this.tempWidth,
          height: this.height,
        }}
        class={"saki-table-header-item-component "}
      >
        {/* <div
          // onMouseDown={(e) => {
          //   console.log(e.x);
          //   this.drag.emit({
          //     prop: this.prop,
          //     x: e.x,
          //     y: e.y,
          //     width: this.tempWidth,
          //     index: this.index,
          //   });
          //   this.startDrag = true;
          //   // this.startX = e.x;
          //   // e.preventDefault();
          // }}
          // draggable={true}
          // onDragStart={(e) => {
          //   console.log("onDragStart", e.x);
          //   e.dataTransfer.effectAllowed = "move";
          //   e.dataTransfer.dropEffect = "move";
          //   // document.body.style.cursor = "ew-resize";
          //   // e.preventDefault()
          //   this.startX = e.x;
          // }}
          // onDragEnd={(e) => {
          //   console.log("onDragEnd", e);
          //   e.x && (this.moveX = e.x - this.startX);
          //   console.log(this.moveX);
          //   // document.body.style.cursor = "";
          //   // e.preventDefault()
          //   e.dataTransfer.dropEffect = "move";
          //   e.dataTransfer.effectAllowed = "move";
          // }}
          // onDrag={(e) => {
          //   // console.log(e.x);
          //   e.x && (this.moveX = e.x - this.startX);
          //   // console.log("this.endX", e, this.moveX);
          //   console.log(this.moveX);
          //   e.dataTransfer.dropEffect = "move";
          //   e.dataTransfer.effectAllowed = "move";
          // }}
          class={"sthi-drag " + (this.startDrag ? "active" : "")}
        ></div> */}
        <slot></slot>
      </div>
    );
  }
}
