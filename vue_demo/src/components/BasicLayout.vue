<template>
    <div>
      <span>BasicLayout</span>
      <span v-text="count"></span>
    </div>
</template>

<script>
import store from '@/store/index.js' // 实例化store

export default {
  data () {
    return {
      count: store.state.count
    }
  }
}

</script>
