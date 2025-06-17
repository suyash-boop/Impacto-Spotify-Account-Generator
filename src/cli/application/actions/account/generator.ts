import puppeteer from "puppeteer";
import { META, SPOTIFY_BASE_URL } from "../../../../constants";
import { Banner } from "../../../../ui/banner";
import { createEmailAccount } from "../../../../services/email";
import chalk from "chalk";
import { generatePassword } from "../../../../utils/functions/password";
import nameGenerator from "../../../../utils/functions/name";
import { saveSpotifyAccount } from "../../../../utils/functions/saveAccount";

export async function accountGenerator(generateCount: number) {
  
  // All Spotify form field selectors centralized here
  const SELECTORS = {
    email: "#username",
    emailNext: "form button span.ButtonInner-sc-14ud5tc-0.hvvTXU",

    password: "#new-password",
    passwordNext: "form button span.ButtonInner-sc-14ud5tc-0.hvvTXU",

    displayName: "#displayName",

    year: "#year",
    month: "#month",
    day: "#day",

    gender: 'label[for="gender_option_male"] span', // adjust based on gender option structure

    finalNext: "form button span.ButtonInner-sc-14ud5tc-0.hvvTXU",
    confirmSignup: "form button span.ButtonInner-sc-14ud5tc-0.hvvTXU",
  };

  try {
    // Show custom banner in CLI
    new Banner({ x: "center", y: "top" }).setMeta(META);
    console.log(chalk.cyanBright("Launching Browser..."));

    // Loop through the desired number of accounts
    for (let i = 1; i <= generateCount; i++) {
      console.log(chalk.green(`Generating account number: ${i}`));
      const browser = await puppeteer.launch({ headless: false });

      // Create a new browser tab
      const page = await browser.newPage();

      // Navigate to Spotify sign-up page
      await page.goto(`${SPOTIFY_BASE_URL}/in-en/signup`);
      await page.setViewport({ width: 1080, height: 1024 });

      // Generate fake email and password
      const { username, password } = await createEmailAccount();
      const accpassword = generatePassword();
      const name = nameGenerator();

      console.log(`Generated credentials: ${username} | ${password}`);

      // === Step 1: Enter Email ===
      await page.waitForSelector(SELECTORS.email);
      await page.type(SELECTORS.email, username);
      console.log(chalk.magenta("Filled email field"));

      setTimeout(async () => {
        await page.waitForSelector(SELECTORS.emailNext);
        await page.click(SELECTORS.emailNext);
      }, 2000);

      // === Step 2: Set Password ===
      await page.waitForSelector(SELECTORS.password);
      await page.type(SELECTORS.password, accpassword);
      console.log(chalk.magenta("Filled password field : " + accpassword));

      setTimeout(async () => {
        await page.waitForSelector(SELECTORS.passwordNext);
        await page.click(SELECTORS.passwordNext);
      }, 2000);

      // === Step 3: Fill Personal Info (Display Name) ===
      await page.waitForSelector(SELECTORS.displayName);
      await page.type(SELECTORS.displayName, name);

      // === Step 4: Set Date of Birth ===
      await page.waitForSelector(SELECTORS.year);
      await page.type(SELECTORS.year, "2005");

      await page.waitForSelector(SELECTORS.month);
      await page.type(SELECTORS.month, "August");

      await page.waitForSelector(SELECTORS.day);
      await page.type(SELECTORS.day, "28");

      // === Step 5: Select Gender ===
      await page.waitForSelector(SELECTORS.gender);
      await page.click(SELECTORS.gender);

      // === Step 6: Final Next Button ===
      setTimeout(async () => {
        await page.waitForSelector(SELECTORS.finalNext);
        await page.click(SELECTORS.finalNext);
      }, 3000);

      // === Step 7: Confirm Signup Button ===
      setTimeout(async () => {
        await page.waitForSelector(SELECTORS.confirmSignup);
        await page.click(SELECTORS.confirmSignup);
      }, 2000);

      // === Save Account Locally ===
      saveSpotifyAccount(username, accpassword, password);
      console.log(chalk.yellow("Account saved! Waiting before next..."));

      // Wait 20 seconds before generating next account
      await new Promise((res) => setTimeout(res, 20000));
      
      browser.close()
    }
  } catch (error) {
    // Catch and log any errors during the process
    console.error(chalk.red("Error during account generation:"), error);
  } finally {
    console.log(chalk.cyanBright("Successfully generated "+ generateCount +" accounts"))
    await browser.close();
  }
}
