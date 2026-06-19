import React from "react";

export function Button({
  children,
  className,
  variant,
  type,
  value,
  disabled,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "default";
  type?: "submit" | "button";
  value?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      className={`rounded-md p-2 sm:p-3.5 sm:py-2 text-sm 
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer hover:opacity-80 active:opacity-70 active:scale-95"} 
        transition duration-100 select-none text-nowrap
        ${
          variant === "primary"
            ? ` bg-primary shadow-[0_4px_14px_rgba(124,58,237,0.7)] active:shadow-[0_4px_50px_rgba(124,58,237,1)]
            font-semibold`
            : variant === "default"
              ? "text-foreground border border-border"
              : ""
        } 
        ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      {value}
    </button>
  );
}
