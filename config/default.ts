import { config } from "dotenv";

config();

export default {
  port: process.env.PORT,
  dbUri: process.env.DB_URL,
  passwordSalt: process.env.BCRYPTWORKFACTOR
};