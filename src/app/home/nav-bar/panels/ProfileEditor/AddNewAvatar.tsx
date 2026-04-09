import { Button } from "@/src/components/button";
import { useUserStore } from "@/src/stores/user-store";
import { useRef, useState } from "react";

const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export function AddNewAvatar({
  setErrorMessage,
}: {
  setErrorMessage: (errorMessage: string) => void;
}) {
  const [isRequestPending, setIsRequestPending] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeAvatar = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_SIZE_BYTES) {
      setErrorMessage(
        `Файл слишком большой. Максимальный размер: ${MAX_SIZE_MB} МБ`,
      );
      return;
    }
    setIsRequestPending(true);
    const result = await useUserStore.getState().uploadNewAvatar(file);
    setIsRequestPending(false);
    if (!result.success) {
      setErrorMessage(result.userMessage);
    }
  };

  return (
    <>
      <input
        disabled={isRequestPending}
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button value="Add new avatar" onClick={handleChangeAvatar} />
    </>
  );
}
