const WebSocket = require('ws');

const ws = new WebSocket('wss://spark-api.xf-yun.com/v1.1/chat');

ws.on('open', function open() {
  console.log('Connected to WebSocket');

  const request = {
    header: {
      app_id: '7597e4ad',
      uid: '12345',
    },
    parameter: {
      chat: {
        domain: 'generalv3.5',
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
          { role: 'assistant', content: '.....' },
          { role: 'user', content: '你会做什么' },
        ],
      },
    },
  };

  // 将 JSON 请求发送到 WebSocket 服务器
  ws.send(JSON.stringify(request));
});

// 监听从 WebSocket 服务器接收到的消息
ws.on('message', function incoming(message) {
  console.log('Received message:', message);
});

// 监听 WebSocket 连接关闭事件
ws.on('close', function close() {
  console.log('Disconnected from WebSocket');
});
