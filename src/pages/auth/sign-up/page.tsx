import { Button } from "@/src/ui/components/atoms/Button";
import { Input } from "@/src/ui/components/atoms/Input";
import { DASHBOARD_PAGES } from "@/src/config/pages-url.config";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../../ui/layouts/AuthLayout";
import { authApi } from "@/src/api/auth.api";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterInput } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { InputWrapper } from "@/src/ui/components/molecules/InputWrapper";

export default function SignUp() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      passwordAgain: "",
      username: "",
      firstName: "",
      lastName: undefined,
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setServerError(null);

    try {
      const result = await authApi.register({
        email: data.email,
        password: data.password,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      if (!result.success) {
        setServerError(result.userMessage || "Ошибка при регистрации");
        return;
      }

      // Успешная регистрация
      reset();
      navigate(DASHBOARD_PAGES.HOME);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при регистрации. Попробуйте позже.",
      );
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center"
      >
        <div className="w-full mb-4 sm:mb-6 flex justify-center gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Creacte an account!
          </h1>
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

          {/* Password Again */}
          <InputWrapper error={errors.passwordAgain?.message}>
            <Input
              type="password"
              placeholder="Password again"
              className="w-full"
              {...register("passwordAgain")}
            />
          </InputWrapper>

          {/* First Name */}
          <InputWrapper error={errors.firstName?.message}>
            <Input
              placeholder="First Name"
              className="w-full"
              {...register("firstName")}
            />
          </InputWrapper>

          {/* Last Name */}
          <InputWrapper error={errors.lastName?.message}>
            <Input
              placeholder="Last Name"
              className="w-full"
              {...register("lastName")}
            />
          </InputWrapper>

          {/* Username */}
          <InputWrapper error={errors.username?.message}>
            <Input
              placeholder="User Name"
              className="w-full"
              {...register("username")}
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
          value={isSubmitting ? "Creating account..." : "Sign-up"}
          variant="primary"
          className="w-full mt-4"
          disabled={isSubmitting || !isValid}
        />
        <div className="w-full border border-border mt-5 mb-3" />
        <div className="grid gap-2">
          <h2 className="sm:text-base text-sm text-center">Have an account?</h2>
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
