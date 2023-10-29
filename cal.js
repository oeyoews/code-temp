var originalString = "$:/";
var encodedString = encodeURIComponent(originalString);
console.log(encodedString);
console.log(decodeURIComponent("%2524%253A%252F"));
