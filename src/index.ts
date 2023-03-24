import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";

import { startMetricsServer } from "./helpers/timer";

const port = config.get<number>("port");

const app = createServer();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Vending-Machine-API - AN API for MVPMatch Assessment",
  });
});

app.listen(port, async () => {
  logger.info(`REST API on http://localhost:${port}`);
  await connect();
  startMetricsServer();
});
