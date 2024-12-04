import {
  Component,
  Event,
  EventEmitter,
  h,
  State,
  Watch,
  Prop,
  Element,
} from "@stencil/core";
import { MD5 } from "crypto-js";
import moment from "moment";

import { state } from "../../store";

// console.log("moment", moment.locale("en-us"));
// console.log("moment", moment.locale("zh-cn"));
// console.log("moment", moment.locale("zh-tw"));

type DaysMap = {
  date: string;
  y: number;
  m: number;
  d: number;
}[];

@Component({
  tag: "saki-date-picker",
  styleUrl: "date-picker.scss",
  // shadow: true,
})
export class DatePickerComponent {
  @Element() el: HTMLElement;
  @State() id = "";

  static daysMap: {
    [date: string]: DaysMap;
  } = {};

  list: NodeListOf<HTMLSakiContextMenuItemElement>;
  @Prop({ mutable: true }) zIndex: number = 1001;
  @Prop() visible: boolean = false;
  @Prop() date: string = "";
  @Prop() time: string = "";

  @Prop() mask: boolean = false;

  @Prop() cancelButton: boolean = false;

  // 是否开启时间选择器
  @Prop() timePicker: boolean = false;
  @State() yearContent: number = 1899;
  // 1 显示Day
  // 2 显示Month
  // 3 显示Year
  @State() showDatePage: number = 1;
  @State() showTimePage: number = 0;
  @State() days: DaysMap = [];
  @State() selectDate: Date = new Date();
  @State() selectedDate: Date = undefined;
  @State() selectYear: number = 0;


  @State() timer: NodeJS.Timeout;

  @State() timeContent: {
    h: number;
    m: number;
    s: number;
  } = {
      h: 0,
      m: 0,
      s: 0,
    };

