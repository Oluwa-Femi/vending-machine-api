import express, { Express, Request, Response } from "express";
import cors from "cors";
import appRoutes from "../routes";
import deserializeUser from "./deserializeUsers";

function createServer() {

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(deserializeUser);

app.use("/api", appRoutes);

app.use("*", (_req: Request, res: Response) => {
  res.status(404).send("This route does not exist");
});

  return app;
}

export default createServer;