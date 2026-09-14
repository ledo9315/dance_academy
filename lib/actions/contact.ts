"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

import { CONTACT_SUBJECTS } from "@/lib/contact-subjects";
import { env } from "@/lib/env";
import { checkRateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";
import { errorState, successState, type FormState } from "@/lib/actions/types";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(100),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.enum(
    CONTACT_SUBJECTS.map((entry) => entry.value) as [string, ...string[]],
    "Please select a subject.",
  ),
  message: z.string().trim().min(10, "Please add a few more details.").max(5000),
  // Hidden field; only bots fill it in.
  website: z.string().max(0).optional(),
});

const resend = new Resend(env.RESEND_API_KEY);

/** Escapes user input before it is interpolated into the HTML e-mail body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function clientKey(): Promise<string> {
  const headerList = await headers();
  return headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function sendContactMessage(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return errorState(
      "Please correct the highlighted fields.",
      z.flattenError(parsed.error).fieldErrors,
    );
  }

  const { name, email, phone, subject, message, website } = parsed.data;

  // Silently accept honeypot submissions so bots do not learn they were caught.
  if (website) {
    return successState("Thank you! Your message has been sent.");
  }

  if (!checkRateLimit(`contact:${await clientKey()}`, 3, 10 * 60 * 1000)) {
    return errorState("Too many messages sent. Please try again in a few minutes.");
  }

  const subjectLabel = CONTACT_SUBJECTS.find((entry) => entry.value === subject)?.label ?? subject;

  try {
    const { error } = await resend.emails.send({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      replyTo: email,
      subject: `New inquiry: ${subjectLabel} — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Subject: ${subjectLabel}`,
        "",
        message,
      ].join("\n"),
      html: `
        <h2>New inquiry from ${site.name}</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subjectLabel)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Failed to send contact message", error);
    return errorState("Your message could not be sent. Please call us instead.");
  }

  return successState("Thank you! Your message has been sent.");
}
