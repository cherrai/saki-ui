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
import { MD5 } from "crypto-js";
import Sortable from "sortablejs";

// 用http://www.sortablejs.com/
// 以后有空了再改
@Component({
  tag: "saki-drag-sort",
  styleUrl: "drag-sort.scss",
  shadow: false,
})
export class DragSortComponent {
  static dragTargetELement: HTMLSakiDragSortItemElement;
  static draggingELement: HTMLSakiDragSortItemElement;

  activeIndex = -1;
  dragIndex = -1;
  dragElement: HTMLSakiDragSortItemElement;
  cloneElement: any;
  sortable: Sortable;
  // referenceElement: HTMLSakiDragSortItemElement;

  clone = {
    x: 0,
    y: 0,
  };
  diff = {
    x: 0,
    y: 0,
  };
  lastPointermove = {
    x: 0,
    y: 0,
  };

  tempSorts: {
    rect: DOMRect;
    i: number;
  }[] = [];

  @State() dragId = "";
  @State() dragTargetId = "";
  @State() dragTargetIndex: number = -1;
  @State() left: number = 0;
  @State() top: number = 0;
  rectList: {
    rect: DOMRect;
    el: HTMLSakiDragSortItemElement;
    // id: string;
  }[] = [];

  @Prop() dragged: boolean = false;

  @Prop() direction: "Top" | "Bottom" = "Bottom";
  @Prop() padding: string = "6px 0";

  @Event() selectvalue: EventEmitter;
  @Event() dragdone: EventEmitter;
  @Element() el: HTMLElement;

