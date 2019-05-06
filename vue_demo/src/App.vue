<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <i class="el-icon-s-fold iscollapse index-switch" @click="collapseHandler"></i>
        <span>{{basicInfo.sysName}}</span>
      </el-header>
      <el-container>
        <el-aside style="width: auto;">
          <vmenu class="menu-box" :isCollapse="isCollapse"></vmenu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import '@/assets/css/index.css'
import vmenu from '@/components/Menu.vue'
import BasicInfo from '@/config/basic.config.js'

// var isCollapse = false
export default {
  name: 'app',
  data () {
    return {
      basicInfo: BasicInfo,
      isCollapse: false
    }
  },
  components: {
    vmenu
  },
  mounted () {
    console.info(this.isCollapse)
  },
  methods: {
    collapseHandler () {
      if (this.isCollapse) {
        this.isCollapse = false
      } else {
        this.isCollapse = true
      }
    }
  }
}
</script>
