import { Router } from "express";
import appValidator from "../../helpers/appValidator";
import { isUser, isSeller, isBuyer } from "../users/middleware";
import {
  createProductController,
  buyProductController,
  deleteProductController,
  getProductController,
  updateProductController,
  getAllProductsController
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
  "/create",
  [isUser, appValidator(createProductSchema), isSeller],
  createProductController
);

router.put(
  "/:productId",
  [isUser, appValidator(updateProductSchema)],
  updateProductController
);

router.get(
  "/all",
  getAllProductsController
);


router.get(
  "/:productId",
  appValidator(getProductSchema),
  getProductController
);

router.delete(
  "/:productId",
  [isUser, appValidator(deleteProductSchema)],
  deleteProductController
);

router.post(
  "/:productId/buy",
  [isUser, appValidator(buyProductSchema), isBuyer],
  buyProductController
);

export default router;
