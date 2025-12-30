import { AutomobileRepository } from "./automobiles.repository";
import { CreateAutomobileInput } from "./automobiles.schema";
import { InvalidAutomobileYearError } from "./errors/invalid-year.error";

export class AutomobileService {
  constructor(private repository = new AutomobileRepository()) {}

  async create(data: CreateAutomobileInput) {
    const currentYear = new Date().getFullYear();

    if (data.year > currentYear + 1) {
      throw new InvalidAutomobileYearError()
    }

    return this.repository.create(data);
  }
}
