import chalk from "chalk";
import { META, SPOTIFY_BASE_URL } from "../../../../constants";
import { Banner } from "../../../../ui/banner";
import { totalLines } from "../../../../utils/functions/totalLines";
import path from "path";
import fs from "fs/promises";
import puppeteer from "puppeteer";

export async function accountFollower(profileLink: string) {
  new Banner({ x: "center", y: "top" }).setMeta(META);

  console.log(
    chalk.green(
      "Starting to follow your profile with all the accounts in spotify.txt"
    )
  );

  const filepath = path.resolve(process.cwd(), "src/data/accounts/spotify.txt");
  const data = await fs.readFile(filepath, "utf-8");
  const lines = data.split("\n").filter((line) => line.trim() !== "");

  const fileLines = lines.length;

  console.log(
    chalk.cyan("Total number of accounts in spotify.txt = " + fileLines)
  );

  const SELECTORS = {
    email: "#login-username",
    emailContinue:
      "#login-button > span.ButtonInner-sc-14ud5tc-0.klLdGL.encore-bright-accent-set",

    OTP_BOX_SELECTORS: [
      "#encore-web-main-content > div:nth-child(2) > div > div > div > form > div.EmailVerificationChallenge__InputBlock-sc-55dvy9-5.jipEUB > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(1) > input",
      "#encore-web-main-content > div:nth-child(2) > div > div > div > form > div.EmailVerificationChallenge__InputBlock-sc-55dvy9-5.jipEUB > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(4) > input",
      "#encore-web-main-content > div:nth-child(2) > div > div > div > form > div.EmailVerificationChallenge__InputBlock-sc-55dvy9-5.jipEUB > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(7) > input",
      "#encore-web-main-content > div:nth-child(2) > div > div > div > form > div.EmailVerificationChallenge__InputBlock-sc-55dvy9-5.jipEUB > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(10) > input",
      "#encore-web-main-content > div:nth-child(2) > div > div > div > form > div.EmailVerificationChallenge__InputBlock-sc-55dvy9-5.jipEUB > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(13) > input",
      "#encore-web-main-content > div:nth-child(2) > div > div > div > form > div.EmailVerificationChallenge__InputBlock-sc-55dvy9-5.jipEUB > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(16) > input",
    ],

    loginBtn:
      "#encore-web-main-content > div:nth-child(2) > div > div > div > form > div.EmailVerificationChallenge__InputBlock-sc-55dvy9-5.jipEUB > div:nth-child(2) > button > span.ButtonInner-sc-14ud5tc-0.hCjoKJ.encore-bright-accent-set",
    followButton:
      "#main-view > div > div.main-view-container__scroll-node.ZjfaJlGQZ42nCWjD3FDm > div:nth-child(1) > div > main > section > div > div.ZjfaJlGQZ42nCWjD3FDm > div:nth-child(1) > div > div > button.Button-sc-y0gtbx-0.iEnZvo.encore-text-body-small-bold.e-9960-button--small",
  };

 


  for (let i = 0; i < fileLines; i++) {
    console.log(chalk.blue("Starting to follow with account : " + (i + 1)));
    let creds = lines[i].split(":").filter((Line) => Line.trim() !== "");

    const emailcred = creds[0];
    const passwordcred = creds[1];

    console.log(chalk.cyanBright("Launching Browser..."));
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`${SPOTIFY_BASE_URL}/in-en/login`);
    await page.setViewport({ width: 1080, height: 1024 });

    console.log(chalk.magenta(`Email: ${emailcred} || Password: ${passwordcred}`));
    
    await page.waitForSelector(SELECTORS.email);
    await page.type(SELECTORS.email, emailcred);
    console.log(chalk.magenta("Filled email field"));

    setTimeout( async () => {
      await page.waitForSelector(SELECTORS.emailContinue);
      await page.click(SELECTORS.emailContinue);
    })

    

  }
}
