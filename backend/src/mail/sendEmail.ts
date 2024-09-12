import transporter from "./mailer";
import {
  renderLowestPriceEmail,
  renderWelcomeEmail,
  renderResetPasswordEmail,
} from "./renderEmail";

export const sendWelcomeEmail = async (email: string) => {
  const htmlContent = renderWelcomeEmail({ email });

  const mailOptions = {
    from: "noreply@myprottracker.com", // L'adresse email de l'expéditeur
    to: email, // L'adresse email du destinataire
    subject: "Welcome to MyProtTracker", // Sujet de l'email
    html: htmlContent, // Contenu HTML de l'email
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
};

export const sendLowestPriceEmail = async (
  email: string,
  productId: string,
) => {
  const htmlContent = renderLowestPriceEmail({ productId });

  const mailOptions = {
    from: "noreply@myprottracker.com", // L'adresse email de l'expéditeur
    to: email, // L'adresse email du destinataire
    subject: "Alerte - Baisse de prix !", // Sujet de l'email
    html: htmlContent, // Contenu HTML de l'email
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    // Safely handle unknown error types
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error; // If error is a string, handle it directly
    }
    return { success: false, error: errorMessage }; // Return failure status without throwing
  }
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const htmlContent = renderResetPasswordEmail({ token });

  const mailOptions = {
    from: "noreply@myprottracker.com", // L'adresse email de l'expéditeur
    to: email, // L'adresse email du destinataire
    subject: "Réinitialiser votre mot de passe", // Sujet de l'email
    html: htmlContent, // Contenu HTML de l'email
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error; // If error is a string, handle it directly
    }
    return { success: false, error: errorMessage }; // Return failure status without throwing
  }
};
