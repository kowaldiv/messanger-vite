import { Button } from "@/src/ui/components/atoms/Button";
import { Input } from "@/src/ui/components/atoms/Input";
import { DASHBOARD_PAGES } from "@/src/config/pages-url.config";
import { Link } from "react-router-dom";
import AuthLayout from "../../../ui/layouts/AuthLayout";
import { authApi } from "@/src/api/auth.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { InputWrapper } from "@/src/ui/components/molecules/InputWrapper";
import { forgotPasswordSchema, type ForgotPasswordInput } from "./schema";

export default function ForgotPassword() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setServerError(null);

    try {
      const result = await authApi.forgotPassword({
        email: data.email,
      });

      if (!result.success) {
        setServerError(result.userMessage || "Ошибка при регистрации");
        return;
      }

      // Успешная регистрация
      reset();
      setIsSuccess(true);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при смене пароля. Попробуйте позже.",
      );
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center"
      >
        {!isSuccess ? (
          <>
            <div className="w-full mb-4 sm:mb-6 flex justify-center gap-4">
              <h3 className="text-lg sm:text-xl font-semibold text-center">
                A password reset link will be sent to your email address
              </h3>
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
              value={isSubmitting ? "Creating account..." : "Reset"}
              variant="primary"
              className="w-full mt-4"
              disabled={isSubmitting || !isValid}
            />
          </>
        ) : (
          <div className="w-full mb-4 sm:mb-6 flex justify-center gap-4">
            <h3 className="text-lg sm:text-xl font-semibold text-center">
              A password recovery link has been sent to your email address
            </h3>
          </div>
        )}
        <div className="w-full border border-border mt-5 mb-3" />
        <div className="grid gap-2">
          <h2 className="sm:text-base text-sm text-center">
            Recover your password?
          </h2>
          <Link to={DASHBOARD_PAGES.SIGN_IN} className="w-full">
            <Button type="button" variant="default" className="w-full">
              Sign-in
            </Button>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
