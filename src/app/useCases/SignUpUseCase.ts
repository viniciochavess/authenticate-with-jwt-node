import { uuidv7 } from "uuidv7";
import { readUserJson } from "../../utils/read-user-json";
import { hashSync } from "bcryptjs";
import fs from "fs";
import { saveUserJson } from "../../utils/save-user-json";
import { UserAlreadyExistsError } from "../err/User-Already-exist-err";
import { GetUserByEmailUseCase } from "./GetUserByEmail";

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
  constructor(readonly userService: GetUserByEmailUseCase) {}
  execute(data: IRequest): IResponse {
    const { email, name, password } = data;

    const userJson: User[] = readUserJson();
    const { user: userAlwaysExists } = this.userService.execute(email);
    const passwordHash = hashSync(password, 8);
    const user = {
      id: uuidv7(),
      email,
      name,
      password: passwordHash,
    };
    if (userAlwaysExists) {
      throw new UserAlreadyExistsError();
    }
    userJson.push(user);

    saveUserJson(userJson);

    return { user };
  }
}
