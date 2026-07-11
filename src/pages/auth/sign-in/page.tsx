import { Button } from "@/src/ui/components/atoms/Button";
import { Input } from "@/src/ui/components/atoms/Input";
import { DASHBOARD_PAGES } from "@/src/config/pages-url.config";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../../ui/layouts/AuthLayout";
import { authApi } from "@/src/api/auth.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { InputWrapper } from "@/src/ui/components/molecules/InputWrapper";
import { loginSchema, type LoginInput } from "./schema";
import { useUserStore } from "@/src/stores/user-store";

export default function SignIn() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setServerError(null);

    const result = await authApi.login({
      email: data.email,
      password: data.password,
    });

    if (!result.success) {
      setServerError(result.userMessage || "Ошибка при регистрации");
      return;
    }

    // Успешная регистрация
    useUserStore.getState().setUserInfo(result.data);
    reset();
    navigate(DASHBOARD_PAGES.HOME);
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center"
      >
        <div className="w-full mb-4 sm:mb-6 flex justify-center gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold">Welcome back!</h1>
        </div>
        <div className="grid gap-3 sm:gap-4 w-full">
          {/* Email */}
          <InputWrapper error={errors.email?.message}>
            <Input
              type="email"
              placeholder="Email"
              className="w-full"
              {...register("email")}
            />
          </InputWrapper>

          {/* Password */}
          <InputWrapper error={errors.password?.message}>
            <Input
              type="password"
              placeholder="Password"
              className="w-full"
              {...register("password")}
            />
          </InputWrapper>
          <div className="w-full flex justify-end">
            <Link
              to={DASHBOARD_PAGES.FORGOT_PASSWORD}
              className="text-sm text-foreground w-fit block opacity-80"
            >
              Forgot password?
            </Link>
          </div>
          {/* Server Error */}
          {serverError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-red-600 dark:text-red-400 text-sm text-center">
                {serverError}
              </p>
            </div>
          )}
        </div>

        <Button
          type="submit"
          value={isSubmitting ? "Creating account..." : "Sign-up"}
          variant="primary"
          className="w-full mt-4"
          disabled={isSubmitting || !isValid}
        />
        <div className="w-full border border-border mt-5 mb-3" />
        <div className="grid gap-2">
          <h2 className="sm:text-base text-sm text-center">
            Create an account?
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
