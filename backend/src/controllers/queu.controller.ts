import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { sendLowestPriceEmail } from "../mail/sendEmail";

const mailClient = new PrismaClient().queuMail;
const mailHistoryClient = new PrismaClient().mailHistory;
const alertClient = new PrismaClient().alert;

// Notify the user that the product has a price lower than the threshold
export const notifyLowerPrice = async (req: Request, res: Response) => {
  // Get all products who haven't been notified yet
  const products = await mailClient.findMany({
    where: { status: "PENDING" },
    include: { product: true },
  });
  // For each product, send an email to the user who has this product in his alert list
  for (const product of products) {
    // Get all users who have this product in their alert list
    const alerts = await alertClient.findMany({
      where: { productId: product.productId },
      include: { user: true },
    });
    // Create a list of email send promises
    const emailPromises = alerts.map((alert) => {
      const email = alert.user.email;
      return sendLowestPriceEmail(email, product.productId.toString());
    });
    // Use Promise.allSettled to handle all email sends concurrently
    const results = await Promise.allSettled(emailPromises);
    // Log the results and handle success or failure accordingly
    results.forEach((result, index) => {
      if (result.status === "fulfilled" && result.value.success) {
        // Log the mail to track history
        mailHistoryClient.create({
          data: {
            email: alerts[index].user.email,
            type: "LOWEST_PRICE",
            status: "SENT",
          },
        });
      } else {
        // Log the mail to track history
        mailHistoryClient.create({
          data: {
            email: alerts[index].user.email,
            type: "LOWEST_PRICE",
            status: "ERROR",
          },
        });
      }
    });
    // Update the status of the product to "SENT"
    await mailClient.update({
      where: { id: product.id },
      data: { status: "SENT" },
    });
  }

  res.status(200).send("Emails sent successfully");
};
