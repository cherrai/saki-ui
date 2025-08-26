import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  State,
  h,
} from "@stencil/core";
import { sakiuiEventListener } from "../../store/config";

@Component({
  tag: "saki-catalog-render",
  styleUrl: "catalog.scss",
  shadow: false,
})
export class SakiCatalogRenderComponent {
  @Prop() watchKey = "";
  @Prop() catalogs: {
    id: Symbol;
    index: string;
    title: string;
    level: number;
  }[] = [];
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() activeCatalogId: Symbol;
  @State() timer: NodeJS.Timeout;
  @Element() el: HTMLElement;

  @Event({
    bubbles: false,
  })
  changeActiveCatalog: EventEmitter;

  componentWillLoad() {}
  componentDidLoad() {
    sakiuiEventListener.on("getCatalogs" + this.watchKey, (e) => {
      // console.log("catalogs watch", e);
      this.catalogs = e;
    });
    sakiuiEventListener.on("activeCatalogId" + this.watchKey, (e) => {
      // console.log("catalogs watch", e);
      this.activeCatalogId = e;
    });
  }

  render() {
    return (
      <div
        style={{
          ...["padding", "margin"].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={"saki-catalog-render-component"}
      >
        <div class="catalog-page">
          <div class="cp-list">
            {this.catalogs.map((v, i) => {
              const active = this.activeCatalogId === v.id;
              return (
                <div
                  onClick={() => {
                    console.log("getCatalogEl");
                    sakiuiEventListener.dispatch("getCatalogEl", {
                      id: v.id,
                      callback: (hEl: Element) => {
                        if (!hEl) return;
                        // const editorContentElRect =
                        //   editorContentEl?.getBoundingClientRect();
                        // const hElRect = hEl.getBoundingClientRect();

                        // editorContentEl.scrollTop =
                        //   editorContentEl.scrollTop +
                        //   (hElRect.top - editorContentElRect.top);

                        console.log("getCatalogEl");
                        this.activeCatalogId = v.id;
                        this.changeActiveCatalog.emit({
                          catalog: v,
                          el: hEl,
                        });
                      },
                    });
                  }}
                  style={{
                    ...({
                      "--catalog-left": (v.level - 1) * 10 + "px",
                    } as any),
                  }}
                  class={"cp-l-item " + (active ? "active" : "")}
                  key={i}
                >
                  <span>{v.index}</span>
                  <span>{v.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
