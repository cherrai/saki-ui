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
  @Prop() progress: number = 0;
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
  componentDidLoad() {
  }
  render() {
    return (
      <saki-modal
        maxWidth="400px"
        width="100%"
        minWidth="300px"
        mask
        maskBackgroundColor="rgba(0,0,0,0)"
        background-color="#fff"
        onClose={() => {
          this.close();
        }}
        visible={this.visible}
      >
        <div class={"saki-dialog-progress-bar-component"}>
          <saki-linear-progress-bar
            progress={this.progress}
            width="100%"
            height="14px"
            borderRadius="7px"
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
