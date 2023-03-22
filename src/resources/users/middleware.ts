import { Request, Response, NextFunction } from "express";
import handleResponse from "../../helpers/response";
import { Messages } from "../../helpers/types/enum";

const isUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return handleResponse(
        req,
        res,
        { status: "error", message: Messages.SESSIONEXPIRED },
        400
      );
  }

  return next();
};

export default isUser;