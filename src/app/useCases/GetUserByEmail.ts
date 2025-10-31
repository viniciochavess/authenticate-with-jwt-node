
import { getUserJson } from "../../utils/get-user-json";

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

interface GetUserByEmailResponse {
  user?: User;
}

export class GetUserByEmailUseCase {
  execute(email: string): GetUserByEmailResponse {
    const userJson: User[] = getUserJson();
    const user = userJson.find((user) => user.email === email);
    return { user };
  }
}
