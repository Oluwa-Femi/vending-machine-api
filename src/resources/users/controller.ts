import { Response, Request } from "express";
import { createUser, findUser } from "./service";
import { CreateUserInput } from "./schema";
import { omit } from "lodash";
import handleResponse from "../../helpers/response";
import { Messages } from "../../helpers/types/enum";

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
  ) {
    try {
      const user = await createUser(req.body);
      const _ = omit(user, ["password", "_id", "__v"]);
      return res.send(_);
  }catch (error: any) {
    console.log(error);
    return handleResponse(
      req,
      res,
      { status: "error", message: Messages.STATUS400 },
      400
    );
  }
}

  export async function getUserHandler(
    _: Request,
    res: Response
  ) {
    const userId = res.locals.user._id;
    const user = await findUser({ _id: userId });
    return res.send(omit({ ...user }, ["password", "_id", "__v"]));
  }