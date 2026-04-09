export function Input({
  className,
  type,
  placeholder,
  onChange,
  value,
  onClick,
  required,
  ref,
  disabled,
  onKeyDown,
}: {
  ref?: React.Ref<HTMLInputElement>;
  className?: string;
  type?: "text" | "email" | "password" | "file";
  placeholder?: string;
  value?: string | null;
  onChange?: (value: string) => void;
  onClick?: () => void;
  required?: boolean;
  disabled?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}) {
  return (
    <input
      ref={ref}
      className={`${className} border dark:bg-[#1f1f1f] border-border rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-sm 
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      type={type ? type : "text"}
      placeholder={placeholder}
      value={value ? value : ""}
      onChange={(e) => onChange?.(e.target.value)}
      onClick={onClick}
      required={required}
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
  );
}
