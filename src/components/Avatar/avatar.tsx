import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
} from "@stencil/core";
// import 'cropperjs/dist/cropper.css';
// import Cropper from "cropperjs";

@Component({
  tag: "saki-avatar",
  styleUrls: ["avatar.scss"],
  // shadow: true,
})
export class AvatarComponent {
  @Prop() src: string = "";
  @Prop() nickname: string = "";

  @Prop() defaultSrc: string = "";
  @Prop() defaultBackgroundColor: string = "";
  @Prop() defaultIcon: string = "";
  @Prop() defaultIconSize: string = "18px";
  @Prop() width: string = "40px";
  @Prop() height: string = "40px";
  @Prop() cropContainerWidth: string = "";
  @Prop() cropContainerHeight: string = "";
  @Prop() outputWidth: number = 400;
  @Prop() outputHeight: number = 400;
  @Prop() outputQuality: number = 0.9;

  @Prop() border: string = "";
  @Prop() boxShadow: string = "";
  @Prop() borderHover: string = "";
  @Prop() borderActive: string = "";
  @Prop() borderRadius: string = "";
  @Prop() padding: string = "";
  @Prop() margin: string = "";

  // 角标
  @Prop() mark: boolean = false;
  @Prop() markStatus: "Offline" | "Online" = "Offline";
  @Prop() markBackgroundColor: string = "";
  @Prop() markTop: string = "";
  @Prop() markRight: string = "";
  @Prop() markBottom: string = "";
  @Prop() markLeft: string = "";
  @Prop() markWidth: string = "";
  @Prop() markHeight: string = "";

  @Prop() editIcon: boolean = false;
  @Prop() editIconSize: string = "18px";
  @Prop() editIconShowMode: "Hover" | "Always" = "Hover";
  @Prop() editIconBackgroundColor: string = "rgba(0, 0, 0, 0.3)";
  @Prop() crop: boolean = false;
  @Prop() anonymousIcon: boolean = false;

  @Prop() lazyload: boolean = true;

  @State() showEditModal: boolean = false;
  colors = [
    "#f09cb2",
    "#5ec9f0",
    "#f09cb2",
    "#5ec9f0",
    "#1f7aa9",
    "#feba6b",
    "#26b4b2",
    "#f5d6ef",
    "#fc5e6b",
    "#7c0e7a",
  ];
  cropEl: HTMLSakiAvatarEditElement;

  @Event() tap: EventEmitter;
  @Event() markClick: EventEmitter;
  @Event() output: EventEmitter;
  @Event() cancel: EventEmitter;
  @Event() edit: EventEmitter;
  @Element() el: HTMLElement;

