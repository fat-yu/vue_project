// sql语句
const sqlMap = {
    // 用户
    user: {
        add: 'insert into user( username, password) values ( ?, ?)',
        select_name: 'select * from user where username = ?',    //查询 username
        select_password: 'select * from user where password = ?',      //查询 password
        login: 'select count(*) from user where username = ? and password = ?',
        userList:  'select * from student ',
        update_student: 'update student set student_name=?, student_sex=?, student_age=?, student_no=?, student_major=?, student_status=?  where student_id = ?'
    }
}

module.exports = sqlMap;