import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class InfractionRepository {
  async findAll(page: number, limit: number) {
    return prisma.infractionType.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { code: "asc" }
    });
  }

  async count() {
    return prisma.infractionType.count();
  }
}