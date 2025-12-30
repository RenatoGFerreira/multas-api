import { PrismaClient } from "@prisma/client";
import { ListInfractionQuery } from "./infractions.schema";

const prisma = new PrismaClient();

export class InfractionRepository {
  async findAll(query: ListInfractionQuery) {
    const {page, limit} = query
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