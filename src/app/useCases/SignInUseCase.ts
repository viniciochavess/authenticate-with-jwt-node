import { compareSync } from "bcryptjs";
import { sign } from "../../jwt/sign";
import { readUserJson } from "../../utils/read-user-json";
import { InvalidCredentialsError } from "../err/Invalid-credentials-err";

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
interface IResponse {
  token: string;
  user: {
    id: string;
  };
}

export class SignInUseCase {
  execute({ email, password }: SignUpData) {
    const userJson: User[] = readUserJson();
    const userAlwaysExists = userJson.find((user) => user.email === email);

    if (!userAlwaysExists) {
      throw new InvalidCredentialsError();
    }

      const passwordMatch = compareSync(password, userAlwaysExists.password);

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
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
