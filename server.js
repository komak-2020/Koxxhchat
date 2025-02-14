const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.use(express.static('public'));


io.on('connection', (socket) => {
    console.log('یک کاربر وصل شد');


    socket.on('chat message', (msg) => {
        console.log('پیام جدید: ' + msg);
        io.emit('chat message', msg);  
    });


    socket.on('disconnect', () => {
        console.log(':(');
    });
});

// سرور رو روی پورت 3000 راه‌اندازی می‌کنیم
server.listen(3000, () => {
    console.log('سرور در حال اجرا روی پورت 3000');
});
