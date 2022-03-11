import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
} from "@stencil/core";

@Component({
  tag: "saki-modal-header",
  styleUrl: "modal-header.scss",
  // shadow: true,
})
export class ModalHeaderComponent {
  @Prop() title: string = "";
  @Prop() border: boolean = false;
  @Event() tap: EventEmitter;
  @Event() close: EventEmitter;
  @Element() el: HTMLElement;
  componentDidLoad() {}
  render() {
    return (
      <div
        class={"saki-modal-header-component " + (this.border ? "border" : "")}
      >
        <div class="modal-left">
          <div
            onClick={() => {
              this.close.emit();
            }}
            class="modal-l-close"
          >
            <svg
              // t="1639418573603"
              class=" icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1213"
            >
              <path
                d="M556.8 512L832 236.8c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2l-275.2-277.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l275.2 277.333333-277.333333 275.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333L512 556.8 787.2 832c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8L556.8 512z"
                p-id="1214"
              ></path>
            </svg>
          </div>
        </div>
        <div class="modal-center">
          <div class="modal-title">{this.title}</div>
        </div>
        <div class="modal-right">
          <div></div>
        </div>
      </div>
    );
  }
}
