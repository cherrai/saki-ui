import { Component, Element, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-modal-buttons",
  styleUrl: "modal.scss",
  // shadow: true,
})
export class ModalButtonsComponent {
  @Prop() textAlign: string = "";
  @Prop() margin: string = "";
  @Prop() fontSize: string = "";
  @Element() el: HTMLElement;
  componentDidLoad() {}
  render() {
    return (
      <div
        style={{
          ...["fontSize", "textAlign", "margin"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-modal-buttons-component "}
      >
        <slot></slot>
      </div>
    );
  }
}
