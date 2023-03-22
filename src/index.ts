import express, { Express, Request, Response } from "express";
import config from "config";
import cors from "cors"
import connect from "./utils/connect";
import logger from "./utils/logger";
import appRoutes from "./routes";
import { startMetricsServer } from "./helpers/timer"

const port = config.get<number>("port");

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to Vending-Machine-API - AN API for MVPMatch Assessment'
    });
  });
app.use("/api", appRoutes);

app.use("*", (_req: Request, res: Response) => {
  res.status(404).send("This route does not exist");
});


app.listen(port, async () => {
  logger.info(`REST API on http://localhost:${port}`);
  await connect();
  startMetricsServer();
});
