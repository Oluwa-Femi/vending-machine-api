import { Request, Response } from "express";
import { createSession, findSessions, updateSession } from "./service";
import { validatePassword } from "../users/service";
import { signToken } from "../../utils/jwt";
import handleResponse from "../../helpers/response";
import { Messages } from "../../helpers/types/enum";
import dotenv from "dotenv";

dotenv.config();

const ATL = process.env.accessTokenTtl;
const RTL = process.env.refreshTokenTtl;

export async function createSessionController(req: Request, res: Response) {
  try {
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
        // return handleResponse(
        //     req,
        //     res,
        //     { status: "error", message: Messages.DUPLICATEDSESSION },
        //     400
        //   );
      warnSession = { note: Messages.DUPLICATEDSESSION };
    }
    const session = await createSession(user._id, req.get("user-agent") || "");
    const accessToken = signToken(
      { ...user, session: session._id },
      "accessTokenPrivateKey",
      { expiresIn: ATL }
    );
    const refreshToken = signToken(
      { ...user, session: session._id },
      "refreshTokenPrivateKey",
      { expiresIn: RTL }
    );
    return handleResponse(
      req,
      res,
      {
        status: "success",
        message: Messages.SUCCESS,
        data: { ...warnSession, accessToken, refreshToken },
      },
      200
    );
  } catch (error: any) {
    console.log(error);
    return handleResponse(
      req,
      res,
      { status: "error", message: Messages.STATUS400 },
      400
    );
  }
}

export async function getSessionController(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;
    const sessions = await findSessions({ user: userId, valid: true });
    return handleResponse(
      req,
      res,
      {
        status: "success",
        message: Messages.SUCCESS,
        data: sessions,
      },
      200
    );
  } catch (error: any) {
    console.log(error);
    return handleResponse(
      req,
      res,
      { status: "error", message: Messages.STATUS400 },
      400
    );
  }
}

export async function deleteSessionController(req: Request, res: Response) {
  try {
    const sessionId = res.locals.user.session;
    await updateSession({ _id: sessionId }, { valid: false });
    return handleResponse(
      req,
      res,
      {
        status: "success",
        message: Messages.SUCCESS,
        data: {
          accessToken: null,
          refreshToken: null,
        },
      },
      200
    );
  } catch (error: any) {
    console.log(error);
    return handleResponse(
      req,
      res,
      { status: "error", message: Messages.STATUS400 },
      400
    );
  }
}

export async function deleteAllSessionController(req: Request, res: Response) {
  try {
    const sessions = await findSessions({
      user: res.locals.user._id,
      valid: true,
    });
    sessions.map(async (session) => {
      await updateSession({ _id: session._id }, { valid: false });
    });
    //   res.send(Messages.LOGGEDOUT);
    return handleResponse(
      req,
      res,
      {
        status: "success",
        message: Messages.LOGGEDOUT,
      },
      200
    );
  } catch (error: any) {
    console.log(error);
    return handleResponse(
      req,
      res,
      { status: "error", message: Messages.STATUS400 },
      400
    );
  }
}
