<template>
    <el-dialog :visible.sync="curDialogVisible" :title="dialogTitle" :before-close="close" center>
        <span>123</span>
         <span slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="close">确定</el-button>
          </span>
    </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      curDialogVisible: this.dialogVisible
    }
  },
  methods: {
    close () {
      // 不能直接修改通过props传过来的值，通过临时值的形式替换
      this.curDialogVisible = false
      // 子组件修改父组件传过来的值，通过广播的形式
      this.$emit('isClosed', this.curDialogVisible)
    }
  },
  props: ['dialogVisible', 'dialogTitle'],
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
