"use client";

import { useState, useRef } from "react";

interface FormData {
  name: string;
  phone: string;
  address: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  phone?: string;
  address?: string;
  message?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function LeadForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const submitted = useRef(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on edit
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validateClient(): FieldErrors {
    const errs: FieldErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = "Please enter your full name.";
    const cleanPhone = form.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10)
      errs.phone = "Please enter a valid 10-digit phone number.";
    if (!form.address.trim() || form.address.trim().length < 5)
      errs.address = "Please enter your property address.";
    if (!form.message.trim() || form.message.trim().length < 5)
      errs.message = "Please describe your roofing issue.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitted.current) return; // prevent double submit

    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    submitted.current = true;
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
      } else {
        submitted.current = false;
        setStatus("idle");
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(data.error || "Something went wrong. Please try again.");
        }
      }
    } catch {
      submitted.current = false;
      setStatus("idle");
      setServerError("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border-t-4 border-brand-orange">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-brand-navy mb-2 uppercase tracking-wide">
          You&apos;re All Set!
        </h3>
        <p className="text-brand-slate text-lg mb-1">
          We&apos;ll contact you within <strong>15 minutes</strong> during business hours.
        </p>
        <p className="text-brand-muted text-sm">
          For urgent issues, call us directly below.
        </p>
        <a
          href="tel:+18135550100"
          className="mt-6 inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          <PhoneIcon />
          Call Now: (813) 555-0100
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border-t-4 border-brand-orange"
    >
      <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy uppercase tracking-wide mb-1">
        Get Your Free Quote
      </h2>
      <p className="text-brand-muted text-sm mb-6">
        We respond within 15 minutes • No obligation
      </p>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
          {serverError}
        </div>
      )}

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-brand-slate mb-1">
            Full Name <span className="text-brand-orange">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="John Smith"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border-2 text-brand-navy placeholder-slate-400 text-base transition-colors focus:outline-none focus:border-brand-orange ${
              errors.name ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 focus:bg-white"
            }`}
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-brand-slate mb-1">
            Phone Number <span className="text-brand-orange">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(813) 555-0100"
            value={form.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border-2 text-brand-navy placeholder-slate-400 text-base transition-colors focus:outline-none focus:border-brand-orange ${
              errors.phone ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 focus:bg-white"
            }`}
          />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-brand-slate mb-1">
            Property Address <span className="text-brand-orange">*</span>
          </label>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            placeholder="123 Oak Street, Tampa, FL 33601"
            value={form.address}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border-2 text-brand-navy placeholder-slate-400 text-base transition-colors focus:outline-none focus:border-brand-orange ${
              errors.address ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 focus:bg-white"
            }`}
          />
          {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-brand-slate mb-1">
            What do you need help with? <span className="text-brand-orange">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="e.g. Leaking roof after storm, missing shingles, need full replacement..."
            value={form.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border-2 text-brand-navy placeholder-slate-400 text-base transition-colors focus:outline-none focus:border-brand-orange resize-none ${
              errors.message ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 focus:bg-white"
            }`}
          />
          {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-70 disabled:cursor-not-allowed text-white font-display font-bold text-xl uppercase tracking-widest py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
        >
          {status === "loading" ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </>
          ) : (
            "Get My Free Quote →"
          )}
        </button>

        <p className="text-center text-brand-muted text-xs">
          🔒 Your information is safe. No spam, ever.
        </p>
      </div>
    </form>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
    </svg>
  );
}
