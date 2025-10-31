import { compareSync } from "bcryptjs";
import { getUserByEmailUseCase } from "./get-user-by-email-useCase";
import { sign } from "../../jwt/sign";

interface SignUpData {
  email: string;
  password: string;
}

export function signUp(data: SignUpData) {
  const userAlwaysExists = getUserByEmailUseCase(data.email);

  if (!userAlwaysExists) {
    throw new Error("User does not exist");
  }

  const passwordIsMatched = compareSync(
    data.password,
    userAlwaysExists.password
  );

  if (!passwordIsMatched) {
    throw new Error("Invalid password");
  }

  const jwt = sign({ payload: { id: userAlwaysExists.id } });

  return {
    user: {
      id: userAlwaysExists.id,
      email: userAlwaysExists.email,
    },
    token: jwt,
  };
}
