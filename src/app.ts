import express from "express";
import infractionsRoutes from "./modules/infractions/infractions.routes";
import automobilesRoutes from "./modules/automobiles/automobiles.routes";
import { errorHandler } from "./shared/errors/error.handler";


export const app = express();

app.use(express.json());
app.use("/api", infractionsRoutes);
app.use("/api/automobiles", automobilesRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);
