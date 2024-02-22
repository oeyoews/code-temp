// NOTE: 双指针效率更高，reverse 更简单
const str = 'a man, a plan, a canal Panama';

const str1 = str
  .toLowerCase()
  .split('')
  .filter((item) => item.match(/[a-z0-9]/gu))
  .join('');
const str2 = str1.split('').reverse().join('');

console.log(str1 == str2);
