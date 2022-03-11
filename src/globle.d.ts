import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
declare global {
  interface Window {
    electron: any;
    Quill: any;
  }
}

// declare module 'React' {
// 	export interface React {
// 		$store: any
// 	}
// }
