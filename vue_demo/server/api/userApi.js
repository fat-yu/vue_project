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
    let { page, name, pagesizes } = req.body.params

    let pageSize = pagesizes ? pagesizes : 3
    let currentPage = page ? page : 1

    // nodejs模糊查询mysql 参数不能带单引号
    let queryParam = name === '' ? null : "%" +name+ "%"

    new Promise ((resolve, reject) => {
        if( queryParam !== '' && queryParam !== null ) {
            sql_name += " where student_name like ? "
        }
        conn.query(sql_name, queryParam, function(err,result) {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    }).then((result) => {
        // 计算数据总条数
        let total = result.length
        // 分页条件 (跳过多少条)
        if(queryParam !== null){
            currentPage = 1
        }
        let n = (currentPage - 1) * pageSize
        // 拼接分页的sql语句
        sql_name += ` limit ${n}, ${pageSize}`

        new Promise ((resolve, reject) => {
            conn.query(sql_name, queryParam, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        }).then((result) => {
            res.send({code: 200, msg: '查询成功', studentList: result, total: total})
        }).catch((err) => {
            res.send({code: 500, msg: '查询失败'})
        })
    }).catch((err) => {
        res.send({code: 500, msg: '查询失败'})
    })
});

// 新增编辑功能的保存
router.post('/edit', (req, res) => {
    let sql = $sql.user.update_student

    let o = req.body.params
    let params = [o.student_name, o.student_sex, o.student_age, o.student_no, o.student_major, o.student_status, o.student_id]

    new Promise((resolve, reject) => {
        conn.query(sql, params, (err, result)=>{
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    }).then((result)=>{
        res.send({code: 200, msg: '更新成功'})
    }).catch((err)=>{
        console.info(err)
        res.send({code: 500, msg: '更新失败'})
    })
});

module.exports = router;
