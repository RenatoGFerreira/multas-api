import express from "express";
import helmet from "helmet";
import cors from "cors";
import infractionsRoutes from "./modules/infractions/infractions.routes";
import automobilesRoutes from "./modules/automobiles/automobiles.routes";
import { errorHandler } from "./shared/errors/error.handler";

export const app = express();

app.use(helmet()); 
app.use(cors());

app.use(express.json());
app.use("/api", infractionsRoutes);
app.use("/api/automobiles", automobilesRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route was not found my friend!!!" });
});



app.use(errorHandler);