import { uuidv7 } from "uuidv7";
import { readUserJson } from "../../utils/read-user-json";
import { hashSync } from "bcryptjs";
import fs from "fs";
import { saveUserJson } from "../../utils/save-user-json";
import { UserAlreadyExistsError } from "../err/User-Already-exist-err";
import { GetUserByEmailRepository } from "../repositories/GetUserByEmailRepository";
import { CreateUserRepository } from "../repositories/CreateUserRepository";

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
  constructor(
    readonly userServiceGetEmail: GetUserByEmailRepository,
    readonly createUser: CreateUserRepository
  ) {}
  execute(data: IRequest): IResponse {
    const { email, name, password } = data;

    const { user: userAlwaysExists } = this.userServiceGetEmail.execute(email);
    const passwordHash = hashSync(password, 8);

    if (userAlwaysExists) {
      throw new UserAlreadyExistsError();
    }

    const { user } = this.createUser.execute({
      email,
      name,
      password: passwordHash,
    });

    return { user };
  }
}
