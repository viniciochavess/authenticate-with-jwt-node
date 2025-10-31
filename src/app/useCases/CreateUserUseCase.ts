import { uuidv7 } from "uuidv7";
import { getUserJson } from "../../utils/get-user-json";

interface CreateUserDTO {
  email: string;
  name: string;
  password: string;
}
interface CreateUserResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export class CreateUserUseCase {
  execute(data: CreateUserDTO): CreateUserResponse {
    const userJson = getUserJson();
    const user = {
      id: uuidv7(),
      email: data.email,
      name: data.name,
      password: data.password,
    };
    userJson.push({
      id: user.id,
      name: data.name,
      email: data.email,
      password: data.password,
    });
    return { user };
  }
}
