"use client";

import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import LinkComponent from "@/components/ui/link";
import {
  LoaderCircle,
  MapPin,
  Send,
  SquareArrowOutUpRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Script from "next/script";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    setShowIframe(true);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Angela's Dance Academy",
    description:
      "Contact information and inquiry form for Angela's Dance Academy in Naples, Florida",
    mainEntity: {
      "@type": "Organization",
      name: "Angela's Dance Academy",
      url: "https://angelasdanceacademy.com",
      telephone: "+1-239-215-2888",
      email: "info@angelasdanceacademy.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "12840 Tamiami Trail North Suite 300",
        addressLocality: "Naples",
        addressRegion: "FL",
        postalCode: "34110",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 26.2882,
        longitude: -81.8019,
      },
      openingHours: "Mo-Fr 16:00-20:00",
    },
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch(
        "https://formsubmit.co/71c4b48f33310a673547ab96e2502c02",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            subject: data.subject,
            message: data.message,
            _subject: "New inquiry from Angela's Dance Academy Website",
            _template: "table",
            _next: "https://angelasdanceacademy.com/thank-you.html",
            _captcha: "true",
          }),
        }
      );
      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Script
        id="contact-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen container">
        {/* Hero Section */}
        <Hero
          imgSrc="/contact-img.jpg"
          title="Contact"
          className="mb-24 px-4 md:px-0"
        />

        <section className="max-w-3xl mx-auto mb-16 sm:mb-24 px-4 sm:px-0">
          <h2 className="text-center text-2xl sm:text-3xl mb-4 sm:mb-6">
            Send Us a Message
          </h2>
          <div className="border border-accent w-15 mx-auto mb-6 sm:mb-8" />
          <p className="text-center text-text text-sm sm:text-base font-sans">
            Have questions about our classes or want to visit our studio? Fill
            out the form below and we'll get back to you soon.
          </p>
        </section>

        {/* Contact Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Contact Form Section */}
          <div className="mb-24 sm:mb-48">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border-2 border-transparent md:border-border py-12 sm:py-20 px-4 sm:px-8 md:px-20 font-sans"
              noValidate
            >
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 font-gfs"
                  >
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className={`w-full px-4 py-3 border-2 border-border transition-colors ${
                      errors.name ? "border-red-400" : ""
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 font-gfs"
                  >
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={`w-full px-4 py-3 border-2 border-border transition-colors ${
                      errors.email ? "border-red-400" : ""
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2 font-gfs"
                >
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  className="w-full px-4 py-3 border-2 border-border transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Subject */}
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2 font-gfs"
                >
                  Subject <span className="text-accent">*</span>
                </label>
                <select
                  id="subject"
                  {...register("subject", {
                    required: "Please select a subject",
                  })}
                  className={`w-full px-4 py-3 border-2 border-border transition-colors appearance-none bg-white ${
                    errors.subject ? "border-red-400" : ""
                  }`}
                >
                  <option value="">Select a topic...</option>
                  <option value="class-information">Class Information</option>
                  <option value="enrollment">Enrollment</option>
                  <option value="events">Performances & Events</option>
                  <option value="general">General Inquiry</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.subject.message as string}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="mb-8">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 font-gfs"
                >
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register("message", { required: "Message is required" })}
                  className={`w-full px-4 py-3 border-2 border-border transition-colors resize-vertical ${
                    errors.message ? "border-red-400" : ""
                  }`}
                  placeholder="Tell us about your inquiry or questions..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.message.message as string}
                  </p>
                )}
              </div>

              {/* Submit Status Messages */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200">
                  <p className="text-green-800">
                    Thank you! Your message has been sent successfully.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200">
                  <p className="text-red-800">
                    Sorry, there was an error sending your message. Please try
                    again.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6 border-t-2 border-border flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <LoaderCircle
                        width={20}
                        height={20}
                        className="animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send width={20} height={20} />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Map Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-light text-gray-800 text-center mb-8">
              Find Us
            </h3>

            <div className="relative">
              {/* Fallback for no JavaScript */}
              <div className="bg-gray-50 p-8 text-center flex flex-col items-center">
                <div className="mb-6">
                  <div className="flex flex-col items-center space-y-2">
                    <MapPin width={40} height={40} className="text-accent" />
                    <h4 className="text-xl text-gray-800 mb-4">Our Location</h4>
                  </div>
                  <div className="text-text font-sans">
                    <p className="text-black font-medium">
                      Angela's Dance Academy
                    </p>
                    <p>12840 Tamiami Trail N Suite 300</p>
                    <p>Naples, FL 34110</p>
                  </div>
                </div>

                <LinkComponent
                  href="https://www.google.com/maps?q=12840+Tamiami+Trail+N+Suite+300+Naples+FL+34110"
                  variant="default-button"
                >
                  <SquareArrowOutUpRight
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Open in Google Maps
                </LinkComponent>
              </div>

              {/* Google Maps iframe */}
              {showIframe && (
                <iframe
                  title="Angela's Dance Academy Location"
                  loading="lazy"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.1810548002613!2d-81.80198696955127!3d26.288229965617816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db1937da84011f%3A0xb520ca78872c755c!2s12840%20Tamiami%20Trail%20N%20Suite%20300%2C%20Naples%2C%20FL%2034110%2C%20USA!5e0!3m2!1sen!2s!4v1683563335525!5m2!1sen!2s"
                  className="w-full h-96 border-0 mt-8"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactPage;
