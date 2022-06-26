import { Component, Element, h, Prop, State, Watch } from "@stencil/core";

@Component({
  tag: "saki-chat-search",
  styleUrl: "search.scss",
  shadow: true,
})
export class InputComponent {
  @Prop() backgroundColor: string = "";

  textareaEl: any | HTMLTextAreaElement;
  @State() keyPressing: number = 0;

  @State() updateTime: number = 0;

  @Element() el: HTMLElement;
  @Watch("value")
  watchValueFunc() {}
  componentWillLoad() {}
  componentDidLoad() {}

  render() {
    return (
      <div class={"saki-chat-search-component "}>
        <slot></slot>
      </div>
    );
  }
}
