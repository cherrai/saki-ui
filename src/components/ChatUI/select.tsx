import { Component, Prop, Element, h } from "@stencil/core";

@Component({
  tag: "saki-chat-select",
  styleUrl: "select.scss",
  shadow: true,
})
export class ChatSelectComponent {
  @Prop() visible: boolean = false;
  @Element() el: HTMLElement;

  componentDidLoad() {}
  render() {
    return (
      <saki-transition
        animation-duration={300}
        class-name="sc-select-transition"
        in={this.visible}
      >
        <div class={"saki-chat-select-component "}>
          <saki-row
            width="100%"
            height="100%"
            padding="0 20px"
            alignItems="center"
          >
            <saki-col>
              <slot name="left"></slot>
            </saki-col>
            <saki-col>
              <slot name="right"></slot>
            </saki-col>
          </saki-row>
        </div>
      </saki-transition>
    );
  }
}
