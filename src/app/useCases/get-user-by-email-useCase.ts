import fs from "fs";
import { getUserJson } from "../../utils/get-user-json";
export function getUserByEmailUseCase(email: string): boolean {
  const users = getUserJson();
  return users.find((user: { email: string }) => user.email === email);
}
