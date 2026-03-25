import LeadForm from "@/components/LeadForm";

const testimonials = [
  {
    text: "Submitted my info Sunday night, had 2 contractors call me by Monday morning. Got my roof done for $1,400 less than the first quote I got on my own.",
    author: "Maria D.",
    location: "South Tampa",
    stars: 5,
  },
  {
    text: "Really easy process. I wasn't sure what I needed — they matched me with someone who did a free inspection and explained everything clearly.",
    author: "James R.",
    location: "Brandon, FL",
    stars: 5,
  },
  {
    text: "After the hurricane I was getting the runaround. Used this site and had a licensed roofer out the next day. Huge relief.",
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
      {/* TOP BAR */}
      <div className="bg-brand-navy text-white text-sm py-2 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-center text-center">
          <span>🏠 <strong>Free Service for Tampa Homeowners</strong> — We match you with licensed local roofers at no cost</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-white border-b border-slate-100 py-4 px-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <div>
              <div className="font-display font-bold text-lg md:text-xl text-brand-navy uppercase tracking-tight leading-none">
                Tampa Roof Quotes
              </div>
              <div className="text-xs text-brand-muted">Free Quote Matching Service</div>
            </div>
          </div>
          <a href="#quote-form" className="hidden sm:flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-2 px-5 rounded-xl transition-colors text-sm">
            Get Free Quotes
          </a>
        </div>
      </header>

      {/* HERO + FORM */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-navy-mid to-slate-800 text-white py-10 md:py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange-light text-sm font-semibold px-3 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse-slow" />
              100% Free · No Obligation · Tampa Bay
            </div>

            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl uppercase leading-tight tracking-tight mb-4">
              Compare Free Roof Quotes in <span className="text-brand-orange">Tampa</span>
            </h1>

            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Tell us about your roof — we&apos;ll connect you with licensed Tampa contractors who compete for your business. You pick the best price.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
              {services.map((s) => (
                <div key={s.label} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 text-sm font-medium">
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              {["Licensed Contractors Only", "Free to Homeowners", "No Obligation", "Tampa Bay Only"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full" id="quote-form">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-brand-orange py-5 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-white text-center">
          {[
            { num: "1,200+", label: "Homeowners Matched" },
            { num: "4.8★", label: "Homeowner Rating" },
            { num: "24 Hrs", label: "Avg. First Quote" },
            { num: "$0", label: "Cost to Homeowners" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-6 sm:gap-12">
              {i > 0 && <div className="hidden sm:block w-px h-10 bg-white/30" />}
              <div>
                <div className="font-display font-extrabold text-3xl uppercase">{s.num}</div>
                <div className="text-sm text-orange-100">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-brand-navy tracking-tight mb-2">How It Works</h2>
          <p className="text-brand-muted mb-10">Simple, transparent, and completely free for homeowners.</p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { title: "Submit Your Request", desc: "Tell us your address and what your roof needs. Takes 60 seconds.", icon: "📝" },
              { title: "We Match You", desc: "We connect your request with licensed, vetted Tampa roofing contractors.", icon: "🔗" },
              { title: "Compare & Choose", desc: "Contractors reach out with quotes. You compare and pick the best fit — zero pressure.", icon: "✅" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-brand-orange/10 border-2 border-brand-orange flex items-center justify-center text-2xl mb-3">{item.icon}</div>
                <div className="font-display font-bold text-lg uppercase text-brand-navy mb-1">{item.title}</div>
                <p className="text-brand-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-brand-navy tracking-tight mb-2">What Tampa Homeowners Say</h2>
            <p className="text-brand-muted">Real feedback from homeowners across Hillsborough County</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
                <StarRating count={t.stars} />
                <p className="text-brand-slate mt-3 mb-4 leading-relaxed text-sm">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-semibold text-brand-navy text-sm">{t.author}</div>
                  <div className="text-brand-muted text-xs">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-14 px-4 bg-brand-navy text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl uppercase tracking-tight mb-3">Ready to Get Your Free Quotes?</h2>
          <p className="text-slate-300 mb-6 text-lg">It takes 60 seconds. Contractors come to you.</p>
          <a href="#quote-form" className="inline-flex items-center gap-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-display font-bold text-xl uppercase tracking-widest py-5 px-10 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0">
            Get My Free Quotes →
          </a>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-8 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-brand-muted text-center">
          {[
            "✅ Florida Licensed Contractors Only",
            "🛡️ Verified Insurance Required",
            "📋 Insurance Claim Assistance Available",
            "🌀 Storm Damage Specialists",
            "🔒 Your Info Is Never Sold to Third Parties",
          ].map((item) => (
            <div key={item} className="font-medium">{item}</div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-navy text-slate-400 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-center sm:text-left">
          <div>
            <div className="font-display font-bold text-white text-lg uppercase">Tampa Roof Quotes</div>
            <div>Free quote matching for Tampa Bay homeowners</div>
          </div>
          <div className="space-y-1">
            <div>© {new Date().getFullYear()} TampaRoofQuotes.com · All rights reserved.</div>
            <div className="text-xs">We connect homeowners with independent licensed contractors. We are not a roofing company.</div>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-brand-navy border-t border-white/10 p-3">
        <a href="#quote-form" className="flex w-full items-center justify-center gap-2 bg-brand-orange text-white font-bold py-3 rounded-xl text-sm">
          Get Free Roof Quotes →
        </a>
      </div>
    </div>
  );
}
