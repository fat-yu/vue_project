// node 后端服务器
const userApi = require('./api/userApi');
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

// 服务端拦截所有需要验证身份信息的请求，并校验token的合法性
app.use((req, res, next) => {
    console.info(req)
    // 排除掉登录，注册的url
    if (req.url !== '/user/login' && req.url !== '/user/register') {
        console.info('功能路径触发')
        // axios 发送请求的时候需要在头信息中带token
        let token = req.headers.token;
        let jwt = new JwtUtil(token);
        let result = jwt.verifyToken();
        // 如果考验通过就next，否则就返回登陆信息不正确
        if (result === 'err') {
            console.log(result);
            res.send({status: 403, msg: '登录已过期,请重新登录'});
            // res.render('login.html');
        } else {
            next('/');
        }
    } else {
        console.info('登录注册触发')
        next();
    }
})

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
