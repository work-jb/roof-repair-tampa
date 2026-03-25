import LeadForm from "@/components/LeadForm";

const PHONE = "(813) 555-0100";
const PHONE_HREF = "tel:+18135550100";

const testimonials = [
  {
    text: "Called in the morning, they had someone out by noon. Fixed our leak the same day before more rain hit. Couldn't be happier.",
    author: "Maria D.",
    location: "South Tampa",
    stars: 5,
  },
  {
    text: "Super professional. Got 3 quotes and they were the most upfront about pricing. Roof looks great, no issues since.",
    author: "James R.",
    location: "Brandon, FL",
    stars: 5,
  },
  {
    text: "Fast response after the hurricane. They tarped our roof within hours and had everything repaired within a week.",
    author: "Sandra & Tom K.",
    location: "Hillsborough County",
    stars: 5,
  },
];

const services = [
  { icon: "🔧", label: "Leak Repairs" },
  { icon: "🏠", label: "Full Replacements" },
  { icon: "🌀", label: "Storm Damage" },
  { icon: "🔍", label: "Free Inspections" },
  { icon: "⚡", label: "Emergency Service" },
  { icon: "📋", label: "Insurance Claims" },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── TOP BAR ── */}
      <div className="bg-brand-navy text-white text-sm py-2 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <span>
            ⚡ <strong>Same-Day Service Available</strong> — Tampa Bay&apos;s Trusted Roofing Network
          </span>
          <a
            href={PHONE_HREF}
            className="font-bold text-brand-orange hover:text-brand-orange-light transition-colors"
          >
            📞 {PHONE}
          </a>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="bg-white border-b border-slate-100 py-4 px-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <div>
              <div className="font-display font-bold text-lg md:text-xl text-brand-navy uppercase tracking-tight leading-none">
                Roof Repair Tampa
              </div>
              <div className="text-xs text-brand-muted">Licensed &amp; Insured Partners</div>
            </div>
          </div>
          <a
            href={PHONE_HREF}
            className="hidden sm:flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-2 px-5 rounded-xl transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
            </svg>
            Call Now
          </a>
        </div>
      </header>

      {/* ── HERO + FORM ── */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-navy-mid to-slate-800 text-white py-10 md:py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          {/* Left: Copy */}
          <div className="pt-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange-light text-sm font-semibold px-3 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse-slow" />
              Serving Tampa Homeowners Since 2008
            </div>

            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl uppercase leading-tight tracking-tight mb-4">
              Get a Free Roof Repair Quote in{" "}
              <span className="text-brand-orange">Tampa</span>
            </h1>

            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Fast, reliable local roofing professionals ready to inspect your roof —
              at no cost and no obligation.
            </p>

            {/* Services grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
              {services.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 text-sm font-medium"
                >
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Licensed &amp; Insured
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free Inspection
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Same-Day Response
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No Obligation
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ── */}
      <section className="bg-brand-orange py-5 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-white text-center">
          <div>
            <div className="font-display font-extrabold text-3xl uppercase">500+</div>
            <div className="text-sm text-orange-100">Roofs Repaired</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/30" />
          <div>
            <div className="font-display font-extrabold text-3xl uppercase">4.9★</div>
            <div className="text-sm text-orange-100">Average Rating</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/30" />
          <div>
            <div className="font-display font-extrabold text-3xl uppercase">15 Min</div>
            <div className="text-sm text-orange-100">Avg Response Time</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/30" />
          <div>
            <div className="font-display font-extrabold text-3xl uppercase">15+ Yrs</div>
            <div className="text-sm text-orange-100">Serving Tampa Bay</div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-brand-navy tracking-tight mb-2">
              Tampa Homeowners Trust Us
            </h2>
            <p className="text-brand-muted">
              Real reviews from real neighbors across Hillsborough County
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="bg-white rounded-2xl p-6 shadow-md border border-slate-100"
              >
                <StarRating count={t.stars} />
                <p className="text-brand-slate mt-3 mb-4 leading-relaxed text-sm">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-brand-navy text-sm">{t.author}</div>
                  <div className="text-brand-muted text-xs">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-brand-navy tracking-tight mb-2">
            How It Works
          </h2>
          <p className="text-brand-muted mb-10">Simple. Fast. No pressure.</p>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Submit Your Info",
                desc: "Fill out the quick form above with your contact info and issue.",
                icon: "📝",
              },
              {
                step: "2",
                title: "We Call You Fast",
                desc: "A local roofing specialist will call you within 15 minutes.",
                icon: "📞",
              },
              {
                step: "3",
                title: "Free On-Site Quote",
                desc: "We send a licensed roofer to inspect and give you a written estimate — free.",
                icon: "✅",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-brand-orange/10 border-2 border-brand-orange flex items-center justify-center text-2xl mb-3">
                  {item.icon}
                </div>
                <div className="font-display font-bold text-lg uppercase text-brand-navy mb-1">
                  {item.title}
                </div>
                <p className="text-brand-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALL CTA SECTION ── */}
      <section className="py-14 px-4 bg-brand-navy text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl uppercase tracking-tight mb-3">
            Prefer to Call?
          </h2>
          <p className="text-slate-300 mb-6 text-lg">
            Talk to a real person right now. We answer 7 days a week.
          </p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-display font-bold text-2xl uppercase tracking-widest py-5 px-10 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
            </svg>
            {PHONE}
          </a>
          <p className="text-slate-400 text-sm mt-4">
            Mon – Sun &nbsp;|&nbsp; 7:00 AM – 8:00 PM
          </p>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-8 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-brand-muted text-center">
          {[
            "✅ Florida Licensed Roofing Contractors",
            "🛡️ Fully Insured — Liability & Workers Comp",
            "📋 Insurance Claim Assistance",
            "🌀 Storm Damage Specialists",
            "🏆 A+ Reputation in Tampa Bay",
          ].map((item) => (
            <div key={item} className="font-medium">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-brand-navy text-slate-400 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-center sm:text-left">
          <div>
            <div className="font-display font-bold text-white text-lg uppercase">
              Roof Repair Tampa
            </div>
            <div>Serving Tampa Bay &amp; Hillsborough County</div>
          </div>
          <div className="space-y-1">
            <div>
              <a href={PHONE_HREF} className="text-brand-orange hover:text-brand-orange-light font-semibold">
                {PHONE}
              </a>
            </div>
            <div>© {new Date().getFullYear()} Roof Repair Tampa. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-brand-navy border-t border-white/10 p-3 flex gap-3">
        <a
          href={PHONE_HREF}
          className="flex-1 flex items-center justify-center gap-2 bg-white text-brand-navy font-bold py-3 rounded-xl text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
          </svg>
          Call Now
        </a>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("form")?.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
          className="flex-1 flex items-center justify-center gap-2 bg-brand-orange text-white font-bold py-3 rounded-xl text-sm"
        >
          Get Free Quote
        </a>
      </div>
    </div>
  );
}
