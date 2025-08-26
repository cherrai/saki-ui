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
  tag: "saki-catalog-button",
  styleUrl: "catalog.scss",
  shadow: false,
})
export class SakiCatalogButtonComponent {
  @Prop() watchKey = "";
  @Prop() showBaseCatalogMaxIndex = 16;
  @Prop() fixed = true;
  @Prop() visible = true;
  @Prop() catalogs: {
    id: Symbol;
    index: string;
    title: string;
    level: number;
  }[] = [];
  @Prop({
    mutable: true,
  })
  activeCatalogId: Symbol;
  @State() timer: NodeJS.Timeout;
  @Element() el: HTMLElement;

  @Event({
    bubbles: false,
  })
  tap: EventEmitter;

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
        onClick={() => {
          this.tap.emit(this.catalogs);
        }}
        class={
          "saki-catalog-button-component " +
          (this.fixed ? "fixed" : "fixed") +
          " " +
          (this.visible ? "show" : "hide")
        }
      >
        {this.catalogs
          .filter((_, i) => i <= this.showBaseCatalogMaxIndex)
          .map((v, i) => {
            return (
              <div
                key={i}
                class={
                  "catalog-item " +
                  ((
                    i >= this.showBaseCatalogMaxIndex
                      ? this.showBaseCatalogMaxIndex === i
                      : v.id === this.activeCatalogId
                  )
                    ? "active"
                    : "")
                }
              ></div>
            );
          })}
      </div>
    );
  }
}
