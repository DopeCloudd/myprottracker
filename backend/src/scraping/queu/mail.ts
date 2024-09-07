import { PrismaClient } from "@prisma/client";

const queuClient = new PrismaClient().queuMail;

// Add a product to the mail queu (product who has a price lower than the threshold)
export const addProductLowestPriceQueuMail = async ({
  productId,
}: {
  productId: number;
}) => {
  const client = await queuClient.create({
    data: {
      productId,
    },
  });
  return !!client;
};
