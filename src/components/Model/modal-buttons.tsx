import { Component, Element, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-modal-buttons",
  styleUrl: "modal.scss",
  // shadow: true,
})
export class ModalButtonsComponent {
  @Prop() textAlign: string = "";
  @Prop() margin: string = "";
  @Prop() padding: string = "";
  @Prop() fontSize: string = "";
  @Prop() flexButton = false;
  @Element() el: HTMLElement;
  componentDidLoad() {}
  render() {
    return (
      <div
        style={{
          ...["fontSize", "textAlign", "padding", "margin"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={
          "saki-modal-buttons-component " +
          (this.flexButton ? " flexButton " : "")
        }
      >
        <slot></slot>
      </div>
    );
  }
}
