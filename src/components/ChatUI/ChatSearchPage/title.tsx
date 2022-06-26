import {
  Component,
  Event,
  EventEmitter,
  Element,
  h,
  Prop,
  State,
  Watch,
} from "@stencil/core";

@Component({
  tag: "saki-chat-search-title",
  styleUrl: "search.scss",
  shadow: true,
})
export class InputComponent {
  @Prop() title: string = "";
  @Prop() subtitle: string = "";

  textareaEl: any | HTMLTextAreaElement;
  @State() keyPressing: number = 0;

  @State() updateTime: number = 0;

  @Event() tap: EventEmitter;
  @Element() el: HTMLElement;
  @Watch("value")
  watchValueFunc() {}
  componentWillLoad() {}
  componentDidLoad() {}

  render() {
    return (
      <div class={"saki-chat-search-title-component "}>
        <div
          onClick={() => {
            this.tap.emit("title");
          }}
          class={"st-title"}
        >
          {this.title}
        </div>
        <div
          onClick={() => {
            this.tap.emit("subtitle");
          }}
          class={"st-subtitle"}
        >
          {this.subtitle}
        </div>
      </div>
    );
  }
}
