import Mailjs from "@cemalgnlts/mailjs";

export async function getOTP(email: string, username: string){

    const mailjs = new Mailjs();
    console.log(chalkblueBright("Starting email verification"));

    try {
        await mailjs.login("992cf@punkproof.com", "6vbycnup")
        console.log(chalk.green("Successfully logged into the mail!"))

        const messages = await mailjs.getMessages();
        console.log("Message: ", Messages);

    } catch (error) {
        console.log("error capturing otp")
    }   
}