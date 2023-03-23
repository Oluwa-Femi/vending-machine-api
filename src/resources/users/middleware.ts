import { Request, Response, NextFunction } from "express";
import handleResponse from "../../helpers/response";
import { Messages } from "../../helpers/types/enum";

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  console.log("whereeeeeeveeerrrrr")
  const user = res.locals.user;
  console.log(user, "useeerrrrrrr")
  if (!user) {
    return handleResponse(
      req,
      res,
      { status: "error", message: Messages.NOTUSER },
      400
    );
  }
  return next();
};

export const isBuyer = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    return handleResponse(
      req,
      res,
      { status: "error", message: Messages.SESSIONEXPIRED },
      400
    );
  } else if (user.role !== "buyer") {
    return handleResponse(
      req,
      res,
      { status: "error", message: Messages.NOTBUYER },
      400
    );
  }
  return next();
};

export const isSeller = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    return handleResponse(
      req,
      res,
      { status: "error", message: Messages.SESSIONEXPIRED },
      400
    );
  } else if (user.role !== "seller") {
    return handleResponse(
      req,
      res,
      { status: "error", message: Messages.NOTSELLER },
      400
    );
  }
  return next();
};
