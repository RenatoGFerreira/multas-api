import { AutomobileRepository } from "./automobiles.repository";
import { CreateAutomobileInput, GetAutomobilePlateInput, ListAutomobileQuery } from "./automobiles.schema";
import { InvalidAutomobileYearError } from "./errors/invalid-year.error";
export class AutomobileService {
  constructor(private repository = new AutomobileRepository()) {}
  async list(query: ListAutomobileQuery){
    const {page, limit} = query;
    const [data, total] = await Promise.all([
      this.repository.findAll(query),
      this.repository.count()
    ])
    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total/limit)
      }
    }
  }

  async create(data: CreateAutomobileInput) {
    const currentYear = new Date().getFullYear();

    if (data.year > currentYear + 1) {
      throw new InvalidAutomobileYearError()
    }

    return this.repository.create(data);
  }

  async getByPlate(query: GetAutomobilePlateInput){
    return this.repository.findByPlate(query)
  }
}
