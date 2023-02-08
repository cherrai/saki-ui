import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "saki-icon",
  styleUrl: "icon.scss",
  shadow: true,
})
export class IconComponent {
  @Prop() color = "#000";
  @Prop() width = "16px";
  @Prop() height = "16px";
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() title = "";
  @Prop() type:
    | ""
    | "ArrowLeft"
    | "Emoji"
    | "Reply"
    | "ScreeShareFill"
    | "ScreeShare"
    | "Eye"
    | "EyeSlash"
    | "Detail"
    | "File"
    | "Video"
    | "Image"
    | "Paperclip"
    | "Send"
    | "Pen"
    | "Magnifier"
    | "Close"
    | "Message"
    | "Call"
    | "More"
    | "JoinGroup"
    | "Group"
    | "AddUser"
    | "Messages"
    | "Settings"
    | "User"
    | "Notifications" = "";

  getTypeEl() {
    switch (this.type) {
      case "ArrowLeft":
        return (
          <svg
            class="saki-icon emoji"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3090"
          >
            <path
              d="M810.666667 554.666667H213.333333c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666667h597.333334c25.6 0 42.666667 17.066667 42.666666 42.666667s-17.066667 42.666667-42.666666 42.666667z"
              p-id="3091"
            ></path>
            <path
              d="M512 853.333333c-12.8 0-21.333333-4.266667-29.866667-12.8l-298.666666-298.666666c-17.066667-17.066667-17.066667-42.666667 0-59.733334l298.666666-298.666666c17.066667-17.066667 42.666667-17.066667 59.733334 0s17.066667 42.666667 0 59.733333L273.066667 512l268.8 268.8c17.066667 17.066667 17.066667 42.666667 0 59.733333-8.533333 8.533333-17.066667 12.8-29.866667 12.8z"
              p-id="3092"
            ></path>
          </svg>
        );
      case "Emoji":
        return (
          <svg
            class="saki-icon emoji"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2363"
          >
            <path
              d="M872.802928 755.99406 872.864326 755.99406 872.864326 755.624646Z"
              p-id="2364"
            ></path>
            <path
              d="M807.273469 216.727043c-162.808016-162.836669-427.736874-162.836669-590.544891 0-162.836669 162.806993-162.836669 427.736874 0 590.543867 162.808016 162.837692 427.737898 162.837692 590.544891 0C970.110137 644.462894 970.110137 379.534036 807.273469 216.727043M764.893242 764.92036c-139.444912 139.443889-366.370225 139.414213-505.798764 0-139.459239-139.473565-139.459239-366.354875 0-505.827417 139.428539-139.429563 366.354875-139.460262 505.798764 0C904.336108 398.521482 904.336108 625.476471 764.893242 764.92036"
              p-id="2365"
            ></path>
            <path
              d="M381.724423 468.02137c24.783453 0 44.953841-20.169365 44.953841-44.967144 0-24.828478-20.170388-45.027519-44.953841-45.027519-24.842805 0-45.013193 20.199041-45.013193 45.027519C336.71123 447.852004 356.881618 468.02137 381.724423 468.02137"
              p-id="2366"
            ></path>
            <path
              d="M640.680243 468.095048c24.812105 0 45.010123-20.213367 45.010123-45.01217 0-24.827455-20.198018-44.99682-45.010123-44.99682-24.785499 0-44.953841 20.169365-44.953841 44.99682C595.726401 447.88168 615.894743 468.095048 640.680243 468.095048"
              p-id="2367"
            ></path>
            <path
              d="M642.245901 619.058294l-2.453888 0.798179c-40.310078 18.248619-83.548858 27.5341-128.411625 27.5341-46.343491 0-90.173742-9.375531-130.305765-27.799136l-2.425236-0.741897c-1.508353-0.413416-3.548826-1.003863-6.092765-1.003863-14.757099 0-26.734898 11.977799-26.734898 26.675546 0 6.978948 3.282766 13.988596 8.695033 19.253506l-0.325411 1.62501 6.831592 3.076058c47.911196 21.679765 100.021018 33.095769 150.681838 33.095769 51.608402 0 102.180194-11.120268 150.978597-33.361829 8.575306-4.703115 13.928221-13.721513 13.928221-23.511483C676.611593 627.458615 661.027663 613.290941 642.245901 619.058294"
              p-id="2368"
            ></path>
          </svg>
        );
      case "Reply":
        return (
          <svg
            class="saki-icon"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4050"
          >
            <path
              d="M625.550222 398.279111l-226.360889 0.113778-1.080889-0.113778H306.858667l188.700444-188.814222a55.580444 55.580444 0 0 0 0-78.620445l-0.796444-0.796444a55.580444 55.580444 0 0 0-78.563556 0L136.590222 409.827556c-1.991111 1.479111-3.982222 2.901333-5.745778 4.721777l-0.284444 0.284445-0.170667 0.227555-0.284444 0.284445a46.819556 46.819556 0 0 0-5.006222 6.200889c-0.512 0.625778-1.137778 1.194667-1.536 1.877333a55.296 55.296 0 0 0-9.671111 31.516444V455.452444a55.296 55.296 0 0 0 9.671111 31.516445c0.455111 0.682667 1.024 1.194667 1.479111 1.877333 1.592889 2.104889 3.185778 4.266667 5.063111 6.200889l0.284444 0.284445 0.170667 0.170666 0.284444 0.284445c1.763556 1.820444 3.754667 3.242667 5.745778 4.721777l279.608889 279.779556a55.580444 55.580444 0 0 0 78.563556 0l0.796444-0.796444a55.580444 55.580444 0 0 0 0-78.620445L306.858667 512.056889h91.249777l1.080889-0.113778v0.113778h226.360889a170.837333 170.837333 0 0 1 170.609778 170.723555V853.333333a56.888889 56.888889 0 1 0 113.777778 0v-170.552889a284.387556 284.387556 0 0 0-284.330667-284.501333z"
              p-id="4051"
            ></path>
          </svg>
        );
      case "ScreeShareFill":
        return (
          <svg
            class="saki-icon"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1025 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5913"
          >
            <path
              d="M523.795 615.317a20.7 20.7 0 0 1 5.216 5.215l107.457 154.973c6.514 9.395 4.18 22.291-5.216 28.806A20.7 20.7 0 0 1 619.457 808H404.543c-11.433 0-20.7-9.268-20.7-20.7a20.7 20.7 0 0 1 3.689-11.795l107.457-154.973c6.515-9.394 19.411-11.73 28.806-5.215zM847.65 150c60.832 0 109.372 51.556 110.336 114.546l0.015 1.912v356.084c0 63.217-47.932 115.405-108.51 116.442l-1.84 0.016H645.795L528.633 580.842a20.7 20.7 0 0 0-3.868-3.974l-0.443-0.338c-9.086-6.73-21.866-4.916-28.729 4.012l-0.226 0.3L378.203 739H176.351c-60.832 0-109.372-51.556-110.336-114.546L66 622.542V266.458c0-63.217 47.932-115.405 108.51-116.442l1.84-0.016h671.3zM363.775 516.911c-9.676 8.227-10.856 22.747-2.636 32.431 8.22 9.684 22.73 10.865 32.405 2.638 76.547-65.082 145.915-68.249 223.786-0.203 9.565 8.357 24.088 7.373 32.438-2.199 8.351-9.572 7.367-24.106-2.197-32.464-95.836-83.743-190.63-79.415-283.796-0.203zM249.247 392.588c-9.661 8.245-10.815 22.767-2.577 32.436s22.748 10.824 32.41 2.58c153.102-130.646 296.488-137.217 452.715-0.204 9.55 8.374 24.074 7.416 32.442-2.14 8.368-9.557 7.41-24.093-2.138-32.468-174.215-152.787-343.11-145.048-512.852-0.204z"
              p-id="5914"
            ></path>
          </svg>
        );
      case "ScreeShare":
        return (
          <svg
            class="saki-icon"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2537"
          >
            <path
              d="M889.6 127.488H141.696c-38.656 0-70.08 31.488-70.08 70.144v467.392c0 38.656 31.488 70.144 70.08 70.144h342.976v99.456H368.384c-18.688 0-33.792 13.888-33.792 30.976s15.104 30.976 33.792 30.976h294.592c18.688 0 33.792-13.888 33.792-30.976s-15.104-30.976-33.792-30.976H546.688v-99.456H889.6c38.656 0 70.144-31.424 70.144-70.144V197.568c0-38.592-31.424-70.08-70.144-70.08z m4.864 526.592a22.272 22.272 0 0 1-22.272 22.336H159.168a22.272 22.272 0 0 1-22.272-22.336V208.512c0-12.352 10.048-22.272 22.272-22.272h713.024c12.288 0 22.272 9.92 22.272 22.272V654.08zM566.976 313.984c-13.184-10.624-23.936-2.88-23.936 15.872v49.984h-2.176c-77.056 0-208.128 89.024-209.216 168.192 0 6.336 5.12 8.128 10.048 0 24.896-44.416 129.536-67.456 182.848-67.456h18.496v52.736c0 15.744 11.648 26.496 24.896 15.872l121.856-97.792c13.184-10.56 13.184-27.904 0-38.528l-122.816-98.88z"
              p-id="2538"
            ></path>
          </svg>
        );
      case "Eye":
        return (
          <svg
            class="saki-icon"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9757"
          >
            <path
              d="M512 192C298.666667 192 116.48 324.693333 42.666667 512c73.813333 187.306667 256 320 469.333333 320s395.52-132.693333 469.333333-320c-73.813333-187.306667-256-320-469.333333-320zM512 725.333333c-117.76 0-213.333333-95.573333-213.333333-213.333333s95.573333-213.333333 213.333333-213.333333 213.333333 95.573333 213.333333 213.333333-95.573333 213.333333-213.333333 213.333333z m0-341.333333c-70.826667 0-128 57.173333-128 128s57.173333 128 128 128 128-57.173333 128-128-57.173333-128-128-128z"
              p-id="9758"
            ></path>
          </svg>
        );
      case "EyeSlash":
        return (
          <svg
            class="saki-icon"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5663"
          >
            <path
              d="M512.11 288.06c36.88 0 70.87 9.11 101.97 27.55 31.1 18.44 55.99 43.32 74.43 74.43 18.44 31.1 27.55 65.09 27.55 101.98 0 25.32-5.11 50.21-15.33 74.43l118.19 118.19c63.54-52.22 110.64-116.2 141.08-192.62-35.55-90.2-93.98-163.74-175.51-220.17-81.31-56.65-172.18-84.87-272.6-84.87-55.99 0-109.97 9.55-161.96 28.66l87.76 87.76c24.21-10.23 49.1-15.34 74.42-15.34zM105.99 177.42l91.53 93.53 19.11 17.11C146.65 344.04 95.77 412.03 64 492c35.55 90.2 93.98 163.74 175.51 220.17 81.31 56.65 172.18 84.87 272.6 84.87 62.21 0 121.3-11.33 177.29-34.21l137.3 135.3 51.54-51.54-720.71-720.72-51.54 51.55z m225.06 225.06l62.87 62.88c-2.44 8.88-3.78 17.77-3.78 26.66 0 34.21 11.78 63.32 35.32 86.64 23.55 23.32 52.43 35.33 86.65 35.33 8.89 0 17.77-1.33 26.66-3.78l62.87 62.88c-29.32 15.33-59.1 22.88-89.53 22.88-36.88 0-70.87-9.11-101.97-27.55-31.1-18.44-55.99-43.32-74.43-74.43-18.44-31.1-27.55-65.09-27.55-101.98 0-30.44 7.56-60.43 22.89-89.53z m173.51-32.44L634.3 497.79v-5.78c0-34.21-11.78-63.32-35.32-86.64-23.55-23.55-52.43-35.33-86.65-35.33h-7.77z"
              p-id="5664"
            ></path>
          </svg>
        );
      case "Detail":
        return (
          <svg
            class="saki-icon"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="25661"
          >
            <path
              d="M512 64C264.576 64 64 264.576 64 512c0 247.424 200.576 448 448 448s448-200.576 448-448C960 264.576 759.424 64 512 64zM512 848c-185.536 0-336-150.464-336-336S326.464 176 512 176 848 326.464 848 512 697.536 848 512 848zM512 400c-30.912 0-56 25.088-56 56l0 224C456 710.912 481.088 736 512 736s56-25.088 56-56l0-224C568 425.088 542.912 400 512 400zM512 232c-30.912 0-56 25.088-56 56S481.088 344 512 344 568 318.912 568 288 542.912 232 512 232z"
              p-id="25662"
            ></path>
          </svg>
        );
      case "File":
        return (
          <svg
            class="saki-icon"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="16944"
          >
            <path
              d="M128 341.333333l256.128-256h469.12C876.8 85.333333 896 104.746667 896 127.658667v768.682666a42.368 42.368 0 0 1-42.368 42.325334H170.368A42.666667 42.666667 0 0 1 128 895.701333V341.333333z m298.666667-192L192 384H426.666667V149.333333z"
              p-id="16945"
            ></path>
          </svg>
        );
      case "Video":
        return (
          <svg
            class="saki-icon"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="16040"
          >
            <path
              d="M896 305.066667a72.533333 72.533333 0 0 0-78.933333 12.8l-91.733334 85.333333V341.333333a128 128 0 0 0-128-128H213.333333a128 128 0 0 0-128 128v341.333334a128 128 0 0 0 128 128h384a128 128 0 0 0 128-128v-61.866667l92.16 85.333333a74.24 74.24 0 0 0 49.493334 19.2 71.68 71.68 0 0 0 29.44-6.4 68.266667 68.266667 0 0 0 42.666666-63.146666V368.213333A68.266667 68.266667 0 0 0 896 305.066667z"
              p-id="16041"
            ></path>
          </svg>
        );
      case "Image":
        return (
          <svg
            class="saki-icon"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="14324"
          >
            <path
              d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM338 304c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64z m513.9 437.1c-1.4 1.2-3.3 1.9-5.2 1.9H177.2c-4.4 0-8-3.6-8-8 0-1.9 0.7-3.7 1.9-5.2l170.3-202c2.8-3.4 7.9-3.8 11.3-1 0.3 0.3 0.7 0.6 1 1l99.4 118 158.1-187.5c2.8-3.4 7.9-3.8 11.3-1 0.3 0.3 0.7 0.6 1 1l229.6 271.6c2.6 3.3 2.2 8.4-1.2 11.2z"
              p-id="14325"
            ></path>
          </svg>
        );
      case "Paperclip":
        return (
          <svg
            class="saki-icon"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="12577"
          >
            <path
              d="M862.378667 244.906667a250.112 250.112 0 0 0-176.512-72.448h-0.682667c-32.128 0-63.402667 5.973333-93.226667 17.792a246.613333 246.613333 0 0 0-82.474666 53.930666l-232.917334 230.186667a139.008 139.008 0 0 0-41.514666 100.010667c0.128 37.802667 15.018667 73.301333 42.026666 99.968 27.008 26.709333 62.805333 41.386667 100.992 41.514666h0.298667c38.101333 0 73.813333-14.592 100.608-40.96l204.373333-202.026666a34.858667 34.858667 0 0 0 0-50.005334 35.413333 35.413333 0 0 0-25.173333-10.282666 35.84 35.84 0 0 0-25.173333 10.24l-204.416 202.026666a70.826667 70.826667 0 0 1-50.346667 20.394667h-0.085333a72.192 72.192 0 0 1-50.773334-20.778667 70.272 70.272 0 0 1-21.034666-50.218666 68.821333 68.821333 0 0 1 20.608-49.792l232.917333-230.272a176.896 176.896 0 0 1 125.397333-51.029334h0.512a179.541333 179.541333 0 0 1 126.378667 51.712 175.104 175.104 0 0 1 52.309333 124.8 172.885333 172.885333 0 0 1-51.498666 124.288l-247.082667 244.48a263.125333 263.125333 0 0 1-185.813333 75.434667H379.306667a265.301333 265.301333 0 0 1-186.88-76.586667 258.389333 258.389333 0 0 1-77.397334-184.746666 255.829333 255.829333 0 0 1 76.373334-184.064l319.018666-315.392a34.858667 34.858667 0 0 0 0-50.005334 35.882667 35.882667 0 0 0-50.517333-0.128L140.970667 368.469333a326.144 326.144 0 0 0-73.216 109.482667 329.258667 329.258667 0 0 0-24.106667 124.8 327.253333 327.253333 0 0 0 24.832 124.8 334.336 334.336 0 0 0 184.490667 182.485333c39.978667 16.128 82.517333 24.32 126.208 24.533334h0.853333a335.957333 335.957333 0 0 0 125.354667-23.893334 328.576 328.576 0 0 0 110.677333-72.32l247.082667-244.394666a242.090667 242.090667 0 0 0 54.528-81.578667 245.461333 245.461333 0 0 0-55.296-267.52z"
              p-id="12578"
            ></path>
          </svg>
        );
      case "Send":
        return (
          <svg
            class="saki-icon"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4264"
          >
            <path
              d="M1008.00076 6.285714q18.857143 13.714286 15.428571 36.571429l-146.285714 877.714286q-2.857143 16.571429-18.285714 25.714285-8 4.571429-17.714286 4.571429-6.285714 0-13.714286-2.857143l-258.857142-105.714286-138.285715 168.571429q-10.285714 13.142857-28 13.142857-7.428571 0-12.571428-2.285714-10.857143-4-17.428572-13.428572T365.715046 987.428571v-199.428571l493.714285-605.142857-610.857142 528.571428-225.714286-92.571428q-21.142857-8-22.857143-31.428572-1.142857-22.857143 18.285714-33.714285L969.143617 5.142857q8.571429-5.142857 18.285714-5.142857 11.428571 0 20.571429 6.285714z"
              p-id="4265"
            ></path>
          </svg>
        );
      case "Pen":
        return (
          <svg
            class="saki-icon"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2538"
          >
            <path
              d="M925.338 96.626C834.056 5.282 765.5 18.954 765.5 18.954L80.192 704.262 16.256 1005.77l301.508-63.934 685.244-685.244C1003.008 256.59 1016.746 188.034 925.338 96.626zM299.786 905.562l-102.74 22.156c-9.938-18.548-21.902-37.096-43.742-58.998-21.84-21.902-40.45-33.74-58.998-43.678l22.218-102.802 29.688-29.688c0 0 55.958 1.14 119.072 64.252 63.176 63.176 64.314 119.134 64.314 119.134S299.786 905.562 299.786 905.562z"
              p-id="2539"
            ></path>
          </svg>
        );
      case "Magnifier":
        return (
          <svg
            class="saki-icon"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8399"
          >
            <path
              d="M450.540923 835.421849C238.095329 835.421849 65.258028 662.585911 65.258028 450.14713 65.258028 237.711074 238.095329 64.873772 450.540923 64.873772 662.986518 64.873772 835.830632 237.711074 835.830632 450.14713 835.830632 662.584548 662.986518 835.421849 450.540923 835.421849L450.540923 835.421849ZM450.540923 159.705847C290.384053 159.705847 160.09419 289.998435 160.09419 450.14713 160.09419 610.297187 290.384053 740.591138 450.540923 740.591138 610.696431 740.591138 740.99447 610.297187 740.99447 450.14713 740.99447 289.998435 610.696431 159.705847 450.540923 159.705847L450.540923 159.705847Z"
              p-id="8400"
            ></path>
            <path
              d="M900.538167 958.477626C885.598531 958.477626 870.668434 952.777836 859.268854 941.387795L657.978933 740.112862C635.189312 717.323242 635.189312 680.372035 657.978933 657.576963 680.77673 634.794156 717.722486 634.794156 740.518919 657.576963L941.807478 858.851896C964.598462 881.641517 964.598462 918.592724 941.807478 941.386432 930.407899 952.777836 915.477801 958.477626 900.538167 958.477626"
              p-id="8401"
            ></path>
          </svg>
        );
      case "Close":
        return (
          <svg
            class="saki-icon"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="11599"
          >
            <path
              d="M570.514286 512l292.571428-292.571429c14.628571-14.628571 14.628571-43.885714 0-58.514285-14.628571-14.628571-43.885714-14.628571-58.514285 0l-292.571429 292.571428-292.571429-292.571428c-14.628571-14.628571-43.885714-14.628571-58.514285 0-21.942857 14.628571-21.942857 43.885714 0 58.514285l292.571428 292.571429-292.571428 292.571429c-14.628571 14.628571-14.628571 43.885714 0 58.514285 14.628571 14.628571 43.885714 14.628571 58.514285 0l292.571429-292.571428 292.571429 292.571428c14.628571 14.628571 43.885714 14.628571 58.514285 0 14.628571-14.628571 14.628571-43.885714 0-58.514285l-292.571428-292.571429z"
              p-id="11600"
            ></path>
          </svg>
        );
      case "Message":
        return (
          <svg
            class="saki-icon"
            fill={this.color}
            width={this.width}
            height={this.height}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3634"
          >
            <path
              d="M512 64C264.533333 64 64 234.666667 64 445.866667c0 204.8 226.133333 339.2 268.8 362.666666-2.133333 21.333333-19.2 76.8-36.266667 121.6-2.133333 8.533333 0 17.066667 4.266667 23.466667 4.266667 4.266667 8.533333 6.4 14.933333 6.4 2.133333 0 6.4 0 8.533334-2.133333 27.733333-12.8 153.6-70.4 192-130.133334C761.6 825.6 960 654.933333 960 445.866667 960 234.666667 759.466667 64 512 64z m85.333333 469.333333H341.333333c-12.8 0-21.333333-8.533333-21.333333-21.333333s8.533333-21.333333 21.333333-21.333333h256c12.8 0 21.333333 8.533333 21.333334 21.333333s-10.666667 21.333333-21.333334 21.333333z m85.333334-128H341.333333c-12.8 0-21.333333-8.533333-21.333333-21.333333s8.533333-21.333333 21.333333-21.333333h341.333334c12.8 0 21.333333 8.533333 21.333333 21.333333s-8.533333 21.333333-21.333333 21.333333z"
              p-id="3635"
            ></path>
          </svg>
        );
      case "Call":
        return (
          <svg
            class="saki-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9482"
            fill={this.color}
            width={this.width}
            height={this.height}
          >
            <path
              d="M612.522667 85.674667a34.858667 34.858667 0 0 0-26.709334 7.509333 36.394667 36.394667 0 0 0-13.738666 24.917333 36.693333 36.693333 0 0 0 32.298666 40.533334 294.912 294.912 0 0 1 261.333334 261.930666 36.565333 36.565333 0 1 0 72.704-8.192c-19.370667-173.141333-153.344-307.456-325.888-326.698666z m2.645333 148.565333a36.437333 36.437333 0 0 0-42.837333 29.013333 36.778667 36.778667 0 0 0 28.885333 43.093334 147.712 147.712 0 0 1 117.077333 117.333333 36.693333 36.693333 0 0 0 42.922667 29.056 36.906667 36.906667 0 0 0 28.885333-43.093333 220.757333 220.757333 0 0 0-174.933333-175.402667zM682.666667 643.84c19.242667-11.093333 41.045333-23.637333 68.48-17.792 24.832 5.248 109.568 74.026667 132.778666 97.834667 15.189333 15.616 23.68 31.744 24.96 47.872 2.304 63.232-83.626667 135.424-99.242666 144.384a120.533333 120.533333 0 0 1-72.106667 22.528c-27.733333 0-58.666667-7.893333-92.416-23.637334-183.04-76.373333-462.677333-350.506667-536.618667-532.138666-30.72-67.626667-30.890667-123.392-0.512-165.290667 12.117333-19.669333 81.152-101.845333 142.933334-99.242667 16.469333 1.408 32.426667 9.856 48.128 25.173334 23.722667 23.253333 90.794667 108.245333 95.957333 133.205333 5.717333 27.733333-6.826667 49.749333-18.005333 69.12a327.722667 327.722667 0 0 1-9.130667 14.506667c-13.354667 20.48-31.146667 47.829333-24.832 65.28 45.098667 110.677333 149.248 207.274667 259.968 252.629333 17.109333 6.229333 44.458667-11.690667 64.896-25.088a336.64 336.64 0 0 1 14.293333-9.045333L682.666667 643.84z"
              p-id="9483"
            ></path>
          </svg>
        );
      case "More":
        return (
          <svg
            class="saki-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="10686"
            fill={this.color}
            width={this.width}
            height={this.height}
          >
            <path
              d="M227.14123 413.647995c-52.14973 0-94.587262 42.439578-94.587262 94.587262 0 52.14973 42.437531 94.587262 94.587262 94.587262 52.147684 0 94.587262-42.437531 94.587262-94.587262C321.728492 456.087573 279.288914 413.647995 227.14123 413.647995z"
              p-id="10687"
            ></path>
            <path
              d="M510.903016 413.647995c-52.14973 0-94.587262 42.439578-94.587262 94.587262 0 52.14973 42.437531 94.587262 94.587262 94.587262 52.147684 0 94.587262-42.437531 94.587262-94.587262C605.490278 456.087573 563.051723 413.647995 510.903016 413.647995z"
              p-id="10688"
            ></path>
            <path
              d="M794.665825 413.647995c-52.14973 0-94.587262 42.439578-94.587262 94.587262 0 52.14973 42.437531 94.587262 94.587262 94.587262 52.147684 0 94.587262-42.437531 94.587262-94.587262C889.253086 456.087573 846.813508 413.647995 794.665825 413.647995z"
              p-id="10689"
            ></path>
          </svg>
        );
      case "JoinGroup":
        return (
          <svg
            class="saki-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2033"
            fill={this.color}
            width={this.width}
            height={this.height}
          >
            <path
              d="M507.306667 706.133333A42.666667 42.666667 0 0 1 469.333333 768H42.666667a42.666667 42.666667 0 0 1-37.973334-61.866667l42.666667-81.066666A128 128 0 0 1 159.573333 554.666667h192.853334a128 128 0 0 1 114.346666 70.4zM256 469.333333a128 128 0 1 0-128-128 128 128 0 0 0 128 128z m746.666667-42.666666H896V320a21.333333 21.333333 0 0 0-21.333333-21.333333h-42.666667a21.333333 21.333333 0 0 0-21.333333 21.333333V426.666667h-106.666667a21.333333 21.333333 0 0 0-21.333333 21.333333v42.666667a21.333333 21.333333 0 0 0 21.333333 21.333333H810.666667v106.666667a21.333333 21.333333 0 0 0 21.333333 21.333333h42.666667a21.333333 21.333333 0 0 0 21.333333-21.333333V512h106.666667a21.333333 21.333333 0 0 0 21.333333-21.333333v-42.666667a21.333333 21.333333 0 0 0-21.333333-21.333333zM469.333333 469.333333a128 128 0 1 0-38.4-250.026666 213.333333 213.333333 0 0 1 0 244.053333 128 128 0 0 0 38.4 5.973333z m210.773334 155.733334A128 128 0 0 0 565.76 554.666667h-42.666667a208.64 208.64 0 0 1 20.48 32.426666l40.533334 80.64a128 128 0 0 1 5.546666 100.266667H682.666667a42.666667 42.666667 0 0 0 37.973333-61.866667z"
              p-id="2034"
            ></path>
          </svg>
        );
      case "Group":
        return (
          <svg
            class="saki-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3142"
            fill={this.color}
            width={this.width}
            height={this.height}
          >
            <path
              d="M681.984 553.984q56.021333 0 121.984 16t121.984 52.010667 56.021333 82.005333l0 105.984-256 0 0-105.984q0-88.021333-84.010667-148.010667 13.994667-2.005333 40.021333-2.005333zM342.016 553.984q56.021333 0 121.984 16t121.002667 52.010667 54.997333 82.005333l0 105.984-598.016 0 0-105.984q0-45.994667 56.021333-82.005333t121.984-52.010667 121.984-16zM342.016 470.016q-52.010667 0-89.984-38.016t-38.016-89.984 38.016-89.984 89.984-38.016 89.002667 38.016 36.992 89.984-36.992 89.984-89.002667 38.016zM681.984 470.016q-52.010667 0-89.984-38.016t-38.016-89.984 38.016-89.984 89.984-38.016 89.984 38.016 38.016 89.984-38.016 89.984-89.984 38.016z"
              p-id="3143"
            ></path>
          </svg>
        );
      case "AddUser":
        return (
          <svg
            class="saki-icon add-user"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="17621"
            fill={this.color}
            width={this.width}
            height={this.height}
          >
            <path
              d="M720.64 791.466667A42.666667 42.666667 0 0 1 682.666667 853.333333H85.333333a42.666667 42.666667 0 0 1-37.973333-61.866666l61.44-123.306667A128 128 0 0 1 223.573333 597.333333h320.853334a128 128 0 0 1 114.773333 70.826667zM384 512a170.666667 170.666667 0 1 0-170.666667-170.666667 170.666667 170.666667 0 0 0 170.666667 170.666667z m576-85.333333H853.333333V320a21.333333 21.333333 0 0 0-21.333333-21.333333h-42.666667a21.333333 21.333333 0 0 0-21.333333 21.333333V426.666667h-106.666667a21.333333 21.333333 0 0 0-21.333333 21.333333v42.666667a21.333333 21.333333 0 0 0 21.333333 21.333333H768v106.666667a21.333333 21.333333 0 0 0 21.333333 21.333333h42.666667a21.333333 21.333333 0 0 0 21.333333-21.333333V512h106.666667a21.333333 21.333333 0 0 0 21.333333-21.333333v-42.666667a21.333333 21.333333 0 0 0-21.333333-21.333333z"
              p-id="17622"
            ></path>
          </svg>
        );
      case "Messages":
        return (
          <svg
            class="saki-icon"
            viewBox="0 0 1098 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7584"
            fill={this.color}
            width={this.width}
            height={this.height}
          >
            <path
              d="M548.571429 0C246.418286 0 0 214.674286 0 477.842286c0 153.819429 84.187429 291.035429 214.454857 378.514286L74.971429 1024l282.038857-98.450286c59.684571 19.456 124.196571 30.134857 191.561143 30.134857 302.153143 0 548.571429-214.674286 548.571429-477.842286C1097.142857 214.674286 850.724571 0 548.571429 0zM301.787429 537.161143c-37.229714 0-67.364571-31.232-67.364571-69.705143 0-38.473143 30.134857-69.632 67.364571-69.632 37.156571 0 67.364571 31.158857 67.364571 69.632C369.152 505.929143 338.944 537.161143 301.787429 537.161143zM548.571429 537.161143c-37.229714 0-67.364571-31.232-67.364571-69.705143 0-38.473143 30.134857-69.632 67.364571-69.632 37.229714 0 67.364571 31.158857 67.364571 69.632C615.936 505.929143 585.801143 537.161143 548.571429 537.161143zM795.355429 537.161143c-37.156571 0-67.364571-31.232-67.364571-69.705143 0-38.473143 30.208-69.632 67.364571-69.632 37.229714 0 67.364571 31.158857 67.364571 69.632C862.72 505.929143 832.585143 537.161143 795.355429 537.161143z"
              p-id="7585"
            ></path>
          </svg>
        );

      case "Settings":
        return (
          <svg
            class="saki-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9709"
            fill={this.color}
            width={this.width}
            height={this.height}
          >
            <path
              d="M512 664.977939C427.501813 664.977939 359.012502 596.488629 359.012502 512 359.012502 427.501813 427.501813 359.012502 512 359.012502 596.488629 359.012502 664.987501 427.501813 664.987501 512 664.987501 596.488629 596.488629 664.977939 512 664.977939M883.539699 397.319111 810.825958 388.220335 855.813286 330.368563C885.680589 300.510816 885.680589 252.10189 855.813286 222.234586L801.755859 168.186714C771.898112 138.328967 723.489184 138.328967 693.631437 168.186714L635.770107 213.183599 626.680889 140.460298C626.680889 98.235098 592.455348 64 550.220591 64L473.779409 64C431.554209 64 397.319111 98.235098 397.319111 140.460298L388.229893 213.183599 330.37812 168.186714C300.520374 138.328967 252.111448 138.319409 222.253701 168.186714L168.186714 222.234586C138.328967 252.092333 138.338525 300.510816 168.186714 330.368563L213.193156 388.220335 140.460298 397.319111C98.235098 397.319111 64 431.544652 64 473.779409L64 550.220591C64 592.445791 98.235098 626.680889 140.460298 626.680889L213.193156 635.770107 168.186714 693.621882C138.338525 723.479629 138.328967 771.88855 168.186714 801.755859L222.253701 855.803731C252.10189 885.661478 300.520374 885.661478 330.37812 855.803731L388.229893 810.816403 397.319111 883.530144C397.319111 925.755347 431.544652 959.990445 473.779409 959.990445L550.220591 959.990445C592.445791 959.990445 626.680889 925.755347 626.680889 883.530144L635.770107 810.806842 693.621882 855.79417C723.479629 885.651917 771.88855 885.661478 801.746298 855.803731L855.813286 801.746298C885.661478 771.898112 885.661478 723.470067 855.813286 693.61232L810.816403 635.770107 883.539699 626.680889C925.764902 626.680889 960 592.455348 960 550.220591L960 473.779409C960 431.554209 925.764902 397.319111 883.539699 397.319111"
              p-id="9710"
            ></path>
          </svg>
        );
      case "User":
        return (
          <svg
            class="saki-icon"
            viewBox="0 0 1032 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="15771"
            fill={this.color}
            width={this.width}
            height={this.height}
          >
            <path
              d="M494.870476 507.635572c160.939766 0 291.404485-111.604041 291.404485-249.237064 0-137.664224-130.464718-249.229265-291.404485-249.229265-160.924166 0-291.412285 111.56504-291.396684 249.229265 0 137.633024 130.472518 249.237065 291.404485 249.237064zM628.455241 590.737994H385.59087c-207.888657 0-376.433535 144.122719-376.433535 321.910733v20.779506c0 72.665868 168.544878 72.736069 376.433535 72.736069H628.455241c207.865256 0 376.402334-2.683239 376.402334-72.736069v-20.771705c0-177.795814-168.521478-321.918533-376.402334-321.918534z"
              p-id="15772"
            ></path>
          </svg>
        );
      case "Notifications":
        return (
          <svg
            class="saki-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="16678"
            fill={this.color}
            width={this.width}
            height={this.height}
          >
            <path
              d="M509.6 984.4c3.8 0 7.6-0.2 11.4-0.4 3.8-0.2 7.6-0.6 11.4-1.2 3.8-0.6 7.4-1.2 11.2-2s7.4-1.6 11-2.6c3.6-1 7.2-2.2 10.8-3.4 3.6-1.2 7.2-2.6 10.6-4.2 3.4-1.4 7-3 10.2-4.8s6.6-3.6 10-5.4c3.2-2 6.4-4 9.6-6.2 3.2-2.2 6.2-4.4 9.2-6.8s5.8-4.8 8.6-7.4c2.8-2.6 5.6-5.2 8.2-8 2.6-2.8 5.2-5.6 7.6-8.4 2.4-3 4.8-5.8 7-9 2.2-3 4.4-6.2 6.4-9.4s4-6.4 5.8-9.8c0.2-0.4 0.4-0.6 0.4-1 0.2-0.4 0.2-0.6 0.4-1 0-0.4 0.2-0.8 0.2-1v-1c0-0.4 0-0.8-0.2-1 0-0.4-0.2-0.8-0.2-1-0.2-0.4-0.2-0.6-0.4-1s-0.4-0.6-0.4-1-0.4-0.6-0.6-0.8c-0.2-0.2-0.4-0.6-0.8-0.8-0.2-0.2-0.6-0.4-0.8-0.8-0.2-0.2-0.6-0.4-1-0.6-0.4-0.2-0.6-0.4-1-0.4-0.4-0.2-0.6-0.2-1-0.4-0.4 0-0.8-0.2-1-0.2H367.4c-0.4 0-0.8 0.2-1 0.2-0.4 0-0.6 0.2-1 0.4s-0.6 0.2-1 0.4-0.6 0.4-1 0.6c-0.2 0.2-0.6 0.4-0.8 0.8l-0.8 0.8c-0.2 0.2-0.4 0.6-0.6 0.8-0.2 0.4-0.4 0.6-0.6 1-0.2 0.4-0.2 0.6-0.4 1s-0.2 0.8-0.2 1c0 0.4 0 0.8-0.2 1v1c0 0.4 0 0.8 0.2 1 0 0.4 0.2 0.6 0.4 1s0.2 0.6 0.4 1c1.8 3.4 3.6 6.6 5.8 9.8 2 3.2 4.2 6.4 6.4 9.4s4.6 6 7 9c2.4 3 5 5.8 7.6 8.4 2.6 2.8 5.4 5.4 8.2 8 2.8 2.6 5.6 5 8.6 7.4 3 2.4 6 4.6 9.2 6.8 3.2 2.2 6.2 4.2 9.6 6.2s6.6 3.8 10 5.4c3.4 1.8 6.8 3.4 10.2 4.8 3.4 1.4 7 2.8 10.6 4.2 3.6 1.2 7.2 2.4 10.8 3.4 3.6 1 7.4 1.8 11 2.6 3.8 0.8 7.4 1.4 11.2 2 3.8 0.6 7.6 0.8 11.2 1.2s7.6 0.4 11.4 0.4zM897.8 692c-3.6-4.2-7-8.4-10.4-12.6-46.4-56.2-74.4-90-74.4-249 0-82.2-19.6-149.8-58.4-200.4-28.6-37.4-67.2-65.8-118.2-86.8-0.6-0.4-1.2-0.8-1.8-1.4-18.4-61.4-68.4-102.4-125-102.4-56.6 0-106.8 41.2-125 102.4-0.4 0.6-1 1-1.8 1.4-119 49-176.8 143-176.8 287.2 0 159-28 192.8-74.4 249-3.4 4-6.8 8.2-10.4 12.6-2.2 2.8-4.2 5.6-6.2 8.6-1.8 3-3.4 6.2-4.8 9.4s-2.6 6.6-3.4 10c-1 3.4-1.6 6.8-2 10.4-0.4 3.4-0.6 7-0.6 10.6s0.4 7 1 10.6 1.4 6.8 2.4 10.2c1 3.4 2.4 6.6 3.8 9.8 13 27.4 40.8 44.4 72.4 44.4h651.6c31.6 0 59-17 72.2-44.2 1.6-3.2 2.8-6.4 3.8-9.8 1-3.4 1.8-6.8 2.4-10.2 0.6-3.4 0.8-7 1-10.6s-0.2-7-0.6-10.6c-0.4-3.6-1.2-7-2-10.4-1-3.4-2-6.8-3.4-10s-3-6.4-4.8-9.4c-1.8-3.2-3.8-6.2-6.2-8.8z"
              p-id="16679"
            ></path>
          </svg>
        );

      default:
        return "";
    }
  }
  render() {
    return (
      <div
        style={{
          ...["margin", "padding"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        title={this.title}
        class={"saki-icon-component "}
      >
        {this.getTypeEl()}
      </div>
    );
  }
}
