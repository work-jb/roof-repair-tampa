import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface LeadPayload {
  name: string;
  phone: string;
  address: string;
  message: string;
}

interface Lead extends LeadPayload {
  timestamp: string;
  ip: string | null;
}

// In-memory store (resets on server restart — swap for DB/KV later)
const leads: Lead[] = [];

function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 10 && cleaned.length <= 15;
}

async function sendLeadEmail(lead: Lead): Promise<void> {
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    LEAD_RECIPIENT_EMAIL,
    EMAIL_SECURE,
  } = process.env;

  // Skip if not configured — just log
  if (!EMAIL_USER || !EMAIL_PASS || !LEAD_RECIPIENT_EMAIL) {
    console.log("📧 Email not configured — skipping send. Lead logged above.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST || "smtp.gmail.com",
    port: Number(EMAIL_PORT) || 587,
    secure: EMAIL_SECURE === "true",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Roof Repair Tampa Leads" <${EMAIL_USER}>`,
    to: LEAD_RECIPIENT_EMAIL,
    subject: `🏠 New Roof Lead: ${lead.name} — ${lead.phone}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #F97316; border-radius: 8px;">
        <h1 style="color: #F97316; margin-top: 0;">🏠 New Roofing Lead!</h1>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #FFF7ED;">
            <td style="padding: 10px; font-weight: bold; width: 140px;">Name</td>
            <td style="padding: 10px;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Phone</td>
            <td style="padding: 10px;"><a href="tel:${lead.phone}" style="color: #F97316;">${lead.phone}</a></td>
          </tr>
          <tr style="background: #FFF7ED;">
            <td style="padding: 10px; font-weight: bold;">Address</td>
            <td style="padding: 10px;">${lead.address}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; vertical-align: top;">Issue</td>
            <td style="padding: 10px;">${lead.message}</td>
          </tr>
          <tr style="background: #FFF7ED;">
            <td style="padding: 10px; font-weight: bold;">Submitted</td>
            <td style="padding: 10px;">${new Date(lead.timestamp).toLocaleString("en-US", { timeZone: "America/New_York" })}</td>
          </tr>
        </table>
        <p style="color: #64748B; font-size: 12px; margin-top: 20px;">Lead received from Roof Repair Tampa landing page.</p>
      </div>
    `,
    text: `
NEW ROOFING LEAD
================
Name:    ${lead.name}
Phone:   ${lead.phone}
Address: ${lead.address}
Issue:   ${lead.message}
Time:    ${lead.timestamp}
    `,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body: LeadPayload = await req.json();

    // --- Validation ---
    const errors: Record<string, string> = {};

    if (!body.name || body.name.trim().length < 2) {
      errors.name = "Please enter your full name.";
    }
    if (!body.phone || !validatePhone(body.phone)) {
      errors.phone = "Please enter a valid phone number.";
    }
    if (!body.address || body.address.trim().length < 5) {
      errors.address = "Please enter your property address.";
    }
    if (!body.message || body.message.trim().length < 5) {
      errors.message = "Please describe the roofing issue.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    // --- Build lead object ---
    const lead: Lead = {
      name: body.name.trim(),
      phone: body.phone.trim(),
      address: body.address.trim(),
      message: body.message.trim(),
      timestamp: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip"),
    };

    // --- Store in memory ---
    leads.push(lead);

    // --- Log to console ---
    console.log("\n========== 🏠 NEW ROOF LEAD ==========");
    console.log(`  Name:    ${lead.name}`);
    console.log(`  Phone:   ${lead.phone}`);
    console.log(`  Address: ${lead.address}`);
    console.log(`  Issue:   ${lead.message}`);
    console.log(`  Time:    ${lead.timestamp}`);
    console.log(`  Total leads this session: ${leads.length}`);
    console.log("======================================\n");

    // --- Send email (non-blocking, won't fail the response) ---
    sendLeadEmail(lead).catch((err) => {
      console.error("Email send failed:", err.message);
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to view all leads (protect with secret in production)
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.LEADS_VIEW_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ count: leads.length, leads });
}