  componentDidLoad() {
    // console.log("this.lazyload avatar", this.lazyload, this.src);
    // setTimeout(() => {
    //   this.onEdit();
    // }, 4000);
  }
  onEdit() {
    if (this.crop) {
      this.cropEl.select();
    } else {
      this.tap.emit();
    }
  }
  render() {
    return (
      <div
        style={{
          ...[
            "fontSize",
            "margin",
            "padding",
            "borderRadius",
            "boxShadow",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          "--saki-avatar-width": this.width,
          "--saki-avatar-height": this.height,
          "--saki-avatar-border": this.border,
          "--saki-avatar-border-hover": this.borderHover,
          "--saki-avatar-border-active": this.borderActive,
        }}
        class={"saki-avatar-component " + this.markStatus}
      >
        {this.src ? (
          <saki-images
            onClick={() => {
              this.onEdit();
            }}
            defaultBackgroundColor={this.defaultBackgroundColor}
            defaultSrc={this.defaultSrc}
            width={this.width}
            height={this.height}
            borderRadius={this.borderRadius}
            src={this.src}
            lazyload={this.lazyload}
          ></saki-images>
        ) : this.nickname ? (
          <div
            style={{
              width: this.width,
              height: this.height,
              lineHeight: "calc( " + this.height + " - 4px )",
              fontSize: "calc( " + this.width + " / 2 )",
              borderRadius: this.borderRadius,
              backgroundColor: this.colors[this.nickname.charCodeAt(0) % 10],
            }}
            data-color-code={this.nickname.charCodeAt(0) % 10}
            data-color-hex={this.colors[this.nickname.charCodeAt(0) % 10]}
            class={"avatar-word"}
          >
            {this.nickname}
          </div>
        ) : this.defaultIcon ? (
          <div class={"avatar-icon"}>
            <saki-icon
              width={this.defaultIconSize}
              height={this.defaultIconSize}
              color="#fff"
              type={this.defaultIcon as any}
            ></saki-icon>
          </div>
        ) : (
          ""
        )}
        {this.anonymousIcon ? (
          <div class="anonymous-icon">
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="36691"
            >
              <path
                d="M511.671 112c205.821 0 372.672 166.85 372.672 372.671v339.2c0 34.19-27.717 61.906-61.906 61.906a61.906 61.906 0 0 1-30.872-8.247l-31.819-18.306c-37.746-21.716-84.188-21.743-121.959-0.069l-64.185 36.832c-37.693 21.63-84.03 21.651-121.743 0.055L386.994 858.9c-37.601-21.532-83.785-21.579-121.43-0.123l-32.907 18.754c-30.056 17.13-68.309 6.651-85.439-23.405A62.64 62.64 0 0 1 139 823.108V484.671C139 278.851 305.85 112 511.671 112zM386.034 426.035c-37.21 0-67.373 30.128-67.373 67.293 0 37.166 30.164 67.294 67.373 67.294s67.373-30.128 67.373-67.294c0-37.165-30.164-67.293-67.373-67.293z m260.87 0c-37.21 0-67.373 30.128-67.373 67.293 0 37.166 30.164 67.294 67.373 67.294s67.373-30.128 67.373-67.294c0-37.165-30.164-67.293-67.373-67.293z"
                p-id="36692"
              ></path>
            </svg>
          </div>
        ) : (
          ""
        )}
        {this.editIcon ? (
          <div
            onClick={() => {
              this.onEdit();
              this.edit.emit();
            }}
            onBlur={() => {
              console.log("blur");
            }}
            style={{
              backgroundColor: this.editIconBackgroundColor,
            }}
            class={"avatar-edit " + this.editIconShowMode}
          >
            <saki-icon
              width={this.defaultIconSize}
              height={this.defaultIconSize}
              color="#fff"
              type="Camera"
            ></saki-icon>
          </div>
        ) : (
          ""
        )}
        {this.crop ? (
          <saki-modal
            maxWidth={this.cropContainerWidth}
            maxHeight={this.cropContainerHeight}
            mask
            onClose={() => {
              this.showEditModal = false;
              this.cancel.emit();
            }}
            visible={this.showEditModal}
          >
            <saki-avatar-edit
              ref={(e) => {
                this.cropEl = e;
              }}
              width={this.cropContainerWidth}
              height={this.cropContainerHeight}
              outputWidth={this.outputWidth}
              outputHeight={this.outputHeight}
              outputQuality={this.outputQuality}
              onOutput={(e) => {
                this.output.emit(e.detail);
                this.showEditModal = false;
              }}
              onCancel={() => {
                this.showEditModal = false;
                this.cancel.emit();
              }}
              onLoadfile={() => [(this.showEditModal = true)]}
            ></saki-avatar-edit>
          </saki-modal>
        ) : (
          ""
        )}
        {this.mark ? (
          <div
            onClick={() => {
              this.markClick.emit();
            }}
            style={{
              backgroundColor: this.markBackgroundColor,
              top: this.markTop,
              right: this.markRight,
              bottom: this.markBottom,
              left: this.markLeft,
              width: this.markWidth,
              height: this.markHeight,
            }}
            class={"avatar-mark " + this.markStatus}
          ></div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
