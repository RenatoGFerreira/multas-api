import { Request, Response } from "express";
import { AutomobileService } from "./automobiles.service";
import { DeactivateAutomobileInput } from "./automobiles.schema";

const service = new AutomobileService();

export class AutomobileController {

  async list(req: Request, res: Response) {
    const automobiles = await service.list(req.validatedQuery);
    return res.status(200).json(automobiles);
  }

  async create(req: Request, res: Response) {
    const automobile = await service.create(req.validatedBody);
    return res.status(201).json(automobile);
  }

  async getByPlate(req: Request, res: Response) {
    const automobile = await service.getByPlate(req.validatedParams);
    return res.status(200).json(automobile);
  }

  async getById(req: Request, res: Response) {
    const automobile = await service.getById(req.validatedParams);
    return res.status(200).json(automobile);
  }

  async deactivate(
    req: Request<{}, {}, {}, DeactivateAutomobileInput>,
    res: Response
  ) {
    await service.deactivate(req.validatedParams);
    return res.status(204).send();
  }
  
}
