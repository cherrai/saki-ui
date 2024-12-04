import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
// import 'cropperjs/dist/cropper.css';
// import Cropper from "cropperjs";

@Component({
  tag: "saki-avatar-select",
  styleUrls: ["avatar-select.scss"],
  // shadow: true,
})
export class AvatarComponent {
  @Prop() src: string = "";
  @Prop() visible: boolean = false;
  @Prop() list: string = "";
  @Prop() full: boolean = false;

  @Prop() cancelText: string = "Cancel";
  @Prop() selectText: string = "Select";

  @State() listArr: string[] = [];
  @State() selectSrc: string = "";

  @Event() select: EventEmitter;
  @Event() close: EventEmitter;
  @Event() upload: EventEmitter;
  @Element() el: HTMLElement;

  @Watch("list")
  watchStyle() {
    this.listArr = this.list.split("////");
  }
  @Method()
  async setList(list: string[]) {
    this.listArr = list;
  }
  componentDidLoad() {
    this.listArr = this.list.split("////");
  }
  render() {
    return (
      <saki-modal
        width="100%"
        height={this.full ? "100%" : "auto"}
        maxWidth={this.full ? "100%" : "500px"}
        maxHeight={this.full ? "100%" : "auto"}
        mask
        onClose={() => {
          this.close.emit();
        }}
        visible={this.visible}
        z-index="1100"
      >
        <div class={"avatar-select-component"}>
          <div class={"as-list"}>
            {this.listArr.map((v) => {
              return (
                <div
                  onClick={() => {
                    if (v === "Upload") {
                      this.upload.emit();
                      return;
                    }
                    this.selectSrc = v;
                  }}
                  class={
                    "as-l-item " +
                    (this.src === v ? "active " : "") +
                    (v === this.selectSrc ? "select " : "")
                  }
                >
                  {v === "Upload" ? (
                    <saki-icon
                      width="30px"
                      height="30px"
                      color="#666"
                      type="Camera"
                    ></saki-icon>
                  ) : (
                    <saki-avatar
                      width="82px"
                      height="82px"
                      border-radius="50%"
                      src={v}
                    ></saki-avatar>
                  )}
                </div>
              );
            })}
          </div>
          <div class={"as-buttons"}>
            <saki-button
              onTap={() => {
                this.close.emit();
              }}
              margin="0 0 0 10px"
              padding="10px 10px"
              type="Normal"
            >
              {this.cancelText}
            </saki-button>
            <saki-button
              onTap={() => {
                this.select.emit(this.selectSrc);
              }}
              margin="0 0 0 10px"
              padding="10px 10px"
              type="Primary"
            >
              {this.selectText}
            </saki-button>
          </div>
        </div>
      </saki-modal>
    );
  }
}
