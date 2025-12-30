import { Request, Response } from "express";
import { InfractionService } from "./infractions.service";
import { ListInfractionQuery } from "./infractions.schema";

const service = new InfractionService();

export class InfractionController {
  async list(req: Request<{},{}, ListInfractionQuery>, res: Response) {
    const infractions = await service.list(req.validatedQuery);
    return res.status(200).json(infractions);
  }
}
