"use client";

import { AlertCircle, ArrowLeft, LoaderCircle, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

type LoginFormValues = {
  email: string;
  password: string;
};

const inputClasses = "border-border w-full border-2 px-4 py-3 transition-colors";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit = handleSubmit(async (values) => {
    setErrorMessage(null);

    const { error } = await authClient.signIn.email(values);

    if (error) {
      // Deliberately generic: revealing whether an account exists helps attackers.
      setErrorMessage("Email or password is incorrect. Please try again.");
      resetField("password");
      return;
    }

    router.replace(redirectTo);
    router.refresh();
  });

  return (
    <form className="w-full font-sans" onSubmit={onSubmit} noValidate>
      <div className="mb-6">
        <label htmlFor="email" className="mb-2 block">
          Email <span className="text-accent">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          placeholder="Enter your email"
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(inputClasses, errors.email && "border-red-400")}
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
          })}
        />
        {errors.email ? (
          <p id="email-error" role="alert" className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="mb-8">
        <label htmlFor="password" className="mb-2 block">
          Password <span className="text-accent">*</span>
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          aria-describedby={errors.password ? "password-error" : undefined}
          className={cn(inputClasses, errors.password && "border-red-400")}
          {...register("password", { required: "Password is required" })}
        />
        {errors.password ? (
          <p id="password-error" role="alert" className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      {errorMessage ? (
        <p
          role="alert"
          className="mb-6 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-4"
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600" aria-hidden />
          <span className="text-sm font-medium text-red-800">{errorMessage}</span>
        </p>
      ) : null}

      <hr className="my-4 sm:my-6" />

      <Button type="submit" size="full" disabled={isSubmitting}>
        {isSubmitting ? (
          <LoaderCircle className="h-4 w-4 animate-spin sm:h-5 sm:w-5" aria-hidden />
        ) : (
          <LogIn className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
        )}
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>

      <hr className="mt-8 mb-4 sm:mt-12 sm:mb-6" />

      <p className="flex justify-center">
        <Link
          href="/"
          className="flex items-center font-sans text-sm text-accent transition-colors hover:text-accent-dark"
        >
          <ArrowLeft width={16} height={16} className="mr-1" aria-hidden />
          Back to Home
        </Link>
      </p>
    </form>
  );
}
