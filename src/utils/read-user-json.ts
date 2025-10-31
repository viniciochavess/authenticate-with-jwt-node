import fs from "fs";
export function readUserJson() {
  return JSON.parse(fs.readFileSync("src/database/users.json", "utf-8"));
}
