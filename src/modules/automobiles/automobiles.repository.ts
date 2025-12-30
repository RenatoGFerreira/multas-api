import { PrismaClient, Prisma } from "@prisma/client";
import { CreateAutomobileInput } from "./automobiles.schema";
import { DuplicatePlateError } from "./errors/duplicate-plate.error";

export class AutomobileRepository {
  constructor(private prisma = new PrismaClient()) {}

  async create(data: CreateAutomobileInput) {
    try {
      return await this.prisma.automobile.create({ data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new DuplicatePlateError();
      }
      throw error;
    }
  }
}
