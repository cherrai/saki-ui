import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
} from "@stencil/core";
// import 'cropperjs/dist/cropper.css';
import Cropper from "cropperjs";

@Component({
  tag: "saki-avatar-edit",
  styleUrls: ["avatar-edit.scss"],
  // shadow: true,
})
export class AvatarEditComponent {
  @Prop() outputWidth: number = 400;
  @Prop() outputHeight: number = 400;
  @Prop() outputQuality: number = 0.9;
  @Prop() width: string = "";
  @Prop() height: string = "";
  @Prop() minWidth: string = "";
  @Prop() minHeight: string = "";
  @Prop() maxWidth: string = "";
  @Prop() maxHeight: string = "";
  @State() showModal: boolean = false;
  @State() showImg: boolean = false;
  @State() file: File;
  @State() src: string;
  @State() cropper: Cropper;

  @Event({
    eventName: "loadfile",
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  loadfile: EventEmitter;
  @Event() output: EventEmitter;
  @Event() cancel: EventEmitter;
  @Element() el: HTMLElement;
  componentDidLoad() {}
  @Method()
  async select() {
    this.close();

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.oninput = () => {
      console.log(input);
      if (input.files.length) {
        this.file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.src = e.target.result.toString();
          this.loadfile.emit();
        };
        reader.readAsDataURL(this.file);
      }
    };
    input.onblur = () => {
      console.log("close");
    };
    input.onfocus = () => {
      console.log("close");
    };
    input.click();
  }
  close() {
    this.showImg = false;
    this.file = null;
    this.src = "";
    this.cropper?.destroy();
  }
  loadCropper() {
    console.log("编辑头像");
    // const image = document.getElementById("image");
    this.cropper = new Cropper(
      this.el.querySelector(".saki-avatar-edit-component img"),
      {
        minCanvasWidth: this.outputWidth,
        minCanvasHeight: this.outputHeight,

        center: true,
        // autoCrop: false,
        viewMode: 2,
        aspectRatio: 1,
        rotatable: true,
        background: false,
        ready: () => {
          this.showImg = true;
        },
        // crop(event) {
        //   console.log(event.detail.x);
        //   console.log(event.detail.y);
        //   console.log(event.detail.width);
        //   console.log(event.detail.height);
        //   console.log(event.detail.rotate);
        //   console.log(event.detail.scaleX);
        //   console.log(event.detail.scaleY);
        // },
      }
    );
    console.log(this.cropper);
    this.cropper;
  }
  render() {
    return (
      <div
        style={{
          ...[
            "width",
            "height",
            "maxWidth",
            "maxHeight",
            "minWidth",
            "minHeight",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-avatar-edit-component " + (this.showImg ? "showimg" : "")}
      >
        <div class={"ae-crop"}>
          <img
            onLoad={(e) => {
              console.log("图片加载了", e);
              this.loadCropper();
            }}
            src={this.src}
            alt=""
          />
        </div>
        <div class={"ae-wrap"}>
          <div class={"ae-buttons"}>
            <div
              onClick={() => {
                this.cancel.emit();
                this.close();
              }}
              class={"ae-button-item"}
            >
              Cancel
            </div>
            <div
              class={"ae-button-item"}
              onClick={() => {
                this.cropper.reset();
              }}
            >
              <svg
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3280"
              >
                <path
                  d="M664.8 738.7c-50.9 37.7-114 55.1-176.9 48.7-2.9-0.3-5.8-0.8-8.8-1.2-5.6-0.8-11.3-1.6-16.8-2.7-3.4-0.7-6.7-1.5-10.1-2.4-5.4-1.2-10.7-2.6-16-4.3-2.5-0.8-5-1.7-7.5-2.6-14.6-5-28.7-11.3-42.1-18.9l-0.9-0.5c-29.6-17.1-55.8-39.6-77-66.4-1-1.3-2.1-2.8-3.1-4.2-37.8-49.6-58.3-110.3-58.1-172.6H309c1.7 0 3.2-0.9 4-2.4 0.8-1.5 0.7-3.3-0.2-4.7l-103.3-162c-0.8-1.3-2.2-2.1-3.7-2.1s-2.9 0.8-3.7 2.1l-103.3 162c-0.9 1.4-1 3.2-0.3 4.7 0.8 1.6 2.3 2.4 4 2.4h61.4c0 76.8 22.9 147.9 61.8 206.6 0.5 0.9 0.8 1.7 1.3 2.5 4.1 6 8.5 11.6 12.9 17.3 1.6 2.1 3.1 4.3 4.8 6.5 6.4 8.1 13.1 15.6 20.1 23.1l1.9 2c30.2 31.8 66.2 57.4 106.1 75.7l6.4 3c7.3 3.2 15 6 22.5 8.6 3.6 1.3 7.1 2.6 10.8 3.7 6.7 2.1 13.5 3.7 20.4 5.5 4.6 1.1 9.1 2.3 13.8 3.2 1.9 0.5 3.6 1 5.6 1.4 6.5 1.2 12.9 1.9 19.5 2.7l7 1c83.3 8.6 166.9-14.2 234.2-64.2 19-14.4 23.6-41.1 10.3-60.9-6.2-9.4-16-15.9-27.1-18-11-1.8-22.4 0.8-31.4 7.4z m196.9-226.9c0.1-73.2-21.2-144.9-61.4-206.1-0.6-1-1-2-1.6-2.9-4.9-7-9.9-13.9-15.3-20.6l-1.8-2.4c-34.5-44.1-79.2-79.2-130.2-102.3-1.4-0.6-2.8-1.3-4.2-2-8.1-3.4-16.2-6.5-24.5-9.4-3.1-1-6.1-2.2-9.2-3.1-7.2-2.2-14.5-4.2-21.9-5.9-4.1-0.9-8.2-2-12.3-2.9-2-0.4-3.9-1-5.9-1.5-5.5-1-11.1-1.4-16.6-2.1-3.7-0.5-7.6-1.1-11.4-1.6-9.2-0.9-18.4-1.3-27.6-1.5-1.7 0-3.4-0.3-5.1-0.3-72 0-142.1 23.1-200 65.9-19.1 14.3-23.6 41.1-10.4 60.9 6.2 9.4 16 15.9 27.1 18 11 2 22.4-0.6 31.3-7.3 51-37.7 114.2-55.1 177.3-48.7l7 1c6.4 0.7 12.6 1.7 18.7 3 2.7 0.5 5.4 1.2 8.1 1.9 6 1.4 12.1 3 18 4.8l5.5 2c6.8 2.3 13.3 4.7 19.9 7.6l2 1c39.1 17.7 73.4 44.6 99.9 78.3l0.5 0.7c39.2 50.1 60.4 111.9 60.2 175.5h-61.4c-1.7 0-3.2 0.9-4 2.4-0.8 1.5-0.7 3.3 0.3 4.7l103.4 162c0.8 1.3 2.2 2.1 3.7 2.1s2.9-0.8 3.7-2.1L926.8 519c0.1-0.1 0.2-0.3 0.3-0.4 2.2-2.8 0.1-6.9-3.5-6.8h-61.9z"
                  p-id="3281"
                ></path>
              </svg>
            </div>
            <div
              class={"ae-button-item"}
              onClick={() => {
                this.cropper.rotate(90);
              }}
            >
              <svg
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1165"
              >
                <path
                  d="M512 230.4V128l230.4 128-230.4 128v-102.4c-168.96 0-307.2 128-307.2 286.72V691.2H153.6v-122.88C153.6 381.44 314.88 230.4 512 230.4z"
                  p-id="1166"
                ></path>
                <path
                  d="M358.4 537.6v307.2c0 28.16 23.04 51.2 51.2 51.2h409.6c28.16 0 51.2-23.04 51.2-51.2V537.6c0-28.16-23.04-51.2-51.2-51.2H409.6c-28.16 0-51.2 23.04-51.2 51.2z m51.2 0h409.6v307.2H409.6V537.6z"
                  p-id="1167"
                ></path>
              </svg>
            </div>
            <div
              class={"ae-button-item"}
              onClick={() => {
                const cvs = this.cropper.getCroppedCanvas({
                  width: this.outputWidth,
                  height: this.outputHeight,
                });

                const base64url = cvs.toDataURL("image/jpeg", 0.9);

                cvs.toBlob(
                  (e) => {
                    this.output.emit({
                      base64Url: base64url,
                      blob: e,
                    });
                    this.close();
                  },
                  "image/jpeg",
                  0.9
                );
              }}
            >
              Done
            </div>
          </div>
        </div>
      </div>
    );
  }
}
