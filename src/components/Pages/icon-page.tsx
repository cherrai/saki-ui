import { Component, h, Prop, State } from "@stencil/core";
import { copyText } from "../../modules/methods";
import { SakiIconComponent } from "../Icon/icon";

@Component({
  tag: "saki-pages-icon",
  styleUrl: "icon-page.scss",
  shadow: false,
})
export class SakiPagesIconComponent {
  @State() contextmenu: HTMLSakiContextMenuElement;

  @Prop() color = "#000";
  @Prop() width = "16px";
  @Prop() height = "16px";
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() title = "";
  @State() loadPage = 1;
  @State() types = Object.keys(SakiIconComponent.typeData);
  // @State() types = [];

  render() {
    const cascaderOptions = [
      {
        value: "CQ",
        text: "重庆市",
        list: [
          {
            value: "CQ",
            text: "重庆市",

            list: [
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
            ],
          },
          {
            value: "CQ",
            text: "重庆市",

            list: [],
          },
          {
            value: "CQ",
            text: "重庆市",

            list: [
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
            ],
          },
          {
            value: "CQ",
            text: "重庆市",

            list: [
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
            ],
          },
        ],
      },
      {
        value: "CQ",
        text: "重庆市",
      },
      {
        value: "CQ",
        text: "重庆市",

        list: [
          {
            value: "CQ",
            text: "重庆市",

            list: [
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
            ],
          },
          {
            value: "CQ",
            text: "重庆市",

            list: [
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
            ],
          },
          {
            value: "CQ",
            text: "重庆市",

            list: [
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
            ],
          },
          {
            value: "CQ",
            text: "重庆市",

            list: [
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
              {
                value: "CQ",
                text: "重庆市",
              },
            ],
          },
        ],
      },
    ].map((v, i) => {
      v.value = v.value + i;
      v.text = v.text + i;
      if (v.list) {
        v.list = v.list.map((sv, si) => {
          sv.value = sv.value + i + "" + si;
          sv.text = sv.text + i + "" + si;
          sv.list = sv.list.map((ssv, ssi) => {
            ssv.value = ssv.value + i + "" + si + "" + ssi;
            ssv.text = ssv.text + i + "" + si + "" + ssi;
            return ssv;
          });
          return sv;
        });
      }
      return v;
    });

    const imagesUrls2 = [
      {
        src: "https://picsum.photos/300/400?random=1",
        width: 300,
        height: 400,
      },
      {
        src: "https://picsum.photos/250/300?random=2",
        width: 250,
        height: 300,
      },
      {
        src: "https://picsum.photos/320/500?random=3",
        width: 320,
        height: 500,
      },
      {
        src: "https://picsum.photos/280/350?random=4",
        width: 280,
        height: 350,
      },
      {
        src: "https://picsum.photos/310/420?random=5",
        width: 310,
        height: 420,
      },
      {
        src: "https://picsum.photos/260/320?random=6",
        width: 260,
        height: 320,
      },
      {
        src: "https://picsum.photos/290/450?random=7",
        width: 290,
        height: 450,
      },
      {
        src: "https://picsum.photos/270/380?random=8",
        width: 270,
        height: 380,
      },
      {
        src: "https://picsum.photos/300/360?random=9",
        width: 300,
        height: 360,
      },
      {
        src: "https://picsum.photos/280/400?random=10",
        width: 280,
        height: 400,
      },
      {
        src: "https://picsum.photos/310/340?random=11",
        width: 310,
        height: 340,
      },
      {
        src: "https://picsum.photos/260/500?random=12",
        width: 260,
        height: 500,
      },
      {
        src: "https://picsum.photos/290/370?random=13",
        width: 290,
        height: 370,
      },
      {
        src: "https://picsum.photos/320/410?random=14",
        width: 320,
        height: 410,
      },
      {
        src: "https://picsum.photos/270/330?random=15",
        width: 270,
        height: 330,
      },
      {
        src: "https://picsum.photos/300/460?random=16",
        width: 300,
        height: 460,
      },
      {
        src: "https://picsum.photos/280/390?random=17",
        width: 280,
        height: 390,
      },
      {
        src: "https://picsum.photos/310/350?random=18",
        width: 310,
        height: 350,
      },
      {
        src: "https://picsum.photos/260/430?random=19",
        width: 260,
        height: 430,
      },
      {
        src: "https://picsum.photos/290/380?random=20",
        width: 290,
        height: 380,
      },
    ];

    const imagesUrls = [
      {
        url: "https://saass.aiiko.club/s/MID1SOBHcg",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HmPIddks1z",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/IfsSREMs0h",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/MOtBZ46pd4",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JwvRemv8Jz",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/Myp8tgrCfm",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LyLlnOX4l6",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HpZK2uGCea",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HVY7K0pXoK",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/MMtibllUFY",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/Im5Bf2v68D",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HdHpHGDMXh",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JINVZ8eyDc",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/HpZK2uGCea",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/KAvx1QHuYb",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LVhuAb1efC",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JSTWCkfVq5",
        width: 1792,
        height: 776,
      },
      {
        url: "https://saass.aiiko.club/s/JgotybNFlD",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HwYjOt6rxD",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LJcdrRTAzL",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LW2gJpZkt5",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/IPgOk7fenG",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Ln3q6atAvc",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JpleTxhclL",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/ILLBwJ8iQR",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LSIpTRFj0W",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/LWQvMqKeZY",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/ISs1RxQopt",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/HEylS5qrYp",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LtHuVLS8Ab",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LN4f8Wctgw",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/IS6lkfvHah",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JSWMe7VTig",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Lc1e5KWFDN",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/IMXfW6Uq51",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/JWfteypMkd",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/MSmfTAzXPA",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HnOILIBq7h",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HBbnGBXnI1",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/Kob55FBEfj",
        width: 1280,
        height: 960,
      },
      {
        url: "https://api.aiiko.club/public/images/upload/1/20250114/img_19fd1f07838688d21ab66d2f8cf98d9d.jpg",
        width: 1200,
        height: 547,
      },
      {
        url: "https://saass.aiiko.club/s/IJI0xYQAiX",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/KBg2eKssOf",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JHZHYWqONH",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Mk8xuryG0k",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Mo55yAV72U",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/IUu4wUV4um",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/IWwHg88cAN",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Lr5Xyvylf6",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/Iqu03TTmdo",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HpoFUxW0kv",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HL761y0EiV",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/ImuvWk6CMM",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Im2LIKacsI",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LrHq1A3vUW",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/KsojCHFiBJ",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/KunaceLSIK",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/MxquMpNmwb",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HDhJPSen42",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JMtT1i7mLo",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JOdQuWefbk",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/MxBIsjJke0",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HgZOBqpX6Y",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/KuVGQLNCKw",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Jbhxxfzx0r",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/MypuVoHBs0",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Ird7sULF77",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HAzeiwWaMO",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/KbzkxWQSao",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/IxuBk80yPW",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HudtoSqbfm",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JCsUilchfQ",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HWON1Qrazy",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LtAG35bZes",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HZV428N0R3",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/MJjvYN3OFh",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JpI6HN2nwz",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/MIWyQjkp6N",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LcQJYMp62d",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JR6VMJdm0d",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JeUCjpWBaq",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/KmmjqsQ0cW",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LrrLsTE7xI",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Lc6ftntYCa",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Ls4S7ny2gT",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/IRauF7nQGc",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/MOtH7gymsb",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HKroFsFFvd",
        width: 1280,
        height: 960,
      },
      {
        url: "https://saass.aiiko.club/s/KO3MNJxPOq",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/IbiK4VOTF6",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/HwrKwmsbUw",
        width: 1280,
        height: 576,
      },
      {
        url: "https://saass.aiiko.club/s/MeKkcZufDB",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LQXEgdnEP4",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/HlvPA7zitx",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/IevBkv2WSS",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JPpEC4tyvN",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LyBgRmPw6p",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/MGELcxYoeA",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LsDSd2GW3o",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Ldg6QfTV5d",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HtfcErxRb6",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/HA2s2KBxtp",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/MhqjnHrPtH",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Lk4e6dGUPw",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/LQYliLSR11",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LlF8OrabLA",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JarZO8S547",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Lh1gQnH2EE",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/IZjuNldAnr",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LBMbbiyfYA",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/IPVCDnZprm",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Jl2FSUaa2z",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Jxj7xkgeaO",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HtoDwbRRoa",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/HfcAt2xGJz",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/IRr7PkOlsS",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/ItYwaSIWRw",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/IR2lYqlJHS",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/IMOG8Qr8VL",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/MCMLb282hd",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/IHkxpY4UPh",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/MA7Nys7cGB",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/KBJcHICcXy",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LiGMnN0nuI",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Jjpz8bmSXy",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/Knw53Y5hlZ",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Magu3nxR41",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JhPlQzgreZ",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LZyLKLWeEU",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/MotT6txOLK",
        width: 877,
        height: 1920,
      },
      {
        url: "https://saass.aiiko.club/s/IdNweFKxU7",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/KPhiJE1GZZ",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/KYBhld2jHX",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JRaKBRD80k",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LmypIU43KI",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/JPiUJwwAoG",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/MoxmSDV0mv",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/IfRJFqHGR3",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/INyYTK20Jm",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HJ56pEv0XG",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/Mhf6MXfEQD",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/IVqaYNRqkG",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/LXXgu2J5nj",
        width: 2096,
        height: 776,
      },
      {
        url: "https://saass.aiiko.club/s/MhHDOGyBZj",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HEZc0F2jHo",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/HaLFPeyqqu",
        width: 1600,
        height: 720,
      },
      {
        url: "https://saass.aiiko.club/s/Ijac8DfBnG",
        width: 4624,
        height: 2080,
      },
      {
        url: "https://saass.aiiko.club/s/IGrBADGqqF",
        width: 4624,
        height: 2080,
      },
      {
        url: "https://saass.aiiko.club/s/IfVGzXpfO8",
        width: 4000,
        height: 1824,
      },
      {
        url: "https://saass.aiiko.club/s/MKRZGkhtlB",
        width: 1824,
        height: 4000,
      },
      {
        url: "https://saass.aiiko.club/s/HkxxuCgCOp",
        width: 4000,
        height: 1824,
      },
    ];

    return (
      <div
        style={{
          ...["margin", "padding"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        title={this.title}
        class={"saki-pages-icon-component "}
      >
        <div
          style={{
            padding: "20px 20px 0",
          }}
        >
          <saki-waterfall-layout>
            {imagesUrls2
              .filter((_, i) => i < 6 * this.loadPage)
              .map((v) => {
                return (
                  <saki-waterfall-layout-item
                    // padding="0 10px 10px"
                    width={v.width}
                    borderRadius="10px"
                    height={v.height}
                  >
                    <saki-images
                      style={{
                        width: "100%",
                      }}
                      borderRadius="10px"
                      width={"auto"}
                      src={v.src}
                    ></saki-images>
                  </saki-waterfall-layout-item>
                  // <div class={"item"}>
                  //   {/* <img src={v.url + "?x-saass-process=image/resize,300,70"} /> */}
                  //   <img src={v} />
                  // </div>
                );
              })}
          </saki-waterfall-layout>

          <div
            onClick={() => {
              // const el = document.querySelector("saki-waterfall-layout");
              // console.log("el", el);
              this.loadPage += 1;
            }}
          >
            加载更多
          </div>

          <saki-carousel
            margin="0 0 20px 0"
            width="100%"
            height="300px"
            borderRadius="10px"
            // autoplay
            arrows
            dots
          >
            {[
              "https://api.aiiko.club/public/images/upload/1/20250114/img_19fd1f07838688d21ab66d2f8cf98d9d.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250113/img_baf692e4ba62e3aeab2b0e0d05c00873.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250113/img_2ac7d7a9e6fd77b519e01dc73d004f1b.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250114/img_19fd1f07838688d21ab66d2f8cf98d9d.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250113/img_baf692e4ba62e3aeab2b0e0d05c00873.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250113/img_2ac7d7a9e6fd77b519e01dc73d004f1b.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250114/img_19fd1f07838688d21ab66d2f8cf98d9d.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250113/img_baf692e4ba62e3aeab2b0e0d05c00873.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250113/img_2ac7d7a9e6fd77b519e01dc73d004f1b.jpg",
            ].map((v, i) => {
              return (
                <saki-carousel-item key={i}>
                  <saki-images
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    lazyload={false}
                    src={v}
                  ></saki-images>
                  ;
                </saki-carousel-item>
              );
            })}
            <saki-carousel-item>
              <saki-button>测试按钮</saki-button>;
            </saki-carousel-item>
          </saki-carousel>
          <saki-carousel-nav margin="0 0 50px 0" width="100%" height="60px">
            {[
              "https://api.aiiko.club/public/images/upload/1/20250114/img_19fd1f07838688d21ab66d2f8cf98d9d.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250113/img_baf692e4ba62e3aeab2b0e0d05c00873.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250113/img_2ac7d7a9e6fd77b519e01dc73d004f1b.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250114/img_19fd1f07838688d21ab66d2f8cf98d9d.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250113/img_baf692e4ba62e3aeab2b0e0d05c00873.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250113/img_2ac7d7a9e6fd77b519e01dc73d004f1b.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250114/img_19fd1f07838688d21ab66d2f8cf98d9d.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250113/img_baf692e4ba62e3aeab2b0e0d05c00873.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250113/img_2ac7d7a9e6fd77b519e01dc73d004f1b.jpg",
            ].map((v, i) => {
              return (
                <saki-carousel-nav-item
                  borderRadius="6px"
                  width="50px"
                  height="50px"
                  key={i}
                >
                  <saki-images
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    lazyload={false}
                    src={v}
                  ></saki-images>
                </saki-carousel-nav-item>
              );
            })}
            <saki-carousel-nav-item
              borderRadius="6px"
              width="50px"
              height="50px"
            >
              <saki-button>网页</saki-button>;
            </saki-carousel-nav-item>
          </saki-carousel-nav>
          {/* <saki-carousel width="500px" height="300px" autoplay>
            {[
              "https://api.aiiko.club/public/images/upload/1/20250114/img_19fd1f07838688d21ab66d2f8cf98d9d.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250113/img_baf692e4ba62e3aeab2b0e0d05c00873.jpg",
              "https://api.aiiko.club/public/images/upload/1/20250113/img_2ac7d7a9e6fd77b519e01dc73d004f1b.jpg",
            ].map((v, i) => {
              return (
                <saki-carousel-item key={i}>
                  <saki-images
                    width="500px"
                    height="300px"
                    objectFit="cover"
                    src={v}
                  ></saki-images>
                  ;
                </saki-carousel-item>
              );
            })}
          </saki-carousel> */}
          <saki-breadcrumb
            onClickvalue={(e) => {
              console.log("saki-breadcrumb", e);
            }}
            options={[
              {
                value: "1",
                text: "开发日记",
                click: true,
                style: {
                  fontSize: "12px",
                  maxWidth: "100px",
                  color: "#666",
                },
              },
              {
                value: "2",
                text: "开发随喵笔记",
                click: true,
                style: {
                  fontSize: "12px",
                  maxWidth: "100px",
                  color: "#666",
                },
              },
              {
                value: "3",
                text: "catalog",
                style: {
                  fontSize: "12px",
                  maxWidth: "100px",
                  color: "#666",
                },
              },
            ]}
          ></saki-breadcrumb>
          <saki-cascader-dropdown
            onChangevalue={(e) => {
              console.log("saki-cascader-dropdown", e);
              e.target.buttonTextRender(
                e.detail.values.map((v) => v.text).join(" > ")
              );
            }}
            values={["CQ0", "CQ02"]}
            options={cascaderOptions}
          ></saki-cascader-dropdown>

          {/* <saki-cascader
            onChangevalue={(e) => {
              console.log("saki-cascader", e);
            }}
            options={cascaderOptions}
          ></saki-cascader> */}
          <div
            style={{
              margin: "0px 0 0 500px",
            }}
            onClick={(e) => {
              console.log(e);
              this.contextmenu.show({
                x: e.pageX,
                y: e.pageY,
                label: "ces1",
              });
            }}
          >
            <span>测试contextmenu</span>
          </div>
          <saki-context-menu
            ref={(e) => {
              this.contextmenu = e;
              console.log(this.contextmenu);
            }}
            onSelectvalue={(e) => {
              console.log("onSelectvalue", e.detail);
            }}
          >
            <saki-context-menu-item value={"1"} width="120px">
              <span>1</span>
            </saki-context-menu-item>
            <saki-context-menu-item value={"2"} width="120px">
              <span>2</span>

              <div slot="SubMenu">
                <saki-context-menu>
                  <saki-context-menu-item value={"2.1"} width="120px">
                    <span>2.1</span>
                  </saki-context-menu-item>
                  <saki-context-menu-item value={"2.2"} width="120px">
                    <span>2.2</span>

                    <div slot="SubMenu">
                      <saki-context-menu>
                        <saki-context-menu-item value={"2.1.1"} width="120px">
                          <span>2.1.1</span>
                        </saki-context-menu-item>
                        <saki-context-menu-item value={"2.1.2"} width="120px">
                          <span>2.1.2</span>
                        </saki-context-menu-item>
                      </saki-context-menu>
                    </div>
                  </saki-context-menu-item>
                </saki-context-menu>
              </div>
            </saki-context-menu-item>
            <saki-context-menu-item value={"3"} width="120px">
              <span>3</span>
              <div slot="SubMenu">
                <saki-context-menu>
                  <saki-context-menu-item value={"3.1"} width="120px">
                    <span>3.1</span>
                  </saki-context-menu-item>
                  <saki-context-menu-item value={"3.2"} width="120px">
                    <span>3.2</span>
                  </saki-context-menu-item>
                </saki-context-menu>
              </div>
            </saki-context-menu-item>
          </saki-context-menu>

          {/* <saki-cascader>
            <saki-cascader-item>1</saki-cascader-item>
            <saki-cascader-item>
              <span>2</span>
              <div slot="SubCascade">
                <saki-cascader-item>2.1</saki-cascader-item>
                <saki-cascader-item>
                  <saki-cascader-item>
                    <span>2.2</span>
                    <div slot="SubCascade">
                      <saki-cascader-item>2.2.1</saki-cascader-item>
                      <saki-cascader-item>2.2.2</saki-cascader-item>
                    </div>
                  </saki-cascader-item>
                </saki-cascader-item>
              </div>
            </saki-cascader-item>
            <saki-cascader-item>3</saki-cascader-item>
            <saki-cascader-item>
              <span>4</span>
              <div slot="SubCascade">
                <saki-cascader-item>4.1</saki-cascader-item>
                <saki-cascader-item>4.2</saki-cascader-item>
              </div>
            </saki-cascader-item>
          </saki-cascader> */}

          <saki-tooltip
            title={"列表中被选择的行程将会依据行程明细的速度展示对应的轨迹颜色"}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                margin: "20px 0 20px",
              }}
            >
              <saki-icon
                width="18px"
                height="18px"
                color="#999"
                type="Detail"
              ></saki-icon>
            </div>
          </saki-tooltip>
          {/* <saki-segmented
            width="300px"
            height="40px"
            border-radius="20px"
            value={"Normal"}
          >
            <saki-segmented-item padding="0 10px" value="Normal">
              <span>{"normalMode"}</span>
            </saki-segmented-item>
            <saki-segmented-item padding="0 10px" value="Gray">
              <span>{"grayMode"}</span>
            </saki-segmented-item>
            <saki-segmented-item padding="0 10px" value="Dark">
              <span>{"darkMode"}</span>
            </saki-segmented-item>
            <saki-segmented-item padding="0 10px" value="Black">
              <span>{"blackMode"}</span>
            </saki-segmented-item>
          </saki-segmented> */}
          {/* <saki-slider
            min={30}
            max={120}
            value={[45, 60, 100].join(";")}
            bgColor="#eee"
            bgHoverColor="#ddd"
            trackColor={["red", "green"].join(";")}
            marks={[
              {
                val: 30,
                text: "30km/h",
                style: {
                  color: "blue",
                  fontWeight: 700,
                },
              },
              {
                val: 40,
                text: "40km/h",
              },
              {
                val: 80,
                text: "80km/h",
              },
              {
                val: 120,
                text: "120km/h",
                style: {
                  color: "blue",
                  fontWeight: 700,
                },
              },
            ]
              .map((v) => JSON.stringify(v))
              .join(";")}
            toolTip={true}
            disabled={false}
            width={"100%"}
            maxWidth={"100%"}
            height={"12px"}
            margin="40px 0"
            borderRadius="6px"
            onChangevalue={(e) => {
              console.log("onChangevalue", e);
            }}
          ></saki-slider> */}
          <saki-slider
            onChangevalue={(e) => {
              console.log("onChangevalue", e);
            }}
            min={0}
            max={500}
            value={[0, 500].join(";")}
            bg-color="rgb(243,243,243)"
            bg-hover-color="#eee"
            track-color={["var(--saki-default-color)"].join(";")}
            marks={[
              {
                val: 0,
                text: 0 + "km",
                style: {
                  color: "var(--saki-default-color)",
                  // fontWeight: 700,
                },
              },
              {
                val: 100,
                text: 100 + "km",
                style: {
                  color: "var(--saki-default-color)",
                  // fontWeight: 700,
                },
              },
              {
                val: 500,
                text: "500km+",
                style: {
                  color: "var(--saki-default-color)",
                  // fontWeight: 700,
                },
              },
            ]
              .map((v) => JSON.stringify(v))
              .join(";")}
            tool-tip={true}
            disabled={false}
            width={"100%"}
            max-width={"100%"}
            height={"12px"}
            margin="10px 0 16px"
            padding="0 15px 0 24px"
            border-radius="6px"
          ></saki-slider>
        </div>

        <div class={"pl-main"}>
          {this.types.map((v) => {
            return (
              <divc class={"pi-item"}>
                <div
                  onClick={() => {
                    copyText(v);
                  }}
                  class={"pi-i-wrap"}
                >
                  <div class={"pi-i-icon"}>
                    <saki-icon
                      width="28px"
                      height="28px"
                      type={v as any}
                    ></saki-icon>
                  </div>
                  <div class={"pi-i-type"}>{v}</div>
                </div>
              </divc>
            );
          })}
        </div>
      </div>
    );
  }
}
