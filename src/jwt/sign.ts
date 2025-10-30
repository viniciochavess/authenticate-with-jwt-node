import { generateJwt } from "./generateJwt";

interface IPayload {
  payload: Record<string, any>;
}

export function sign({ payload }: IPayload) {
  const generate = generateJwt({ payload });
  return generate;
}
