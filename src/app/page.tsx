import LeadForm from "@/components/LeadForm";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-brand-navy text-white text-sm py-2 px-4 text-center">
        Free service for Tampa homeowners — no cost, no obligation
      </div>
      <header className="bg-white border-b border-slate-100 py-4 px-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <div>
              <div className="font-display font-bold text-lg md:text-xl text-brand-navy uppercase tracking-tight leading-none">Tampa Roof Quotes</div>
              <div className="text-xs text-brand-muted">Connecting homeowners with local roofers</div>
            </div>
          </div>
          <a href="#quote-form" className="hidden sm:flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-2 px-5 rounded-xl transition-colors text-sm">Get Free Quotes</a>
        </div>
      </header>
      <section className="bg-gradient-to-br from-brand-navy via-brand-navy-mid to-slate-800 text-white py-10 md:py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange-light text-sm font-semibold px-3 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse-slow" />
              Tampa Bay · 100% Free · No Obligation
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl uppercase leading-tight tracking-tight mb-4">
              Get Free Roof Quotes in <span className="text-brand-orange">Tampa</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Tell us about your roof and we will connect you with local licensed contractors. They reach out to you with quotes. You decide if you want to move forward.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              {["Free to homeowners", "Licensed contractors only", "No obligation to hire", "Tampa Bay area"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full" id="quote-form"><LeadForm /></div>
        </div>
      </section>
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-brand-navy tracking-tight mb-2">How It Works</h2>
          <p className="text-brand-muted mb-10">Three simple steps. No hassle.</p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { title: "Submit Your Request", desc: "Answer a few quick questions about your roof. Takes about 60 seconds.", icon: "📝" },
              { title: "Get Matched", desc: "We share your request with licensed local roofers in Tampa who are available.", icon: "🔗" },
              { title: "They Contact You", desc: "Contractors reach out directly with quotes. You choose who to work with — or no one.", icon: "✅" },
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
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-brand-navy tracking-tight mb-2">Why Use Tampa Roof Quotes?</h2>
          <p className="text-brand-muted mb-10">We make it easier to find the right person for the job.</p>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {[
              { icon: "💰", title: "Free for Homeowners", desc: "There is no cost to submit a request. Contractors pay us, not you." },
              { icon: "📍", title: "Local Only", desc: "We only work with contractors who serve the Tampa Bay area." },
              { icon: "🛡️", title: "Licensed Contractors", desc: "We only connect you with Florida-licensed roofing contractors." },
              { icon: "🚫", title: "No Pressure", desc: "Getting quotes does not mean you have to hire anyone. It is just information." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex gap-4">
                <span className="text-3xl shrink-0">{item.icon}</span>
                <div>
                  <div className="font-display font-bold text-lg uppercase text-brand-navy mb-1">{item.title}</div>
                  <p className="text-brand-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-14 px-4 bg-brand-navy text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl uppercase tracking-tight mb-3">Ready to Get Quotes?</h2>
          <p className="text-slate-300 mb-6 text-lg">Submit your request in 60 seconds. Free, no obligation.</p>
          <a href="#quote-form" className="inline-flex items-center gap-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-display font-bold text-xl uppercase tracking-widest py-5 px-10 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0">Get My Free Quotes</a>
        </div>
      </section>
      <footer className="bg-brand-navy text-slate-400 py-8 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-center sm:text-left">
          <div>
            <div className="font-display font-bold text-white text-lg uppercase">Tampa Roof Quotes</div>
            <div>Connecting Tampa Bay homeowners with local roofers</div>
          </div>
          <div className="space-y-1 text-xs">
            <div>2025 TampaRoofQuotes.com All rights reserved.</div>
            <div>We are a lead generation service, not a roofing company.</div>
          </div>
        </div>
      </footer>
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-brand-navy border-t border-white/10 p-3">
        <a href="#quote-form" className="flex w-full items-center justify-center bg-brand-orange text-white font-bold py-3 rounded-xl text-sm">Get Free Roof Quotes</a>
      </div>
    </div>
  );
}
