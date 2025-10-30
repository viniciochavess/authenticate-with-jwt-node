import { createHmac } from "crypto";

const secret = process.env.JWT_SECRET as string;

if (!secret) {
  throw new Error("JWT_SECRET environment variable is not set.");
}

interface IResponsePayload {
    verifyJwt:boolean;
    payload?: Record<string, unknown>;
}


export function verifyJwt(token: string): IResponsePayload {
  const [headerBase64, payloadBase64, signature] = token.split(".");

  const header = JSON.parse(
    Buffer.from(headerBase64, "base64url").toString("utf-8")
  );
  const payload = JSON.parse(
    Buffer.from(payloadBase64, "base64url").toString("utf-8")
  );
  const exp = payload.exp as number;

  if (!header || !payload || !signature) {
    throw new Error("Invalid JWT structure");
  }

  if (Date.now() >= exp * 1000) {
    throw new Error("JWT has expired");
  }

  const validSignature = createHmac("sha256", secret)
    .update(`${headerBase64}.${payloadBase64}`)
    .digest("base64url");

  if (signature !== validSignature) {
    throw new Error("Invalid JWT signature");
  }

  return { verifyJwt: true, payload };
}
