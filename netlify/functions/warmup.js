import { sendEmail } from "../../utils/sendMail.js";
import accounts from "../../data/accounts.json";

export default async () => {
  const businessEmails = accounts.business;
  const personalEmails = accounts.personal;

  for (let b of businessEmails) {
    const pass = process.env[b];
    for (let p of personalEmails) {
      const subject = "Warm-up test " + Date.now();
      const body = `<p>This is a warm-up message between ${b} and ${p}</p>`;
      try {
        await sendEmail(b, pass, p, subject, body);
      } catch (err) {
        console.log("Error:", err.message);
      }
    }
  }

  return {
    statusCode: 200,
    body: "Warm-up completed"
  };
};
