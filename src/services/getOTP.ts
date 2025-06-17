import Mailjs from "@cemalgnlts/mailjs";

export async function emailVerify(email: string, username: string){

    const mailjs = new Mailjs();
    console.log(chalkblueBright("Starting email verification"));

    try {
        await mailjs.login("0jop9@punkproof.com", "q1xzlbri")
        console.log(chalk.green("Successfully logged into the mail!"))

        const messages = await mailjs.getMessages();
        console.log("Message: ", Messages);

    } catch (error) {
        
    }   
}