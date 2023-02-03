import {
  Component,
  Prop,
  Event,
  EventEmitter,
  h,
} from "@stencil/core";

@Component({
  tag: "saki-chat-edit",
  styleUrl: "edit.scss",
  shadow: true,
})
export class ChatEditComponent {
  @Prop() title = "";
  @Prop() message = "";
  @Event() close: EventEmitter;
  componentDidLoad() {}
  render() {
    return (
      <div class={"saki-chat-edit-component "}>
        <saki-row
          width="100%"
          height="50px"
          padding="0 10px"
          alignItems="center"
        >
          <saki-col>
            <saki-row alignItems="center">
              <saki-col>
                <div class={"cr-icon"}>
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
