import {
  Component,
  Event,
  EventEmitter,
  h,
  State,
  Method,
  Watch,
  Prop,
} from "@stencil/core";

@Component({
  tag: "saki-dialog-progress-bar",
  styleUrl: "dialog.scss",
})
export class DialogProgressBarComponent {
  @Prop() maxWidth: string = "400px";
  @Prop() minWidth: string = "";
  @Prop() width: string = "100%";
  @Prop() progress: number = 0;
  // ms
  @Prop() delay: number = 500;
  @Prop() tipText: string = "";
  @Prop() tipColor: string = "";
  @State() visible: boolean = false;
  @Event({
    eventName: "close",
    bubbles: false,
  })
  closeFunc: EventEmitter;
  @Watch("visible")
  watchVisible() {}
  @Method()
  async open() {
    this.visible = true;
  }
  @Method()
  async close() {
    this.visible = false;
    this.closeFunc.emit();
  }
  componentWillLoad() {}
  componentDidLoad() {}
  render() {
    return (
      <saki-modal
        maxWidth={this.maxWidth}
        minWidth={this.minWidth}
        width={this.width}
        mask
        maskBackgroundColor="rgba(0,0,0,0)"
        background-color="#fff"
        onClose={() => {
          this.close();
        }}
        zIndex={999999}
        visible={this.visible}
      >
        <div class={"saki-dialog-progress-bar-component"}>
          <saki-linear-progress-bar
            progress={this.progress}
            width="100%"
            height="14px"
            borderRadius="7px"
            transition={"width " + this.delay / 1000 + "s linear 0s"}
            // onTransitionEnd={() => {
            //   console.log("end");
            // }}
          ></saki-linear-progress-bar>
          <div
            style={{
              color: this.tipColor,
            }}
            class={"dpb-tip"}
          >
            {this.tipText}
          </div>
        </div>
      </saki-modal>
    );
  }
}
