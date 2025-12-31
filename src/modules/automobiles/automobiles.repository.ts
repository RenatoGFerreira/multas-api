
import { prisma as prismaInstance } from "../../shared/database/prisma"; 
import { Prisma } from "@prisma/client";
import {
  CreateAutomobileInput,
  ListAutomobileQuery,
  GetAutomobilePlateInput,
  GetAutomobileIdInput,
} from "./automobiles.schema";
import { DuplicatePlateError } from "./errors/duplicate-plate.error";
import { InexistAutomobileError } from "./errors/inexist-automobile.error";

export class AutomobileRepository {
  constructor(private readonly prisma = prismaInstance) {}

  async findAll(query: ListAutomobileQuery) {
    const { page, limit } = query;
    return await this.prisma.automobile.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { brand: "asc" },
    });
  }

  async count() {
    return this.prisma.automobile.count();
  }

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

  async findByPlate(data: GetAutomobilePlateInput) {
    const automobile = await this.prisma.automobile.findUnique({ 
      where: { plate: data.plate } 
    });
    
    if (!automobile) throw new InexistAutomobileError();
    return automobile;
  }

  async findById(id: GetAutomobileIdInput){
    const automobile = await this.prisma.automobile.findUnique({
      where: {id: id.id}
    })
    if(!automobile) throw new InexistAutomobileError();
    return automobile;
  }
}