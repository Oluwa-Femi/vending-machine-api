import { Request, Response } from "express";
import config from "config";
import {
  createSession,
  findSessions,
  updateSession,
} from "./service";
import { validatePassword } from "../users/service";
import { signToken } from "../../utils/jwt";
import handleResponse from "../../helpers/response";
import { Messages } from "../../helpers/types/enum";

export async function createSessionController(req: Request, res: Response) {
  const user = await validatePassword(req.body);
  if (!user) {
    return handleResponse(
        req,
        res,
        { status: "error", message: Messages.NOTFOUND },
        400
      );
  }
  const sessions = await findSessions({ user: user._id, valid: true });
  let warnSession = {};
  if (sessions.length > 0) {
    warnSession = { note: Messages.DUPLICATEDSESSION };
  }
  const session = await createSession(user._id, req.get("user-agent") || "");
  const accessToken = signToken(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: config.get("accessTokenTtl") }
  );
  const refreshToken = signToken(
    { ...user, session: session._id },
    "refreshTokenPrivateKey",
    { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
  );
  return res.send({ ...warnSession, accessToken, refreshToken });
}

export async function getSessionController(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}

export async function deleteSessionController(req: Request, res: Response) {
  const sessionId = res.locals.user.session;
  await updateSession({ _id: sessionId }, { valid: false });
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

export async function deleteAllSessionController
  (req: Request, res: Response) {
  const sessions = await findSessions({ user: res.locals.user._id, valid: true });
  sessions.map(async (session) => {
    await updateSession({ _id: session._id }, { valid: false });
  });
  res.send(Messages.LOGGEDOUT);
}