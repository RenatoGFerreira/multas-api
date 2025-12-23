
import { InfractionRepository } from "./infractions.repository";

export class InfractionService{
    constructor(
        private readonly repository = new InfractionRepository()
    ) {}

    async list(page = 1, limit = 10) {
      const [data, total] = await Promise.all([
        this.repository.findAll(page, limit),
        this.repository.count()
      ]);
    
        return {
          data,
          meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        };
      }
}