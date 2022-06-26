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
  @Prop() width: string = "40px";
  @Prop() height: string = "40px";
  @Prop() cropContainerWidth: string = "";
  @Prop() cropContainerHeight: string = "";
  @Prop() outputWidth: number = 400;
  @Prop() outputHeight: number = 400;
  @Prop() outputQuality: number = 0.9;

  @Prop() border: string = "";
  @Prop() borderHover: string = "";
  @Prop() borderActive: string = "";
  @Prop() borderRadius: string = "";
  @Prop() padding: string = "";
  @Prop() margin: string = "";
  @Prop() editIcon: boolean = false;
  @Prop() editIconShowMode: "Hover" | "Always" = "Hover";
  @Prop() editIconBackgroundColor: string = "rgba(0, 0, 0, 0.3)";
  @Prop() crop: boolean = false;
  @Prop() anonymousIcon: boolean = false;

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
  @Event() output: EventEmitter;
  @Event() cancel: EventEmitter;
  @Event() edit: EventEmitter;
  @Element() el: HTMLElement;
  componentDidLoad() {
    // setTimeout(() => {
    //   this.onEdit();
    // }, 4000);
  }
  onEdit() {
    if (this.crop) {
      this.cropEl.select();
    }
  }
  render() {
    return (
      <div
        style={{
          ...["fontSize", "margin", "padding", "borderRadius"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
          "--saki-avatar-width": this.width,
          "--saki-avatar-height": this.height,
          "--saki-avatar-border": this.border,
          "--saki-avatar-border-hover": this.borderHover,
          "--saki-avatar-border-active": this.borderActive,
        }}
        class={"saki-avatar-component "}
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
          ></saki-images>
        ) : (
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
            class={"edit " + this.editIconShowMode}
          >
            <svg
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1151"
            >
              <path
                d="M891.787816 243.009639 730.550575 243.009639l-21.103644-41.932018c-2.450818-5.426593-24.76094-53.007261-56.271608-53.007261L366.81127 148.07036c-31.510668 0-53.819766 47.580668-56.087413 52.640917l-21.273513 42.298362L128.198777 243.009639c-31.485085 0-57.110719 25.494651-57.110719 56.83545L71.088058 821.820278c0 31.354102 25.625634 56.861032 57.110719 56.861032L891.774513 878.68131c31.485085 0 57.110719-25.507954 57.110719-56.861032l0.026606-66.443271L948.911838 603.052762 948.911838 299.845089C948.910814 268.50429 923.286204 243.009639 891.787816 243.009639zM510.976694 739.325425c-103.498212 0-187.701986-83.758636-187.701986-186.719612 0-102.947673 84.203774-186.706309 187.701986-186.706309s187.701986 83.758636 187.701986 186.706309C698.67868 655.567813 614.474906 739.325425 510.976694 739.325425zM789.573853 408.743288c-25.481348 0-46.217624-20.736277-46.217624-46.217624 0-25.481348 20.736277-46.204321 46.217624-46.204321 25.481348 0 46.204321 20.722974 46.204321 46.204321C835.779198 388.007011 815.055201 408.743288 789.573853 408.743288z"
                p-id="1152"
              ></path>
              <path
                d="M510.976694 429.027264c-68.579935 0-124.365472 55.432497-124.365472 123.579573 0 68.160379 55.786561 123.605156 124.365472 123.605156s124.365472-55.4458 124.365472-123.605156C635.342166 484.45976 579.555605 429.027264 510.976694 429.027264z"
                p-id="1153"
              ></path>
            </svg>
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
      </div>
    );
  }
}
