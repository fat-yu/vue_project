<template>
  <div id="app">
    <el-container>
      <el-header class="header">header</el-header>
      <el-main>
        <el-aside>
          <vmenu class="menu-box"></vmenu>
        </el-aside>
        <el-container>
          <router-view/>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import '@/assets/css/index.css'
import Menu from '@/components/Menu.vue'

export default {
  name: 'App',
  components: {
    vmenu: Menu
  }
}
</script>
