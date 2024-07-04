import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Reset the database
  await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0`;
  await prisma.$executeRaw`TRUNCATE TABLE Product`;
  await prisma.$executeRaw`TRUNCATE TABLE Category`;
  await prisma.$executeRaw`TRUNCATE TABLE Brand`;
  await prisma.$executeRaw`ALTER TABLE Product AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE Category AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE Brand AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1`;

  await prisma.brand.createMany({
    data: [
      {
        name: "Bulk",
      },
      {
        name: "Eafit",
      },
      {
        name: "Myprotein",
      },
      {
        name: "Prozis",
      },
    ],
  });

  await prisma.category.createMany({
    data: [
      {
        name: "Whey",
        description:
          "La grande indétrônable de tout sportif est bien sur la Whey pour vos meilleurs shakers protéinés. ",
      },
      {
        name: "Clear Whey",
        description:
          "Les shakers ne sont pas trop votre truc ? La clear whey est le bon compromis avec sa consistence plus légère vous n'aurez plus d'excuses pour avoir vos protéines.",
      },
      {
        name: "Gainer",
        description:
          "En pleine prise de masse ? Les gainers sont tes meilleurs alliés dans ton objectif en alliant protéine et glucides pour ton apport calorique.",
      },
      {
        name: "Creatine",
        description:
          "Augmente aussi bien ta masse que ta puissance musculaire. Optimise ton gain d'énergie musculaire pour tes séances.",
      },
      {
        name: "Pre-Workout",
        description:
          "Besoin d'un coup de boost ? Le pre-workout est la pour apporter l'énergie que tu cherches tout au long de tes séances les plus intensives.",
      },
      {
        name: "Vitamines",
        description:
          "Booster votre système immunitaire et vos défenses. Donner à votre corps les minéraux et vitamines dont il a besoin pour être en bonne santé.",
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
