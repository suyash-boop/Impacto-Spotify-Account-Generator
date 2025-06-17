import * as fs from "fs";
import * as path from "path"

export default function nameGenerator(){
    const filePath = path.resolve(process.cwd() + "/src/data/firstNames.txt")
    const content = fs.readFileSync(filePath, "utf-8")
    const names = content.split("\n").map(name => name.trim()).filter(Boolean);
    const randomIndex = Math.floor(Math.random() * names.length);

    return names[randomIndex]
}