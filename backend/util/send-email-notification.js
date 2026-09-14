import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  // CONNECTION CONFIGURATION
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },

  // EMAIL DEFAULTS
  defaults: {
    from: process.env.SENDER_EMAIL,
  },
});

// Send confirmation email
export async function sendConfirmationEmail(email, name, token) {
  const confirmationLink = `http://localhost:3000/verify/${token}`;

  await transporter.sendMail({
    from: `"My Application" <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: "Confirm your email address",

    text: `
Hello ${name},

Thank you for registering.

Please confirm your email address by clicking the link below:

${confirmationLink}

If you did not create this account, you can safely ignore this email.

Regards,
My Application
    `,

    html: `
      <h2>Welcome, ${name}!</h2>

      <p>Thank you for registering.</p>

      <p>
        Please confirm your email address by clicking the button below:
      </p>

      <a
        href="${confirmationLink}"
        style="
          display: inline-block;
          padding: 12px 20px;
          background: #000;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        "
      >
        Confirm Email
      </a>

      <p>If you did not create this account, you can safely ignore this email.</p>
    `,
  });
}

export default transporter;
