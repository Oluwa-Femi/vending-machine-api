import { Router } from "express";
import {
  createUserController,
  getUserController,
  resetDepositController,
  depositController,
} from "./controller";
import appValidator from "../../helpers/appValidator";
import { userValidator, UserDepositSchema } from "./schema";
import { isUser, isBuyer } from "./middleware";
import { deleteAllSessionController } from "../sessions/controller";

const router = Router();

router.post("/create", appValidator(userValidator), createUserController);
router.get("/profile", isUser, getUserController);
router.post(
  "/deposit",
  [appValidator(UserDepositSchema), isUser],
  depositController
);
router.get("/reset-deposit", isBuyer, resetDepositController);
router.get("/logout/all", isUser, deleteAllSessionController);

export default router;
