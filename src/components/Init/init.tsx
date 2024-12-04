import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
} from "@stencil/core";
import { initSakiUIMethods } from "../../modules/methods";
import { state } from "../../store";
import { sakiuiEventListener } from "../../store/config";

@Component({
  tag: "saki-init",
  styleUrl: "init.scss",
  shadow: false,
})
export class SakiInitComponent {
  @Event() mounted: EventEmitter;
  @Element() el: HTMLElement;
  watchFocusFunc() {}
  inputValue() {}
  componentWillLoad() {}
  componentDidLoad() {
    console.log("[Saki UI] initialization");
    state;
    initSakiUIMethods();
    this.mounted.emit();
    sakiuiEventListener.dispatch("mounted", "");
  }
  @Method()
  async getSakiuiEventListener() {
    return (window as any)?.sakiui?.sakiuiEventListener;
  }
  render() {
    return <div class={"saki-init"}></div>;
  }
}
