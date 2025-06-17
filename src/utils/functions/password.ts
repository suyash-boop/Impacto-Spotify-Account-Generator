export function generatePassword() {
  const upperChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChar = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "1234567890";
  const symbols = "!@#$%^&*()_+[]{}|";

  const characters = upperChar + lowerChar + numbers + symbols;
  let password = "";

  password += upperChar[Math.floor(Math.random() * upperChar.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  password += lowerChar[Math.floor(Math.random() * lowerChar.length)];


  for(let i = 4; i < 10; i++){
    password += characters[Math.floor(Math.random() * characters.length)]
  }

  return password.split('') .sort(() => 0.5 - Math.random()).join('');
}
