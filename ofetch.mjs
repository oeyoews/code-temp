import { ofetch, fetch } from 'ofetch';

const github =
  'https://raw.githubusercontent.com/oeyoews/tiddlywiki-starter-kit/main/README.md';
const random = 'https://randomuser.me/api';

const apiFetch = ofetch.create({
  baseURL: github,
  mode: 'no-cors',
});

const data = await apiFetch('/api', {});
console.log(data);
