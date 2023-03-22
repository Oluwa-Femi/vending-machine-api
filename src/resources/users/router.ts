import { Router, Request, Response } from "express";
import { createUserController, getUserController, resetDepositController, depositController } from "./controller";
import appValidator from "../../helpers/appValidator";
import { userValidator, UserDepositSchema } from "./schema";
import { isUser, isBuyer } from "./middleware";
import { deleteAllSessionController } from "../sessions/controller";

const router = Router();

router.get("/healthcheck", (req:Request, res:Response) => res.sendStatus(200));
router.post("/users", appValidator(userValidator), createUserController);
router.get("/users/profile", isUser, getUserController);
router.post("/users/deposit", [appValidator(UserDepositSchema), isUser], depositController);
router.get("/users/reset-deposit", isBuyer, resetDepositController);

router.get("/users/logout/all", isUser, deleteAllSessionController)
export default router;
