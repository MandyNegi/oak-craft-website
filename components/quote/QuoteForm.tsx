"use client";

import { useState } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { buildWhatsAppUrl } from "@/lib/utils";

const CONTACT_METHODS = ["Email", "Phone"];

type FormStatus = "idle" | "submitting" | "success" | "error";

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-[var(--charcoal)] mb-1.5"
    >
      {children}
      {optional && (
        <span className="ml-1.5 text-xs text-[var(--text-muted)] font-normal">
          (optional)
        </span>
      )}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-red-600" role="alert">
      {message}
    </p>
  );
}

function inputClass(error?: string) {
  return `w-full px-4 py-3 text-sm border ${
    error ? "border-red-400" : "border-[var(--border)]"
  } bg-white text-[var(--charcoal)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--charcoal)] focus:border-transparent transition-colors`;
}

export function QuoteForm() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    contactMethod: "Email",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState<Partial<typeof data>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = (key: keyof typeof data, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!data.fullName.trim()) errs.fullName = "Please enter your name.";
    if (!data.email.trim()) errs.email = "Please enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(data.email))
      errs.email = "Please enter a valid email address.";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json" 
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          contactMethod: data.contactMethod,
          additionalInfo: data.additionalInfo
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const errorData = await res.json().catch(() => null);
        console.error("API error response:", errorData);
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending your enquiry. Please try again or contact us directly."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12 px-4">
        <div className="w-16 h-16 bg-[var(--beige)] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="var(--charcoal)"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[var(--charcoal)] mb-3">
          Thank you — we&apos;ve received your enquiry.
        </h2>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md mx-auto mb-8">
          We&apos;ll review your details and get back to you as soon as
          possible.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <CTAButton href="/" variant="primary" size="md">
            Back to Home
          </CTAButton>
          <CTAButton href="/our-work" variant="outline" size="md">
            View Our Work
          </CTAButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend className="font-heading text-xl font-semibold text-[var(--charcoal)] mb-2">
          Your contact details
        </legend>
        <p className="text-sm text-[var(--text-muted)] mb-8">
          We&apos;ll be in touch to discuss your project.
        </p>

        <div className="space-y-5">
          {/* Full name */}
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={data.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              className={inputClass(errors.fullName)}
              aria-invalid={!!errors.fullName}
            />
            <FieldError message={errors.fullName} />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.co.uk"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass(errors.email)}
              aria-invalid={!!errors.email}
            />
            <FieldError message={errors.email} />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" optional>
              Mobile / Phone Number
            </Label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="e.g. 07700 900000"
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass()}
            />
          </div>

          {/* Contact method */}
          <div>
            <p className="block text-sm font-medium text-[var(--charcoal)] mb-2">
              Preferred contact method
            </p>
            <div
              className="flex gap-4"
              role="radiogroup"
              aria-label="Preferred contact method"
            >
              {CONTACT_METHODS.map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    value={method}
                    checked={data.contactMethod === method}
                    onChange={() => update("contactMethod", method)}
                    className="accent-[var(--charcoal)]"
                  />
                  <span className="text-sm text-[var(--charcoal)]">
                    {method}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional info */}
          <div>
            <Label htmlFor="additionalInfo" optional>
              Anything else we should know?
            </Label>
            <textarea
              id="additionalInfo"
              rows={4}
              placeholder="Tell us what you are looking for..."
              value={data.additionalInfo}
              onChange={(e) => update("additionalInfo", e.target.value)}
              className={inputClass()}
            />
          </div>
        </div>

        {/* Submit error */}
        {status === "error" && (
          <div
            className="mt-6 p-4 bg-red-50 border border-red-200 text-sm text-red-700"
            role="alert"
          >
            {errorMessage}
          </div>
        )}
      </fieldset>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 items-start">
        {/* Primary: email submit */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto px-7 py-3 text-sm font-medium bg-[var(--oak)] text-white hover:bg-[var(--warm-brown)] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {status === "submitting" ? (
            <>
              <svg
                className="animate-spin"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Sending your enquiry...
            </>
          ) : (
            "Request My Free Quote"
          )}
        </button>

        {/* Optional: WhatsApp alternative — only shown when NEXT_PUBLIC_WHATSAPP_NUMBER is set */}
        {(() => {
          const parts: string[] = [];
          if (data.fullName.trim()) parts.push(`Name: ${data.fullName.trim()}`);
          if (data.phone.trim()) parts.push(`Phone: ${data.phone.trim()}`);
          if (data.additionalInfo.trim()) parts.push(`Details: ${data.additionalInfo.trim()}`);
          const message =
            `Hi! I'd like to enquire about a project with Perfect Space Interior.` +
            (parts.length ? `\n\n${parts.join("\n")}` : "");
          const waUrl = buildWhatsAppUrl(message);
          if (!waUrl) return null;
          return (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3 text-sm font-medium border border-[#25D366] text-[#128C7E] hover:bg-[#25D366] hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              {/* WhatsApp icon */}
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Enquire via WhatsApp
            </a>
          );
        })()}
      </div>
    </form>
  );
}
