
import { getUserJson } from "../../utils/get-user-json";
export function getUserByEmailUseCase(email: string): any {
  const users = getUserJson();
  return users.find((user: { email: string }) => user.email === email);
}
