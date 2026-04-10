import { Button } from "@/src/components/button";
import { Input } from "@/src/components/input";
import { DASHBOARD_PAGES } from "@/src/config/pages-url.config";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../layout";
import { useAuthStore } from "@/src/stores/auth-store";

export default function SignUp() {
  const [isRequestPending, setIsRequestPending] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsRequestPending(true);
    try {
      if (password !== passwordAgain) {
        throw new Error("Пароли не совпадают");
      }
      if (password.length < 6) {
        throw new Error("Пароль не короче 6 символов (требование API)");
      }
      const result = await useAuthStore.getState().register(email, password);
      setIsRequestPending(false);
      if (!result.success) {
        throw new Error(result.userMessage);
      } else {
        navigate(DASHBOARD_PAGES.EMAIL_VERIFICATION);
      }
    } catch (err) {
      setErrorMessage((err as Error).message || "ошибка при регистрации");
    }
  }

  return (
    <AuthLayout>
      <form
        onSubmit={handleSignUp}
        className="w-full flex flex-col items-center"
      >
        <div className="w-full mb-4 sm:mb-6 flex justify-center gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Creacte an account!
          </h1>
        </div>
        <div className="grid gap-3 sm:gap-4 w-full">
          <Input
            type="email"
            placeholder="Email"
            className="w-full"
            onChange={setEmail}
            required={true}
          />
          <Input
            type="password"
            placeholder="Password"
            className="w-full"
            onChange={setPassword}
            required={true}
          />
          <Input
            type="password"
            placeholder="Password again"
            className="w-full"
            onChange={setPasswordAgain}
            required={true}
          />
          {errorMessage ? (
            <p className="text-center text-sm sm:text-base text-red-600 mt-2">
              {errorMessage}
            </p>
          ) : (
            ""
          )}
        </div>
        <Button
          type="submit"
          value="Sign-up"
          variant="primary"
          className="w-full mt-4"
          disabled={isRequestPending}
        />
        <div className="w-full border border-border mt-5 mb-3" />
        <div className="grid gap-2">
          <h2 className="sm:text-base text-sm text-center">Have an account?</h2>
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
