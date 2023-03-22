import jwt from "jsonwebtoken";
import config from "config";

export function signToken(
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyToken(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) {
  const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii"
  );

  try {
    const tokenVerified = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      tokenVerified,
    };
  } catch (e: any) {
    console.error(JSON.stringify(e));
    return {
      valid: false,
      expired: e.message === "jwt expired",
      tokenVerified: null,
    };
  }
}
