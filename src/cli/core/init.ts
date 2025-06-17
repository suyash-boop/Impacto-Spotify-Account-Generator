import { META } from "../../constants";
import { Banner } from "../../ui/banner";
// import { machineIdSync } from "node-machine-id";
// import os from "os";;
import { handleError } from "../../handler/error";
import { setupConfig } from "../application/setup";

export class Zyphra {
  private static setTerminalSize() {
    if (process.stdout.isTTY) {
      try {
        process.stdout.write("\x1b[8;50;170t");
      } catch (error) {}
    }
  }

  public static async xyz() {
    this.setTerminalSize();

    new Banner({ x: "center", y: "top" }).setMeta(META)
    // const machineId = machineIdSync();
    // const osInfo = `${os.platform()} ${os.release()}`;
    
    try {
      setupConfig()
    } catch (error) {
      await handleError(error as Error, () => this.xyz());
    }
  }
}
