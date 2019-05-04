<template>
    <el-menu @open="openHandler" @close="closeHandler" unique-opened collapse-transition router :collapse="isCollapse">
        <el-submenu v-for="item in menu" :index="item.id" :key="item.id">
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
    this.$emit('isCollapse', this.isCollapse)
    return {
      menu: menu
    }
  },
  methods: {
    openHandler: function (key, keyPath) {
      console.info(key, keyPath)
    },
    closeHandler: function (key, keyPath) {
      console.info(key, keyPath)
    },
    clickme: function (a) {
      console.info(a)
    }
  }
}
</script>
