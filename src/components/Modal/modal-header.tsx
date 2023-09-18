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
  @Prop() titleAvatar: string = "";
  @Prop() titleAvatarText: string = "";
  @Prop() title: string = "";
  @Prop() border: boolean = false;
  @Prop() height: string = "56px";
  @Prop() fontSize: string = "";
  @Prop() closeIcon: boolean = true;
  @Prop() backIcon: boolean = false;
  @Event() tap: EventEmitter;
  @Event({
    bubbles: false,
  })
  close: EventEmitter;
  @Event({
    bubbles: false,
    composed: false,
  })
  back: EventEmitter;
  @Element() el: HTMLElement;
  componentDidLoad() {}
  render() {
    return (
      <div
        style={{
          ...["height"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-modal-header-component " + (this.border ? "border" : "")}
      >
        <div class="modal-left">
          {this.closeIcon ? (
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
          ) : (
            ""
          )}
          {this.backIcon ? (
            <saki-button
              onTap={() => {
                this.back.emit();
              }}
              width="36px"
              height="36px"
              margin="10px"
              type="CircleIconGrayHover"
            >
              <svg
                class="close-icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1580"
                width={"18px"}
                height={"18px"}
              >
                <path
                  d="M395.21518 513.604544l323.135538-312.373427c19.052938-18.416442 19.052938-48.273447 0-66.660212-19.053961-18.416442-49.910737-18.416442-68.964698 0L291.75176 480.290811c-19.052938 18.416442-19.052938 48.273447 0 66.660212l357.633237 345.688183c9.525957 9.207709 22.01234 13.796214 34.497699 13.796214 12.485359 0 24.971741-4.588505 34.466999-13.82896 19.052938-18.416442 19.052938-48.242747 0-66.660212L395.21518 513.604544z"
                  p-id="1581"
                ></path>
              </svg>
            </saki-button>
          ) : (
            ""
          )}
        </div>
        <div class="modal-center">
          {this.titleAvatar || this.titleAvatarText ? (
            <saki-avatar
              width={"24px"}
              height={"24px"}
              borderRadius={"50%"}
              margin={"0 6px 0 0"}
              nickname={this.titleAvatarText}
              src={this.titleAvatar}
            ></saki-avatar>
          ) : (
            ""
          )}

          <span
            style={{
              ...["fontSize"].reduce(
                (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
                {}
              ),
            }}
            title={this.title}
            class="modal-title text-elipsis"
          >
            {this.title}
          </span>
        </div>
        <div class="modal-right">
          <slot name="right"></slot>
        </div>
      </div>
    );
  }
}
