import transporter from "./mailer";
import { renderWelcomeEmail } from "./renderEmail";

export const sendWelcomeEmail = async (to: string, email: string) => {
  const htmlContent = renderWelcomeEmail({ email });

  const mailOptions = {
    from: "noreply@myprottracker.com", // L'adresse email de l'expéditeur
    to, // L'adresse email du destinataire
    subject: "Welcome to MyProtTrqcker", // Sujet de l'email
    html: htmlContent, // Contenu HTML de l'email
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
};
