import { Debounce } from "@nyanyajs/utils/dist/debounce";

export const multiplePrompts = ({
  title,
  content,
  closeIcon,
  autoHideDuration,
  onOpen,
  onClose,
  multipleInputs,
  flexButton = false,
  buttons,
}: {
  title: string;
  content?: string;
  closeIcon?: boolean;
  autoHideDuration?: number;
  onClose?: () => void;
  onOpen?: () => void;

  multipleInputs: {
    label: string;
    value?: string;
    type?: "Text" | "Password" | "Number" | "Textarea" | "Search";
    subtitle?: string;
    placeholder?: string;
    width?: string;
    height?: string;
    maxLength?: number;
    error?: string;
    errorColor?: string;
    errorFontSize?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
  }[];

  flexButton?: boolean;
  buttons: {
    label: string;
    text: string;
    width?: string;
    height?: string;
    fontSize?: string;
    border?: string;
    bgHoverColor?: string;
    bgActiveColor?: string;
    bgColor?: string;
    color?: string;
    borderRadius?: string;
    disabled?: boolean;
    loading?: boolean;
    loadingColor?: string;
    loadingWidth?: string;
    type?: "Normal" | "Primary";
    autoCloseAfterButtonTap?: boolean;
    onTap?: () => void;
  }[];
}) => {
  let el: any;
  let d = new Debounce();
  const api = {
    open() {
      if (el) {
        el.open();
        return;
      }
      el = document.createElement("saki-dialog-multiple-prompts");
      el["title"] = title || "";
      el["content"] = content || "";
      el["autoHideDuration"] = autoHideDuration || 0;
      el["flexButton"] = flexButton;
      el["closeIcon"] = closeIcon;
      el?.setMultipleInputs?.(multipleInputs);
      el?.setButton?.(buttons);
      // el.addEventListener('load', () => {
      // 	el.open()
      // })
      // el.onclose = () => {
      //   console.log("close")
      // 	document.body.removeChild(el)
      // }
      let timer: number;
      el.addEventListener("close", () => {
        document.body.contains(el) && document.body.removeChild(el);
        el = null;
        clearTimeout(timer);
        d.increase(() => {
          onClose?.();
          d = null;
        }, 50);
      });
      el.addEventListener("open", () => {
        d.increase(() => {
          onOpen?.();
        }, 50);
      });
      el.addEventListener("changevalue", (e: CustomEvent) => {
        // if (onChange) {
        // 	const err = onChange(e.detail)
        // 	el['error'] = err || ''
        // }
        multipleInputs?.some((v) => {
          if (v.label === e.detail?.label) {
            v?.onChange?.(e.detail.value);
            return true;
          }
        });
      });
      el.addEventListener("tap", (e: CustomEvent) => {
        // onConfirm && onConfirm()
        buttons?.some((v) => {
          if (v.label === e.detail?.label) {
            v?.onTap?.();
            return true;
          }
        });
      });
      document.body.appendChild(el);
    },
    setInput(params: { label: string; type: string; v: any }) {
      if (!multipleInputs) return;
      multipleInputs.some((v) => {
        if (v.label === params.label) {
          v[params.type] = params.v;
          return true;
        }
      });
      el?.setMultipleInputs?.(multipleInputs);
    },
    setButton(params: { label: string; type: string; v: any }) {
      if (!buttons) return;
      buttons.some((v) => {
        if (v.label === params.label) {
          v[params.type] = params.v;
          return true;
        }
      });
      el?.setButton?.(buttons);
    },
    close() {
      el?.close && el?.close();
    },
  };
  return api;
};
