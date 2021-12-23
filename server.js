//引入模块
const express = require('express');
const http = require('http');
const cors = require('cors');

//初始化
const app = express();
const server = http.createServer(app);

app.use(cors());

//初始化io
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
});

//服务器socket连接
io.on('connection', (socket) => {
  //断开通信
  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });
});

server.listen(5001, () => {
  console.log('服务器正在5001端口号运行....');
});
