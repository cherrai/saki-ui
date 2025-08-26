import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop,
  State,
  h,
} from "@stencil/core";
import { sakiuiEventListener } from "../../store/config";
import { Debounce } from "@nyanyajs/utils/dist/debounce";

let hElObj = {} as {
  [id: symbol]: Element;
};

let observerList: IntersectionObserver[] = [];

@Component({
  tag: "saki-catalog",
  styleUrl: "catalog.scss",
  shadow: false,
})
export class SakiCatalogComponent {
  d = new Debounce();
  @Prop() watchKey = "";
  @Prop() catalogs: {
    id: Symbol;
    index: string;
    title: string;
    level: number;
  }[] = [];
  @State() activeCatalogId: Symbol;
  @State() timer: NodeJS.Timeout;
  @Element() el: HTMLElement;

  @Event({
    bubbles: false,
  })
  changeActiveCatalogId: EventEmitter<Symbol>;
  @Event({
    bubbles: false,
  })
  changeCatalogs: EventEmitter<typeof this.catalogs>;

  componentWillLoad() {}
  componentDidLoad() {
    sakiuiEventListener.on(
      "getCatalogEl",
      ({ id, callback }: { id: symbol; callback: any }) => {
        callback?.(hElObj[id]);
      }
    );
  }

  @Method()
  async parseCatalogs({
    el,
    root = null,
  }: {
    el: HTMLElement;
    root?: HTMLElement;
  }) {
    observerList.forEach((ob) => {
      ob.disconnect();
    });
    observerList.length = 0;
    hElObj = {};

    // console.log("parseCatalogs", el, this);

    if (el) {
      const editorContentElRect = el.getBoundingClientRect();
      // console.log("getCatalog", el);
      const hList = el.querySelectorAll("h1,h2,h3,h4,h5,h6");
      // console.log("getCatalog", hList);

      const catalogTemp = [] as (typeof this)["catalogs"];

      let hIndexList = new Array(6).fill(0);
      let hCountList = new Array(6).fill(0);

      hList.forEach((h, i) => {
        if (!h.textContent) return;
        const id = Symbol();

        const level = Number(h.nodeName.replace("H", ""));
        hCountList[level - 1]++;

        if (i === 0 && level !== 1) {
          hIndexList[0] += 1;
        }

        hIndexList.forEach((_, si) => {
          if (level - 1 === si) {
            hIndexList[level - 1] += 1;
          }
          if (si > level - 1) {
            hIndexList[si] = 0;
          }
        });
        // console.log("hIndexList", hIndexList)

        // String(h1Index) + (h2Index ? "." + h2Index : "") + (h3Index ? "." + h3Index : "")

        catalogTemp.push({
          id,
          index: hIndexList.reduce((index, v, i) => {
            if (i <= level - 1) {
              if (i === 0) {
                index += String(v);
              } else {
                if (v) {
                  index = index + String("." + v);
                }
              }
            }
            return index;
          }, ""),
          title: h.textContent || "",
          level,
        });
        hElObj[id] = h;

        // console.log("this.catalogs h", el, h);
        let observer = new IntersectionObserver(
          (e) => {
            // console.log("this.catalogs", e);
            if (
              e?.[0].boundingClientRect.top -
                (e?.[0].rootBounds?.top || editorContentElRect.top) <=
              10
            ) {
              catalogTemp.some((v) => {
                if (v.id === id) {
                  if (e?.[0].isIntersecting) {
                  }
                  return true;
                }
              });

              const index = catalogTemp.reduce((index, v, i) => {
                if (v.id === id) {
                  if (e?.[0].isIntersecting) {
                    index = i;
                  } else {
                    index = i + 1;
                  }
                }
                if (index >= catalogTemp.length - 1) {
                  index = catalogTemp.length - 1;
                }
                // console.log("hEl", index, catalogTemp.length)
                // if (index > catalog.showBaseCatalogMaxIndex) {
                //   index = catalog.showBaseCatalogMaxIndex
                // }
                return index;
              }, 0);

              this.d.increase(() => {
                this.activeCatalogId = catalogTemp[index]?.id;
                this.changeActiveCatalogId.emit(this.activeCatalogId);

                sakiuiEventListener.dispatch(
                  "activeCatalogId" + this.watchKey,
                  this.activeCatalogId
                );
              }, 300);

              // console.log("this.catalogs", this.activeCatalogId);
            }
          },
          {
            root: root || null,
            rootMargin: "0px",
            threshold: 1.0,
          }
        );
        observer.observe(h);

        observerList.push(observer);
      });

      let observer = new IntersectionObserver(
        (e) => {
          // console.log("this.catalogs", e);
          if (
            e?.[0].boundingClientRect.top -
              (e?.[0].rootBounds?.top || editorContentElRect.top) <=
            10
          ) {
          }
        },
        {
          root: root || null,
          rootMargin: "0px",
          threshold: 1.0,
        }
      );
      observer.observe(el);

      observerList.push(observer);

      const l = hCountList.reduce(
        (l, v) => {
          if (v === 0 && !l.b) {
            l.v += 1;
          }
          if (v) {
            l.b = true;
          }
          return l;
        },
        {
          v: 0,
          b: false,
        }
      ).v;

      this.catalogs = catalogTemp.map((v) => {
        return {
          ...v,
          level: v.level - l,
        };
      });
      // console.log("this.catalogs", this.catalogs);

      sakiuiEventListener.dispatch(
        "getCatalogs" + this.watchKey,
        this.catalogs
      );

      this.changeCatalogs.emit(this.catalogs);
    }
  }
  render() {
    return <div class={"saki-catalog-component"}></div>;
  }
}
