import nodemailer from "nodemailer";

const mail_user = process.env.MAIL_USER;
const mail_pass = process.env.MAIL_PASS;

// Créer un transporteur Nodemailer avec les informations de configuration de votre service de messagerie
const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 465,
  secure: true,
  auth: {
    user: mail_user,
    pass: mail_pass,
  },
});

export default transporter;
