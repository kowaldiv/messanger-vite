import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import AuthLayout from "../layout";
import { useAuthStore } from "@/src/stores/auth-store";
import { CodeInputs } from "./CodeInputs";
import { DASHBOARD_PAGES } from "@/src/config/pages-url.config";

export default function EmailVerification() {
  const navigate = useNavigate();
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [code, setCode] = useState<string>("");

  const handleVerificateEmail = useCallback(async () => {
    if (code.length === 0) return;
    setIsRequestPending(true);
    const result = await useAuthStore.getState().emailVerification(code);
    setIsRequestPending(false);
    if (!result.success) {
      setErrorMessage(result.userMessage);
      return;
    }
    navigate(DASHBOARD_PAGES.HOME);
  }, [code, navigate]);

  useEffect(() => {
    if (code.length === 0) return;
    (async () => await handleVerificateEmail())();
  }, [code, handleVerificateEmail]);

  return (
    <AuthLayout>
      <form className="w-full flex flex-col items-center">
        <div className="w-full mb-4 sm:mb-6 flex justify-center gap-2 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Check your email for the confirmation code!
          </h1>
        </div>
        {errorMessage ? (
          <p className="text-center text-sm sm:text-base text-red-600 mb-4">
            {errorMessage}
          </p>
        ) : (
          ""
        )}
        <CodeInputs isDisabled={isRequestPending} setCode={setCode} />
      </form>
    </AuthLayout>
  );
}
