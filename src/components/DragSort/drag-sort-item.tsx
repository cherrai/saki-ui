import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
} from "@stencil/core";

@Component({
  tag: "saki-drag-sort-item",
  styleUrl: "drag-sort.scss",
  shadow: false,
})
export class DragSortItemComponent {
  @Prop({ mutable: true }) dragIndex = -1;

  @Prop({ mutable: true }) dragId = "";
  @Prop({ mutable: true }) transform = "";
  @State() dragSelected: boolean = false;
  @State() active: boolean = true;

  @Prop() draggable: boolean = true;

  @Prop() direction: "Top" | "Bottom" = "Bottom";
  // @Prop() padding: string = "6px 0";

  @Event() selectvalue: EventEmitter;
  @Event() dragging: EventEmitter;
  @Event() draggend: EventEmitter;
  @Event() draggto: EventEmitter;
  @Element() el: HTMLElement;

  @Method()
  async setDragIndex(i: number) {
    this.dragIndex = i;
  }
  @Method()
  async getDragIndex() {
    return this.dragIndex;
  }
  @Method()
  async setDragId(dragId: string) {
    this.dragId = dragId;
  }
  @Method()
  async setActive(v: boolean) {
    this.active = v;
  }
  componentWillLoad() {}
  componentDidLoad() {}
  render() {
    return (
      <div
        // draggable={this.draggable}
        // onDragStart={(e: any) => {
        //   console.log("onDragStart", e);
        //   let el: HTMLSakiMenuItemElement;
        //   e.path.some((v: any) => {
        //     if (v.localName === "saki-drag-sort-item") {
        //       el = v;
        //     }
        //     if (v.localName === "saki-drag-sort") {
        //       v.setDraggingELement(el);
        //       return true;
        //     }
        //   });
        // }}
        // onDragEnd={() => {
        //   console.log("onDragEnd");
        //   this.draggend.emit();
        // }}
        // // onDrag={() => {
        // //   // console.log("onDrag", e);
        // //   this.dragging.emit();
        // // }}
        // onDragOver={() => {
        //   if (DragSortComponent.draggingELement.dragId == this.dragId) {
        //     this.dragSelected = true;
        //   }
        // }}
        // onDragLeave={(e: any) => {
        //   if (DragSortComponent.draggingELement.dragId == this.dragId) {
        //     this.dragSelected = false;
        //     // this.draggto.emit();
        //     let el: HTMLSakiMenuItemElement;
        //     e.path.some((v: any) => {
        //       if (v.localName === "saki-drag-sort-item") {
        //         el = v;
        //       }
        //       if (v.localName === "saki-drag-sort") {
        //         v.setDragTargetElement(el);
        //         return true;
        //       }
        //     });
        //   }
        // }}
        style={{
          transform: this.transform,
        }}
        class={
          "saki-drag-sort-item-component " +
          (this.dragSelected ? " dragSelected " : " ") +
          (this.active ? " active " : " ")
        }
      >
        <div class={"drag-placeholder"}></div>
        <div class={"drag-main"}>
          <slot></slot>
        </div>
      </div>
    );
  }
}
