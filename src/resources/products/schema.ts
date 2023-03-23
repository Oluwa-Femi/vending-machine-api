import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    productName: string({
      required_error: "Product Name is required",
    }),
    cost: number({
      required_error: "Cost is required",
    }),
    amountAvailable: number({
      required_error: "Amount available is required",
    }),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "productId is required",
    }),
  }),
};

const ext_params = {
  body: object({
    amountOfProduct: number({
      required_error: "Amount of product is required",
    }).gt(0),
  }),
};
export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export const buyProductSchema = object({
  ...params,
  ...ext_params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
export type BuyProductInput = TypeOf<typeof buyProductSchema>;
