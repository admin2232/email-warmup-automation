import nodemailer from "nodemailer";
import fs from "fs";
import warmupConfig from "./config/warmup.js";
import emailAccounts from "./data/accounts.json" assert { type: "json" };

function generateRandomSubject() {
  const subjects = [
    "Checking in",
    "Quick follow-up",
    "Warm regards",
    "Hope you're doing well",
    "Just touching base",
    "Greetings!",
    "Small update",
    "Following up"
  ];
  return subjects[Math.floor(Math.random() * subjects.length)];
}

function generateRandomMessage() {
  const messages = [
    "Hope your day is going great!",
    "Just wanted to check in quickly.",
    "This is a test warm-up message.",
    "Let me know if you received this.",
    "Sending this message as part of my email warm-up.",
    "Warm regards!",
    "Have a wonderful day!"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

async function sendEmail(fromEmail, toEmail) {
  const transporter = nodemailer.createTransport({
    host: warmupConfig.smtpHost,
    port: warmupConfig.smtpPort,
    secure: warmupConfig.secure,
    auth: {
      user: fromEmail,
      pass: warmupConfig.smtpPassword
    }
  });

  await transporter.sendMail({
    from: fromEmail,
    to: toEmail,
    subject: generateRandomSubject(),
    text: generateRandomMessage()
  });

  console.log(`✔ Email sent from ${fromEmail} to ${toEmail}`);
}

async function startWarmup() {
  const allBusiness = emailAccounts.business;
  const allPersonal = emailAccounts.personal;

  console.log("Starting warm-up process...");

  for (let i = 0; i < warmupConfig.dailyEmails; i++) {
    const from =
      i % 2 === 0
        ? allBusiness[Math.floor(Math.random() * allBusiness.length)]
        : allPersonal[Math.floor(Math.random() * allPersonal.length)];

    const to =
      i % 2 === 0
        ? allPersonal[Math.floor(Math.random() * allPersonal.length)]
        : allBusiness[Math.floor(Math.random() * allBusiness.length)];

    try {
      await sendEmail(from, to);
    } catch (err) {
      console.log(`❌ Failed: ${from} → ${to}`, err.message);
    }
  }

  console.log("Warm-up completed for today.");
}

startWarmup();
