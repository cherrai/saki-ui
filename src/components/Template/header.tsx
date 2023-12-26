import { Component, h, Prop, State } from "@stencil/core";

@Component({
  tag: "saki-header",
  styleUrl: "template.scss",
  shadow: false,
})
export class TemplateHeaderComponent {
  @Prop() language = "row";
  @State() showLanguageDropdown = false;

  return() {
    return <span></span>;
  }
  // render() {
  //   return (
  //     <div
  //       style={{
  //         ...[
  //           "margin",
  //           "padding",
  //           "flexDirection",
  //           "justifyContent",
  //           "alignItems",
  //           "width",
  //           "height",
  //         ].reduce(
  //           (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
  //           {}
  //         ),
  //       }}
  //       class={"saki-settings-component "}
  //     >
  //       <div class="f-left">
  //         <div class="f-language">
  //           <saki-dropdown
  //             visible={this.showLanguageDropdown}
  //             floating-direction="Center"
  //             onClose={() => {
  //               this.showLanguageDropdown = false;
  //             }}
  //           >
  //             <saki-button
  //               onTap={() => {
  //                 this.showLanguageDropdown = true;
  //               }}
  //               bg-color="transparent"
  //               padding="10px 6px 10px 12px"
  //               title="Language"
  //               border="none"
  //               type="Normal"
  //             >
  //               <div class="f-l-button">
  //                 <span>
  //                   {t(config.language, {
  //                     ns: "languages",
  //                   })}
  //                 </span>
  //                 <saki-icon type="BottomTriangle"></saki-icon>
  //               </div>
  //             </saki-button>
  //             <div slot="main">
  //               <saki-menu
  //                 ref={bindEvent({
  //                   selectvalue: async (e) => {
  //                     router.replace(
  //                       Query("/killerSudoku", {
  //                         ...router.query,
  //                         lang: e.detail.value,
  //                       })
  //                     );
  //                     // dispatch(methods.config.setLanguage(e.detail.value))

  //                     setShowLanguageDropdown(false);
  //                   },
  //                 })}
  //               >
  //                 {config.languages.map((v) => {
  //                   return (
  //                     <saki-menu-item
  //                       key={v}
  //                       padding="10px 18px"
  //                       font-size="14px"
  //                       value={v}
  //                       active={config.language === v}
  //                     >
  //                       <div
  //                         style={{
  //                           cursor: "pointer",
  //                         }}
  //                       >
  //                         <span>
  //                           {v !== "system"
  //                             ? t(v, {
  //                                 ns: "languages",
  //                               }) +
  //                               " - " +
  //                               t(v, {
  //                                 ns: "languages",
  //                                 lng: v,
  //                               })
  //                             : t(v, {
  //                                 ns: "languages",
  //                               })}
  //                         </span>
  //                       </div>
  //                     </saki-menu-item>
  //                   );
  //                 })}
  //               </saki-menu>
  //             </div>
  //           </saki-dropdown>
  //         </div>
  //         <div class="f-appearance">
  //           <saki-dropdown
  //             visible={showAppearanceDropdown}
  //             floating-direction="Center"
  //             ref={bindEvent({
  //               close: () => {
  //                 setShowAppearanceDropdown(false);
  //               },
  //             })}
  //           >
  //             <saki-button
  //               ref={bindEvent({
  //                 tap: () => {
  //                   console.log("more");
  //                   setShowAppearanceDropdown(true);
  //                 },
  //               })}
  //               bg-color="transparent"
  //               padding="10px 6px 10px 12px"
  //               title="Language"
  //               border="none"
  //               type="Normal"
  //             >
  //               <div class="f-l-button">
  //                 <span>
  //                   {t(config.appearance.toLowerCase(), {
  //                     ns: "appearance",
  //                   })}
  //                 </span>
  //                 <saki-icon type="BottomTriangle"></saki-icon>
  //               </div>
  //             </saki-button>
  //             <div slot="main">
  //               <saki-menu
  //                 ref={bindEvent({
  //                   selectvalue: async (e) => {
  //                     dispatch(
  //                       configSlice.actions.setAppearance(e.detail.value)
  //                     );

  //                     setShowAppearanceDropdown(false);
  //                   },
  //                 })}
  //               >
  //                 {config.appearances.map((v) => {
  //                   return (
  //                     <saki-menu-item
  //                       key={v}
  //                       padding="10px 18px"
  //                       font-size="14px"
  //                       value={v}
  //                       active={config.appearance === v}
  //                     >
  //                       <div
  //                         style={{
  //                           cursor: "pointer",
  //                           color: (appearanceColors as any)[v],
  //                         }}
  //                       >
  //                         <span>
  //                           {t(v.toLowerCase(), {
  //                             ns: "appearance",
  //                           })}
  //                         </span>
  //                       </div>
  //                     </saki-menu-item>
  //                   );
  //                 })}
  //               </saki-menu>
  //             </div>
  //           </saki-dropdown>
  //         </div>
  //       </div>
  //       <div class="f-right">
  //         <div class="f-r-copyright">
  //           <span>{"© " + new Date().getFullYear() + " "}</span>
  //           <a target="_blank" href={"/"}>
  //             {t("appTitle", {
  //               ns: "common",
  //             })}
  //           </a>
  //           <span> - </span>
  //           <a
  //             target="_blank"
  //             href="https://github.com/ShiinaAiiko/killer-sudoku-nya"
  //           >
  //             {/* {t('aiikoBlog', {
	// 											ns: 'common',
	// 										})} */}
  //             Github
  //           </a>
  //           <span> - </span>
  //           <a
  //             target="_blank"
  //             href="https://im.aiiko.club/invite/78L2tkleM?t=0"
  //           >
  //             {"Shiina Aiiko"}
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}
