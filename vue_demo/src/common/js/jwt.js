// fs: 文件操作 path: 路径操作 jwt: 生成token
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

class JwtObj {
    constructor (data) {
        this.data = data
    }
    // 生成token方法
    generateToken () {
        let data = this.data
        let created = Math.floor(Date.now() / 1000)
        let cert = fs.readFileSync(path.join(__dirname, '../../../rsa_key/rsa_private_key.pem'))
        let token = jwt.sign({
            data,
            exp: created + 60 * 10
        }, cert, {
            algorithm: 'RS256'
        })

        return token
    }
    // 校验token
    verifyToken () {
        let token = this.data
        let cert = fs.readFileSync(path.join(__dirname, '../../../rsa_key/rsa_public_key.pem'))
        let res
        try {
            let result = jwt.verify(token, cert, {algorithm: ['RS256']}) || {}
            let {exp = 0} = result, current = Math.floor(Date.now() / 1000)
            if (current <= exp) {
                res = result.data || {}
            }
        } catch (e) {
            res = 'error'
        }
        return res
    }
}

module.exports = JwtObj
