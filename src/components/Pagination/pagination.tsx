import {
  Component,
  h,
  Prop,
  Element,
  State,
  Event,
  EventEmitter,
  Watch,
} from "@stencil/core";
import { t } from "../../modules/i18n/i18n";
import { sakiuiEventListener } from "../../store/config";
import { Debounce } from "@nyanyajs/utils/dist/debounce";

@Component({
  tag: "saki-pagination",
  styleUrl: "pagination.scss",
  shadow: false,
})
export class PaginationComponent {
  d = new Debounce();
  @Prop() total: number = 100;
  @Prop() pageSize: number = 10;
  @Prop() pageNum: number = 1;
  @Prop() margin: string = "";
  @Prop() padding: string = "";
  @Prop() itemSpacing: number = 8;
  @Prop() previousPageText: string = "";
  @Prop() nextPageText: string = "";
  @Prop() pageButtonType: "Icon" | "Text" = "Text";
  @Prop() bgColor: string = "#fff";
  @Prop() bgHoverColor: string = "#eee";
  @Prop() bgActiveColor: string = "#ddd";
  @Prop() textColor: string = "#666";
  @Prop() activeBgColor: string = "var(--saki-default-color)";
  @Prop() activeBgHoverColor: string = "var(--saki-default-hover-color)";
  @Prop() activeBgActiveColor: string = "var(--saki-default-active-color)";
  @Prop() activeTextColor: string = "#fff";
  @Prop() border: string = "1px solid #eee";

  @State() length = 0;

  @State() lastUpdateTime = 0;

