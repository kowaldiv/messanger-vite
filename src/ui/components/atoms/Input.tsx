import type { InputHTMLAttributes } from "react";

export function Input({
  className,
  required,
  disabled,
  type,
  placeholder,
  onClick,
  onChange,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
}) {
  return (
    <input
      className={`${className} border bg-secondary border-border rounded-md px-2 sm:px-3 py-2 text-sm 
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      type={type || "text"}
      onClick={onClick}
      onChange={onChange}
      
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      {...rest}
    />
  );
}

// export function Inputt({
//   className,
//   type,
//   placeholder,
//   onChange,
//   onChangeValue,
//   value,
//   onClick,
//   required,
//   ref,
//   disabled,
//   onKeyDown,
//   inputMode,
//   maxLength,
//   onPaste,
//   ...rest // <-- ДОБАВЬТЕ ЭТО
// }: {
//   ref?: React.Ref<HTMLInputElement>;
//   className?: string;
//   type?: "text" | "email" | "password" | "file";
//   placeholder?: string;
//   value?: string | null;
//   onChange?: React.ChangeEventHandler<HTMLInputElement>;
//   onChangeValue?: (value: string) => void;
//   onClick?: () => void;
//   required?: boolean;
//   disabled?: boolean;
//   onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
//   inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
//   maxLength?: number;
//   onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
// }) {
//   return (
//     <input
//       ref={ref}
//       className={`${className} border dark:bg-[#1f1f1f] border-border rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-sm
//       ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
//       type={type || "text"}
//       placeholder={placeholder}
//       value={value ?? ""}
//       onChange={(e) => {
//         onChange?.(e);
//         onChangeValue?.(e.target.value);
//       }}
//       onClick={onClick}
//       required={required}
//       disabled={disabled}
//       onKeyDown={onKeyDown}
//       inputMode={inputMode}
//       maxLength={maxLength}
//       onPaste={onPaste}
//       {...rest} // <-- ДОБАВЬТЕ ЭТО
//     />
//   );
// }
