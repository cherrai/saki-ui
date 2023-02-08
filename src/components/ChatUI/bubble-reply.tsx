import {
  Component,
  Event,
  h,
  EventEmitter,
  Prop,
} from "@stencil/core";
// import * as nyanyalog from "nyanyajs-log";
// import "moment/dist/locale/zh-cn";
@Component({
  tag: "saki-chat-bubble-reply",
  styleUrl: "bubble.scss",
  shadow: true,
})
export class ChatBubbleReplyComponent {
  // 回复的内容
  @Prop() nickname = "";
  @Prop() message = "";
  @Prop() imageSrc = "";
  @Event() goto: EventEmitter;
  render() {
    return (
      <div class={"saki-chat-bubble-reply-component "}>
        <saki-row
          width="100%"
          height="50px"
          padding="0 0px"
          alignItems="center"
        >
          <saki-col>
            <saki-row alignItems="center">
              <saki-col>
                <div
                  onClick={() => {
                    this.goto.emit();
                  }}
                  class={"cr-reply-icon"}
                >
                  <saki-icon color="#666" type="Reply"></saki-icon>
                </div>
                {this.imageSrc ? (
                  <saki-images
                    width="40px"
                    height="40px"
                    border-radius="4px"
                    margin="0 8px 0 0"
                    src={this.imageSrc}
                  ></saki-images>
                ) : (
                  ""
                )}
              </saki-col>

              <saki-col>
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
        </saki-row>
      </div>
    );
  }
}
