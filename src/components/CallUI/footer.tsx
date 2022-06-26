import {
  Component,
  EventEmitter,
  Prop,
  Event,
  Element,
  h,
} from "@stencil/core";
@Component({
  tag: "saki-call-footer",
  styleUrl: "footer.scss",
  shadow: true,
})
export class CallFooterComponent {
  @Prop() micIsOn: boolean = true;
  @Prop() videoIsOn: boolean = true;
  @Prop() screenShareIsOn: boolean = true;
  @Event() switchmic: EventEmitter;
  @Event() switchvideo: EventEmitter;
  @Event() switchscreenshare: EventEmitter;
  @Event() message: EventEmitter;
  @Event() hangup: EventEmitter;
  @Element() el: HTMLElement;

  componentDidLoad() {}
  render() {
    return (
      <div class={"saki-call-footer-component"}>
        <div class={"footer-left"}>
          <slot name="left"></slot>
        </div>
        <div class={"footer-center"}>
          <saki-button
            width="40px"
            height="40px"
            margin=" 0 8px"
            borderRadius="50%"
            border="none"
            bgColor={this.micIsOn ? "#fff" : "rgba(0, 0, 0, 0.2)"}
            bgActiveColor={
              this.micIsOn ? "rgb(240, 239, 239)" : "rgba(0, 0, 0, 0.3)"
            }
            bgHoverColor={
              this.micIsOn ? "rgb(221, 221, 221)" : "rgba(0, 0, 0, 0.4)"
            }
            onTap={() => {
              this.switchmic.emit();
            }}
          >
            <svg
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10271"
              width="24"
              height="24"
              fill={this.micIsOn ? "#000" : "#fff"}
            >
              <path
                d="M512 624c93.9 0 170-75.2 170-168V232c0-92.8-76.1-168-170-168s-170 75.2-170 168v224c0 92.8 76.1 168 170 168z"
                p-id="10272"
              ></path>
              <path
                d="M842 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254S258 594.3 258 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 168.7 126.6 307.9 290 327.6V884H326.7c-13.7 0-24.7 14.3-24.7 32v36c0 4.4 2.8 8 6.2 8h407.6c3.4 0 6.2-3.6 6.2-8v-36c0-17.7-11-32-24.7-32H548V782.1c165.3-18 294-158 294-328.1z"
                p-id="10273"
              ></path>
            </svg>
          </saki-button>
          <saki-button
            width="40px"
            height="40px"
            borderRadius="50%"
            border="none"
            margin=" 0 8px"
            bgColor={this.videoIsOn ? "#fff" : "rgba(0, 0, 0, 0.2)"}
            bgActiveColor={
              this.videoIsOn ? "rgb(240, 239, 239)" : "rgba(0, 0, 0, 0.3)"
            }
            bgHoverColor={
              this.videoIsOn ? "rgb(221, 221, 221)" : "rgba(0, 0, 0, 0.4)"
            }
            onTap={() => {
              this.switchvideo.emit();
            }}
          >
            <svg
              class="icon video"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="24335"
              fill={this.videoIsOn ? "#000" : "#fff"}
              width="24"
              height="24"
            >
              <path
                d="M537.4 815.8H149.2c-2.4 0-4.6 0-7-0.2-2.4-0.2-4.6-0.2-7-0.6-2.4-0.2-4.6-0.6-7-0.8-2.4-0.4-4.6-0.8-7-1.2-2.4-0.4-4.6-1-6.8-1.6-2.2-0.6-4.6-1.2-6.8-1.8-2.2-0.6-4.4-1.4-6.6-2.2-2.2-0.8-4.4-1.6-6.6-2.6-2.2-0.8-4.4-1.8-6.4-2.8-2.2-1-4.2-2-6.2-3.2-2-1.2-4.2-2.2-6.2-3.4-2-1.2-4-2.4-6-3.8s-3.8-2.6-5.8-4c-1.8-1.4-3.8-2.8-5.6-4.4s-3.6-3-5.4-4.6c-1.8-1.6-3.4-3.2-5-4.8-1.6-1.6-3.2-3.4-4.8-5-1.6-1.8-3.2-3.6-4.6-5.4-1.4-1.8-3-3.6-4.4-5.6-1.4-1.8-2.8-3.8-4-5.8-1.4-2-2.6-4-3.8-6-1.2-2-2.4-4-3.4-6.2-1.2-2-2.2-4.2-3.2-6.2-1-2.2-2-4.2-2.8-6.4-0.8-2.2-1.8-4.4-2.6-6.6-0.8-2.2-1.6-4.4-2.2-6.6-0.6-2.2-1.4-4.6-1.8-6.8-0.6-2.2-1-4.6-1.6-6.8-0.4-2.4-0.8-4.6-1.2-7-0.4-2.4-0.6-4.6-0.8-7s-0.6-4.8-0.6-7c-0.2-2.4-0.2-4.6-0.2-7V351.6c0-2.4 0-4.6 0.2-7 0.2-2.4 0.2-4.6 0.6-7 0.2-2.4 0.6-4.6 0.8-7 0.4-2.4 0.8-4.6 1.2-7 0.4-2.4 1-4.6 1.6-6.8 0.6-2.2 1.2-4.6 1.8-6.8 0.6-2.2 1.4-4.4 2.2-6.6 0.8-2.2 1.6-4.4 2.6-6.6 0.8-2.2 1.8-4.4 2.8-6.4 1-2.2 2-4.2 3.2-6.2 1.2-2 2.2-4.2 3.4-6.2 1.2-2 2.4-4 3.8-6s2.6-3.8 4-5.8c1.4-1.8 2.8-3.8 4.4-5.6 1.4-1.8 3-3.6 4.6-5.4 1.6-1.8 3.2-3.4 4.8-5 1.6-1.6 3.4-3.2 5-4.8 1.8-1.6 3.6-3.2 5.4-4.6 1.8-1.4 3.6-3 5.6-4.4 1.8-1.4 3.8-2.8 5.8-4 2-1.4 4-2.6 6-3.8 2-1.2 4-2.4 6.2-3.4 2-1.2 4.2-2.2 6.2-3.2 2.2-1 4.2-2 6.4-2.8 2.2-0.8 4.4-1.8 6.6-2.6 2.2-0.8 4.4-1.6 6.6-2.2 2.2-0.6 4.6-1.4 6.8-1.8 2.2-0.6 4.6-1 6.8-1.6 2.4-0.4 4.6-0.8 7-1.2 2.4-0.4 4.6-0.6 7-0.8 2.4-0.2 4.6-0.4 7-0.6 2.4-0.2 4.6-0.2 7-0.2h389.2c2.4 0 4.6 0 7 0.2 2.4 0.2 4.6 0.2 7 0.6 2.4 0.2 4.6 0.6 7 0.8 2.4 0.4 4.6 0.8 6.8 1.2 2.2 0.4 4.6 1 6.8 1.6 2.2 0.6 4.6 1.2 6.8 1.8 2.2 0.6 4.4 1.4 6.6 2.2 2.2 0.8 4.4 1.6 6.6 2.6 2.2 0.8 4.2 1.8 6.4 2.8 2.2 1 4.2 2 6.2 3.2 2 1 4 2.2 6 3.4 2 1.2 4 2.4 6 3.8s3.8 2.6 5.8 4c1.8 1.4 3.8 2.8 5.6 4.4 1.8 1.4 3.6 3 5.2 4.6 1.8 1.6 3.4 3.2 5 4.8s3.2 3.4 4.8 5c1.6 1.8 3 3.4 4.6 5.2 1.4 1.8 3 3.6 4.4 5.6 1.4 1.8 2.8 3.8 4 5.8 1.2 2 2.6 4 3.8 6s2.4 4 3.4 6 2.2 4.2 3.2 6.2c1 2.2 2 4.2 2.8 6.4 0.8 2.2 1.8 4.4 2.6 6.6 0.8 2.2 1.6 4.4 2.2 6.6 0.6 2.2 1.4 4.4 1.8 6.8s1 4.6 1.6 6.8c0.4 2.2 0.8 4.6 1.2 6.8 0.4 2.4 0.6 4.6 0.8 7 0.2 2.4 0.4 4.6 0.6 7 0.2 2.4 0.2 4.6 0.2 7v321.6c0 2.4 0 4.6-0.2 7-0.2 2.4-0.2 4.6-0.6 7-0.2 2.4-0.6 4.6-0.8 7-0.4 2.4-0.8 4.6-1.2 7-0.4 2.4-1 4.6-1.6 6.8-0.6 2.2-1.2 4.6-1.8 6.8-0.6 2.2-1.4 4.4-2.2 6.6-0.8 2.2-1.6 4.4-2.6 6.6-0.8 2.2-1.8 4.4-2.8 6.4-1 2.2-2 4.2-3.2 6.2-1.2 2-2.2 4.2-3.4 6.2-1.2 2-2.4 4-3.8 6s-2.6 3.8-4 5.8c-1.4 1.8-2.8 3.8-4.4 5.6-1.4 1.8-3 3.6-4.6 5.4-1.6 1.8-3.2 3.4-4.8 5-1.6 1.6-3.4 3.2-5 4.8-1.8 1.6-3.6 3.2-5.4 4.6-1.8 1.4-3.6 3-5.6 4.4-1.8 1.4-3.8 2.8-5.8 4s-4 2.6-6 3.8-4 2.4-6.2 3.4c-2 1.2-4.2 2.2-6.2 3.2-2.2 1-4.2 2-6.4 2.8s-4.4 1.8-6.6 2.6c-2.2 0.8-4.4 1.6-6.6 2.2-2.2 0.6-4.6 1.4-6.8 1.8-2.2 0.6-4.6 1-6.8 1.6-2.4 0.4-4.6 0.8-7 1.2-2.4 0.4-4.6 0.6-7 0.8-2.4 0.2-4.6 0.4-7 0.6-2.8-0.2-5.2 0-7.4 0z m413.4-33c-9.6 0-18.6-2-27.4-5.8-2-0.8-4-2-5.8-3.2l-174.4-122.8c-2.2-1.6-4.4-3.2-6.4-5-2-1.8-3.8-3.8-5.6-5.8s-3.4-4.2-5-6.4-2.8-4.6-4.2-7c-1.2-2.4-2.4-4.8-3.2-7.4-1-2.6-1.8-5-2.4-7.8-0.6-2.6-1.2-5.2-1.4-8-0.4-2.6-0.4-5.4-0.4-8v-167.4c0-2.6 0.2-5.4 0.4-8 0.4-2.6 0.8-5.4 1.4-8 0.6-2.6 1.4-5.2 2.4-7.8 1-2.6 2-5 3.2-7.4 1.2-2.4 2.6-4.8 4.2-7s3.2-4.4 5-6.4c1.8-2 3.6-4 5.6-5.8 2-1.8 4.2-3.4 6.4-5l174.4-122.8c1.8-1.2 3.8-2.4 5.8-3.2 1.2-0.6 2.6-1 3.8-1.6 1.4-0.4 2.6-1 4-1.4 1.4-0.4 2.6-0.8 4-1 1.4-0.4 2.8-0.6 4.2-0.8l4.2-0.6c1.4-0.2 2.8-0.2 4.2-0.4h4.2c1.4 0 2.8 0 4.2 0.2 1.4 0.2 2.8 0.2 4.2 0.4 1.4 0.2 2.8 0.4 4.2 0.8 1.4 0.2 2.8 0.6 4 1 1.4 0.4 2.6 0.8 4 1.2 1.4 0.4 2.6 1 4 1.4 1.2 0.6 2.6 1.2 3.8 1.8 1.2 0.6 2.4 1.2 3.8 2 1.2 0.6 2.4 1.4 3.6 2.2 1.2 0.8 2.4 1.6 3.4 2.4 1.2 0.8 2.2 1.8 3.2 2.6 1 1 2.2 1.8 3.2 2.8l3 3c1 1 1.8 2 2.8 3.2 0.8 1 1.8 2.2 2.6 3.4 0.8 1.2 1.6 2.2 2.4 3.4 0.8 1.2 1.4 2.4 2.2 3.6 0.6 1.2 1.2 2.4 1.8 3.8 0.6 1.2 1.2 2.6 1.6 3.8 0.6 1.4 1 2.6 1.4 4 0.4 1.4 0.8 2.6 1.2 4 0.4 1.4 0.6 2.8 1 4l0.6 4.2c0.2 1.4 0.4 2.8 0.4 4.2 0 1.4 0.2 2.8 0.2 4.2v406.6c0 2.2-0.2 4.4-0.4 6.6s-0.6 4.4-1 6.6c-0.4 2.2-1 4.4-1.6 6.4-0.6 2.2-1.4 4.2-2.2 6.2-0.8 2-1.8 4-2.8 6-1 2-2.2 3.8-3.4 5.6-1.2 1.8-2.6 3.6-4 5.4a52.438 52.438 0 0 1-9.4 9.4c-1.8 1.4-3.4 2.8-5.4 4s-3.8 2.4-5.6 3.4c-2 1-4 2-6 2.8-2 0.8-4.2 1.6-6.2 2.2-2.2 0.6-4.2 1.2-6.4 1.6-2.2 0.4-4.4 0.8-6.6 1s-4.8 0.4-7 0.4z"
                p-id="24336"
              ></path>
            </svg>
          </saki-button>

          <saki-button
            width="40px"
            height="40px"
            margin=" 0 8px"
            borderRadius="50%"
            border="none"
            bgColor={this.screenShareIsOn ? "#fff" : "rgba(0, 0, 0, 0.2)"}
            bgActiveColor={
              this.screenShareIsOn ? "rgb(240, 239, 239)" : "rgba(0, 0, 0, 0.3)"
            }
            bgHoverColor={
              this.screenShareIsOn ? "rgb(221, 221, 221)" : "rgba(0, 0, 0, 0.4)"
            }
            onTap={() => {
              this.switchscreenshare.emit();
            }}
          >
            <svg
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1579"
              fill={this.screenShareIsOn ? "#000" : "#fff"}
              width="24"
              height="24"
            >
              <path
                d="M900.608 108.8256a64.6656 64.6656 0 0 1 67.1232 61.9776v464a64.6912 64.6912 0 0 1-67.072 62.0288H123.3408a64.64 64.64 0 0 1-67.072-62.0288V170.8032a64.6144 64.6144 0 0 1 67.072-61.9776h777.344zM241.8688 866.944s135.68-72.4224 270.1568-72.4224 270.208 72.4224 270.208 72.4224v62.2592H241.8176v-62.2592z m317.2096-329.5232c0 11.2128 7.0144 13.696 15.6928 5.76l104.96-97.0496a19.2512 19.2512 0 0 0 0-28.8512l-105.0368-96.9216c-8.704-8.1408-15.616-5.4528-15.616 5.6832v58.1888c-27.4176-2.0992-125.9008-5.12-174.7968 51.6864-57.088 66.56-45.4144 107.3664-45.4144 107.3664a282.4448 282.4448 0 0 1 94.0288-58.88 261.248 261.248 0 0 1 126.1824-11.8528V537.6z"
                p-id="1580"
              ></path>
            </svg>
          </saki-button>
        </div>
        <div class={"footer-right"}>
          <saki-button
            width="40px"
            height="40px"
            borderRadius="50%"
            margin=" 0 16px 0 0"
            border="none"
            bgColor={"rgba(0, 0, 0, 0.2)"}
            bgActiveColor={"rgba(0, 0, 0, 0.3)"}
            bgHoverColor={"rgba(0, 0, 0, 0.4)"}
            onTap={() => {
              this.message.emit();
            }}
          >
            <svg
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1306"
              fill="#fff"
              width="24"
              height="24"
            >
              <path
                d="M800 102.4H281.6c-96 0-179.2 83.2-179.2 179.2V640c0 96 83.2 179.2 179.2 179.2h19.2s0 6.4 6.4 6.4l70.4 76.8c12.8 12.8 32 12.8 38.4 0l64-70.4 6.4-6.4h313.6c96 0 179.2-83.2 179.2-179.2V281.6c0-96-83.2-179.2-179.2-179.2zM294.4 531.2c-38.4 0-64-32-64-70.4 0-38.4 32-70.4 70.4-70.4 38.4 0 70.4 32 70.4 70.4-6.4 38.4-38.4 70.4-76.8 70.4z m243.2 0c-38.4 0-70.4-32-70.4-70.4 0-38.4 32-70.4 70.4-70.4 38.4 0 70.4 32 70.4 70.4 0 38.4-32 70.4-70.4 70.4z m249.6 0c-38.4 0-70.4-32-70.4-70.4 0-38.4 32-70.4 70.4-70.4 38.4 0 70.4 32 70.4 70.4-6.4 38.4-38.4 70.4-70.4 70.4z"
                p-id="1307"
              ></path>
            </svg>
          </saki-button>
          <saki-button
            width="40px"
            height="40px"
            borderRadius="50%"
            bgColor="#f75356"
            bgActiveColor="#c23d3f"
            bgHoverColor="#e2484a"
            onTap={() => {
              this.hangup.emit();
            }}
          >
            <svg
              class="footer-r-hangup-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="9416"
              width="24"
              height="24"
            >
              <path
                d="M15.753846 15.753846 15.753846 15.753846 15.753846 15.753846Z"
                p-id="9417"
              ></path>
              <path
                d="M1017.477908 582.892308c7.876923 54.634338 13.012677 129.370585-11.4688 157.979569-40.518892 47.293046-297.054523 47.293046-297.054523-47.293046 0-47.639631 42.1888-78.895262 1.669908-126.219815-39.857231-46.536862-111.285169-47.293046-190.747569-47.293046s-150.890338 0.756185-190.747569 47.293046c-40.518892 47.293046 1.701415 78.548677 1.701415 126.219815 0 94.6176-256.567138 94.6176-297.086031 47.293046-24.481477-28.608985-19.377231-103.345231-11.4688-157.979569 6.080985-36.4544 21.393723-75.807508 70.4512-126.030769 0 0 0 0 0 0 73.601969-68.655262 184.950154-124.801969 423.211323-125.999262l0-0.031508c1.323323 0 2.615138 0 3.938462 0s2.615138 0 3.938462 0l0 0.031508c238.261169 1.197292 349.609354 57.344 423.211323 125.999262 0 0 0 0 0 0 49.057477 50.223262 64.370215 89.544862 70.4512 126.030769z"
                p-id="9418"
              ></path>
            </svg>
          </saki-button>
        </div>
      </div>
    );
  }
}