  @Element() el: HTMLDivElement;
  @Event({
    bubbles: false,
  })
  changePage: EventEmitter;
  @Watch("itemSpacing")
  watchitemSpacing() {
    this.watchDom();
  }
  componentWillLoad() {
    sakiuiEventListener.on("loadI18n", () => {
      this.lastUpdateTime = new Date().getTime();
    });
  }
  componentDidLoad() {
    this.watchDom();

    let lastWidth = null;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        if (width !== lastWidth) {
          lastWidth = width;
          this.watchDom();
          // 执行宽度相关逻辑
        }
      }
    });

    // resizeObserver.observe(this.el);
    resizeObserver.observe(this.el.querySelector(".saki-pagination-component"));
  }

  watchDom() {
    this.d.increase(() => {
      // console.log("pagination", this.el.getBoundingClientRect());

      const elRect = this.el.getBoundingClientRect();
      const prevRect = this.el
        .querySelector(".sp-prev")
        .getBoundingClientRect();
      const nextRect = this.el
        .querySelector(".sp-next")
        .getBoundingClientRect();
      const listRect = this.el
        .querySelector(".sp-list")
        .getBoundingClientRect();
      const listItemRect = this.el
        .querySelector(".sp-l-item")
        .getBoundingClientRect();

      let listItemRectW = listItemRect.width + this.itemSpacing;

      console.log("pagination", listRect.width, listItemRect.width);
      console.log(
        "pagination",
        Math.floor(
          (elRect.width - prevRect.width - nextRect.width) / listItemRectW
        )
      );

      this.length = Math.floor(
        (elRect.width - prevRect.width - nextRect.width - this.itemSpacing) /
          listItemRectW
      );
      // const list = this.el?.querySelectorAll(
      //   "saki-waterfall-layout-item"
      // ) as NodeListOf<HTMLSakiWaterfallLayoutItemElement>;
      // // console.log("wlist111", list);
      // list.forEach((v) => {
      //   // !v.show && this.addItem(v);
      //   console.log("wlist111", v.added);
      //   if (!v.added) {
      //     v.added = true;
      //     this.list.push(v);
      //   }
      // });
      // console.log("wlist111", this.list, list, this.renderList);
      // this.initList();
    }, 100);
  }

  generatePagination(
    total: number,
    pageSize: number,
    currentPage: number,
    length: number
  ): number[] {
    const totalPages = Math.ceil(total / pageSize);
    const result = new Array(length).fill(0);

    if (totalPages === 1) {
      result[0] = 1;
      return result;
    }

    if (totalPages <= length) {
      // 总页数≤格子数：显示所有页码
      for (let i = 0; i < totalPages; i++) {
        result[i] = i + 1;
      }
      return result;
    }

    // 固定显示首页和尾页
    result[0] = 1;
    result[length - 1] = totalPages;

    // 计算可以显示的数字页码数量（总格子数-首页-尾页-可能的两个省略号）
    const availableSlots = length - 4;

    // 确保当前页有效
    currentPage = Math.max(1, Math.min(currentPage, totalPages));

    if (currentPage <= Math.floor(availableSlots / 2) + 1) {
      // 靠近首页：显示前 availableSlots+1 个页码
      for (let i = 1; i <= availableSlots + 1; i++) {
        result[i] = i + 1;
      }
      // 倒数第二位放省略号
      result[length - 2] = -1;
    } else if (currentPage >= totalPages - Math.floor(availableSlots / 2)) {
      // 靠近尾页：显示后 availableSlots+1 个页码
      for (let i = 1; i <= availableSlots + 1; i++) {
        result[length - 1 - i] = totalPages - i;
      }
      // 第二位放省略号
      result[1] = -1;
    } else {
      // 中间情况：首页 + 省略号 + 当前页附近 + 省略号 + 尾页
      result[1] = -1;
      result[length - 2] = -1;

      // 计算中间显示的页码（当前页居中）
      const start = currentPage - Math.floor(availableSlots / 2);
      for (let i = 0; i < availableSlots; i++) {
        result[2 + i] = start + i;
      }
    }

    return result;
  }
  render() {
    return (
      <div
        style={{
          "--bg-color": this.bgColor,
          "--bg-hover-color": this.bgHoverColor,
          "--bg-active-color": this.bgActiveColor,
          "--text-color": this.textColor,
          "--active-bg-color": this.activeBgColor,
          "--active-bg-hover-color": this.activeBgHoverColor,
          "--active-bg-active-color": this.activeBgActiveColor,
          "--active-text-color": this.activeTextColor,
          ...["margin", "padding"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-pagination-component"}
      >
        <div class={"sp-prev"}>
          <saki-button
            type="Normal"
            width={this.pageButtonType === "Text" ? "" : "36px"}
            padding="4px 12px"
            min-width="36px"
            margin={`0 ${this.itemSpacing / 2}px 0 0`}
            height="36px"
            border={this.border}
            disabled={this.pageNum === 1}
            onTap={() => {
              if (this.pageNum === 1) return;
              this.pageNum--;
              this.changePage.emit(this.pageNum);
            }}
          >
            {this.pageButtonType === "Text" ? (
              <span>
                {this.previousPageText ||
                  t("previousPage", {
                    ns: "prompt",
                  })}
              </span>
            ) : (
              <saki-icon color={"var(--text-color)"} type="Left"></saki-icon>
            )}
          </saki-button>
        </div>
        <div class={"sp-list"}>
          {this.generatePagination(
            this.total,
            this.pageSize,
            this.pageNum,
            this.length
          )
            .filter((v) => v !== 0)
            .map((v, i) => {
              return (
                <div
                  onClick={() => {
                    if (v === -1 && this.pageNum === v) return;
                    this.pageNum = v;
                    this.changePage.emit(this.pageNum);
                  }}
                  class={"sp-l-item " + (this.pageNum === v ? "active" : "")}
                  style={{
                    margin: `0 ${this.itemSpacing / 2}px`,
                    ...["border"].reduce(
                      (fin, cur) =>
                        this[cur] ? { ...fin, [cur]: this[cur] } : fin,
                      {}
                    ),
                  }}
                  key={i}
                >
                  <span>{v === -1 ? "..." : v}</span>
                </div>
              );
            })}
        </div>
        <div class={"sp-next"}>
          <saki-button
            type="Normal"
            width={this.pageButtonType === "Text" ? "" : "36px"}
            padding="4px 12px"
            min-width="36px"
            margin={`0 ${this.itemSpacing / 2}px 0 0`}
            height="36px"
            border={this.border}
            disabled={this.pageNum === Math.ceil(this.total / this.pageSize)}
            onTap={() => {
              if (this.pageNum === Math.ceil(this.total / this.pageSize))
                return;
              this.pageNum++;
              this.changePage.emit(this.pageNum);
            }}
          >
            {this.pageButtonType === "Text" ? (
              <span>
                {this.nextPageText ||
                  t("nextPage", {
                    ns: "prompt",
                  })}
              </span>
            ) : (
              <saki-icon color={"var(--text-color)"} type="Right"></saki-icon>
            )}
          </saki-button>
        </div>
      </div>
    );
  }
}
