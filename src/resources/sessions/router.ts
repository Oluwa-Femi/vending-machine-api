import { Router, Request, Response } from "express";
import {
  createSessionController,
  getSessionController,
  deleteSessionController,
} from "./controller";
import appValidator from "../../helpers/appValidator";
import { sessionValidator } from "./schema";
import { isUser } from "../users/middleware";

const router = Router();

router.post(
  "/",
  [appValidator(sessionValidator)],
  createSessionController
);
router.get("/", isUser, getSessionController);
router.delete("/", isUser, deleteSessionController);

export default router;
