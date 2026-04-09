import { Button } from "@/src/components/button";
import { Input } from "@/src/components/input";
import { DASHBOARD_PAGES } from "@/src/config/pages-url.config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../layout";
import { useAuthStore } from "@/src/stores/auth-store";

export default function SignIn() {
  const [isRequestPending, setIsRequestPending] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsRequestPending(true);
    const result = await useAuthStore.getState().login(email, password);
    setIsRequestPending(false);
    if (!result.success) {
      setErrorMessage(result.userMessage);
    } else {
      navigate(DASHBOARD_PAGES.HOME);
    }
  }

  return (
    <AuthLayout>
      <form
        onSubmit={handleSignIn}
        className="w-full flex flex-col items-center"
      >
        <div className="w-full mb-4 sm:mb-6 flex justify-center gap-2">
          <h1 className="text-xl sm:text-2xl font-semibold">Welcome back!</h1>
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
        </div>
        <div className="w-full flex justify-end">
          <Link
            to={DASHBOARD_PAGES.FORGOT_PASSWORD}
            className="text-sm text-foreground w-fit block mt-2 sm:mt-3 opacity-80"
          >
            Forgot password?
          </Link>
        </div>
        {errorMessage ? (
          <p className="text-center text-sm sm:text-base text-red-600 mt-2">
            {errorMessage}
          </p>
        ) : (
          ""
        )}
        <Button
          type="submit"
          value="Sign-in"
          variant="primary"
          className="w-full mt-4"
          disabled={isRequestPending}
        />
        <div className="w-full border border-border mt-5 mb-3" />
        <div className="grid gap-2">
          <h2 className="sm:text-base text-sm text-center">
            Haven`t an account?
          </h2>
          <Link to={DASHBOARD_PAGES.SIGN_UP} className="w-full">
            <Button type="button" variant="default" className="w-full">
              Sign-up
            </Button>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
