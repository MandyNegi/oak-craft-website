"use client";

import { useState } from "react";
import Link from "next/link";
import { QuoteProgress } from "./QuoteProgress";
import { ImageUploader } from "./ImageUploader";
import type { QuoteFormData } from "@/types";
import { CTAButton } from "@/components/ui/CTAButton";

const SERVICE_OPTIONS = [
  "Fitted Wardrobe",
  "Bespoke Kitchen",
  "TV / Media Unit",
  "Alcove Furniture",
  "Under-Stairs Storage",
  "Home Office",
  "Bespoke Furniture",
  "General Carpentry",
  "Other",
];

const PROPERTY_TYPES = ["House", "Flat / Apartment", "New Build", "Office", "Other"];

const PROJECT_STATUSES = [
  "Planning",
  "Ready to start",
  "Renovation underway",
  "Just exploring ideas",
];

const BUDGET_OPTIONS = [
  "Under £1,000",
  "£1,000 – £2,500",
  "£2,500 – £5,000",
  "£5,000 – £10,000",
  "£10,000+",
  "Not sure yet",
];

const CONTACT_METHODS = ["Email", "Phone"];

type FormStatus = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: QuoteFormData = {
  services: [],
  postcode: "",
  propertyType: "",
  projectStatus: "",
  width: "",
  height: "",
  depth: "",
  budget: "",
  images: [],
  fullName: "",
  email: "",
  phone: "",
  contactMethod: "Email",
  additionalInfo: "",
  consent: false,
};

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
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuoteFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleService = (service: string) => {
    const current = data.services;
    update(
      "services",
      current.includes(service)
        ? current.filter((s) => s !== service)
        : [...current, service]
    );
  };

  // ─── Validation ───────────────────────────────────────────────────────────
  const validateStep1 = () => {
    if (data.services.length === 0) {
      setErrors({ services: "Please select at least one service." });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const errs: typeof errors = {};
    if (!data.postcode.trim()) errs.postcode = "Please enter your postcode.";
    if (!data.propertyType) errs.propertyType = "Please select a property type.";
    if (Object.keys(errs).length > 0) { setErrors(errs); return false; }
    return true;
  };

  const validateStep4 = () => {
    const errs: typeof errors = {};
    if (!data.fullName.trim()) errs.fullName = "Please enter your name.";
    if (!data.email.trim()) errs.email = "Please enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(data.email))
      errs.email = "Please enter a valid email address.";
    if (!data.consent)
      errs.consent = "Please agree to being contacted about your enquiry.";
    if (Object.keys(errs).length > 0) { setErrors(errs); return false; }
    return true;
  };

  const nextStep = () => {
    let valid = true;
    if (step === 1) valid = validateStep1();
    if (step === 2) valid = validateStep2();
    if (valid) {
      setErrors({});
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setErrors({});
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) return;

    setStatus("submitting");

    const endpoint = process.env.NEXT_PUBLIC_QUOTE_FORM_ENDPOINT;
    if (!endpoint) {
      // Development fallback — log and simulate success
      console.log("Quote form submission (no endpoint configured):", data);
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("success");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("services", data.services.join(", "));
      formData.append("postcode", data.postcode);
      formData.append("propertyType", data.propertyType);
      formData.append("projectStatus", data.projectStatus);
      formData.append("dimensions", `W:${data.width} H:${data.height} D:${data.depth}`);
      formData.append("budget", data.budget);
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("contactMethod", data.contactMethod);
      formData.append("additionalInfo", data.additionalInfo);
      data.images.forEach((img) => formData.append("images", img));

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending your enquiry. Please try again or contact us directly."
      );
    }
  };

  // ─── Success State ────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="text-center py-12 px-4">
        <div className="w-16 h-16 bg-[var(--beige)] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="var(--charcoal)" strokeWidth="2" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[var(--charcoal)] mb-3">
          Thank you — we&apos;ve received your enquiry.
        </h2>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md mx-auto mb-8">
          We&apos;ll review your project details and get back to you as soon as
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
      <QuoteProgress currentStep={step} />

      {/* ─── Step 1: Services ──────────────────────────────────────────── */}
      {step === 1 && (
        <fieldset>
          <legend className="font-heading text-xl font-semibold text-[var(--charcoal)] mb-2">
            What can we help with?
          </legend>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Select all that apply — you can choose more than one.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SERVICE_OPTIONS.map((service) => {
              const selected = data.services.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleService(service)}
                  className={`p-4 text-left text-sm font-medium border transition-all duration-150 ${
                    selected
                      ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-white"
                      : "border-[var(--border)] bg-white text-[var(--charcoal)] hover:border-[var(--charcoal)]"
                  }`}
                >
                  {selected && (
                    <svg className="inline mr-2 mb-0.5" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {service}
                </button>
              );
            })}
          </div>
          <FieldError message={errors.services} />
        </fieldset>
      )}

      {/* ─── Step 2: Space ─────────────────────────────────────────────── */}
      {step === 2 && (
        <fieldset>
          <legend className="font-heading text-xl font-semibold text-[var(--charcoal)] mb-2">
            Tell us about your space
          </legend>
          <p className="text-sm text-[var(--text-muted)] mb-8">
            A rough idea is fine — we can discuss the details later.
          </p>

          <div className="space-y-6">
            {/* Postcode */}
            <div>
              <Label htmlFor="postcode">Postcode</Label>
              <input
                id="postcode"
                type="text"
                autoComplete="postal-code"
                placeholder="e.g. SW1A 1AA"
                value={data.postcode}
                onChange={(e) => update("postcode", e.target.value.toUpperCase())}
                className={inputClass(errors.postcode)}
                aria-describedby={errors.postcode ? "postcode-error" : undefined}
                aria-invalid={!!errors.postcode}
              />
              <FieldError message={errors.postcode} />
            </div>

            {/* Property type */}
            <div>
              <Label htmlFor="propertyType">Property type</Label>
              <select
                id="propertyType"
                value={data.propertyType}
                onChange={(e) => update("propertyType", e.target.value)}
                className={inputClass(errors.propertyType)}
                aria-invalid={!!errors.propertyType}
              >
                <option value="" disabled>Select property type</option>
                {PROPERTY_TYPES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <FieldError message={errors.propertyType} />
            </div>

            {/* Project status */}
            <div>
              <Label htmlFor="projectStatus" optional>Project status</Label>
              <select
                id="projectStatus"
                value={data.projectStatus}
                onChange={(e) => update("projectStatus", e.target.value)}
                className={inputClass()}
              >
                <option value="">Select status (optional)</option>
                {PROJECT_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Dimensions */}
            <div>
              <p className="block text-sm font-medium text-[var(--charcoal)] mb-1.5">
                Approximate dimensions{" "}
                <span className="text-xs text-[var(--text-muted)] font-normal">
                  (optional — cm or mm, whichever you prefer)
                </span>
              </p>
              <div className="grid grid-cols-3 gap-3">
                {(["width", "height", "depth"] as const).map((dim) => (
                  <div key={dim}>
                    <label htmlFor={dim} className="block text-xs text-[var(--text-muted)] mb-1 capitalize">
                      {dim}
                    </label>
                    <input
                      id={dim}
                      type="text"
                      placeholder="e.g. 240"
                      value={data[dim]}
                      onChange={(e) => update(dim, e.target.value)}
                      className={inputClass()}
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-2">
                Don&apos;t know the measurements? That&apos;s absolutely fine — we can
                measure up during a site visit.
              </p>
            </div>
          </div>
        </fieldset>
      )}

      {/* ─── Step 3: Details (Photos + Budget) ────────────────────────── */}
      {step === 3 && (
        <fieldset>
          <legend className="font-heading text-xl font-semibold text-[var(--charcoal)] mb-2">
            A bit more detail
          </legend>
          <p className="text-sm text-[var(--text-muted)] mb-8">
            Photos and a rough budget help us understand your project better.
          </p>

          <div className="space-y-8">
            {/* Photo upload */}
            <div>
              <p className="text-sm font-medium text-[var(--charcoal)] mb-1.5">
                Show Us Your Space{" "}
                <span className="text-xs text-[var(--text-muted)] font-normal">
                  (optional)
                </span>
              </p>
              <p className="text-xs text-[var(--text-muted)] mb-3">
                Photos, sketches or inspiration images help us understand what
                you&apos;re looking for.
              </p>
              <ImageUploader
                onFilesChange={(files) => update("images", files)}
              />
            </div>

            {/* Budget */}
            <div>
              <p className="text-sm font-medium text-[var(--charcoal)] mb-1.5">
                Do you have a budget in mind?{" "}
                <span className="text-xs text-[var(--text-muted)] font-normal">
                  (optional)
                </span>
              </p>
              <p className="text-xs text-[var(--text-muted)] mb-3">
                This helps us understand your requirements — it won&apos;t determine
                your final quotation automatically.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BUDGET_OPTIONS.map((budget) => {
                  const selected = data.budget === budget;
                  return (
                    <button
                      key={budget}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => update("budget", selected ? "" : budget)}
                      className={`p-3 text-sm font-medium border text-center transition-all duration-150 ${
                        selected
                          ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-white"
                          : "border-[var(--border)] bg-white text-[var(--charcoal)] hover:border-[var(--charcoal)]"
                      }`}
                    >
                      {budget}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </fieldset>
      )}

      {/* ─── Step 4: Contact Details ───────────────────────────────────── */}
      {step === 4 && (
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
              <Label htmlFor="phone" optional>Mobile / Phone Number</Label>
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
              <div className="flex gap-4" role="radiogroup" aria-label="Preferred contact method">
                {CONTACT_METHODS.map((method) => (
                  <label key={method} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={data.contactMethod === method}
                      onChange={() => update("contactMethod", method)}
                      className="accent-[var(--charcoal)]"
                    />
                    <span className="text-sm text-[var(--charcoal)]">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional info */}
            <div>
              <Label htmlFor="additionalInfo" optional>Anything else we should know?</Label>
              <textarea
                id="additionalInfo"
                rows={4}
                placeholder="Tell us anything else about your project — design preferences, timescales, access requirements, etc."
                value={data.additionalInfo}
                onChange={(e) => update("additionalInfo", e.target.value)}
                className={inputClass()}
              />
            </div>

            {/* Consent */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  className="mt-0.5 accent-[var(--charcoal)] w-4 h-4 flex-shrink-0"
                  aria-invalid={!!errors.consent}
                />
                <span className="text-sm text-[var(--text-muted)]">
                  I agree to Oak & Craft contacting me about my enquiry. View our{" "}
                  <Link
                    href="/privacy"
                    className="text-[var(--charcoal)] underline underline-offset-2 hover:text-[var(--warm-brown)] transition-colors"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              <FieldError message={errors.consent} />
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
      )}

      {/* ─── Navigation ────────────────────────────────────────────────── */}
      <div className="mt-10 flex items-center justify-between gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--charcoal)] transition-colors"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-7 py-3 text-sm font-medium bg-[var(--charcoal)] text-[var(--ivory)] hover:bg-[var(--charcoal-light)] transition-colors flex items-center gap-2"
          >
            Continue
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "submitting"}
            className="px-7 py-3 text-sm font-medium bg-[var(--oak)] text-white hover:bg-[var(--warm-brown)] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {status === "submitting" ? (
              <>
                <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Sending your enquiry...
              </>
            ) : (
              "Request My Free Quote"
            )}
          </button>
        )}
      </div>
    </form>
  );
}
