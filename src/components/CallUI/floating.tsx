import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";

@Component({
  tag: "saki-call-floating",
  styleUrl: "floating.scss",
  shadow: true,
})
export class CallFloatingComponent {
  @Prop({ mutable: true }) avatar: string = "";
  @Prop({ mutable: true }) nickname: string = "";
  @Prop({ mutable: true }) time: string = "";
  @Prop({ mutable: true }) buttonText: string = "";
  @Event() hangup: EventEmitter;
  @Event() message: EventEmitter;
  @Event() maximize: EventEmitter;

  @Event() changestreamid: EventEmitter;
  componentDidLoad() {}
  render() {
    return (
      <div class={"saki-call-floating-component "}>
        <div class={"floating-header"}>
          <div class={"floating-h-logo"}>
            <saki-avatar
              width={"40px"}
              height={"40px"}
              borderRadius={"50%"}
              nickname={this.nickname}
              src={this.avatar}
            ></saki-avatar>
          </div>
          <div class={"floating-h-content"}>
            <div class={"floating-h-c-top"}>
              <div class={"floating-h-c-t-nickname text-elipsis"}>
                {this.nickname}
              </div>
              <div class={"floating-h-c-t-time"}>{this.time}</div>
            </div>
            <div class={"floating-h-c-bottom"}></div>
          </div>
        </div>
        <div class={"floating-content"}>
          <slot></slot>
        </div>
        <div class={"floating-footer"}>
          <div class={"floating-f-left"}>
            <saki-button
              width="30px"
              height="30px"
              borderRadius="50%"
              border="none"
              bgActiveColor={"#ccc"}
              bgHoverColor={"#eee"}
              onTap={() => {
                this.message.emit();
              }}
            >
              <svg
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1306"
                fill="#999999"
                width="18"
                height="18"
              >
                <path
                  d="M800 102.4H281.6c-96 0-179.2 83.2-179.2 179.2V640c0 96 83.2 179.2 179.2 179.2h19.2s0 6.4 6.4 6.4l70.4 76.8c12.8 12.8 32 12.8 38.4 0l64-70.4 6.4-6.4h313.6c96 0 179.2-83.2 179.2-179.2V281.6c0-96-83.2-179.2-179.2-179.2zM294.4 531.2c-38.4 0-64-32-64-70.4 0-38.4 32-70.4 70.4-70.4 38.4 0 70.4 32 70.4 70.4-6.4 38.4-38.4 70.4-76.8 70.4z m243.2 0c-38.4 0-70.4-32-70.4-70.4 0-38.4 32-70.4 70.4-70.4 38.4 0 70.4 32 70.4 70.4 0 38.4-32 70.4-70.4 70.4z m249.6 0c-38.4 0-70.4-32-70.4-70.4 0-38.4 32-70.4 70.4-70.4 38.4 0 70.4 32 70.4 70.4-6.4 38.4-38.4 70.4-70.4 70.4z"
                  p-id="1307"
                ></path>
              </svg>
            </saki-button>
            <saki-button
              width="30px"
              height="30px"
              borderRadius="50%"
              border="none"
              bgActiveColor={"#ccc"}
              bgHoverColor={"#eee"}
              onTap={() => {
                this.maximize.emit();
              }}
            >
              <svg
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1447"
                fill="#999999"
                width="18"
                height="18"
              >
                <path
                  d="M470.624 553.376a32 32 0 0 1 2.656 42.24l-2.656 3.008L269.28 800l145.984 0.032a32 32 0 0 1 31.776 28.256l0.224 3.744a32 32 0 0 1-28.288 31.776l-3.712 0.224H192l-2.4-0.096-4.032-0.544-3.552-0.96-3.552-1.408-3.136-1.664-3.072-2.144-2.88-2.56a32.32 32.32 0 0 1-3.104-3.584l-2.272-3.52-1.728-3.648-1.12-3.36-0.96-4.8L160 832v-224.128a32 32 0 0 1 63.776-3.712l0.224 3.712-0.032 146.848 201.408-201.344a32 32 0 0 1 45.248 0zM608.736 160H832l2.4 0.096 4.032 0.544 3.552 0.96 3.552 1.408 3.136 1.664 3.072 2.144 2.88 2.56c1.152 1.12 2.176 2.336 3.104 3.584l2.272 3.52 1.728 3.648 1.12 3.36 0.96 4.8L864 192v224.128a32 32 0 0 1-63.776 3.712L800 416.128v-146.88l-201.376 201.376a32 32 0 0 1-47.904-42.24l2.656-3.008L754.688 224h-145.92a32 32 0 0 1-31.808-28.256L576.736 192a32 32 0 0 1 28.288-31.776L608.736 160z"
                  p-id="1448"
                ></path>
              </svg>
            </saki-button>
          </div>
          <div class={"floating-f-right"}>
            <saki-button
              width="70px"
              height="26px"
              type="Primary"
              fontSize="12px"
              onClick={() => {
                console.log(21);
                this.hangup.emit();
              }}
              onTap={() => {
                console.log(21);
                this.hangup.emit();
              }}
            >
              {this.buttonText}
            </saki-button>
          </div>
        </div>
      </div>
    );
  }
}
