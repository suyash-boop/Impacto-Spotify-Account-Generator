// this function will find total lines of accounts avaialable in spotify.txt

import path from "path";
import fs from "fs/promises";

export async function totalLines() {
    const filepath = path.resolve(process.cwd(), "src/data/accounts/spotify.txt");
    
    try {
        const data = await fs.readFile(filepath, 'utf-8');
        const lines = data.split('\n').filter(line => line.trim() !== '');
        return lines.length;
    } catch (error) {
        console.error("Error reading file:", error);
        return 0;
    }
}