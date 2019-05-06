<template>
    <div id="home">
      <span>{{test}}</span>
    </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      test: 'home'
    }
  },
  mounted () {
    this.test = 'modify home'
    $('#home').click(function () {
      // 写一个alert的组件
      alert('home')
    })
  },
  methods: {

  }
}
</script>
