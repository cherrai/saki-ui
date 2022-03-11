import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  State,
} from "@stencil/core";

// import { prefix } from "../../../stencil.config";
// console.log(prefix + "-tabs");
@Component({
  tag: "saki-tabs",
  styleUrl: "tabs.scss",
  shadow: true,
})
export class TabsComponent {
  @State() itemComponents: NodeListOf<HTMLSakiTabsItemElement>;
  @State() itemList: {
    name: string;
  }[] = [];
  @State() activeIndex: number = 0;
  @State() updateTime: number = 0;
  @Event() tap: EventEmitter;
  @Element() el: HTMLElement;
  componentWillLoad() {
    this.itemComponents = this.el.querySelectorAll("saki-tabs-item");
    this.itemComponents.forEach((item, index) => {
      item.switchActiveFunc(this.activeIndex === index);
      item.addEventListener("changename", () => {
        this.itemList[index].name = item.name;
        this.updateTime = new Date().getTime();
      });
      this.itemList.push({
        name: item.name,
      });
    });
  }
  render() {
    return (
      <div class="saki-tabs-component">
        <div class="s-nav">
          {this.itemList.map((item, index) => {
            return (
              <div
                onClick={() => {
                  this.tap.emit({
                    name: item.name,
                    activeIndex: index,
                  });
                  this.itemComponents.forEach((subItem, subIndex) => {
                    subItem.switchActiveFunc(index === subIndex);
                  });
                  this.activeIndex = index;
                }}
                class="nav-item"
                key={index}
              >
                {item.name}
              </div>
            );
          })}
          <div
            style={{
              width: 100 / this.itemList.length + "%",
              left: (100 / this.itemList.length) * this.activeIndex + "%",
            }}
            class="nav-line"
          >
            <div class="line"></div>
          </div>
        </div>
        <div class="s-main">
          <slot></slot>
        </div>
      </div>
    );
  }
}
