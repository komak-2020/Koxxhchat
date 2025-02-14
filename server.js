const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// مسیری که فایل‌های استاتیک رو در اون می‌ذاریم
app.use(express.static('public'));

// وقتی یک کاربر به سرور وصل میشه
io.on('connection', (socket) => {
    console.log('یک کاربر وصل شد');

    // وقتی پیام جدید دریافت میشه
    socket.on('chat message', (msg) => {
        console.log('پیام جدید: ' + msg);
        io.emit('chat message', msg);  // ارسال پیام به همه کاربران متصل
    });

    // وقتی کاربر از سرور جدا میشه
    socket.on('disconnect', () => {
        console.log('یک کاربر از سرور جدا شد');
    });
});

// سرور رو روی پورت 3000 راه‌اندازی می‌کنیم
server.listen(3000, () => {
    console.log('سرور در حال اجرا روی پورت 3000');
});
