<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUsers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%; height: 100%;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column prop="student_name" label="姓名" width="120" sortable align="center"></el-table-column>
            <el-table-column prop="student_sex" label="性别" width="100" :formatter="formatSex" sortable align="center"></el-table-column>
            <el-table-column prop="student_age" label="年龄" width="100" sortable align="center"></el-table-column>
            <el-table-column prop="student_no" label="学号" width="120" sortable align="center"></el-table-column>
            <el-table-column prop="student_major" label="专业" min-width="180" sortable align="center"></el-table-column>
            <el-table-column prop="student_status" label="学生状态" width="100" min-width="180" sortable align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="pagesizes" :total="3" style="float:right">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm" :label-suffix="'：'">
                <el-form-item label="姓名" prop="student_name">
                    <el-input v-model="editForm.student_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.student_sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model="editForm.student_age" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input type="text" v-model="editForm.student_major"></el-input>
                </el-form-item>
                <el-form-item label="学号">
                    <el-input type="text" v-model="editForm.student_no"></el-input>
                </el-form-item>
                <el-form-item label="学生状态">
                    <el-radio-group v-model="editForm.student_status">
                        <el-radio class="radio" :label="2">退学</el-radio>
                        <el-radio class="radio" :label="1">休学</el-radio>
                        <el-radio class="radio" :label="0">正常</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false" :center="true">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="姓名">
                    <el-input v-model="addForm.student_name" auto-complete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="性别">
                    <el-radio-group v-model="addForm.student_sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model="addForm.student_age" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input type="text" v-model="addForm.student_major"></el-input>
                </el-form-item>
                <el-form-item label="学号">
                    <el-input type="text" v-model="addForm.student_no"></el-input>
                </el-form-item>
                <el-form-item label="学生状态">
                    <el-radio-group v-model="addForm.student_status">
                        <el-radio class="radio" :label="2">退学</el-radio>
                        <el-radio class="radio" :label="1">休学</el-radio>
                        <el-radio class="radio" :label="0">正常</el-radio>
                    </el-radio-group>
                </el-form-item> -->
            </el-form>
            <div slot-scope="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import util from '../../common/js/util'
import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api.js'
export default {
  data () {
    return {
      filters: {
        name: ''
      },
      users: [],
      total: 0,
      page: 1,
      pagesizes: 2,
      listLoading: false,
      sels: [], // 列表选中列
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
        student_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      // 编辑界面数据
      editForm: {},
      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      addFormRules: {
        student_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        student_name: '',
        student_sex: -1,
        student_age: 20,
        student_major: '',
        student_no: '',
        student_status: 1
      }
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    // 性别显示转换
    formatSex: function (row, column) {
      return row.student_sex === 1 ? '男' : row.student_sex === 0 ? '女' : '未知'
    },
    handleCurrentChange (val) {
      this.page = val
      this.getUsers()
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getUsers()
    },
    // 获取用户列表
    getUsers () {
      let para = {
        page: this.page,
        name: this.filters.name,
        pagesizes: this.pagesizes
      }
      this.listLoading = true
      getUserListPage(para).then((res) => {
        if (res.data.code !== 200) {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
          this.$router.push({ path: '/login' })
        } else {
          this.total = res.data.total
          this.users = res.data.studentList
          this.listLoading = false
        }
      })
    },
    // 删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { id: row.id }
        removeUser(para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getUsers()
        })
      }).catch(() => {})
    },
    // 显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    // 显示新增界面
    handleAdd: function () {
      this.addFormVisible = true
      this.addForm = {
        student_name: '',
        student_sex: -1,
        student_age: 20,
        student_major: '',
        student_no: '',
        student_status: 1
      }
    },
    // 编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            let para = Object.assign({}, this.editForm)
            editUser(para).then((res) => {
              this.editLoading = false
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getUsers()
            })
          })
        }
      })
    },
    // 新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            let para = Object.assign({}, this.addForm)
            para.birth = (!para.birth || para.birth === '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            addUser(para).then((res) => {
              this.addLoading = false
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['addForm'].resetFields()
              this.addFormVisible = false
              this.getUsers()
            })
          })
        }
      })
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove: function () {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { ids: ids }
        batchRemoveUser(para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getUsers()
        })
      }).catch(() => {})
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>
