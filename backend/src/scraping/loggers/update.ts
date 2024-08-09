import { PrismaClient } from "@prisma/client";

const updateClient = new PrismaClient().update;

// Update logger
export const addUpdate = async ({
  productId,
  record,
  oldValue,
  newValue,
}: {
  productId: number;
  record: string;
  oldValue: string;
  newValue: string;
}) => {
  const client = await updateClient.create({
    data: {
      productId,
      record,
      oldValue,
      newValue,
    },
  });
  return !!client;
};
