import fs from "fs";
interface user {
  id: string;
  email: string;
  name: string;
  password: string;
}

export function saveUserJson(data: user[]) {
  fs.writeFileSync("src/database/users.json", JSON.stringify(data, null, 2));
}