  @Event() close: EventEmitter;
  @Event() selectdate: EventEmitter<{
    date: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  }>;
  @Watch("visible")
  watchVisible() {
    console.log("ddd", this.date, this.visible);
    if (this.visible) {
      if (this.date) {
        this.selectedDate = new Date(this.date);
      } else {
        this.selectedDate = undefined;
      }
      this.init(new Date(this.date || new Date()));
      if (this.timePicker) {
        this.setTimeInterval();
      }
      // setTimeout(() => {
      //   this.showTimePage = 1;
      // }, 300);
    } else {
      this.selectedDate = undefined;

      this.timer && clearInterval(this.timer);
    }
  }
  @Watch("date")
  watchDate() {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    } else {
      this.selectedDate = undefined;
    }
    this.init(new Date(this.date || new Date()));
  }
  @Watch("selectDate")
  watchSelectDate() {
    if (!this.selectDate) {
      this.days = []
      return
    }
    this.days = this.getDaysOfThisMonth(
      `${this.selectDate.getFullYear()}-${this.selectDate.getMonth() + 1}`
    );
  }
  @Watch("showTimePage")
  watchShowTimePage() {
    if (this.showTimePage && this.timePicker) {
      this.initTimeItem();
    }
  }
  componentWillLoad() { }
  componentDidLoad() {
    this.id = MD5(String(Math.floor(Math.random() * 1000000000))).toString();
    this.init(new Date());

    // console.log("moment", moment.locale("en-us"));
    // for (let i = 0; i < 7; i++) {
    //   console.log("dsadas", moment("2024-03-" + (4 + i)).format("dd"));
    // }
    // console.log("moment", moment.locale("zh-tw"));
    // for (let i = 0; i < 7; i++) {
    //   console.log("dsadas", moment("2024-03-" + (4 + i)).format("dd"));
    // }
  }
  init(date: Date) {
    // this.selectedDate = undefined
    this.showDatePage = 1;
    this.selectDate = date;
    this.selectYear = this.selectDate.getFullYear();
    this.initYearContent(this.selectDate);

    if (this.timePicker) {
      console.log(this.time);
      this.initTimeContent(
        moment(this.time ? `2018-05-18 ${this.time}` : new Date()).format(
          "H:mm:ss"
        )
      );

      this.setTimeInterval();
    }
  }
  initTimeContent(time: string) {
    const times = time.split(":").map((v) => Number(v));
    this.timeContent = {
      h: times[0],
      m: times[1],
      s: times[2],
    };
    console.log("initTimeContent", this.timeContent, time);
  }
  setTimeInterval() {
    // let ts = new Date(
    //   `2018-05-18 ${this.timeContent.h}:${this.timeContent.m}:${this.timeContent.s}`
    // ).getTime();
    // const h = () => {
    //   ts += 1000;
    //   this.timeContent;
    //   this.initTimeContent(moment(ts).format("H:mm:ss"));
    // };
    // h();
    // this.timer && clearInterval(this.timer);
    // this.timer = setInterval(() => {
    //   h();
    // }, 1000);
  }
  initYearContent(date: Date) {
    this.yearContent = Math.floor(date.getFullYear() / 10) * 10 - 1;
  }

  initTimeItem() {
    this.setTimeItemScrollTop(0, this.timeContent.h);
    this.setTimeItemScrollTop(1, this.timeContent.m);
    this.setTimeItemScrollTop(2, this.timeContent.s);
  }
  setTimeItemScrollTop(i: number, si: number) {
    const el = document.body.querySelector(".dp-st-item.s" + this.id + i);

    console.log("setTimeItemScrollTop", el, this.id);
    if (!el) return;
    el.scrollTop = 27 * (si - 1);
    console.log("setTimeItemScrollTop", this.el, si, el.scrollTop);
  }

  getDaysOfThisMonth(date: string) {
    if (DatePickerComponent.daysMap[date])
      return DatePickerComponent.daysMap[date];
    const lastDays = this.getLastDay(new Date(date), false)
      .filter((v) => v)
      .reverse();
    const nextDays = this.getNextDay(new Date(date), false, true).filter(
      (v) => v
    );

    // console.log(lastDays);
    // console.log(nextDays);
    const days = lastDays.concat(nextDays);
    DatePickerComponent.daysMap[date] = days;
    return days;
  }
  emitSelectDate() {
    if (!this.selectDate) {
      this.selectdate.emit({
        date: "",
        year: -1,
        month: -1,
        day: -1,
        hour: -1,
        minute: -1,
        second: -1,
      });
      return
    }
    this.selectdate.emit({
      date:
        `${this.selectedDate.getFullYear()}-${this.selectedDate.getMonth() + 1
        }-${this.selectedDate.getDate()}` +
        (this.timePicker
          ? ` ${this.timeContent.h}:${this.timeContent.m}:${this.timeContent.s}`
          : ""),
      year: this.selectedDate.getFullYear(),
      month: this.selectedDate.getMonth() + 1,
      day: this.selectedDate.getDate(),
      hour: this.timeContent.h,
      minute: this.timeContent.m,
      second: this.timeContent.s,
    });
  }
  getLastDay(date: Date, lastMonth: boolean): DaysMap {
    const nowDay = date.getDate();
    const nowYear = date.getFullYear();
    const nowMonth = date.getMonth() + 1;
    const nowWeek = date.getDay();
    // console.log(nowDay);
    // console.log(nowWeek);
    // 计算是第几个星期

    // 获取上一天的日子
    // new Date(new Date().setSeconds(-3600*24)).getDate()
    const nowWeekNum = Math.ceil((nowDay - nowWeek) / 7) + 1;

    const s = nowYear + "-" + nowMonth + "-" + nowDay;

    if (nowWeekNum < 0 || (lastMonth && !nowWeek)) {
      return [
        {
          date: s,
          y: nowYear,
          m: nowMonth,
          d: nowDay,
        },
      ];
    }

    return [
      {
        date: s,
        y: nowYear,
        m: nowMonth,
        d: nowDay,
      },
    ].concat(
      this.getLastDay(
        new Date(date.setSeconds(-3600 * 24)),
        lastMonth || nowDay === 1
      )
    );
  }
  getNextDay(date: Date, nextMonth: boolean, first: boolean): DaysMap {
    const nowDay = date.getDate();
    const nowYear = date.getFullYear();
    const nowMonth = date.getMonth() + 1;
    const nowWeek = date.getDay();
    // console.log(nowDay);
    // console.log(nowWeek);
    // 计算是第几个星期

    // 获取上一天的日子
    // new Date(new Date().setSeconds(-3600*24)).getDate()
    const nowWeekNum = Math.ceil((nowDay - nowWeek) / 7) + 1;

    const s = nowYear + "-" + nowMonth + "-" + nowDay;

    if (nowWeekNum < 0 || (nextMonth && nowWeek === 6)) {
      return first
        ? []
        : [
          {
            date: s,
            y: nowYear,
            m: nowMonth,
            d: nowDay,
          },
        ];
    }
    const nextDay = new Date(date.setSeconds(3600 * 24));
    const nextDays = this.getNextDay(
      nextDay,
      first ? false : nextMonth || nextDay.getDate() === 1,
      false
    );

    return (
      first
        ? []
        : [
          {
            date: s,
            y: nowYear,
            m: nowMonth,
            d: nowDay,
          },
        ]
    ).concat(nextDays);
  }
  render() {

    const showTodayButton = moment(this.selectDate).format("YYYY-M") !==
      moment().format("YYYY-M")
    return (
      <saki-dropdown
        onClose={() => {
          console.log("close");
          this.close.emit();
        }}
        visible={this.visible}
        floating-direction="Left"
        z-index={this.zIndex}
        // mask={this.mask}
        bodyClosable={true}
      >
        <div class={"saki-date-picker-core"}>
          <slot></slot>
        </div>
        <div slot="main">
          <div
            style={{
              "--saki-date-picker-width": "320px",
              // "--saki-date-picker-height": "300px",
            }}
            class={"saki-date-picker-component"}
          >
            <div class={"dp-header"}>
              <div class={"dp-h-left"}>
                <saki-button
                  onTap={() => {
                    if (this.showDatePage === 3) {
                      this.showDatePage = 1;
                      return;
                    }
                    this.showDatePage++;
                    if (this.showDatePage === 2) {
                      this.selectYear = this.selectDate.getFullYear();
                    }
                  }}
                  padding="8px 6px"
                  border="none"
                >
                  <div class={"dp-h-l-date"}>
                    {this.showDatePage === 3
                      ? `${this.yearContent + 1} - ${this.yearContent + 11}`
                      : this.showDatePage === 2
                        ? this.selectYear
                        : moment(this.selectDate).format("MMMM, YYYY")}
                  </div>
                </saki-button>
                {this.timePicker && this.showDatePage === 1 ? (
                  <saki-button
                    onTap={() => {
                      this.showTimePage = 1;
                    }}
                    padding="8px 6px"
                    border="none"
                  >
                    <div class={"dp-h-l-time"}>
                      {moment(
                        `2018-05-18 ${this.timeContent.h}:${this.timeContent.m}:${this.timeContent.s}`
                      ).format("HH:mm:ss")}
                    </div>
                  </saki-button>
                ) : (
                  ""
                )}
              </div>
              <div class={"dp-h-right"}>
                <saki-button
                  onTap={() => {
                    if (this.showDatePage === 3) {
                      this.yearContent = this.yearContent - 10;
                      return;
                    }
                    if (this.showDatePage === 2) {
                      this.selectYear--;
                      return;
                    }

                    let y = this.selectDate.getFullYear();
                    let m = this.selectDate.getMonth() - 1;

                    if (m < 0) {
                      y = y - 1;
                      m = 11;
                    }
                    this.selectDate = new Date(`${y}-${m + 1}`);
                  }}
                  margin="0 0 0 10px"
                  border="none"
                >
                  <saki-icon color="#999" type="Top"></saki-icon>
                </saki-button>
                <saki-button
                  onTap={() => {
                    if (this.showDatePage === 3) {
                      this.yearContent = this.yearContent + 10;
                      return;
                    }
                    if (this.showDatePage === 2) {
                      this.selectYear++;
                      return;
                    }
                    let y = this.selectDate.getFullYear();
                    let m = this.selectDate.getMonth() + 1;

                    if (m > 11) {
                      y = y + 1;
                      m = 1;
                    }
                    this.selectDate = new Date(`${y}-${m + 1}`);
                  }}
                  margin="0 0 0 10px"
                  border="none"
                >
                  <saki-icon color="#999" type="Bottom"></saki-icon>
                </saki-button>
              </div>
            </div>
            <div
              style={{
                zIndex: String(
                  this.showDatePage === 2 ? 1000 + this.showDatePage : -1
                ),
              }}
              class={
                "dp-select-month " + (this.showDatePage >= 2 ? "show" : "")
              }
            >
              {new Array(12).fill(1).map((_, i) => {
                const s = this.selectDate.getFullYear() + "-" + (i + 1);
                return (
                  <div
                    key={i}
                    onClick={() => {
                      // this.selectMonth = i;
                      this.selectDate = new Date(`${this.selectYear}-${i + 1}`);
                      this.showDatePage--;
                    }}
                    class={
                      "dp-sm-item " +
                      (moment(this.selectDate).format("YYYY-M") === s
                        ? "now "
                        : "")
                    }
                  >
                    {moment(s).format("MMM")}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                zIndex: String(
                  this.showDatePage === 3 ? 1000 + this.showDatePage : -1
                ),
              }}
              class={"dp-select-year " + (this.showDatePage >= 3 ? "show" : "")}
            >
              {new Array(12).fill(1).map((_, i) => {
                const y = this.yearContent + i;
                const minY = this.yearContent;
                const maxY = this.yearContent + 11;
                // console.log(y, minY, maxY, y > minY && y < maxY);
                return (
                  <div
                    key={i}
                    onClick={() => {
                      this.selectYear = y;
                      this.showDatePage--;
                    }}
                    class={
                      "dp-sy-item " +
                      (y > minY && y < maxY ? "activeYear " : "")
                    }
                  >
                    {y}
                  </div>
                );
              })}
            </div>

            {this.timePicker ? (
              <div
                style={{
                  zIndex: String(
                    this.showTimePage === 1 ? 1000 + this.showTimePage : -1
                  ),
                }}
                class={
                  "dp-select-time " + (this.showTimePage === 1 ? "show" : "")
                }
              >
                <div class={"dp-st-list"}>
                  {[
                    new Array(24).fill(1),
                    new Array(60).fill(1),
                    new Array(60).fill(1),
                  ].map((v, i) => {
                    return (
                      <div
                        class={
                          "dp-st-item scrollBarHover " + ("s" + this.id + i)
                        }
                      >
                        <div class={"dp-st-i-top"}></div>
                        {v.map((_, si) => {
                          if (!si) return "";
                          return (
                            <div
                              onClick={() => {
                                this.setTimeItemScrollTop(i, si);
                                switch (i) {
                                  case 0:
                                    this.timeContent = {
                                      ...this.timeContent,
                                      h: si,
                                    };
                                    break;
                                  case 1:
                                    this.timeContent = {
                                      ...this.timeContent,
                                      m: si,
                                    };
                                    break;
                                  case 2:
                                    this.timeContent = {
                                      ...this.timeContent,
                                      s: si,
                                    };
                                    break;

                                  default:
                                    break;
                                }
                              }}
                              class={
                                "dp-st-i-item " +
                                ((i === 0 && this.timeContent.h === si) ||
                                  (i === 1 && this.timeContent.m === si) ||
                                  (i === 2 && this.timeContent.s === si)
                                  ? "active"
                                  : "")
                              }
                            >
                              {String(si).padStart(2, "0")}
                            </div>
                          );
                        })}
                        <div class={"dp-st-i-bottom"}></div>
                      </div>
                    );
                  })}
                </div>
                <div class={"dp-st-buttons"}>
                  <saki-button
                    onTap={() => {
                      this.showTimePage = 0;
                    }}
                    width="100%"
                    border="none"
                    padding="8px 10px"
                    color="var(--saki-default-color)"
                  >
                    {state.lang === "en-US" ? "Comfirm" : "确认"}
                  </saki-button>
                </div>
              </div>
            ) : (
              ""
            )}
            <div class={"dp-main"}>
              <div class={"dp-week"}>
                {new Array(7).fill(1).map((_, i) => {
                  return (
                    <div class={"dp-w-item"}>
                      {moment("2024-03-" + (3 + i)).format("dd")}
                    </div>
                  );
                })}
              </div>
              <div class={"dp-days"}>
                {this.days.map((v) => {
                  return (
                    <div
                      onClick={() => {
                        this.selectedDate = new Date(
                          v.y + "-" + v.m + "-" + v.d
                        );
                        this.emitSelectDate();
                        if (this.selectDate.getMonth() + 1 !== v.m) {
                          this.selectDate = new Date(`${v.y}-${v.m}`);
                        }
                      }}
                      data-date={moment().format("YYYY-M-D") + "," + v.date}
                      class={
                        "dp-d-item " +
                        (moment().format("YYYY-M-D") === v.date ? "now " : "") +
                        (moment(this.selectedDate).format("YYYY-M-D") === v.date
                          ? "active "
                          : "") +
                        (moment(this.selectDate).format("YYYY-M") ===
                          v.y + "-" + v.m
                          ? "thisMonth "
                          : "")
                      }
                    >
                      {v.d}
                    </div>
                  );
                })}
              </div>
              {
                this.cancelButton || showTodayButton ? <div class={"dp-buttons"}>
                  <div class={"dp-b-left"}>
                    <div
                      class={
                        "dp-today " +
                        (showTodayButton
                          ? "show "
                          : "")
                      }
                    >
                      <saki-button
                        onTap={() => {
                          this.selectDate = new Date();
                          this.selectedDate = this.selectDate;
                          this.emitSelectDate();
                        }}
                        width="100%"
                        border="none"
                        padding="8px 10px"
                        color="var(--saki-default-color)"
                      >
                        今日
                      </saki-button>
                    </div>

                  </div>
                  <div class={"dp-b-right"}>
                    {this.cancelButton ?
                      <div
                        class={
                          "dp-cancelButton show"
                        }
                      >
                        <saki-button
                          onTap={() => {
                            this.selectDate = null;
                            this.selectedDate = null;
                            this.emitSelectDate();
                          }}
                          width="100%"
                          border="none"
                          padding="8px 10px"
                          color="#555"
                        >
                          取消选择
                        </saki-button>
                      </div> : ""}

                  </div>
                </div> : ""
              }
            </div>
          </div>
        </div>
      </saki-dropdown>
    );
  }
}
