import { Request, Response } from "express";
import dotenv from "dotenv";
import logger from "../utils/logger";

dotenv.config();

const handleResponse = async (
  req: Request,
  res: Response,
  payload: any,
  statusCode: number
) => {
  const ipAddress =
    req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  let responseDataAsString = JSON.stringify(payload);
  logger.info(
    `${statusCode} - ${req.method} - ${ipAddress}- ${req.originalUrl} - ${
       responseDataAsString
    }`
  );

  return res.status(statusCode).send({
    data: payload,
  });
};

export default handleResponse;
