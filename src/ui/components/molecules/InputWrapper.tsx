interface InputWrapperProps {
  children: React.ReactNode;
  error?: string | null;
  className?: string;
}

export function InputWrapper({
  children,
  error,
  className = "",
}: InputWrapperProps) {
  return (
    <div className={`w-full ${className}`}>
      {children}
      {error && (
        <p className="text-red-500 text-sm mt-1.5 animate-in slide-in-from-top-1 duration-200">
          {error}
        </p>
      )}
    </div>
  );
}
