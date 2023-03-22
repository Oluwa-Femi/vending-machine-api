import { Response, Request } from "express";
import { createUser, findUser, findAndUpdateUser } from "./service";
import { CreateUserInput, UserDepositInput } from "./schema";
import { omit } from "lodash";
import handleResponse from "../../helpers/response";
import { Messages } from "../../helpers/types/enum";
import logger from "../../utils/logger"
export async function createUserController(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    const _ = omit(user, ["password", "_id", "__v"]);
    return res.send(_);
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

export async function getUserController(_: Request, res: Response) {
  const userId = res.locals.user._id;
  const user = await findUser({ _id: userId });
  return res.send(omit({ ...user }, ["password", "_id", "__v"]));
}

export async function depositController(
  req: Request<{}, {}, UserDepositInput["body"]>,
  res: Response
) {
  try {
    const user: any = await findUser({ _id: res.locals.user._id });
    const newDeposit: any = req.body.depositAmount + user.deposit;
    const updatedUser = await findAndUpdateUser(
      { _id: user._id },
      { deposit: newDeposit },
      {
        new: true,
      }
    );
    const _ = omit(updatedUser?.toJSON(), ["password", "_id", "__v"]);
    return res.send({ ..._, message: "Deposit successful" });
  } catch (e: any) {
    logger.error(e);
    return handleResponse(
        req,
        res,
        { status: "error", message: Messages.GENERIC },
        400
      );
  }
}

export async function resetDepositController(_: Request, res: Response) {
  const userId = res.locals.user._id;
  const updatedUser = await findAndUpdateUser(
    { userId },
    { deposit: 0 },
    {
      new: true,
    }
  );
  return res.send(updatedUser);
}
