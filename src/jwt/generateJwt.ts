import { createHmac } from "node:crypto";

interface GenerateJwtOptions {
    payload : Record<string, unknown>
}

const secret = process.env.JWT_SECRET as string;

if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set.");
}

export function generateJwt(options: GenerateJwtOptions) {
    const header = {
        alg: "HS256",
        typ: "JWT"
    };

    const exp = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hour expiration
    const iat = Math.floor(Date.now() / 1000);
    options.payload = { ...options.payload, exp, iat };

    const headerBase64 = Buffer.from(JSON.stringify(header)).toString("base64url");
    const payloadBase64 = Buffer.from(JSON.stringify(options.payload)).toString("base64url");

    const signature = createHmac("sha256", secret)
        .update(`${headerBase64}.${payloadBase64}`)
        .digest("base64url");

    return `${headerBase64}.${payloadBase64}.${signature}`;
}