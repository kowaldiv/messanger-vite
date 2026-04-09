import { Button } from "@/src/components/button";
import { Input } from "@/src/components/input";
import { DASHBOARD_PAGES } from "@/src/config/pages-url.config";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../layout";
import { useAuthStore } from "@/src/stores/auth-store";

export default function ForgotPassword() {
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleForgotPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsRequestPending(true);
    const result = await useAuthStore.getState().forgotPassword(email);
    setIsRequestPending(true);
    if (!result.success) {
      setErrorMessage(result.userMessage);
      return;
    } else {
      setIsSuccess(true);
    }
  }

  return (
    <AuthLayout>
      <form
        onSubmit={handleForgotPassword}
        className="w-full flex flex-col items-center"
      >
        {!isSuccess ? (
          <>
            <p className="text-center px-8 opacity-70 mb-2 sm:mb-4 sm:text-base">
              A password reset link will be sent to your email address
            </p>
            <Input
              type="email"
              placeholder="Почта"
              className="w-full"
              onChange={setEmail}
              required={true}
            />
            {errorMessage ? (
              <p className="text-center text-sm sm:text-base text-red-600 mt-2">
                {errorMessage}
              </p>
            ) : (
              ""
            )}
            <Button
              type="submit"
              value="Востановить пароль"
              variant="primary"
              className="w-full mt-4"
              disabled={isRequestPending}
            />
          </>
        ) : (
          <p className="text-center opacity-70 mb-2 sm:mb-4 sm:text-base">
            A password recovery link has been sent to your email address <br />{" "}
            {email}
          </p>
        )}
        <div className="w-full border border-border mt-5 mb-3" />
        <div className="grid gap-2">
          <h2 className="sm:text-base text-sm text-center">
            Recover your password?
          </h2>
          <Link to={DASHBOARD_PAGES.SIGN_IN} className="w-full">
            <Button type="button" variant="default" className="w-full">
              Sign-up
            </Button>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
