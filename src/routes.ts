import express from "express";
import { userRoutes } from "./resources/"

const app = express();

app.use("/users", userRoutes);
// app.use("/products", ProductRoutes);

export default app;
