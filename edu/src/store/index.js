import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 不能再生产环境下启用严格模式
  state,
  mutations,
  actions
})