  // @Method()
  // async dragTo(el: HTMLSakiMenuItemElement) {
  //   console.log(el);
  // }
  componentWillLoad() {
    this.dragId = MD5((Math.random() * 100000000).toString()).toString();
  }
  componentDidLoad() {
    // const observer = new MutationObserver(this.watchDom.bind(this));
    this.watchDom();
    // 以上述配置开始观察目标节点
    // observer.observe(this.el, {
    //   attributes: false,
    //   childList: true,
    //   subtree: false,
    // });
  }
  draggend = (e: any) => {
    if (!DragSortComponent.dragTargetELement?.dragId) return;
    if (this.dragId === DragSortComponent.dragTargetELement.dragId) {
      this.dragdone.emit({
        originalIndex: e.target["dragIndex"],
        targetIndex:
          DragSortComponent.dragTargetELement.dragIndex >= 0
            ? DragSortComponent.dragTargetELement.dragIndex
            : e.target["dragIndex"],
      });
    }
  };
  @Method()
  async setDragTargetElement(v: HTMLSakiDragSortItemElement) {
    DragSortComponent.dragTargetELement = v;
  }
  @Method()
  async setDraggingELement(v: HTMLSakiDragSortItemElement) {
    DragSortComponent.draggingELement = v;
  }
  watchDom() {
    console.log("this.el", this.el);
    // .querySelector(".sortttt")
    // this.sortable && this.sortable.destroy();

    this.sortable = new Sortable(this.el, {
      animation: 150,
      sort: true,
      ghostClass: "saki-drag-sort-active-class",
      // 元素被选中
      // onChoose: function (/**Event*/ evt) {
      //   // evt.oldIndex; // 父元素索引
      //   console.log("onChoose", evt);
      // },

      // // 元素未被选中的时候（从选中到未选中）
      // onUnchoose: function (/**Event*/ evt) {
      //   // 与onEnd相同的属性
      //   // evt.oldIndex; // 父元素索引
      //   console.log("onUnchoose", evt);
      // },

      // // 开始拖拽的时候
      // onStart: function (/**Event*/ evt) {
      //   evt.oldIndex; // 父元素索引onStart
      //   console.log("onStart", evt);
      // },

      // 结束拖拽
      onEnd: (e) => {
        // var itemEl = evt.item; // dragged HTMLElement
        // evt.to; // target list
        // evt.from; // previous list
        // evt.oldIndex; // 元素在旧父元素中的旧索引
        // evt.newIndex; // 元素在新父元素中的新索引
        // evt.clone; // the clone element
        // evt.pullMode; // 当项目在另一个可排序:“克隆”如果克隆，“真”如果移动
        // console.log("onEnd", e);
        // console.log("onEnd", e.to);
        // console.log("onEnd", e.from);
        // console.log("onEnd", e.item);
        // console.log("onEnd", evt.oldIndex);
        // console.log("onEnd", evt.newIndex);
        this.dragdone.emit({
          originalIndex: e.oldIndex,
          targetIndex: e.newIndex,
        });
      },

      // // 元素从一个列表拖拽到另一个列表
      // onAdd: function (/**Event*/ evt) {
      //   // 与onEnd相同的属性
      // },

      // // 列表内元素顺序更新的时候触发
      // onUpdate: function (/**Event*/ evt) {
      //   // 与onEnd相同的属性
      // },

      // // 列表的任何更改都会触发
      // onSort: function (/**Event*/ evt) {
      //   // 与onEnd相同的属性
      //   console.log("onSort", evt);
      // },

      // // 元素从列表中移除进入另一个列表
      // onRemove: function (/**Event*/ evt) {
      //   // 与onEnd相同的属性
      // },
    });
    console.log(this.sortable);
    // console.log(sortable.destroy());
    // const list: NodeListOf<HTMLSakiDragSortItemElement> =
    //   this.el?.querySelectorAll("saki-drag-sort-item");

    // this.rectList = [];
    // list?.forEach((item, index) => {
    //   item.setDragIndex(index);
    //   item.setDragId(this.dragId);
    //   // console.log(item.getBoundingClientRect());
    //   this.rectList.push({
    //     rect: item.getBoundingClientRect(),
    //     el: item,
    //   });

    //   item.removeEventListener("draggend", this.draggend);
    //   item.addEventListener("draggend", this.draggend);
    // });
    // // console.log(this.rectList);
    // this.rectList.forEach((v) => {
    //   // console.log(v.el, v.rect);
    // });
    // this.tempSorts = this.rectList.map((v, i) => {
    //   return {
    //     rect: v.rect,
    //     i,
    //   };
    // });
  }
  getY(activeIndex: number) {
    // console.log(tempSorts, activeIndex);
    let top = this.rectList[0].rect.top;
    this.tempSorts.some((v, _) => {
      // console.log("aaaaa", activeIndex, v.i);
      if (activeIndex === v.i) {
        return true;
      }
      top += v.rect.height;
    });
    // console.log(top, this.rectList[activeIndex].rect.top);
    return top - this.rectList[activeIndex].rect.top;
  }
  end() {
    if (this.activeIndex < 0) {
      return;
    }
    // console.log("onPointerUp", v);

    console.log(this.activeIndex, this.dragIndex);
    this.dragdone.emit({
      originalIndex: this.activeIndex,
      targetIndex: this.dragIndex,
    });

    // console.log(this.dragElement, this.referenceElement);
    // this.el.insertBefore(this.dragElement, this.referenceElement);

    this.dragElement?.setActive(false);
    document.body.removeChild(this.cloneElement);
    this.cloneElement = null;
    this.activeIndex = -1;
    this.dragIndex = -1;
    this.dragElement = null;
    // for (const v of this.rectList) {
    //   // item.div.style.transition = "none";
    //   // v.el.transform = "translate(0px, 0px)";
    // }
  }
  render() {
    return <slot></slot>;
    // return (
    //   <div
    //     style={{
    //       padding: this.padding,
    //     }}
    //     // onPointerDown={async (e) => {
    //     //   // this.tempSorts = this.rectList.map((v, i) => {
    //     //   //   return {
    //     //   //     rect: v.rect,
    //     //   //     i,
    //     //   //   };
    //     //   // });
    //     //   // console.log("target", e?.target);
    //     //   // console.log("onPointerDown", e.composedPath());
    //     //   let el: HTMLSakiDragSortItemElement;
    //     //   this.lastPointermove.x = e.clientX;
    //     //   this.lastPointermove.y = e.clientY;
    //     //   e.composedPath()?.some((v: any) => {
    //     //     if (v.localName === "saki-drag-sort-item") {
    //     //       // console.log(v);
    //     //       el = v;
    //     //       return true;
    //     //     }
    //     //   });
    //     //   if (!el) return;
    //     //   // this.rectList.forEach((v) => {
    //     //   //   v.div.style.transition = "transform 150ms";
    //     //   // });
    //     //   // console.log(el, await el.getDragIndex());
    //     //   const i = await el?.getDragIndex();
    //     //   this.activeIndex = i >= 0 ? i : -1;
    //     //   this.dragIndex = i >= 0 ? i : -1;

    //     //   this.clone = {
    //     //     x: 0,
    //     //     y: 0,
    //     //   };
    //     //   this.diff = {
    //     //     x: 0,
    //     //     y: 0,
    //     //   };
    //     //   this.lastPointermove = {
    //     //     x: 0,
    //     //     y: 0,
    //     //   };

    //     //   this.clone.x = this.rectList[i].rect.left;
    //     //   this.clone.y = this.rectList[i].rect.top;

    //     //   this.cloneElement = el.cloneNode(true);
    //     //   this.dragElement = el;
    //     //   console.log("this.dragElement", this.dragElement);
    //     //   await this.dragElement.setActive(true);
    //     //   this.cloneElement.classList.add("saki-drag-sort-clone-item");
    //     //   this.cloneElement.style.transition = "none";
    //     //   this.cloneElement.style.transform =
    //     //     "translate(" + this.clone.x + "px, " + this.clone.y + "px)";
    //     //   document.body.appendChild(this.cloneElement);
    //     //   // console.log(this.activeIndex);
    //     // }}
    //     // onPointerMove={(e) => {
    //     //   if (this.activeIndex < 0) {
    //     //     return;
    //     //   }
    //     //   this.diff.x = e.clientX - this.lastPointermove.x;
    //     //   this.diff.y = e.clientY - this.lastPointermove.y;
    //     //   this.lastPointermove.x = e.clientX;
    //     //   this.lastPointermove.y = e.clientY;
    //     //   this.clone.x += this.diff.x;
    //     //   this.clone.y += this.diff.y;
    //     //   this.cloneElement.style.transform =
    //     //     "translate(" + this.clone.x + "px, " + this.clone.y + "px)";

    //     //   // console.log(
    //     //   //   "onPointerMove",
    //     //   //   e,
    //     //   //   e.composedPath(),
    //     //   //   e.clientX,
    //     //   //   e.clientY
    //     //   // );

    //     //   for (let i = 0; i < this.rectList.length; i++) {
    //     //     // 碰撞检测
    //     //     // if (!this.rectList?.[i]?.el?.draggable) {
    //     //     //   // this.dragIndex = this.activeIndex;
    //     //     //   continue;
    //     //     // }
    //     //     // console.log(this.rectList?.[i]?.el?.draggable);
    //     //     if (
    //     //       this.dragIndex !== i &&
    //     //       this.rectList?.[i]?.el?.draggable &&
    //     //       e.clientX > this.rectList[i].rect.left &&
    //     //       e.clientX < this.rectList[i].rect.right &&
    //     //       e.clientY > this.rectList[i].rect.top &&
    //     //       e.clientY < this.rectList[i].rect.bottom
    //     //     ) {
    //     //       // console.log(this.activeIndex, i);

    //     //       console.log("startstartstartstartstart", this.dragIndex, i);
    //     //       [this.tempSorts[this.dragIndex], this.tempSorts[i]] = [
    //     //         this.tempSorts[i],
    //     //         this.tempSorts[this.dragIndex],
    //     //       ];

    //     //       // if (this.dragIndex < i) {
    //     //       //   for (let j = this.dragIndex; j < i; j++) {
    //     //       //     // console.log(this.activeIndex, j);
    //     //       //     if (this.activeIndex > j) {
    //     //       //       this.rectList[j].el.transform = "translate(0px, 0px)";
    //     //       //     } else {
    //     //       //       const x =
    //     //       //         this.rectList[j].rect.left -
    //     //       //         this.rectList[j + 1].rect.left;
    //     //       //       const y =
    //     //       //         this.rectList[j].rect.top - this.rectList[j + 1].rect.top;
    //     //       //       this.rectList[j + 1].el.transform =
    //     //       //         "translate(" + x + "px, " + y + "px)";
    //     //       //     }
    //     //       //   }
    //     //       //   // console.log(this.rectList, i + 1);
    //     //       //   // this.referenceElement = this.rectList[i]?.el;
    //     //       // } else if (this.dragIndex > i) {
    //     //       //   for (let j = i; j < this.dragIndex; j++) {
    //     //       //     if (this.activeIndex <= j) {
    //     //       //       this.rectList[j + 1].el.transform = "translate(0px, 0px)";
    //     //       //     } else {
    //     //       //       const x =
    //     //       //         this.rectList[j + 1].rect.left -
    //     //       //         this.rectList[j].rect.left;
    //     //       //       const y =
    //     //       //         this.rectList[j + 1].rect.top - this.rectList[j].rect.top;
    //     //       //       this.rectList[j].el.transform =
    //     //       //         "translate(" + x + "px, " + y + "px)";
    //     //       //     }
    //     //       //   }
    //     //       //   // this.referenceElement = this.rectList[i]?.el;
    //     //       // }
    //     //       // const x =
    //     //       //   this.rectList[i].rect.left -
    //     //       //   this.rectList[this.activeIndex].rect.left;
    //     //       // const y =
    //     //       //   this.rectList[i].rect.top -
    //     //       //   this.rectList[this.activeIndex].rect.top;
    //     //       // const y = this.rectList[i]?.rect?.height;
    //     //       // console.log(
    //     //       //   this.rectList,
    //     //       //   this.rectList[i].rect.top,
    //     //       //   i,
    //     //       //   this.rectList[this.activeIndex].rect.top,
    //     //       //   this.activeIndex,
    //     //       //   y
    //     //       // );   // this.dragElement.transform =
    //     //       //   "translate(" + x + "px, " + y + "px)";

    //     //       // this.rectList[i].el.transform =
    //     //       //   "translate(" +
    //     //       //   0 +
    //     //       //   "px, " +
    //     //       //   this.getY(this.tempSorts, i) +
    //     //       //   "px)";
    //     //       // this.dragElement.transform =
    //     //       //   "translate(" +
    //     //       //   0 +
    //     //       //   "px, " +
    //     //       //   this.getY(this.tempSorts, this.dragIndex) +
    //     //       //   "px)";

    //     //       // this.rectList.forEach((_, ri) => {
    //     //       //   this.rectList[ri].el.transform =
    //     //       //     "translate(" + 0 + "px, " + this.getY(ri) + "px)";
    //     //       // });

    //     //       this.rectList.forEach((v, ri) => {
    //     //         v.el.transform =
    //     //           "translate(" + 0 + "px, " + this.getY(ri) + "px)";
    //     //       });
    //     //       // console.log(this.activeIndex, i);

    //     //       console.log(this.tempSorts);
    //     //       // console.log(this.getY(this.tempSorts, this.dragIndex));
    //     //       // console.log(this.getY(this.tempSorts, i));

    //     //       // this.tempSorts.forEach((v, i) => {
    //     //       //   console.log(v, this.getY(this.tempSorts, i));
    //     //       // });
    //     //       this.dragIndex = i;

    //     //       break;
    //     //     }
    //     //   }
    //     // }}
    //     // onPointerUp={() => {
    //     //   this.end();
    //     // }}
    //     // onMouseLeave={() => {
    //     //   console.log("leave");
    //     //   this.end();
    //     // }}
    //     // onPointerCancel={(v) => {
    //     //   console.log("onPointerCancel", v);
    //     // }}
    //     class={"saki-drag-sort-component "}
    //   >
    //     <p>{String(this.activeIndex)}</p>
    //     <p>{String(this.activeIndex)}</p>
    //     <p>{String(this.activeIndex)}</p>
    //     {/*         <div class={"sortttt"}>
    //       <div>11111111111</div>
    //       <div>22222222222</div>
    //       <div>33333333333</div>
    //       <div>44444444444</div>
    //       <div>55555555555</div>
    //       <div>66666666666</div>
    //       <div>77777777777</div>
    //       <div>88888888888</div>
    //       <div>99999999999</div>
    //     </div> */}
    //     <slot></slot>
    //   </div>
    // );
  }
}
