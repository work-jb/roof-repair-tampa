"use client";

import { useState, useRef } from "react";

interface FormData {
  jobType: string;
  roofType: string;
  name: string;
  phone: string;
  address: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

const TOTAL_STEPS = 4;

const jobTypes = [
  { value: "repair", label: "Roof Repair", icon: "🔧", desc: "Fix a leak or damage" },
  { value: "replacement", label: "Full Replacement", icon: "🏠", desc: "Replace the whole roof" },
  { value: "inspection", label: "Inspection / Quote", icon: "🔍", desc: "Just want to know the cost" },
  { value: "storm", label: "Storm Damage", icon: "🌀", desc: "Hurricane or wind damage" },
];

const roofTypes = [
  { value: "shingle", label: "Shingle", icon: "🟫" },
  { value: "tile", label: "Tile", icon: "🟧" },
  { value: "metal", label: "Metal", icon: "⬜" },
  { value: "flat", label: "Flat / TPO", icon: "⬛" },
  { value: "unknown", label: "Not Sure", icon: "❓" },
];

function ProgressBar({ step }: { step: number }) {
  const pct = Math.round((step / TOTAL_STEPS) * 100);
  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs text-brand-muted mb-1.5">
        <span>Step {step} of {TOTAL_STEPS}</span>
        <span>{pct}% complete</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-orange rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    jobType: "",
    roofType: "",
    name: "",
    phone: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<Status>("idle");
  const submitted = useRef(false);

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validateStep(): boolean {
    if (step === 1 && !form.jobType) {
      setErrors({ jobType: "Please select an option." });
      return false;
    }
    if (step === 2 && !form.roofType) {
      setErrors({ roofType: "Please select an option." });
      return false;
    }
    if (step === 3) {
      const e: Partial<FormData> = {};
      if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your full name.";
      if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a valid phone number.";
      if (!form.address.trim() || form.address.trim().length < 5) e.address = "Please enter your address.";
      if (Object.keys(e).length > 0) { setErrors(e); return false; }
    }
    return true;
  }

  function next() {
    if (validateStep()) setStep((s) => s + 1);
  }

  function back() {
    setErrors({});
    setStep((s) => s - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitted.current) return;
    submitted.current = true;
    setStatus("loading");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
          message: `Job Type: ${form.jobType} | Roof Type: ${form.roofType}${form.message ? ` | Notes: ${form.message}` : ""}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        submitted.current = false;
        setStatus("idle");
        if (data.errors) setErrors(data.errors);
      }
    } catch {
      submitted.current = false;
      setStatus("idle");
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
          Request Submitted!
        </h3>
        <p className="text-brand-slate text-lg mb-1">
          We&apos;re matching you with licensed Tampa contractors now.
        </p>
        <p className="text-brand-muted text-sm">
          Expect to hear from a contractor within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border-t-4 border-brand-orange">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy uppercase tracking-wide mb-1">
        Get Your Free Quotes
      </h2>
      <p className="text-brand-muted text-sm mb-5">No obligation · Takes 60 seconds</p>

      <ProgressBar step={step} />

      {/* STEP 1 — Job Type */}
      {step === 1 && (
        <div>
          <p className="font-semibold text-brand-navy mb-4">What do you need done?</p>
          <div className="grid grid-cols-2 gap-3">
            {jobTypes.map((j) => (
              <button
                key={j.value}
                type="button"
                onClick={() => set("jobType", j.value)}
                className={`flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all ${
                  form.jobType === j.value
                    ? "border-brand-orange bg-brand-orange/5"
                    : "border-slate-200 hover:border-brand-orange/50"
                }`}
              >
                <span className="text-2xl mb-1">{j.icon}</span>
                <span className="font-semibold text-brand-navy text-sm">{j.label}</span>
                <span className="text-xs text-brand-muted mt-0.5">{j.desc}</span>
              </button>
            ))}
          </div>
          {errors.jobType && <p className="text-red-600 text-xs mt-2">{errors.jobType}</p>}
          <button
            type="button"
            onClick={next}
            className="mt-5 w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-display font-bold text-lg uppercase tracking-widest py-4 rounded-xl transition-all"
          >
            Next →
          </button>
        </div>
      )}

      {/* STEP 2 — Roof Type */}
      {step === 2 && (
        <div>
          <p className="font-semibold text-brand-navy mb-4">What type of roof do you have?</p>
          <div className="grid grid-cols-3 gap-3">
            {roofTypes.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => set("roofType", r.value)}
                className={`flex flex-col items-center p-3 rounded-xl border-2 text-center transition-all ${
                  form.roofType === r.value
                    ? "border-brand-orange bg-brand-orange/5"
                    : "border-slate-200 hover:border-brand-orange/50"
                }`}
              >
                <span className="text-2xl mb-1">{r.icon}</span>
                <span className="font-semibold text-brand-navy text-xs">{r.label}</span>
              </button>
            ))}
          </div>
          {errors.roofType && <p className="text-red-600 text-xs mt-2">{errors.roofType}</p>}
          <div className="flex gap-3 mt-5">
            <button type="button" onClick={back} className="flex-1 border-2 border-slate-200 text-brand-slate font-bold py-3 rounded-xl hover:border-slate-300 transition-all">
              ← Back
            </button>
            <button type="button" onClick={next} className="flex-[2] bg-brand-orange hover:bg-brand-orange-dark text-white font-display font-bold text-lg uppercase tracking-widest py-3 rounded-xl transition-all">
              Next →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — Contact Info */}
      {step === 3 && (
        <div className="space-y-4">
          <p className="font-semibold text-brand-navy mb-2">Where should we send your quotes?</p>
          <div>
            <label className="block text-sm font-semibold text-brand-slate mb-1">
              Full Name <span className="text-brand-orange">*</span>
            </label>
            <input
              type="text"
              autoComplete="name"
              placeholder="John Smith"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 text-brand-navy placeholder-slate-400 text-base transition-colors focus:outline-none focus:border-brand-orange ${errors.name ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 focus:bg-white"}`}
            />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-slate mb-1">
              Phone Number <span className="text-brand-orange">*</span>
            </label>
            <input
              type="tel"
              autoComplete="tel"
              placeholder="(813) 555-0100"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 text-brand-navy placeholder-slate-400 text-base transition-colors focus:outline-none focus:border-brand-orange ${errors.phone ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 focus:bg-white"}`}
            />
            {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-slate mb-1">
              Property Address <span className="text-brand-orange">*</span>
            </label>
            <input
              type="text"
              autoComplete="street-address"
              placeholder="123 Oak Street, Tampa, FL 33601"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 text-brand-navy placeholder-slate-400 text-base transition-colors focus:outline-none focus:border-brand-orange ${errors.address ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 focus:bg-white"}`}
            />
            {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={back} className="flex-1 border-2 border-slate-200 text-brand-slate font-bold py-3 rounded-xl hover:border-slate-300 transition-all">
              ← Back
            </button>
            <button type="button" onClick={next} className="flex-[2] bg-brand-orange hover:bg-brand-orange-dark text-white font-display font-bold text-lg uppercase tracking-widest py-3 rounded-xl transition-all">
              Next →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 — Details + Submit */}
      {step === 4 && (
        <div>
          <p className="font-semibold text-brand-navy mb-4">
            Any additional details? <span className="text-brand-muted font-normal">(optional)</span>
          </p>

          {/* Summary card */}
          <div className="bg-slate-50 rounded-xl p-4 mb-4 text-sm space-y-1.5 border border-slate-100">
            <div className="flex justify-between">
              <span className="text-brand-muted">Job Type</span>
              <span className="font-semibold text-brand-navy capitalize">{form.jobType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted">Roof Type</span>
              <span className="font-semibold text-brand-navy capitalize">{form.roofType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted">Name</span>
              <span className="font-semibold text-brand-navy">{form.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted">Address</span>
              <span className="font-semibold text-brand-navy text-right max-w-[60%]">{form.address}</span>
            </div>
          </div>

          <textarea
            rows={3}
            placeholder="e.g. Leak near chimney, missing shingles after storm, need full inspection..."
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white text-brand-navy placeholder-slate-400 text-base transition-colors focus:outline-none focus:border-brand-orange resize-none mb-4"
          />

          <div className="flex gap-3">
            <button type="button" onClick={back} className="flex-1 border-2 border-slate-200 text-brand-slate font-bold py-3 rounded-xl hover:border-slate-300 transition-all">
              ← Back
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex-[2] bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-70 text-white font-display font-bold text-lg uppercase tracking-widest py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              ) : "Get My Quotes →"}
            </button>
          </div>
          <p className="text-center text-brand-muted text-xs mt-3">
            🔒 Your info is private. Never sold to third parties.
          </p>
        </div>
      )}
    </form>
  );
}
