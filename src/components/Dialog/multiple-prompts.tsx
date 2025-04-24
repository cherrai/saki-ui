import {
  Component,
  Event,
  EventEmitter,
  h,
  State,
  Method,
  Prop,
} from "@stencil/core";

@Component({
  tag: "saki-dialog-multiple-prompts",
  styleUrl: "dialog.scss",
})
export class DialogMultiplePromptsComponent {
  @Prop() title: string = "";
  @Prop() content: string = "";
  @Prop() autoHideDuration: number = 0;
  @Prop() closeIcon: boolean = false;
  @Prop() zIndex = 1010;
  @Prop({
    mutable: true,
  })
  multipleInputs: {
    label: string;
    value?: string;
    type?: "Text" | "Password" | "Number" | "Textarea" | "Search";
    placeholderAnimation?: "" | "MoveUp";
    padding?: string;
    margin?: string;
    closeIcon?: boolean;
    border?: string;
    borderTop?: string;
    borderRight?: string;
    borderBottom?: string;
    borderLeft?: string;
    borderRadius?: string;
    subtitle?: string;
    placeholder?: string;
    width?: string;
    height?: string;
    maxLength?: number;
    error?: string;
    errorColor?: string;
    errorFontSize?: string;
    disabled?: boolean;
  }[] = [];
  @Prop() flexButton?: boolean = false;
  @Prop({
    mutable: true,
  })
  buttons: {
    label: string;
    text: string;
    width?: string;
    height?: string;
    fontSize?: string;
    border?: string;
    bgHoverColor?: string;
    bgActiveColor?: string;
    bgColor?: string;
    color?: string;
    borderRadius?: string;
    disabled?: boolean;
    loading?: boolean;
    loadingColor?: string;
    loadingWidth?: string;
    type?: "Normal" | "Primary";
    autoCloseAfterButtonTap?: boolean;
  }[] = [];

  @State() visible: boolean = false;
  @State() updateTime = 0;
  @Event({
    eventName: "changevalue",
    bubbles: false,
  })
  changevalue: EventEmitter<{
    label: string;
    value: string;
  }>;
  @Event({
    eventName: "clearvalue",
    bubbles: false,
  })
  clearvalue: EventEmitter<{
    label: string;
  }>;

  @Event({
    bubbles: false,
  })
  tap: EventEmitter<{
    label: string;
  }>;

  @Event({
    eventName: "close",
    bubbles: false,
  })
  closeFunc: EventEmitter;

  @Event({
    eventName: "open",
    bubbles: false,
  })
  openFunc: EventEmitter;

  @Method()
  async setMultipleInputs(v: typeof this.multipleInputs) {
    this.multipleInputs = v;
    this.updateTime = new Date().getTime();
  }
  @Method()
  async setButton(v: typeof this.buttons) {
    this.buttons = v;
    this.updateTime = new Date().getTime();
  }
  @Method()
  async open() {
    console.log("open");
    this.visible = true;
    this.openFunc.emit();
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
        zIndex={this.zIndex}
        visible={this.visible}
      >
        <div class={"saki-dialog-multiple-prompts-component "}>
          {this.title ? (
            <saki-modal-header
              closeIcon={this.closeIcon || false}
              height="56px"
              rightWidth="56px"
              fontSize="16px"
              title={this.title}
              onClose={() => {
                this.close();
              }}
            ></saki-modal-header>
          ) : (
            ""
          )}
          {this.content ? <div class={"dp-content"}>{this.content}</div> : ""}
          <div class={"dp-input"}>
            {this.multipleInputs.map((v) => {
              return (
                <saki-input
                  key={v.label}
                  value={v.value}
                  placeholder={v.placeholder || ""}
                  width={v.width}
                  height={v.height || "56px"}
                  subtitle={v.subtitle}
                  type={v.type || "Text"}
                  placeholderAnimation={v.placeholderAnimation}
                  padding={v.padding}
                  margin={v.margin}
                  closeIcon={v.closeIcon}
                  border={v.border || ""}
                  borderTop={v.borderTop || ""}
                  borderRight={v.borderRight || ""}
                  borderBottom={v.borderBottom || ""}
                  borderLeft={v.borderLeft || ""}
                  borderRadius={v.borderRadius || ""}
                  onClearvalue={() => {
                    this.clearvalue.emit({
                      label: v.label,
                    });
                  }}
                  maxLength={v.maxLength}
                  error={v.error || ""}
                  errorColor={v.errorColor}
                  errorFontSize={v.errorFontSize}
                  disabled={v.disabled}
                  onChangevalue={(e) => {
                    this.changevalue.emit({
                      label: v.label,
                      value: e.detail,
                    });
                  }}
                ></saki-input>
              );
            })}
          </div>

          {this.buttons.length ? (
            <saki-modal-buttons
              padding="6px 20px"
              flexButton={this.flexButton}
              margin="0 0"
            >
              {this.buttons.map((v) => {
                return (
                  <saki-button
                    margin="0 4px"
                    width={this.flexButton ? "auto" : "auto"}
                    minWidth="80px"
                    height={v.height || "30px"}
                    font-size={v.fontSize || "13px"}
                    border={v.border || "1px solid #eee"}
                    bgActiveColor={v.bgActiveColor}
                    bgHoverColor={v.bgHoverColor}
                    bgColor={v.bgColor}
                    color={v.color}
                    borderRadius={v.borderRadius}
                    disabled={v.disabled}
                    loading={v.loading}
                    loadingColor={v.loadingColor}
                    loadingWidth={v.loadingWidth}
                    onTap={() => {
                      // this.cancel.emit();
                      this.tap.emit({
                        label: v.label,
                      });
                      v.autoCloseAfterButtonTap && this.close();
                    }}
                    type={v.type || "Normal"}
                  >
                    {v.text}
                  </saki-button>
                );
              })}
            </saki-modal-buttons>
          ) : (
            ""
          )}
        </div>
      </saki-modal>
    );
  }
}
