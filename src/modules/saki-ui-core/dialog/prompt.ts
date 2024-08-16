export const prompt = ({
  title,
  cancelText,
  confirmText,
  autoHideDuration,
  value,
  subtitle,
  placeholder,
  errorColor,
  errorFontSize,
  onChange,
  onCancel,
  onConfirm,
  autoCloseAfterButtonClick = true,
  flexButton = false,
}: {
  title: string;
  cancelText?: string;
  confirmText?: string;
  autoHideDuration?: number;
  value?: string;
  subtitle?: string;
  placeholder?: string;
  errorColor?: string;
  errorFontSize?: string;
  onChange?: (value: string) => Error;
  onCancel?: () => void;
  onConfirm?: () => void;
  autoCloseAfterButtonClick?: boolean;
  flexButton?: boolean;
}) => {
  let el: any;
  const api = {
    open() {
      if (el) {
        el.open();
        return;
      }
      el = document.createElement("saki-dialog-prompt");
      el["title"] = title || "";
      el["value"] = value || "";
      el["placeholder"] = placeholder || "";
      el["errorColor"] = errorColor || "";
      el["errorFontSize"] = errorFontSize || "";
      el["cancelText"] = cancelText || "";
      el["confirmText"] = confirmText || "";
      el["subtitle"] = subtitle || "";
      el["autoHideDuration"] = autoHideDuration || 0;
      el["autoCloseAfterButtonClick"] = autoCloseAfterButtonClick;
      el["flexButton"] = flexButton;
      // el.addEventListener('load', () => {
      // 	el.open()
      // })
      // el.onclose = () => {
      //   console.log("close")
      // 	document.body.removeChild(el)
      // }
      el.addEventListener("close", () => {
        document.body.contains(el) && document.body.removeChild(el);
        el = null;
      });
      el.addEventListener("cancel", () => {
        onCancel && onCancel();
      });
      el.addEventListener("changevalue", (e: CustomEvent) => {
        if (onChange) {
          const err = onChange(e.detail);
          el["error"] = err || "";
        }
      });
      el.addEventListener("confirm", () => {
        onConfirm && onConfirm();
      });
      document.body.appendChild(el);
    },
    setError(err: Error) {
      el["error"] = err;
    },
    close() {
      el?.close && el?.close();
    },
  };
  return api;
};
