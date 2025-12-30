import { Request, Response } from "express";
import { CreateAutomobileInput } from "./automobiles.schema";
import { AutomobileService } from "./automobiles.service";

const service = new AutomobileService();

export class AutomobileController {
  async create(req: Request<{}, {}, CreateAutomobileInput>, res: Response) {
    const automobile = await service.create(req.validatedBody);
    return res.status(201).json(automobile);
  }
}
