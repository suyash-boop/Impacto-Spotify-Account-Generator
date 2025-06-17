import chalk from "chalk";
import * as fs from "fs";
import * as path from "path"
import { promisify } from "util";

export async function saveSpotifyAccount(email: string, password: string, emailPassword: string) {
  const filePath = path.resolve(
    process.cwd() + "/src/data/accounts/spotify.txt"
  );
  
  const data = `\n${email}:${password}:${emailPassword}`;
  const appendFileAsync = promisify(fs.appendFile);

  try {
    await appendFileAsync(filePath, data, "utf-8")
    console.log(chalk.green("Account saved!"))
  } catch (error) {
    console.log("error saving file")
  }
}
