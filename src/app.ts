import express from "express";
import infractionsRoutes from "./modules/infractions/infractions.routes";

export const app = express();

app.use(express.json());
app.use("/api", infractionsRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});
