import { Router } from "express";
import { InfractionController } from "./infractions.controller";
import { validateQuery } from "../../shared/middleware/validate";
import { listInfractionQuerySchema } from "./dto/list-infraction.dto";

const routes = Router();
const controller = new InfractionController();

routes.get("/infraction-types", validateQuery(listInfractionQuerySchema), controller.list);

export default routes;