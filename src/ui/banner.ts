import { ASCII } from "../constants";
import type { Banner as BannerType } from "../types/banner";
import chalk from "chalk";
import { stdout } from "process";

export class Banner {
  private position: BannerType["position"];
  private meta?: BannerType["meta"];
  private currentInterval: NodeJS.Timeout | undefined;

  constructor(position: BannerType["position"], meta?: BannerType["meta"]) {
    this.position = position;
    this.meta = meta;
    this.render();
  }

  private clearInterval(): void {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = undefined;
    }
  }

  private renderMeta(banner: string): string {
    if (!this.meta) return banner;

    const columns = stdout.columns ?? 80;
    const version = this.meta.version ? `v${this.meta.version}` : "";
    const description = this.meta.description ?? "";
    const metaText = [version, description].filter(Boolean).join(" - ");

    if (!metaText) return banner;

    const padding = " ".repeat(Math.floor((columns - metaText.length) / 2));

    const special = "Atlantis";
    let styled: string;

    if (description.includes(special)) {
      const parts = metaText.split(new RegExp(`(${special})`, "g"));
      styled = parts
        .map((part) =>
          part === special
            ? chalk.cyanBright(part) // Lighter purple for special text
            : chalk.dim(part)
        )
        .join("");
    } else {
      styled = chalk.dim(metaText);
    }

    return `${banner}\n${padding}${styled}`;
  }

  public render(): BannerType {
    this.clearInterval();

    const asciiLines = ASCII.split("\n");
    const columns = stdout.columns || 80;
    const rows = stdout.rows || 24;

    const metaLines = this.meta ? 2 : 0;
    const bannerWidth = asciiLines[1].length;

    const horizontalPadding =
      this.position.x === "left"
        ? ""
        : this.position.x === "right"
        ? " ".repeat(columns - bannerWidth)
        : " ".repeat(Math.floor((columns - bannerWidth) / 2));

    const topPadding = this.position.y === "top" ? "\n".repeat(2) : "";

    const verticalPadding =
      this.position.y === "top"
        ? topPadding
        : this.position.y === "bottom"
        ? "\n".repeat(rows - asciiLines.length - metaLines - 1)
        : "\n".repeat(Math.floor((rows - asciiLines.length - metaLines) / 2));

    // Smoother purple color palette
    const greenColors = [
      "#C8E6C9", // Very light mint green
      "#A5D6A7", // Light green
      "#81C784", // Medium green
      "#4CAF50", // Spotify-like green
      "#388E3C", // Rich green
      "#2E7D32", // Deep dark green
    ];

    const banner = asciiLines
      .map((line, index) => {
        // Calculate color index based on line position for a gradient effect
        const colorIndex = Math.floor(
          (index / asciiLines.length) * greenColors.length
        );
        return (
          horizontalPadding +
          chalk.bold(chalk.hex(greenColors[colorIndex])(line))
        );
      })
      .join("\n");

    console.clear();
    console.log(verticalPadding + this.renderMeta(banner));

    return { position: this.position };
  }

  public setPosition(position: BannerType["position"]): Banner {
    this.position = position;
    this.render();
    return this;
  }

  public setMeta(meta: BannerType["meta"]): Banner {
    this.meta = meta;
    this.render();
    return this;
  }
}
