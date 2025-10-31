import { compareSync } from "bcryptjs";

import { sign } from "../../jwt/sign";
import { getUserJson } from "../../utils/get-user-json";

interface SignUpData {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export class SignUpUseCase {
  execute(data: SignUpData) {
    const { email, password } = data;
    const userJson: User[] = getUserJson();
    const userAlwaysExists = userJson.find((user) => user.email === email);

    if (!userAlwaysExists) {
      throw new Error("Email or password incorrect");
    }

    const passwordMatch = compareSync(password, userAlwaysExists.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

    const token = sign({ payload: { id: userAlwaysExists.id } });

    return {
      token,
      user: {
        id: userAlwaysExists.id,
      },
    };

  }
}
