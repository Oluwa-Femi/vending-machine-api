import { Router, Request, Response } from "express";
import { createUserHandler, getUserHandler } from "./controller";
import appValidator from "../../helpers/appValidator";
import { userValidator } from "./schema";
import isUser from "./middleware";
const router = Router();

router.get("/healthcheck", (req:Request, res:Response) => res.sendStatus(200));
router.post("/users", appValidator(userValidator), createUserHandler);
router.get("/users/profile", isUser, getUserHandler);

export default router;
