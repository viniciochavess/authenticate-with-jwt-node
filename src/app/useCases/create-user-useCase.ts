import { hashSync } from "bcryptjs";
import fs from "fs";
import { uuidv7 } from "uuidv7";
import { getUserByEmailUseCase } from "./get-user-by-email-useCase";
import { get } from "http";
import { getUserJson } from "../../utils/get-user-json";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export async function createUserUseCase(data: CreateUserDTO) {
  const getDatabaseUserJson = getUserJson();

  const userExists = getUserByEmailUseCase(data.email);
  if (userExists) {
    throw new Error("User already exists");
  }

  const passwordHash = hashSync(data.password, 10);

  const newUser = {
    id: uuidv7(),
    name: data.name,
    email: data.email,
    password: passwordHash,
  };
  getDatabaseUserJson.push(newUser);
  fs.writeFileSync(
    "src/database/users.json",
    JSON.stringify(getDatabaseUserJson, null, 2)
  );
  return newUser;
}
