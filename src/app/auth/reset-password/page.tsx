import { Button } from "@/src/components/button";
import { Input } from "@/src/components/input";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AuthLayout from "../layout";
import { useAuthStore } from "@/src/stores/auth-store";

export function ResetPassword() {
  const params = useParams();

  const resetToken =
    typeof params.resetToken === "string" ? params.resetToken : null;

  const [isRequestPending, setIsRequestPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function resetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsRequestPending(true);
    try {
      if (!resetToken) {
        throw new Error("Ссылка для востановления пароля не действительна");
      }
      if (password !== passwordAgain) {
        throw new Error("Пароли не совпадают");
      }
      if (password.length < 6) {
        throw new Error("Пароль слишком короткий");
      }
      const result = await useAuthStore
        .getState()
        .resetPassword(password, resetToken);
        setIsRequestPending(false);
      if (!result.success) {
        throw new Error(result.userMessage);
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      setErrorMessage((err as Error).message || "Ошибка при смене пароля");
    }
  }

  return (
    <AuthLayout>
      <form
        onSubmit={resetPassword}
        className="w-full flex flex-col items-center"
      >
        {!isSuccess ? (
          <>
            <div className="grid gap-3 sm:gap-4 w-full">
              <Input
                type="password"
                placeholder="Пароль"
                className="w-full"
                onChange={setPassword}
                required={true}
              />
              <Input
                type="password"
                placeholder="Пароль еще раз"
                className="w-full"
                onChange={setPasswordAgain}
                required={true}
              />
              {errorMessage ? (
                <p className="text-center sm:text-xl text-red-600 mt-2">
                  {errorMessage}
                </p>
              ) : (
                ""
              )}
            </div>
            <Button
              value="Востановить пароль"
              variant="primary"
              type="submit"
              className="w-full mt-4"
              disabled={isRequestPending}
            />
          </>
        ) : (
          <p className="text-center opacity-70 mb-2 sm:mb-4 sm:text-xl">
            Пароль успешно востановлен!
          </p>
        )}
      </form>
    </AuthLayout>
  );
}
