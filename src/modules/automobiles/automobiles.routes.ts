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
  getAutomobileIdSchema,
  deactivateAutomobileSchema
} from "./automobiles.schema";

const routes = Router();
const controller = new AutomobileController();

routes.get("/", validateQuery(listAutomobileQuerySchema), controller.list);
routes.get("/:id", validateParams(getAutomobileIdSchema), controller.getById)
routes.get(
  "/by-plate/:plate",
  validateParams(getAutomobilePlateSchema),
  controller.getByPlate
);
routes.post("/", validateBody(createAutomobileSchema), controller.create);
routes.patch(
  "/:id",
  validateParams(deactivateAutomobileSchema),
  controller.deactivate
);

export default routes;
