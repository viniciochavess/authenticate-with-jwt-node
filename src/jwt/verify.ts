import { createHmac } from "crypto";
import { InvalidTokenJwtError } from "../app/err/Invalid-token-jwt-err";
import { error } from "console";

const secret = process.env.JWT_SECRET as string;

if (!secret) {
  throw new Error("JWT_SECRET environment variable is not set.");
}

interface IResponsePayload {
  verifyJwt: boolean;
  payload?: Record<string, unknown>;
}

export function verifyJwt(token: string): IResponsePayload {
  try {
    const [headerBase64, payloadBase64, signature] = token.split(".");

    const header = JSON.parse(
      Buffer.from(headerBase64, "base64url").toString("utf-8")
    );
    const payload = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf-8")
    );
    const exp = payload.exp as number;

    if (!header || !payload || !signature) {
      return { verifyJwt: false };
    }

    if (Date.now() >= exp * 1000) {
      return { verifyJwt: false };
    }

    const validSignature = createHmac("sha256", secret)
      .update(`${headerBase64}.${payloadBase64}`)
      .digest("base64url");

    if (signature !== validSignature) {
      return { verifyJwt: false };
    }

    if (signature === validSignature) {
      return { verifyJwt: true, payload };
    }
    return { verifyJwt: false };
  } catch (error) {
    return { verifyJwt: false };
  }
}
