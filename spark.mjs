import CryptoJs from 'crypto-js';
import WebSocket from 'ws';

let requestObj = {
  APPID: '7597e4ad',
  APISecret: 'MTg4NWQyNGM2NTZkY2Y5ZDE0MWJkZDQ3',
  APIKey: '411a904c4730d4685865b37c855622bc',
  sparkResult: '',
  Uid: 'oeyoews',
};

const getWebsocketUrl = () => {
  return new Promise((resovle, reject) => {
    let url = 'wss://spark-api.xf-yun.com/v3.5/chat';
    let host = 'spark-api.xf-yun.com';
    let apiKeyName = 'api_key'; // key

    let date = new Date().toGMTString();

    let algorithm = 'hmac-sha256';
    let headers = 'host date request-line';

    // https://www.xfyun.cn/doc/spark/general_url_authentication.html#_1-2-%E9%89%B4%E6%9D%83%E5%8F%82%E6%95%B0
    let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v3.5/chat HTTP/1.1`;

    let signatureSha = CryptoJs.HmacSHA256(
      signatureOrigin,
      requestObj.APISecret
    );

    let signature = CryptoJs.enc.Base64.stringify(signatureSha);

    let authorizationOrigin = `${apiKeyName}="${requestObj.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;

    // let authorization = base64.encode(authorizationOrigin);
    let authorization = btoa(authorizationOrigin);

    // 将空格编码
    url = `${url}?authorization=${authorization}&date=${encodeURI(
      date
    )}&host=${host}`;

    resovle(url);
  });
};

let url = await getWebsocketUrl();
let ws = new WebSocket(url);
// let ws = new WebSocket('wss://echo.websocket.org');

ws.onopen = function () {
  console.log('Connection open ...');
  let params = {
    header: {
      app_id: requestObj.APPID,
      uid: requestObj.Uid,
    },
    parameter: {
      chat: {
        domain: 'general3.5',
        temperature: 0.5,
        max_tokens: 1024,
      },
    },
    payload: {
      message: {
        text: [
          {
            role: 'system',
            content:
              '你现在扮演李白，你豪情万丈，狂放不羁；接下来请用李白的口吻和用户对话。',
          },
          { role: 'user', content: '你是谁' },
        ],
      },
    },
  };
  ws.send(JSON.stringify(params));
};

ws.onmessage = function (event) {
  let data = JSON.parse(event.data);
  console.log('收到消息！！', data);
  requestObj.sparkResult += data.payload.choices.text[0].content;
  if (data.header.code !== 0) {
    console.log('出错了', data.header.code, ':', data.header.message);
    // 出错了"手动关闭连接"
    socket.close();
  }
  if (data.header.code === 0) {
    // 对话已经完成
    if (data.payload.choices.text && data.header.status === 2) {
      requestObj.sparkResult += data.payload.choices.text[0].content;
      setTimeout(() => {
        // "对话完成，手动关闭连接"
        socket.close();
      }, 1000);
    }
  }
  // addMsgToTextarea(requestObj.sparkResult);
};

ws.onclose = function (evt) {
  console.log('Connection closed.');
};
