// node 后端服务器
const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api/user', userApi);

// 解决跨域问题
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true"); // 允许带cookie
    res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
