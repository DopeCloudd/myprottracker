import { PrismaClient, Product } from "@prisma/client";
import { Config } from "scraping/types";

const productClient = new PrismaClient().product;

async function updateProductIfNeeded(
  product: Product,
  record: Record<string, string | number | false>,
  config: Config,
) {
  let updateData: { [key: string]: string | number } = {};

  if (config.title && product.title !== record.title) {
    updateData.title = record.title.toString();
  }

  if (config.price) {
    let price = record.price as number;
    if (product.price !== price) {
      updateData.price = price;
    }
    if (!product.lowestPrice || product.lowestPrice > price) {
      updateData.lowestPrice = price;
    }
    if (!product.highestPrice || product.highestPrice < price) {
      updateData.highestPrice = price;
    }
  }

  if (config.quantity && product.quantity !== record.quantity) {
    updateData.quantity = record.quantity.toString();
  }

  if (config.description && product.description !== record.description) {
    updateData.description = record.description.toString().trim();
  }

  if (Object.keys(updateData).length > 0) {
    await productClient.update({
      where: { id: product.id },
      data: updateData,
    });
  }
}

export async function Reader(
  records: Record<string, string | number | false>[],
  config: Config,
) {
  const updates = records
    .filter((record) => record.url)
    .map(async (record) => {
      let product = await productClient.findFirst({
        where: { url: record.url.toString() },
      });

      if (product) {
        await updateProductIfNeeded(product, record, config);
      }
    });

  await Promise.all(updates);
}
