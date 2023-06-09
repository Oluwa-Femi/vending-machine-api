import { object, string, TypeOf, z, number } from "zod";
import { COINVALUES } from "../../services/coins";

export const userValidator = object({
  body: object({
    username: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
    role: z.enum(["buyer", "seller"]),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

// Validate Deposit input against coin values
export const UserDepositSchema = object({
  body: object({
    depositAmount: number().int().gte(0).lte(100),
  }).superRefine((val, ctx) => {
    if (COINVALUES.indexOf(val.depositAmount) === -1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Deposit amount must be in multiples of ${COINVALUES.toString()}`,
      });
    }
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof userValidator>,
  "body.passwordConfirmation"
>;

export type UserDepositInput = TypeOf<typeof UserDepositSchema>;
