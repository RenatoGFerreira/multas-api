import { Request, Response } from "express";
import { CreateAutomobileInput, GetAutomobilePlateInput, ListAutomobileQuery } from "./automobiles.schema";
import { AutomobileService } from "./automobiles.service";

const service = new AutomobileService();

export class AutomobileController {
  async list(req: Request<{}, {}, ListAutomobileQuery>, res: Response){
    const automobiles = await service.list(req.validatedQuery);
    return res.status(200).json(automobiles);
  }
  async create(req: Request<{}, {}, CreateAutomobileInput>, res: Response) {
    const automobile = await service.create(req.validatedBody);
    return res.status(201).json(automobile);
  }

  async getByPlate(req: Request<{}, {}, GetAutomobilePlateInput>, res: Response){
    const automobile = await service.getByPlate(req.validatedParams);
    return res.status(200).json(automobile)
  }
}
