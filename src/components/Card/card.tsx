import {
  Component,
  Event,
  EventEmitter,
  Prop,
  Element,
  h,
} from "@stencil/core";

@Component({
  tag: "saki-card",
  styleUrl: "card.scss",
  shadow: true,
})
export class CardComponent {
  @Prop() border: boolean = false;
  @Prop() title = "";
  @Prop() hideTitle = false;
  @Prop() subtitle = "";
  @Prop() hideSubtitle = false;
  @Element() el: HTMLElement;
  @Event() tap: EventEmitter;
  @Event() changestreamid: EventEmitter;
  componentDidLoad() {}
  render() {
    return (
      <div
        style={{}}
        class={"saki-card-component " + (this.border ? "border " : "")}
      >
        {!this.hideTitle ? (
          <div class="c-title">
            <slot name="title"></slot>
            {this.title}
          </div>
        ) : (
          ""
        )}
        {!this.hideSubtitle ? (
          <div class="c-subtitle">
            <slot name="subtitle"></slot>
            {this.subtitle}
          </div>
        ) : (
          ""
        )}

        <div class="c-main">
          <slot></slot>
        </div>
      </div>
    );
  }
}
