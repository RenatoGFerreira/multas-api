
import { InfractionRepository } from "./infractions.repository";
import { ListInfractionQuery } from "./infractions.schema";
export class InfractionService{
    constructor(
        private readonly repository = new InfractionRepository()
    ) {}

    async list(query: ListInfractionQuery ) {
      const {page, limit} = query;
      const [data, total] = await Promise.all([
        this.repository.findAll({page, limit}),
        this.repository.count()
      ])
      return {
        data,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        }
      }
      }
}
