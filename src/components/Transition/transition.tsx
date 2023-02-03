import { Component, h, Prop, State, Watch, Element } from "@stencil/core";

@Component({
  tag: "saki-transition",
  styleUrl: "transition.scss",
  shadow: false,
})
export class TransitionComponent {
  // 解决刚开始是关闭状态的动画问题
  @State() load: boolean = false;
  @Element() el: HTMLDivElement;
  // @Prop() animation: string = "SlideInRight";
  @Prop() className: string = "";
  // @Prop() animationEnd: boolean = false;
  @Prop() animationDuration: number = 300;
  // @Prop() visibleStartStyle: string = "";
  // @Prop() visibleEndStyle: string = "";
  // @Prop() hiddenStartStyle: string = "";
  // @Prop() hiddenEndStyle: string = "";
  @Prop() in: boolean = false;
  // @Prop() full: boolean = false;
  timer: NodeJS.Timeout;

  // @State() isVisible: boolean = false;

  @Watch("in")
  watchIn() {
    // console.log("this.in", this.in);
    this.setClassName();
  }
  componentWillLoad() {
    // this.isVisible = this.in;
  }
  componentDidLoad() {
    this.setClassName();
  }
  setClassName() {
    this.timer && clearTimeout(this.timer);

    // console.log("transition", this.in);

    // console.log(this.el);
    let el = this.el?.children?.[0];
    // console.log(el);
    if (!el) return;

    if (!this.load) {
      this.load = true;
      el.classList.add(this.className + "-will-load");
    }

    el.classList.remove(this.className + "-leave-done");
    el.classList.remove(this.className + "-enter-done");
    if (this.in) {
      el.classList.add(this.className + "-enter");
      setTimeout(() => {
        el.classList.add(this.className + "-enter-active");
      });
      // this.el.classList.add("enter");
      this.timer = setTimeout(() => {
        el.classList.remove(this.className + "-enter");
        el.classList.remove(this.className + "-enter-active");
        el.classList.add(this.className + "-enter-done");

        el.classList.remove(this.className + "-leave");
        el.classList.remove(this.className + "-leave-active");
        el.classList.remove(this.className + "-leave-done");
        el.classList.remove(this.className + "-will-load");
      }, this.animationDuration);
    } else {
      el.classList.add(this.className + "-leave");
      setTimeout(() => {
        el.classList.add(this.className + "-leave-active");
      });
      // this.el.classList.add("enter");
      this.timer = setTimeout(() => {
        el.classList.remove(this.className + "-leave");
        el.classList.remove(this.className + "-leave-active");
        el.classList.add(this.className + "-leave-done");

        el.classList.remove(this.className + "-enter");
        el.classList.remove(this.className + "-enter-active");
        el.classList.remove(this.className + "-enter-done");
        el.classList.remove(this.className + "-will-load");
      }, this.animationDuration);
    }
  }
  render() {
    return (
      <slot></slot>
      // <div
      //   class={
      //     "saki-transition-component " +
      //     this.animation +
      //     (this.isVisible ? " visible " : " hidden ") +
      //     (this.full ? " full " : "")
      //   }
      // >
      //   {/* {this.visible ? "true" : "false"} */}
      //   {/* <div
      //     // onTransitionEndCapture={(e) => {
      //     //   console.log("onTransitionEnd", e);
      //     //   this.animationEnd = true;
      //     //   this.isVisible = this.visible;
      //     // }}
      //     class={"ra-main"}
      //   >
      //   </div> */}
      // </div>
    );
  }
}
