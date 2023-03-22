import { Router, Request, Response } from "express";
import { createUserController, getUserController } from "./controller";
import appValidator from "../../helpers/appValidator";
import { userValidator } from "./schema";
import isUser from "./middleware";

const router = Router();

router.get("/healthcheck", (req:Request, res:Response) => res.sendStatus(200));
router.post("/users", appValidator(userValidator), createUserController);
router.get("/users/profile", isUser, getUserController);

export default router;
