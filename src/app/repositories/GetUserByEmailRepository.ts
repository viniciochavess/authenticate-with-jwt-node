
import { readUserJson } from "../../utils/read-user-json";

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

interface GetUserByEmailResponse {
  user?: User;
}

export class GetUserByEmailRepository {
  execute(email: string): GetUserByEmailResponse {
    const userJson: User[] = readUserJson();
    const user = userJson.find((user) => user.email === email);
    return { user };
  }
}
