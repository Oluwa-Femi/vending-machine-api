import express from "express";
import client from "prom-client";
import log from "../utils/logger";

import dotenv from "dotenv"

dotenv.config();

const metricPort = process.env.metricPort

const app = express();

export const restResponseTime = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API response time in seconds",
  labelNames: ["method", "route", "status_code"],
});

export const dbResponseTime = new client.Histogram({
  name: "db_response_time_duration_seconds",
  help: "Database response time in seconds",
  labelNames: ["operation", "success"],
});

export function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);

    return res.send(await client.register.metrics());
  });

  app.listen(metricPort, () => {
    log.info(`Metrics server started at http://localhost:${metricPort}`);
  });
}
