# 🏠 Roof Repair Tampa — Lead Gen MVP

A high-converting local lead generation landing page for the roofing niche.
Built with Next.js 14 (App Router), Tailwind CSS, and deployable to Vercel in minutes.

---

## ⚡ Quick Start (Local Development)

### 1. Install Dependencies

```bash
cd roof-repair-tampa
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your email credentials (or leave blank to just log leads to console):

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password   # NOT your regular password
LEAD_RECIPIENT_EMAIL=you@yourdomain.com
LEADS_VIEW_SECRET=any-random-secret-string
```

> **Gmail users**: You need to use an [App Password](https://myaccount.google.com/apppasswords), not your regular Gmail password. Enable 2FA first, then generate an App Password.

### 3. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're live!

---

## 📁 Project Structure

```
roof-repair-tampa/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, metadata
│   │   ├── page.tsx            # Main landing page
│   │   ├── globals.css         # Global styles + Tailwind
│   │   └── api/
│   │       └── lead/
│   │           └── route.ts    # POST /api/lead — lead handler
│   └── components/
│       └── LeadForm.tsx        # Client-side form with validation
├── .env.local.example          # Environment variable template
├── tailwind.config.js
├── next.config.js
├── vercel.json
└── package.json
```

---

## 🚀 Deploy to Vercel (5 Minutes)

### Option A: Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts, then add your env vars in the Vercel dashboard:
**Project → Settings → Environment Variables**

### Option B: GitHub + Vercel Dashboard

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → "Add New Project"
3. Import your repo
4. Add environment variables in the dashboard
5. Click Deploy ✅

---

## 🔌 API Reference

### `POST /api/lead`

Submit a new lead.

**Request body:**
```json
{
  "name": "John Smith",
  "phone": "(813) 555-0100",
  "address": "123 Oak St, Tampa FL 33601",
  "message": "Leaking roof after storm damage"
}
```

**Success response:**
```json
{ "success": true }
```

**Validation error response:**
```json
{
  "success": false,
  "errors": {
    "phone": "Please enter a valid phone number."
  }
}
```

---

### `GET /api/lead?secret=YOUR_SECRET`

View all leads captured in the current server session.

```bash
curl "http://localhost:3000/api/lead?secret=your-secret"
```

> ⚠️ This resets on each server restart. For production persistence, connect a database (Postgres, MongoDB, or Vercel KV).

---

## 📧 Email Setup Options

| Provider | Config |
|----------|--------|
| **Gmail** | Host: `smtp.gmail.com`, Port: `587`, use App Password |
| **SendGrid** | Host: `smtp.sendgrid.net`, Port: `587`, user: `apikey`, pass: your API key |
| **Mailgun** | Host: `smtp.mailgun.org`, Port: `587` |
| **No email** | Leave vars blank — leads log to console only |

---

## 🛠️ Customization Checklist

- [ ] Replace `(813) 555-0100` with your real phone number (search for `PHONE` in `page.tsx`)
- [ ] Update the `tel:` href in `page.tsx` and `LeadForm.tsx`
- [ ] Set `LEAD_RECIPIENT_EMAIL` to your actual email
- [ ] Replace testimonials with real ones as you collect them
- [ ] Update `metadata` in `layout.tsx` for your SEO title/description
- [ ] Add Google Analytics or Meta Pixel snippet to `layout.tsx`
- [ ] Connect a real database (Vercel KV, Supabase, PlanetScale) to persist leads

---

## 🔮 Next Steps (Post-MVP)

- Add a CRM webhook (HubSpot, GoHighLevel, etc.)
- Add Twilio SMS notifications for instant lead alerts
- Add Google Tag Manager + conversion tracking
- Add a thank-you page with upsell / referral ask
- A/B test headline copy
- Add city-specific landing pages (Brandon, Clearwater, St. Pete)

---

## 📝 License

MIT — do whatever you want with this.
