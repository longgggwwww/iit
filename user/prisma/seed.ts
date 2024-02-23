import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const roles = await Promise.all([
    prisma.role.upsert({
      where: {
        code: "admin",
      },
      update: {},
      create: {
        name: "Quản trị viên",
        code: "admin",
        permissions: [
          "READ_ROLE",
          "CREATE_ROLE",
          "UPDATE_ROLE",
          "DELETE_ROLE",
          "READ_USER",
          "CREATE_USER",
          "UPDATE_USER",
          "DELETE_USER",
          "READ_UNIT",
          "CREATE_UNIT",
          "UPDATE_UNIT",
          "DELETE_UNIT",
          "READ_COMPANY",
          "CREATE_COMPANY",
          "UPDATE_COMPANY",
          "DELETE_COMPANY",
          "READ_CATEGORY",
          "CREATE_CATEGORY",
          "UPDATE_CATEGORY",
          "DELETE_CATEGORY",
          "READ_PLACE",
          "BROWSE_PLACE",
        ],
      },
    }),
    prisma.role.upsert({
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
    }),
    prisma.role.upsert({
      where: {
        code: "manager",
      },
      update: {},
      create: {
        name: "Quản lí",
        code: "manager",
        permissions: [
          "READ_ROLE",
          "READ_USER",
          "CREATE_USER",
          "UPDATE_USER",
          "DELETE_USER",
          "READ_UNIT",
          "CREATE_UNIT",
          "UPDATE_UNIT",
          "DELETE_UNIT",
          "READ_COMPANY",
          "CREATE_COMPANY",
          "UPDATE_COMPANY",
          "DELETE_COMPANY",
          "READ_CATEGORY",
          "CREATE_CATEGORY",
          "UPDATE_CATEGORY",
          "DELETE_CATEGORY",
          "READ_PLACE",
          "BROWSE_PLACE",
        ],
      },
    }),
  ]);
  console.log(roles);
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
