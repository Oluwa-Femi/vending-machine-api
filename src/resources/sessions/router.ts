import { Router, Request, Response } from "express";
import { createSessionController, getSessionController, deleteSessionController } from "./controller";
import appValidator from "../../helpers/appValidator";
import { sessionValidator } from "./schema";
import { isUser } from "../users/middleware";

const router = Router();

router.get("/healthcheck", (req:Request, res:Response) => res.sendStatus(200));
router.post(
    "/sessions",
    [appValidator(sessionValidator)],
    createSessionController
  );
  router.get("/sessions", isUser, getSessionController);
  router.delete("/sessions", isUser, deleteSessionController);

export default router;
