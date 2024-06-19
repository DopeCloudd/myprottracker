import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  // Reset the database
  await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0`;
  await prisma.$executeRaw`TRUNCATE TABLE Product`;
  await prisma.$executeRaw`TRUNCATE TABLE Category`;
  await prisma.$executeRaw`ALTER TABLE Product AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE Category AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1`;

  const whey = await prisma.category.create({
    data: {
      name: "Whey",
      description:
        "La grande indétrônable de tout sportif est bien sur la Whey pour vos meilleurs shakers protéinés. ",
    },
  });
  const clearWhey = await prisma.category.create({
    data: {
      name: "Clear Whey",
      description:
        "Les shakers ne sont pas trop votre truc ? La clear whey est le bon compromis avec sa consistence plus légère vous n'aurez plus d'excuses pour avoir vos protéines.",
    },
  });
  const gainer = await prisma.category.create({
    data: {
      name: "Gainer",
      description:
        "En pleine prise de masse ? Les gainers sont tes meilleurs alliés dans ton objectif en alliant protéine et glucides pour ton apport calorique.",
    },
  });
  const creatine = await prisma.category.create({
    data: {
      name: "Creatine",
      description:
        "Augmente aussi bien ta masse que ta puissance musculaire. Optimise ton gain d'énergie musculaire pour tes séances.",
    },
  });
  const preWorkout = await prisma.category.create({
    data: {
      name: "Pre-Workout",
      description:
        "Besoin d'un coup de boost ? Le pre-workout est la pour apporter l'énergie que tu cherches tout au long de tes séances les plus intensives.",
    },
  });
  const vitamins = await prisma.category.create({
    data: {
      name: "Vitamines",
      description:
        "Booster votre système immunitaire et vos défenses. Donner à votre corps les minéraux et vitamines dont il a besoin pour être en bonne santé.",
    },
  });

  const imagePath = path.join(
    __dirname,
    "mass_gainer_banana_main_9c81-removebg-preview.png",
  );
  const imageBuffer = fs.readFileSync(imagePath);

  await prisma.product.createMany({
    data: [
      {
        title: "Whey protéine",
        description:
          "La whey protéine est la protéine la plus populaire du marché.",
        image: imageBuffer,
        rating: 4.5,
        price: 29.99,
        lowestPrice: 24.99,
        highestPrice: 34.99,
        quantity: "1kg",
        brand: "MyProtein",
        categoryId: whey.id,
        url: "https://www.myprotein.fr/sports-nutrition/impact-whey-protein/10530943.html",
      },
      {
        title: "Clear Whey",
        description:
          "La clear whey est une protéine plus légère que la whey classique.",
        image: imageBuffer,
        rating: 4.0,
        price: 34.99,
        lowestPrice: 29.99,
        highestPrice: 39.99,
        quantity: "1kg",
        brand: "MyProtein",
        categoryId: clearWhey.id,
        url: "https://www.myprotein.fr/sports-nutrition/clear-whey-isolate/12501205.html",
      },
      {
        title: "Gainer",
        description:
          "Le gainer est un mélange de protéines et de glucides pour la prise de masse.",
        image: imageBuffer,
        rating: 4.2,
        price: 39.99,
        lowestPrice: 34.99,
        highestPrice: 44.99,
        quantity: "1kg",
        brand: "MyProtein",
        categoryId: gainer.id,
        url: "https://www.myprotein.fr/sports-nutrition/hard-gainer-extreme/10530936.html",
      },
      {
        title: "Creatine",
        description:
          "La créatine est un complément alimentaire pour augmenter la masse musculaire.",
        image: imageBuffer,
        rating: 4.3,
        price: 19.99,
        lowestPrice: 14.99,
        highestPrice: 24.99,
        quantity: "500g",
        brand: "MyProtein",
        categoryId: creatine.id,
        url: "https://www.myprotein.fr/sports-nutrition/creatine-monohydrate/10530024.html",
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
