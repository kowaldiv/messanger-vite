import { Input } from "@/src/components/input";
import { useState, useRef, useEffect } from "react";

export const inputsCount = 6;

export function CodeInputs({
  setCode,
  isDisabled,
}: {
  setCode: (code: string) => void;
  isDisabled: boolean;
}) {
  const [values, setValues] = useState<string[]>(Array(inputsCount).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const fullCode = values.join("");
    if (fullCode.length === inputsCount) {
      setCode(fullCode);
    }
  }, [values, setCode]);

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      if (value && index < inputsCount - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key == "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .slice(0, inputsCount)
      .split("");
    if (pasted.every((char) => /^\d$/.test(char))) {
      const newValues = [...Array(inputsCount)].map((_, i) => pasted[i] || "");
      setValues(newValues);
      const focusIndex = Math.min(pasted.length, inputsCount - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-4">
      {Array.from({ length: inputsCount }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={values[index]}
          onChange={(value) => handleChange(index, value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={isDisabled}
          className="
            w-10 h-10 
            text-3xl 
            text-center 
            border-2 border-border 
            rounded-sm 
            sm:w-12 sm:h-12 sm:text-4xl
          "
        />
      ))}
    </div>
  );
}
