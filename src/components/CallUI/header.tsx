import {
  Component,
  Event,
  EventEmitter,
  Prop,
  Element,
  h,
} from "@stencil/core";
@Component({
  tag: "saki-call-header",
  styleUrl: "header.scss",
  shadow: true,
})
export class CallHeaderComponent {
  @Prop() centerText: string = "";
  @Event() minimize: EventEmitter;
  @Element() el: HTMLElement;

  componentDidLoad() {}
  render() {
    return (
      <div class={"saki-call-header-component"}>
        <div class="call-h-left">
          <div
            onClick={() => {
              this.minimize.emit();
            }}
            class="call-h-l-close"
          >
            <svg
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6333"
              width="28"
              fill="#fff"
              height="28"
            >
              <path
                d="M224.736 544H448l2.4 0.096 4.032 0.544 3.552 0.96 3.552 1.408 3.136 1.664 3.072 2.144 2.88 2.56c1.152 1.12 2.176 2.336 3.104 3.584l2.272 3.52 1.728 3.648 1.12 3.36 0.96 4.8L480 576v224.128a32 32 0 0 1-63.776 3.712L416 800.128v-146.88l-201.376 201.376a32 32 0 0 1-47.904-42.24l2.656-3.008L370.688 608h-145.92a32 32 0 0 1-31.808-28.256L192.736 576a32 32 0 0 1 28.288-31.776L224.736 544zM854.624 169.376a32 32 0 0 1 2.656 42.24l-2.656 3.008L653.28 416l145.984 0.032a32 32 0 0 1 31.776 28.256l0.224 3.744a32 32 0 0 1-28.288 31.776l-3.712 0.224-225.664-0.096-4.032-0.544-3.552-0.96-3.552-1.408-3.136-1.664-3.072-2.144-2.88-2.56a32.32 32.32 0 0 1-3.104-3.584l-2.272-3.52-1.728-3.648-1.12-3.36-0.96-4.8L544 448V223.872a32 32 0 0 1 63.776-3.712l0.224 3.712v146.816l201.376-201.312a32 32 0 0 1 45.248 0z"
                p-id="6334"
              ></path>
            </svg>
            <slot name="left"></slot>
          </div>
        </div>
        <div class="call-h-center">
          {/* <div class="call-h-l-time">
							00:13:14
						</div> */}
          <div class="call-h-l-tip">
            {this.centerText}
            {/* {{
                
              }} */}
          </div>
          <slot name="center"></slot>
        </div>
        <div class="call-h-right">
          <slot name="right"></slot>
        </div>
      </div>
    );
  }
}
