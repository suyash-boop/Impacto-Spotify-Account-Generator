import Mailjs from "@cemalgnlts/mailjs";
import chalk from "chalk";

export async function getOTP(email: string, password: string) {
  const mailjs = new Mailjs();
  console.log(chalk.blueBright("Starting email verification"));

  await mailjs.login(email, password);
  console.log(chalk.green("Successfully logged into the mail!"));

  const messages = await mailjs.getMessages();

  // Access the data array from the response object
  if (
    messages.data &&
    Array.isArray(messages.data) &&
    messages.data.length > 0
  ) {
    // Sort messages by creation date (newest first)
    const sortedMessages = messages.data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Get the latest message
    const latestMessage = sortedMessages[0];
    console.log("Latest Subject:", latestMessage.subject);
    console.log("Created at:", latestMessage.createdAt);

    // Extract OTP code from latest message subject
    const subject = latestMessage.subject;
    const otpMatch = subject.match(/\d{6}/);
    if (otpMatch) {
      console.log("Latest OTP Code:", otpMatch[0]);
      return otpMatch[0]; // Return the actual OTP string
    } else {
      console.log("No OTP found in latest message");
      return null; // Return null when no OTP found
    }
  } else {
    console.log("No messages found");
    return null; // Return null when no messages
  }
}
