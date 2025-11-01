import { uuidv7 } from "uuidv7";
import { readUserJson } from "../../utils/read-user-json";
import { saveUserJson } from "../../utils/save-user-json";

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

export class CreateUserRepository {
  execute({email,name,password}: CreateUserDTO): CreateUserResponse {
    const userJson = readUserJson();
    const user = {
      id: uuidv7(),
      email,
      name,
      password: password,
    };
    userJson.push({
      id: user.id,
      name,
      email,
      password,
    });
    saveUserJson(userJson);
    return { user };
  }
}
