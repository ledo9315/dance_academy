"use client";

import { LoaderCircle, Send } from "lucide-react";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { sendContactMessage } from "@/lib/actions/contact";
import { idleFormState } from "@/lib/actions/types";
import { CONTACT_SUBJECTS } from "@/lib/contact-subjects";
import { cn } from "@/lib/utils";

const inputClasses = "border-border w-full border-2 px-4 py-3 transition-colors";
const labelClasses = "font-gfs mb-2 block text-sm font-medium";

function FieldError({ id, messages }: { id: string; messages?: string[] }) {
  if (!messages?.length) {
    return null;
  }

  return (
    <p id={id} role="alert" className="mt-1 text-xs text-red-600">
      {messages[0]}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactMessage, idleFormState);
  const errors = state.fieldErrors ?? {};

  return (
    <form
      action={formAction}
      className="border-2 border-border border-transparent px-4 py-12 font-sans sm:px-8 sm:py-20 md:border-solid md:px-20"
      noValidate
    >
      <div className="mb-6 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(inputClasses, errors.name && "border-red-400")}
            placeholder="Enter your full name"
          />
          <FieldError id="name-error" messages={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(inputClasses, errors.email && "border-red-400")}
            placeholder="Enter your email address"
          />
          <FieldError id="email-error" messages={errors.email} />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="phone" className={labelClasses}>
          Phone Number (Optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClasses}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="subject" className={labelClasses}>
          Subject <span className="text-accent">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={cn(
            inputClasses,
            "appearance-none bg-white",
            errors.subject && "border-red-400",
          )}
        >
          <option value="" disabled>
            Select a topic...
          </option>
          {CONTACT_SUBJECTS.map((subject) => (
            <option key={subject.value} value={subject.value}>
              {subject.label}
            </option>
          ))}
        </select>
        <FieldError id="subject-error" messages={errors.subject} />
      </div>

      <div className="mb-8">
        <label htmlFor="message" className={labelClasses}>
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputClasses, "resize-vertical", errors.message && "border-red-400")}
          placeholder="Tell us about your inquiry or questions..."
        />
        <FieldError id="message-error" messages={errors.message} />
      </div>

      {/* Honeypot: hidden from humans, irresistible to bots. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p aria-live="polite" role="status">
        {state.status === "success" ? (
          <span className="mb-6 block border border-green-200 bg-green-50 p-4 text-green-800">
            {state.message}
          </span>
        ) : null}
        {state.status === "error" ? (
          <span className="mb-6 block border border-red-200 bg-red-50 p-4 text-red-800">
            {state.message}
          </span>
        ) : null}
      </p>

      <div className="flex justify-end border-t-2 border-border pt-6">
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <LoaderCircle width={20} height={20} className="animate-spin" aria-hidden />
              Sending...
            </>
          ) : (
            <>
              <Send width={20} height={20} aria-hidden />
              Send Message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
