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
  tag: "saki-dialog-alert",
  styleUrl: "dialog.scss",
})
export class DialogAlertComponent {
  @Prop() title: string = "";
  @Prop() content: string = "";
  @Prop() cancelText: string = "";
  @Prop() confirmText: string = "";
  @Prop() autoHideDuration: number = 0;

  @Prop() flexButton: boolean = false;
  @State() visible: boolean = false;
  @Event({
    bubbles: false,
  })
  close: EventEmitter;
  @Event() cancel: EventEmitter;
  @Event() confirm: EventEmitter;
  @Watch("visible")
  watchVisible() {}
  @Method()
  async open() {
    this.visible = true;
    this.autoHideDuration &&
      setTimeout(() => {
        this.visible = false;
      }, this.autoHideDuration);
  }
  @Method()
  async hide() {
    this.visible = false;
    this.close.emit();
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
        minWidth="300px"
        mask
        background-color="#fff"
        onClose={() => {
          this.visible = false;
        }}
        zIndex={999999}
        visible={this.visible}
      >
        <div>
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
          {this.content ? (
            <saki-modal-content
              font-size="14px"
              margin="0px 10px 10px 10px"
              text-align="center"
              content={this.content}
            ></saki-modal-content>
          ) : (
            ""
          )}
          {this.cancelText || this.confirmText ? (
            <saki-modal-buttons flexButton={this.flexButton} margin="6px 0">
              {this.cancelText ? (
                <saki-button
                  margin="0 4px"
                  width={this.flexButton ? "auto" : "80px"}
                  height="30px"
                  font-size="13px"
                  border="1px solid #eee"
                  onTap={() => {
                    this.visible = false;
                    this.close.emit();
                    this.cancel.emit();
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
                  width={this.flexButton ? "auto" : "80px"}
                  height="30px"
                  font-size="13px"
                  onTap={() => {
                    this.visible = false;
                    this.close.emit();
                    this.confirm.emit();
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
