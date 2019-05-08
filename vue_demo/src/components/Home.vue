<template>
    <div>
      <el-row>
          <el-button icon="el-icon-edit" round>圆角按钮</el-button>
          <el-button type="primary" round>主要按钮</el-button>
          <el-button type="success" round>成功按钮</el-button>
          <el-button type="info" round>信息按钮</el-button>
          <el-button type="warning" round>警告按钮</el-button>
          <el-button type="danger" round>危险按钮</el-button>
      </el-row>
      <el-row class="margin-t">
          <el-button icon="el-icon-search" circle></el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="info" icon="el-icon-message" circle></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-row>
      <el-row class="margin-t">
          <el-button plain>朴素按钮</el-button>
          <el-button type="primary" plain>主要按钮</el-button>
          <el-button type="success" plain>成功按钮</el-button>
          <el-button type="info" plain>信息按钮</el-button>
          <el-button type="warning" plain>警告按钮</el-button>
          <el-button type="danger" plain>危险按钮</el-button>
      </el-row>
      <el-row class="margin-t">
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
      </el-row>
      <el-row class="margin-t">
          <el-button type="primary" @click="openDialog">打开Dialog组件</el-button>
      </el-row>
      <el-row class="margin-t">
          <el-button type="primary" @click="countApp">Vuex状态管理</el-button>
          <span v-text="count"></span>
      </el-row>
      <yDialog :dialogVisible="dialogVisible" dialogTitle="人员选择" :dataList="dataList" v-on:isClosed="isClosed($event)" v-on:returnSelectionData="returnSelectionData($event)"></yDialog>
    </div>
</template>
<script scoped>
import '@/assets/css/demo.css'
import yDialog from '@/components/Dialog4List.vue'
import store from '@/store/index.js' // 实例化store

export default {
  data () {
    return {
      count: 0,
      test: 'home',
      dialogVisible: false,
      dataList: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }]
    }
  },
  mounted () {
    this.test = 'modify home'
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    isClosed ($event) {
      this.dialogVisible = $event
    },
    returnSelectionData (dataList) {
      console.info(dataList)
    },
    countApp () {
      this.$store.dispatch('add', 'dispatch分发到指定的actions')
      this.count = store.state.count
    }
  },
  components: {
    yDialog: yDialog
  }
}
</script>
