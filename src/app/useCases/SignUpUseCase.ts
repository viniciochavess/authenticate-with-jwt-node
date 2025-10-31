import { uuidv7 } from "uuidv7";
import { readUserJson } from "../../utils/read-user-json";
import { hashSync } from "bcryptjs";
import fs from "fs";
import { saveUserJson } from "../../utils/save-user-json";

interface IRequest {
  email: string;
  name: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export class SignUpUseCase {
  execute(data: IRequest): IResponse {
    const { email, name, password } = data;

    const userJson: User[] = readUserJson();
    const userAlwaysExists = userJson.find((user) => user.email === email);
    const passwordHash = hashSync(password, 8);
    const user = {
      id: uuidv7(),
      email,
      name,
      password: passwordHash,
    };
    if (userAlwaysExists) {
      throw new Error("User already exists");
    }
    userJson.push(user);

    saveUserJson(userJson);

    return { user };
  }
}
