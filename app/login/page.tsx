"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import LinkComponent from "@/components/ui/link";
import {
  ArrowLeft,
  Circle,
  LogIn,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function LoginPage() {
  interface LoginForm {
    email: string;
    password: string;
  }

  const [loginStatus, setLoginStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    mode: "onSubmit",
  });

  const onSubmit = async (formData: LoginForm) => {
    setLoginStatus({ type: null, message: "" });

    const { data, error } = await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
        callbackURL: "/admin/albums",
      },
      {
        onRequest: (ctx) => {
          console.log("Requesting...");
        },
        onSuccess: (ctx) => {
          console.log("Success...");
          setLoginStatus({
            type: "success",
            message: "Login successful! Redirecting...",
          });
        },
        onError: (ctx) => {
          console.log("Error...", ctx.error);
          let errorMessage = "Login failed. Please check your credentials.";

          // Specific error messages based on error type
          if (ctx.error.message.includes("Invalid credentials")) {
            errorMessage = "Email or password is incorrect. Please try again.";
          } else if (ctx.error.message.includes("User not found")) {
            errorMessage = "User not found. Please check your email address.";
          } else if (ctx.error.message.includes("Too many attempts")) {
            errorMessage =
              "Too many login attempts. Please wait a few minutes.";
          } else if (ctx.error.message.includes("Email not verified")) {
            errorMessage =
              "Email address not verified. Please check your inbox.";
          }

          setLoginStatus({
            type: "error",
            message: errorMessage,
          });

          // Clear password field on error
          reset({ email: formData.email, password: "" });
        },
      }
    );
  };

  return (
    <main
      className="flex flex-col items-center justify-center md:border-2 md:border-border p-16 px-4 py-0 md:p-16  w-full max-w-lg mx-auto m-24"
      role="main"
      aria-labelledby="login-title"
    >
      <header>
        <h1 id="login-title" className="text-2xl mb-4 text-center">
          Admin Login
        </h1>
        <p className="text-text font-sans text-center border-b border-border pb-6 mb-12">
          Access the admin dashboard to manage your gallery.
        </p>
      </header>
      <form
        className="font-sans w-full"
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="login-title"
        role="form"
      >
        {/* Name */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2">
            Email <span className="text-accent">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-3 border-2 border-border transition-colors"
            placeholder="Enter your email"
            aria-required="true"
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <div
              id="email-error"
              className="text-red-500 text-sm mt-1"
              role="alert"
            >
              {errors.email.message}
            </div>
          )}
        </div>
        {/* Password */}
        <div className="mb-8">
          <label htmlFor="password" className="block mb-2">
            Password <span className="text-accent">*</span>
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full px-4 py-3 border-2 border-border transition-colors"
            placeholder="Enter your password"
            aria-required="true"
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <div
              id="password-error"
              className="text-red-500 text-sm mt-1"
              role="alert"
            >
              {errors.password.message}
            </div>
          )}
        </div>

        {/* Login Status Messages */}
        {loginStatus.type === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800 text-sm font-medium">
                {loginStatus.message}
              </p>
            </div>
          </div>
        )}

        {loginStatus.type === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800 text-sm font-medium">
                {loginStatus.message}
              </p>
            </div>
          </div>
        )}

        <hr className="my-4 sm:my-6" />
        <Button
          disabled={isSubmitting}
          type="submit"
          aria-label="Sign in to admin dashboard"
          size="full"
          className="text-sm sm:text-base"
        >
          <LogIn className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          {isSubmitting ? (
            <Circle className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <span>Sign In</span>
          )}
        </Button>

        <hr className="mt-8 sm:mt-12 mb-4 sm:mb-6" />
        <div className="flex justify-center">
          <LinkComponent
            href="/"
            aria-label="Navigate back to home page"
            className="text-sm sm:text-base"
          >
            <ArrowLeft
              width={16}
              height={16}
              className="mr-1"
              aria-hidden="true"
            />
            Back to Home
          </LinkComponent>
        </div>
      </form>
    </main>
  );
}
