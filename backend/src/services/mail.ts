import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_EMAIL_SECRET);

const MailSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  body: z.string(),
});

type Mail = z.infer<typeof MailSchema>;

export const sendMail = async (mail: Mail) => {
  // Send the mail
  const { data, error } = await resend.emails.send({
    from: "noreply@myprottracker.com",
    to: mail.to,
    subject: mail.subject,
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });

  if (error) {
    return { status: 400, data: error };
  }

  return { status: 200, data: data };
};
