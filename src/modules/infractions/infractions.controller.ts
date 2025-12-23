import { Request, Response } from "express";
import { InfractionService } from "./infractions.service";

const service = new InfractionService();

export class InfractionController {
  async list(req: Request, res: Response) {
    const { page, limit } = req.validatedQuery!;

    const result = await service.list(page, limit);
    return res.json(result);
  }
}
