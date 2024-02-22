import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const everyone = await prisma.role.upsert({
    where: {
      code: "everyone",
    },
    update: {},
    create: {
      name: "Vai trò mặc định",
      code: "everyone",
      permissions: [
        "READ_USER",
        "READ_UNIT",
        "READ_COMPANY",
        "READ_CATEGORY",
        "READ_PLACE",
      ],
    },
  });
  console.log(everyone);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
