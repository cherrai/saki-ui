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

import { v4 as uuidv4 } from "uuid";

@Component({
  // tag: prefix + "-tabs-item",
  tag: "saki-tabs-item",
  styleUrl: "tabs.scss",
  shadow: true,
})
export class TabsItemComponent {
  @State() id: string = uuidv4();
  @Prop() name: string;
  @Prop() label: string;
  @Prop() fontSize: string = "14px";
  @Prop() color: string = "";
  @Prop() fontWeight: string = "500";
  @Prop() borderBottom: boolean = false;
  @Prop() full = false;

  @State() isShow: boolean;
  @Event({
    bubbles: false,
  })
  changename: EventEmitter;
  @Watch("name")
  watchNameFunc() {
    this.changename.emit();
  }
  @Method()
  async switchActiveFunc(bool: boolean) {
    this.isShow = bool;
  }
  @Method()
  async getId(): Promise<string> {
    return this.id;
  }
  componentWillLoad() {
    // console.log(this.id);
  }
  render() {
    return (
      <div
        style={{
          display: this.isShow ? "block" : "none",
        }}
        class={"saki-tabs-item-component " + (this.full ? "full" : "")}
      >
        <slot></slot>
      </div>
    );
  }
}
