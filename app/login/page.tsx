"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import LinkComponent from "@/components/ui/link";
import { ArrowLeft, Circle, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  interface LoginForm {
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    mode: "onSubmit",
  });

  const onSubmit = async (formData: LoginForm) => {
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
        },
        onError: (ctx) => {
          console.log("Error...", error);
          alert(ctx.error.message);
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
