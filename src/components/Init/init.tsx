import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
} from "@stencil/core";
import { initSakiUIMethods } from "../../modules/methods";

@Component({
  tag: "saki-init",
  styleUrl: "init.scss",
  // shadow: true,
})
export class SakiInitComponent {
  @Event() mounted: EventEmitter;
  @Element() el: HTMLElement;
  watchFocusFunc() {}
  inputValue() {}
  componentWillLoad() {}
  componentDidLoad() {
    console.log("[Saki UI] initialization")
    initSakiUIMethods()
    this.mounted.emit();
  }
  render() {
    return <div class={"saki-init"}></div>;
  }
}
