import { Router, Request, Response } from "express";

const router = Router();

router.get("/healthcheck", (req:Request, res:Response) => res.sendStatus(200));


export default router;
