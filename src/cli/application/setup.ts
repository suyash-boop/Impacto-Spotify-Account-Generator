import { intro, select, text, log } from "@clack/prompts";
import { accountGenerator } from "./actions/account/generator";
import { accountFollower } from "./actions/account/follower";

export async function setupConfig() {
  intro("Welcome to the Spotify Account Generator Tool!");

  const action = await select({
    message: "Which action would you like to perform?",
    options: [
      { value: "account_generator", label: "Generate Spotify Accounts" },
      { value: "account_follower", label: "Account Follower" },
    ],
  });

  let generateCount: string | undefined;

  if (action == "account_generator") {
    generateCount = await text({
      message: "How many accounts you want to generate?",
      placeholder: "5",
      initialValue: "1",
      validate(value) {
        if (value.length === 0) return `Value is required!`;
      },
    });
  }

  let profileLink: string | undefined;

  if (action == "account_follower") {
      profileLink = await text({
      message: "Enter your spotify profile link",
      placeholder: "https://open.spotify.com/user/",
      initialValue: "",
      validate(value) {
        if (value.length === 0) return `Value is required!`;
      },
    });

  }

  switch (action) {
    case "account_generator":
      {
        await accountGenerator(generateCount);
      }
      break;
    case "account_follower":
      {
        await accountFollower(profileLink);
      }
      break;
    default:
      break;
  }
}
