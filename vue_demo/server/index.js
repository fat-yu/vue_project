// node 后端服务器
const userApi = require('./api/userApi');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const jwtUtil = require('../src/common/js/jwt.js')
const parseurl = require('parseurl')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 解决跨域问题 和 cors 二选一都可???
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true"); // 允许带cookie
    res.header("Access-Control-Allow-Origin", "*");
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

// 服务端拦截所有需要验证身份信息的请求，并校验token的合法性
app.use('/*', (req, res, next) => {
    // 排除掉登录，注册的url
    if (req.baseUrl !== '/api/user/login' && req.baseUrl !== '/api/user/register') {
        // axios 发送请求的时候需要在头信息中带token
        let token = req.headers.authorizatior;
        let jwt = new jwtUtil(token);
        let result = jwt.verifyToken();
        // 如果考验通过就next，否则就返回登陆信息不正确
        if (result === 'error') {
            res.send({code: 403, msg: '登录已过期,请重新登录'});
        } else {
            next();
        }
    } else {
        next();
    }
})

// 后端api路由，请求拦截一定要在路由前边，否则拦截不到请求
app.use('/api/user', userApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
