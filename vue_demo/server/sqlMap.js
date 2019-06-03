// sql语句
const sqlMap = {
    // 用户
    user: {
        add: 'insert into user( username, password) values ( ?, ?)',
        select_name: 'select * from user where username = ?',    //查询 username
        select_password: 'select * from user where password = ?',      //查询 password
        login: 'select count(*) from user where username = ? and password = ?',
        userList:  'select * from student where student_name = ? '
    }
}

module.exports = sqlMap;