import {
  Component,
  Prop,
  Event,
  EventEmitter,
  h,
} from "@stencil/core";

@Component({
  tag: "saki-chat-reply",
  styleUrl: "reply.scss",
  shadow: true,
})
export class ChatReplyComponent {
  @Prop() nickname = "";
  @Prop() message = "";
  @Prop() imageSrc = "";
  @Event() close: EventEmitter;
  componentDidLoad() {}
  render() {
    return (
      <div class={"saki-chat-reply-component "}>
        <saki-row
          width="100%"
          height="50px"
          padding="0 10px"
          alignItems="center"
        >
          <saki-col>
            <saki-row alignItems="center">
              <saki-col>
                <div class={"cr-reply-icon"}>
                  <saki-icon color="#999" type="Reply"></saki-icon>
                </div>
                {this.imageSrc ? (
                  <saki-images
                    width="40px"
                    height="40px"
                    border-radius="4px"
                    src={this.imageSrc}
                  ></saki-images>
                ) : (
                  ""
                )}
              </saki-col>

              <saki-col padding="0 0 0 8px">
                <saki-row
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <saki-col>
                    <div class={"cr-nickname"}>{this.nickname}</div>
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
