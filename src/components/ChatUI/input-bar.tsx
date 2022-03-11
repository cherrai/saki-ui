import { Component, Element, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-chat-input-bar",
  styleUrl: "input-bar.scss",
  shadow: true,
})
export class ChatInputBarComponent {
  @Prop() value: string = "";
  @Element() el: HTMLElement;

  componentDidLoad() {}
  render() {
    return <div class={"saki-chat-input-bar-component "}></div>;
  }
}
