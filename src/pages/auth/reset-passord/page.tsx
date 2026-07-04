import { Button } from "@/src/ui/components/atoms/Button";
import { Input } from "@/src/ui/components/atoms/Input";
import { DASHBOARD_PAGES } from "@/src/config/pages-url.config";
import { Link, useSearchParams } from "react-router-dom";
import AuthLayout from "../../../ui/layouts/AuthLayout";
import { authApi } from "@/src/api/auth.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { InputWrapper } from "@/src/ui/components/molecules/InputWrapper";
import { resetPassowordSchema, type ResetPasswordInput } from "./schema";

export default function ResetPassword() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPassowordSchema),
    mode: "onTouched",
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    setServerError(null);

    if (!token) throw new Error("Плохая ссылка для востановления");
    const result = await authApi.resetPassword({
      password: data.password,
      token,
    });

    if (!result.success) {
      setServerError(result.userMessage || "Ошибка при регистрации");
      return;
    }

    // Успешная регистрация
    reset();
    setIsSuccess(true);
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center"
      >
        {!isSuccess ? (
          <>
            {" "}
            <div className="w-full mb-4 sm:mb-6 flex justify-center gap-4">
              <h1 className="text-xl sm:text-2xl font-semibold">
                Reset a password!
              </h1>
            </div>
            <div className="grid gap-3 sm:gap-4 w-full">
              {/* Password */}
              <InputWrapper error={errors.password?.message}>
                <Input
                  type="password"
                  placeholder="Password"
                  className="w-full"
                  {...register("password")}
                />
              </InputWrapper>

              {/* Password Again */}
              <InputWrapper error={errors.passwordAgain?.message}>
                <Input
                  type="password"
                  placeholder="Password again"
                  className="w-full"
                  {...register("passwordAgain")}
                />
              </InputWrapper>

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
              value={isSubmitting ? "Resetting a password..." : "Reset"}
              variant="primary"
              className="w-full mt-4"
              disabled={isSubmitting || !isValid}
            />
          </>
        ) : (
          <>
            <div className="w-full mb-4 sm:mb-6 flex justify-center gap-4">
              <h3 className="text-lg sm:text-xl font-semibold text-center">
                Password reset successfuly!
              </h3>
            </div>
            <div className="w-full border border-border mb-3" />
            <div className="grid gap-2">
              <h2 className="sm:text-base text-sm text-center">
                Sign in account?
              </h2>
              <Link to={DASHBOARD_PAGES.SIGN_IN} className="w-full">
                <Button type="button" variant="default" className="w-full">
                  Sign-in
                </Button>
              </Link>
            </div>
          </>
        )}
      </form>
    </AuthLayout>
  );
}
