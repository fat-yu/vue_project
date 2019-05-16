// sql语句
const sqlMap = {
    // 用户
    user: {
        add: 'insert into user( username, password) values ( ?, ?)',
        select_name: 'SELECT * from user where username = ?',    //查询 username
        select_password: 'SELECT * from user where password = ?'      //查询 password
    }
}

module.exports = sqlMap;