import { Router } from "express";
import appValidator from "../../helpers/appValidator";
import { isUser, isSeller, isBuyer } from "../users/middleware";
import {
  createProductController,
  buyProductController,
  deleteProductController,
  getProductController,
  updateProductController,
} from "./controller";
import {
  buyProductSchema,
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema";

const router = Router();

router.post(
  "/api/products",
  [isUser, appValidator(createProductSchema), isSeller],
  createProductController
);

router.put(
  "/api/products/:productId",
  [isUser, appValidator(updateProductSchema)],
  updateProductController
);

router.get(
  "/api/products/:productId",
  appValidator(getProductSchema),
  getProductController
);

router.delete(
  "/api/products/:productId",
  [isUser, appValidator(deleteProductSchema)],
  deleteProductController
);

router.post(
  "/api/products/:productId/buy",
  [isUser, appValidator(buyProductSchema), isBuyer],
  buyProductController
);

export default router;
