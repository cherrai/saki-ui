import { Component, Prop, Event, EventEmitter, h } from "@stencil/core";

@Component({
  tag: "saki-chat-edit",
  styleUrl: "edit.scss",
  shadow: true,
})
export class ChatEditComponent {
  @Prop() title = "";
  @Prop() message = "";
  @Prop() iconSize = "40px";
  @Prop() padding = "0 10px";
  @Prop() margin = "0px";
  @Event() close: EventEmitter;
  componentDidLoad() {}
  render() {
    return (
      <div
        style={{
          margin: this.margin,
        }}
        class={"saki-chat-edit-component "}
      >
        <saki-row
          width="100%"
          height="50px"
          padding={this.padding}
          alignItems="center"
        >
          <saki-col>
            <saki-row alignItems="center">
              <saki-col>
                <div
                  style={{
                    width: this.iconSize,
                    height: this.iconSize,
                  }}
                  class={"cr-icon"}
                >
                  <saki-icon color="#999" type="Pen"></saki-icon>
                </div>
              </saki-col>

              <saki-col padding="0 0 0 8px">
                <saki-row
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <saki-col>
                    <div class={"cr-nickname"}>{this.title}</div>
                  </saki-col>
                  <saki-col>
                    <div class={"cr-message text-elipsis"}>{this.message}</div>
                  </saki-col>
                </saki-row>
              </saki-col>
            </saki-row>
          </saki-col>
          <saki-col>
            <saki-button
              onTap={() => {
                this.close.emit();
              }}
              type={"CircleIconGrayHover"}
            >
              <saki-icon color="#666" type="Close"></saki-icon>
            </saki-button>
          </saki-col>
        </saki-row>
      </div>
    );
  }
}
