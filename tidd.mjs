// const fetch = require('node-fetch');
import fetch from 'node-fetch';
let plugins = null;

const res = await fetch('https://rsshub.app/bilibili/user/video/334958638');
const data = await res.json();
console.log(data);
