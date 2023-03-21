import { object, string, TypeOf, z, number } from "zod";

export const createUserSchema = object({
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

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;