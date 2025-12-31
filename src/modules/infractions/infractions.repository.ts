import { prisma as prismaInstance } from "../../shared/database/prisma";
import { ListInfractionQuery } from "./infractions.schema";

export class InfractionRepository {
  constructor(private readonly prisma = prismaInstance) {}

  async findAll({ page, limit }: ListInfractionQuery) {
    return await this.prisma.infractionType.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { code: "asc" }
    });
  }

  async count() {
    return await this.prisma.infractionType.count();
  }
}