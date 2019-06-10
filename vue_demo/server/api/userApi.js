const models = require('../db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sqlMap');
const jwtUtil = require('../../src/common/js/jwt.js')

// 连接数据库
const conn = mysql.createConnection(models.mysql);
conn.connect();
const jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err')
    } else {
        //res.json(ret);
        res.send('ok')
    }
};
// 增加用户接口
router.post('/addUser', (req, res) => {
    let sql_name = $sql.user.select_name
    let sql = $sql.user.add;
    let params = req.body;
    console.log(params);
    conn.query(sql_name,params.username,function(err,result) {
        if(err) {
            console.log(err)
        }
        if(result[0]===undefined) {
            conn.query(sql,[params.username,params.password], function(err, result) {
                if(err) {
                    console.log(err)
                }
                if(result) {
                    jsonWrite(res, result)
                }
            })
        }else {
            res.send('-1')    //当前注册username与数据库重复时，data返回-1
        }
    })
    
});

// 登录接口
router.post('/login', (req,res) => {
    let sql_name = $sql.user.select_name;
    let sql_password = $sql.user.select_password;
    let params = req.body;
    new Promise((resolve, reject) => {
        // 查询用户名
        conn.query(sql_name, params.username, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    }).then((result) => {
        if (result[0] === undefined) {
            res.send({code: -1, msg: '账号不存在'})
        } else {
            new Promise ((resolve, reject) => {
                conn.query(sql_password, params.password, function(err, result) {
                   if (err) {
                    reject(err)
                   } else {
                    resolve(result)
                   }
                })
            }).then((result) => {
                if (result[0] === undefined) {
                    res.send({code: -2, msg: '密码错误'})
                } else {
                    // 登录成功, 添加token验证
                    let _id = result[0].id
                    let jwtObj = new jwtUtil(_id)
                    let token = jwtObj.generateToken()
                    res.send({code: 200, msg: '登录成功', token:token})
                }
            }).catch((err) => {
                res.send({code: 2, msg: '账号密码错误'})
            })
        }
    }).catch((err) => {
        res.send({code: 1, msg: '账号密码错误'});
    })
});

// 查询学生列表
router.post('/listpage', (req, res) => {
    let sql_name = $sql.user.userList
    let params = req.body;
    new Promise ((resolve, reject) => {
        if( params.params.name !== '' ) {
            sql_name += " where student = ? "
        }
        let queryParam = params.params.name === '' ? null : params.params.name
        conn.query(sql_name, params.params.name, function(err,result) {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    }).then((result) => {
        res.send({code: 200, msg: '查询成功', studentList: result, total: result.length})
    }).catch((err) => {
        res.send({code: 500, msg: '查询失败'})
    })
});
module.exports = router;
