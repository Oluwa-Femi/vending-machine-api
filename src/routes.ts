import express from "express";
import { userRoutes, sessionRoutes } from "./resources/"

const app = express();

app.use("/users", userRoutes);
app.use("/sessions", sessionRoutes);

export default app;
