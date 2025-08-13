import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Send email to the dance academy
    await resend.emails.send({
      from: "Angela's Dance Academy <noreply@angelasdanceacademy.com>",
      to: ["leonid.domahalsky@gmail.com"],
      subject: `New Inquiry: ${subject} - ${name}`,
      html: `
        <h2>New Inquiry from Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
