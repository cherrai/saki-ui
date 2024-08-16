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
  @Prop() subtitle: string = "";
  @Prop() placeholder: string = "";
  @Prop() cancelText: string = "";
  @Prop() confirmText: string = "";
  @Prop() autoHideDuration: number = 0;
  @Prop() error = "";
  @Prop() errorColor: string = "";
  @Prop() errorFontSize: string = "";
  @Prop() autoCloseAfterButtonClick: boolean = true;
  @Prop() flexButton: boolean = false;

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
        zIndex={999999}
        visible={this.visible}
      >
        <div
          class={"saki-dialog-prompt-component " + (this.error ? "error " : "")}
        >
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
              subtitle={this.subtitle}
              placeholderAnimation="MoveUp"
              error={this.error}
              errorColor={this.errorColor}
              errorFontSize={this.errorFontSize}
              onChangevalue={(e) => {
                this.changevalue.emit(e.detail);
              }}
            ></saki-input>
          </div>

          {this.cancelText || this.confirmText ? (
            <saki-modal-buttons flexButton={this.flexButton} margin="0 0">
              {this.cancelText ? (
                <saki-button
                  margin="0 4px"
                  width={this.flexButton ? "auto" : "auto"}
                  minWidth="80px"
                  height="30px"
                  font-size="13px"
                  border="1px solid #eee"
                  onTap={() => {
                    this.cancel.emit();
                    this.autoCloseAfterButtonClick && this.close();
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
                  width={this.flexButton ? "auto" : "auto"}
                  minWidth="80px"
                  height="30px"
                  font-size="13px"
                  onTap={() => {
                    this.confirm.emit();
                    this.autoCloseAfterButtonClick && this.close();
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
