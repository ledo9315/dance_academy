"use client";

import { Button } from "@/components/ui/button";
import LinkComponent from "@/components/ui/link";
import { ArrowLeft, Circle, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  interface LoginForm {
    name: string;
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

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <main
      className="flex flex-col items-center justify-center border-2 border-border p-16  w-full max-w-lg mx-auto m-24"
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
          <label htmlFor="name" className="block mb-2">
            Username <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full px-4 py-3 border-2 border-border transition-colors"
            placeholder="Enter your username"
            aria-required="true"
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <div
              id="name-error"
              className="text-red-500 text-sm mt-1"
              role="alert"
            >
              {errors.name.message}
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

        <hr className="my-6" />
        <Button
          disabled={isSubmitting}
          type="submit"
          aria-label="Sign in to admin dashboard"
          size="full"
        >
          <LogIn className="mr-2" />
          {isSubmitting ? (
            <Circle className="animate-spin" />
          ) : (
            <span>Sign In</span>
          )}
        </Button>

        <hr className="mt-12 mb-6" />
        <div className="flex justify-center">
          <LinkComponent href="/" aria-label="Navigate back to home page">
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
