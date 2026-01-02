import { AutomobileRepository } from "./automobiles.repository";
import {
  CreateAutomobileInput,
  GetAutomobileIdInput,
  GetAutomobilePlateInput,
  ListAutomobileQuery,
  DeactivateAutomobileInput
} from "./automobiles.schema";
import { InvalidAutomobileYearError } from "./errors/invalid-year.error";
import { AutomobileDeactivated } from "./errors/automobile-deactivate";

export class AutomobileService {
  constructor(private repository = new AutomobileRepository()) {}
  async list(query: ListAutomobileQuery) {
    const { page, limit } = query;
    const [data, total] = await Promise.all([
      this.repository.findAll(query),
      this.repository.count(),
    ]);
    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(data: CreateAutomobileInput) {
    const currentYear = new Date().getFullYear();

    if (data.year > currentYear + 1) {
      throw new InvalidAutomobileYearError();
    }

    return this.repository.create(data);
  }

  async getByPlate(query: GetAutomobilePlateInput) {
    return this.repository.findByPlate(query);
  }
  async getById(id: GetAutomobileIdInput) {
    return this.repository.findById(id);
  }

  async deactivate(data: DeactivateAutomobileInput) {
    const automobile = await this.repository.findById(data);
  
    if (!automobile.isActive) {
      throw new AutomobileDeactivated();
    }
  
    await this.repository.deactivate(data.id);
  }
  
}
