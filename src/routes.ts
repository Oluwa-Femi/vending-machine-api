import express from "express";
import { userRoutes, sessionRoutes, productRoutes } from "./resources/"

const app = express();

app.use("/users", userRoutes);
app.use("/sessions", sessionRoutes);
app.use("/products", productRoutes);

export default app;
