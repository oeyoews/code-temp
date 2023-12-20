const crypto = require('crypto');

const characters = Array.from({ length: 62 }, (_, i) =>
  i < 26
    ? String.fromCharCode(i + 65)
    : i < 52
    ? String.fromCharCode(i + 71)
    : String.fromCharCode(i - 4)
).join('');

const generateRandomString = (length) => {
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
};

// browser
const generateRandomStringBrowser = (length) => {
  const charactersLength = characters.length;
  const randomValues = new Uint8Array(length);

  crypto.getRandomValues(randomValues);

  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += characters[randomValues[i] % charactersLength];
  }

  return randomString;
};

const randomString = generateRandomString(10);
const randomStringBrowser = generateRandomStringBrowser(10);
console.log(randomString, randomStringBrowser);
