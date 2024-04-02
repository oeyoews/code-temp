const api = '471bbcb619a1d84305b8cbfe8ed0d4ea.7BTAPX2BudsbG8aC';
const data = {
  model: 'glm-3',
  message: [
    {
      role: 'user',
      content: 'who you are',
    },
  ],
};

const st = new Date().getTime();

let res_auth_token;

const jwtSign = async function (secret, payload) {
  if (!secret) {
    console.log('secret is empty, returned.');
    return;
  }

  const header = { alg: 'HS256', sign_type: 'SIGN' };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));

  // load secret
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign']
  );

  // sing
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(encodedHeader + '.' + encodedPayload)
  );

  // ArrayBuffer to Base64
  const encodedSignature = btoa(
    String.fromCharCode.apply(null, new Uint8Array(signature))
  );
  return encodedHeader + '.' + encodedPayload + '.' + encodedSignature;
};

const id = api.split('.').shift();
jwtSign(api, {
  api_key: id,
  timestamp: st,
  exp: new Date(st + 1000 * 60 * 60).getTime(),
}).then((res) => {
  res_auth_token = res;
});

fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${res_auth_token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  });
