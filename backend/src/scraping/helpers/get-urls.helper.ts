import { PrismaClient } from "@prisma/client";

const productClient = new PrismaClient().product;

export function getUrls(brand: string): Promise<string[]> {
  return productClient
    .findMany({
      where: { brand: { name: brand } },
      select: { url: true },
    })
    .then((urls) => urls.map((product) => product.url));
}
