import { Router } from "express";
import { AutomobileController } from "./automobiles.controller";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../../shared/middleware/validate";
import {
  createAutomobileSchema,
  listAutomobileQuerySchema,
  getAutomobilePlateSchema,
} from "./automobiles.schema";

const routes = Router();
const controller = new AutomobileController();

routes.post("/", validateBody(createAutomobileSchema), controller.create);
routes.get("/", validateQuery(listAutomobileQuerySchema), controller.list);
routes.get(
  "/:plate",
  validateParams(getAutomobilePlateSchema),
  controller.getByPlate
);
export default routes;
