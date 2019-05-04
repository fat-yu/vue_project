<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <i class="el-icon-s-fold iscollapse" @click="collapseHandler" ref="vmenu"></i>
        <span>{{basicInfo.sysName}}</span>
      </el-header>
      <el-container>
        <el-aside>
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

var isCollapse = true
export default {
  name: 'App',
  data () {
    isCollapse = true
    return {
      basicInfo: BasicInfo,
      isCollapse: isCollapse
    }
  },
  components: {
    vmenu
  },
  methods: {
    collapseHandler: () => {
      console.info(this)
      this.$refs.vmenu.clickme(this.a.isCollapse)
      if (this.a.isCollapse) {
        this.a.isCollapse = false
      } else {
        this.a.isCollapse = true
      }
    }
  }
}
</script>
