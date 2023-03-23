import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

const numRound = config.get<number>("passwordSalt");

export interface UserInput {
  username: string;
  role: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  deposit: Number;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(clientPassword: string): Promise<Boolean>;
}

// Define User types and user payload
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    deposit: { type: Number, required: false, default: 0 },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as unknown as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(Number(numRound));
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

//Password confirmation
userSchema.methods.comparePassword = async function (
  clientPassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(clientPassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
