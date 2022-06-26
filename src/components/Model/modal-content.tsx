import { Component, Element, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-modal-content",
  styleUrl: "modal.scss",
  // shadow: true,
})
export class ModalContentComponent {
  @Prop() content: string = "";
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
        class={"saki-modal-content-component "}
      >
        {this.content}
      </div>
    );
  }
}
