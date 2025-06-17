import Mailjs from "@cemalgnlts/mailjs";

export async function createEmailAccount() {
  const mailjs = new Mailjs();
  const result = await mailjs.createOneAccount();

  const { username, password } = result.data; 
  
  return { username, password };
}