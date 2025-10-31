import fs from "fs";
export function getUserJson() {
  return JSON.parse(fs.readFileSync("src/database/users.json", "utf-8"));
}
