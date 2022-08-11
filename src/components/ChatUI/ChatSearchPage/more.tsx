import {
  Component,
  Element,
  EventEmitter,
  Event,
  h,
  Prop,
  State,
} from "@stencil/core";

@Component({
  tag: "saki-chat-search-more",
  styleUrl: "search.scss",
  shadow: true,
})
export class InputComponent {
  @Prop() title: string = "";

  textareaEl: any | HTMLTextAreaElement;
  @State() keyPressing: number = 0;

  @State() updateTime: number = 0;

  @Event() tap: EventEmitter;
  @Element() el: HTMLElement;
  componentWillLoad() {}
  componentDidLoad() {}

  render() {
    return (
      <div class={"saki-chat-search-more "}>
        <span
          onClick={() => {
            this.tap.emit();
          }}
          class={"sm-title"}
        >
          {this.title}
        </span>
      </div>
    );
  }
}
