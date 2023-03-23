import { Request, Response } from "express";
import { COINVALUES } from "../../services/coins";
import handleResponse from "../../helpers/response";
import { Messages } from "../../helpers/types/enum";
import { bureauDeChange } from "../../services/bureauDeChange";
import {
  BuyProductInput,
  CreateProductInput,
  UpdateProductInput,
} from "./schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "./service";
import { findAndUpdateUser, findUser } from "../users/service";

export async function createProductController(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    const sellerId = res.locals.user._id;
    const body = req.body;
    const product = await createProduct({ ...body, user: sellerId });
    // return res.send(product);
    return handleResponse(
      req,
      res,
      {
        status: "success",
        message: Messages.SUCCESS,
        data: product,
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

export async function updateProductController(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  try {
    const sellerId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;
    const product = await findProduct({ productId });
    if (!product) {
      return handleResponse(
        req,
        res,
        { status: "error", message: Messages.NOTPRODUCT },
        400
      );
    }
    if (String(product.user) !== sellerId) {
      return handleResponse(
        req,
        res,
        { status: "error", message: Messages.NOTSELLER },
        400
      );
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
      new: true,
    });
    // return res.send(updatedProduct);
    return handleResponse(
      req,
      res,
      {
        status: "success",
        message: Messages.SUCCESS,
        data: updatedProduct,
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

export async function getProductController(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  try {
    const productId = req.params.productId;
    const product = await findProduct({ productId });
    if (!product) {
      return handleResponse(
        req,
        res,
        { status: "error", message: Messages.NOTPRODUCT },
        400
      );
    }
    // return res.send(product);
    return handleResponse(
      req,
      res,
      {
        status: "success",
        message: Messages.SUCCESS,
        data: product,
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

export async function deleteProductController(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  try {
    const sellerId = res.locals.user._id;
    const productId = req.params.productId;
    const product = await findProduct({ productId });
    if (!product) {
      return handleResponse(
        req,
        res,
        { status: "error", message: Messages.NOTPRODUCT },
        400
      );
    }
    if (String(product.user) !== sellerId) {
      return handleResponse(
        req,
        res,
        { status: "error", message: Messages.NOTSELLER },
        400
      );
    }
    await deleteProduct({ productId });

    // return res.send(Messages.SUCCESS);
    return handleResponse(
      req,
      res,
      {
        status: "success",
        message: Messages.SUCCESS,
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

export async function buyProductController(
  req: Request<BuyProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const user = await findUser({ _id: userId });
  if (user) {
    const productId = req.params.productId;
    const product = await findProduct({ productId });
    if (!product) {
      return handleResponse(
        req,
        res,
        { status: "error", message: Messages.NOTPRODUCT },
        400
      );
    }
    if (user.deposit == 0) {
      return handleResponse(
        req,
        res,
        { status: "error", message: Messages.WALLETNOTFUNDED },
        400
      );
    }
    if (product.amountAvailable == 0) {
      return handleResponse(
        req,
        res,
        { status: "error", message: Messages.NOTPRODUCT },
        400
      );
    }
    if (!(product.amountAvailable >= req.body?.amountOfProduct)) {
      return handleResponse(
        req,
        res,
        { status: "error", message: Messages.NOTPRODUCT },
        400
      );
    }
    const totalCost: any = product.cost * req.body?.amountOfProduct;
    if (!(user.deposit >= totalCost)) {
      return handleResponse(
        req,
        res,
        { status: "error", message: Messages.INSUFFICIENT },
        400
      );
    }
    const userDep: any = user.deposit;
    const balRemaining: any =
      user.deposit != undefined ? userDep - totalCost : 0;

    await findAndUpdateUser(
      { _id: userId },
      { deposit: 0 },
      {
        new: false,
      }
    );
    const amountAvail: any =
      product.amountAvailable - req.body?.amountOfProduct;
    await findAndUpdateProduct(
      { productId },
      { amountAvailable: amountAvail },
      {
        new: true,
      }
    );

    const data = {
      totalSpent: totalCost,
      change: bureauDeChange(balRemaining, COINVALUES),
    };
    return handleResponse(
      req,
      res,
      {
        status: "success",
        message: Messages.SUCCESS,
        data: data,
      },
      200
    );
  }
}
