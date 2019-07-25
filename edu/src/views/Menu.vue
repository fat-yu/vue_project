<template>
    <el-menu @open="openHandler" @close="closeHandler" unique-opened :collapse-transition="true" router :collapse="collapseFlag" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" default-active="Home">
        <el-menu-item v-for="item in menu" :index="item.id" :key="item.id" v-if="item.sub === undefined">
          <i :class="item.icon"></i>
          <span slot="title" v-text="item.name"></span>
        </el-menu-item>
        <el-submenu v-for="item in menu" :index="item.id" :key="item.id" v-if="item.sub !== undefined">
            <template slot="title">
                <i :class="item.icon"></i>
                <span v-text="item.name"></span>
            </template>
            <el-menu-item-group class="menu-hide" v-for="sub in item.sub" :key="sub.componentName">
                <el-menu-item :index="sub.componentName" v-text="sub.name"></el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script scoped>
import menu from '@/config/menu.config.js'
import '@/assets/css/menu.css'

export default {
  props: ['isCollapse'],
  data () {
    return {
      menu: menu,
      collapseFlag: this.isCollapse
    }
  },
  methods: {
    openHandler: function (key, keyPath) {
      // console.info(key, keyPath)
    },
    closeHandler: function (key, keyPath) {
      // console.info(key, keyPath)
    },
    clickme: function (a) {
      // console.info(a)
    }
  },
  mounted () {
    this.collapseFlag = this.isCollapse
  },
  watch: {
    isCollapse: {
      immediate: true,
      handler (val) {
        this.collapseFlag = val
      }
    }
  }
}
</script>
