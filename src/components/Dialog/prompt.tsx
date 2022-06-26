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
  tag: "saki-dialog-prompt",
  styleUrl: "dialog.scss",
})
export class DialogPromptComponent {
  @Prop() title: string = "";
  @Prop() value: string = "";
  @Prop() placeholder: string = "";
  @Prop() cancelText: string = "";
  @Prop() confirmText: string = "";
  @Prop() autoHideDuration: number = 0;

  @State() visible: boolean = false;
  @Event({
    eventName: "changevalue",
    bubbles: false,
  })
  changevalue: EventEmitter;
  @Event({
    bubbles: false,
  })
  cancel: EventEmitter;
  @Event({
    bubbles: false,
  })
  confirm: EventEmitter;
  @Event({
    eventName: "close",
    bubbles: false,
  })
  closeFunc: EventEmitter;
  @Watch("visible")
  watchVisible() {}
  @Method()
  async open() {
    console.log("open");
    this.visible = true;
    this.autoHideDuration &&
      setTimeout(() => {
        this.visible = false;
      }, this.autoHideDuration);
  }
  @Method()
  async close() {
    this.visible = false;
    this.closeFunc.emit();
  }
  componentWillLoad() {}
  componentDidLoad() {
    setTimeout(() => {
      this.open();
    });
  }
  render() {
    return (
      <saki-modal
        maxWidth="400px"
        width="100%"
        minWidth="300px"
        mask
        background-color="#fff"
        onClose={() => {
          this.close();
        }}
        visible={this.visible}
      >
        <div class={"saki-dialog-prompt-component"}>
          {this.title ? (
            <saki-modal-header
              closeIcon={false}
              height="40px"
              fontSize="16px"
              title={this.title}
            ></saki-modal-header>
          ) : (
            ""
          )}
          <div class={"dp-input"}>
            <saki-input
              value={this.value}
              placeholder={this.placeholder || ""}
              height="56px"
              placeholderAnimation="MoveUp"
              onChangevalue={(e) => {
                this.changevalue.emit(e.detail);
              }}
            ></saki-input>
          </div>

          {this.cancelText || this.confirmText ? (
            <saki-modal-buttons margin="6px 0">
              {this.cancelText ? (
                <saki-button
                  margin="0 4px"
                  width="80px"
                  height="30px"
                  font-size="13px"
                  border="1px solid #eee"
                  onTap={() => {
                    this.cancel.emit();
                    this.close();
                  }}
                  type="Normal"
                >
                  {this.cancelText}
                </saki-button>
              ) : (
                ""
              )}
              {this.confirmText ? (
                <saki-button
                  margin="0 4px"
                  width="80px"
                  height="30px"
                  font-size="13px"
                  onTap={() => {
                    this.confirm.emit();
                    this.close();
                  }}
                  type="Primary"
                >
                  {this.confirmText}
                </saki-button>
              ) : (
                ""
              )}
            </saki-modal-buttons>
          ) : (
            ""
          )}
        </div>
      </saki-modal>
    );
  }
}
