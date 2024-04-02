// 引入 WebSocket 模块
const { WebSocketServer } = require('ws');

// 创建 WebSocket 服务器
const wss = new WebSocketServer({ port: 8001 });

// 监听连接事件
wss.on('connection', function connection(ws) {
  console.log('客户端已连接');

  // 监听消息事件
  ws.on('message', function incoming(message) {
    console.log('收到消息：', message.toString('utf-8'));
    console.log(message.data);

    // 响应客户端
    ws.send('服务器已收到消息：' + message);
  });

  // 发送消息给客户端
  ws.send('欢迎连接 WebSocket 服务器');
});
