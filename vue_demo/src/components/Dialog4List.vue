<template>
    <el-dialog :visible.sync="curDialogVisible" :title="dialogTitle" :before-close="close" center>
        <div>
          <el-table :data="dataList" stripe max-height="300" @selection-change="handleSelectionChange">
             <el-table-column type="selection" width="30"></el-table-column>
             <el-table-column prop="id" label="编号" align="center"></el-table-column>
             <el-table-column prop="name" label="姓名" align="center"></el-table-column>
             <el-table-column prop="amount1" label="amount1" align="center"></el-table-column>
             <el-table-column prop="amount2" label="amount2" align="center"></el-table-column>
             <el-table-column prop="amount3" label="amount3" align="center"></el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
  data () {
    console.info(this.dataList)
    return {
      curDialogVisible: this.dialogVisible,
      selectedData: []
    }
  },
  methods: {
    close () {
      // 不能直接修改通过props传过来的值，通过临时值的形式替换
      this.curDialogVisible = false
      // 子组件修改父组件传过来的值，通过广播的形式
      this.$emit('isClosed', this.curDialogVisible)
    },
    confirm () {
      this.close()
      this.$emit('returnSelectionData', this.selectedData)
    },
    handleSelectionChange (val) {
      this.selectedData = val
    }
  },
  props: ['dialogVisible', 'dialogTitle', 'dataList'],
  watch: {
    // 父组件点击按钮修改了传过来的值需要在子组件中进行监听
    dialogVisible: {
      immediate: true,
      handler (val) {
        this.curDialogVisible = val
      }
    }
  }
}

</script>
