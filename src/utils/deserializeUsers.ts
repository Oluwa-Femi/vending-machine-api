import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./jwt";
import { reIssueAccessToken } from "../resources/sessions/service";
import { any } from "zod";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken: any = get(req, "headers.x-refresh");

  if (!accessToken) {
    return next();
  }

  const { tokenVerified, expired } = verifyToken(accessToken, "accessTokenPublicKey");

  if (tokenVerified) {
    res.locals.user = tokenVerified;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }

    const result = verifyToken(newAccessToken as string, "accessTokenPublicKey");

    res.locals.user = result.tokenVerified;
    return next();
  }

  return next();
};

export default deserializeUser;
