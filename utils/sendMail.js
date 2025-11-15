import nodemailer from "nodemailer";

/**
 * Send a single email using SMTP credentials (pass supplied).
 * from: sender email (string)
 * pass: app password / SMTP password for sender (string)
 * to: recipient email (string)
 * subject, text, html optional
 */
export async function sendEmail({ from, pass, to, subject, text, html }) {
  const host = getSMTPHost(from);
  if (!host) throw new Error(`No SMTP host mapping for ${from}`);

  const transporter = nodemailer.createTransport({
    host,
    port: 587,
    secure: false,
    auth: { user: from, pass },
    tls: { rejectUnauthorized: false }
  });

  const info = await transporter.sendMail({
    from,
    to,
    subject: subject || "Warm-up check",
    text,
    html
  });

  return info;
}

function getSMTPHost(email) {
  if (email.includes("@gmail.com") || email.includes("@googlemail.com")) return "smtp.gmail.com";
  if (email.includes("@outlook.com") || email.includes("@hotmail.com") || email.includes("@office365.com")) return "smtp.office365.com";
  if (email.includes("@aol.com")) return "smtp.aol.com";
  if (email.includes("@yahoo.com")) return "smtp.mail.yahoo.com";
  if (email.includes("@zohomail.in") || email.includes("@zoho.com")) return "smtp.zoho.in";
  // add others if needed
  return null;
}
