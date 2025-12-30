import { Router } from "express";
import { AutomobileController } from "./automobiles.controller";
import { validateBody } from "../../shared/middleware/validate";
import { createAutomobileSchema } from "./automobiles.schema";

const router = Router();
const controller = new AutomobileController();

router.post("/", validateBody(createAutomobileSchema), controller.create);

export default router;
