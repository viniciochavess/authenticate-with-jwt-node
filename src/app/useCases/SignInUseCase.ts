import { compareSync } from "bcryptjs";

import { sign } from "../../jwt/sign";
import { readUserJson } from "../../utils/read-user-json";
import { error } from "console";

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

export class SignInUseCase {
  execute(data: SignUpData) {
    const { email, password } = data;
    const userJson: User[] = readUserJson();
    const userAlwaysExists = userJson.find((user) => user.email === email);

    if (!userAlwaysExists) {
      throw new Error("User does not exist");
    }

    const passwordMatch = compareSync(password, userAlwaysExists.password);

    if (!passwordMatch) {
      throw new Error("Password incorrect");
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
