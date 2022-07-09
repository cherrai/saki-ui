import {
  Component,
  Event,
  EventEmitter,
  Watch,
  Method,
  Prop,
  h,
  State,
} from "@stencil/core";

@Component({
  // tag: prefix + "-tabs-item",
  tag: "saki-tabs-item",
  styleUrl: "tabs.scss",
  shadow: true,
})
export class TabsItemComponent {
  @Prop() name: string;
  @Prop() fontSize: string = "14px";
  @Prop() fontWeight: string = "500";

  @State() isShow: boolean;
  @Event() changename: EventEmitter;
  @Watch("name")
  watchNameFunc() {
    this.changename.emit();
  }
  @Method()
  async switchActiveFunc(bool: boolean) {
    this.isShow = bool;
  }
  componentWillLoad() {}
  render() {
    return (
      <div
        style={{
          display: this.isShow ? "block" : "none",
        }}
        class="saki-tabs-item-component"
      >
        <slot></slot>
      </div>
    );
  }
}
