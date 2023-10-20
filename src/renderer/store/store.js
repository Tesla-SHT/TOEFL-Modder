import { createStore } from 'vuex'

export default createStore({
  state: {
    number: 0
  },
  getters: {
    getNumber(state) {
      return state.number
    }
  },
  mutations: {
    setNum(state) {
      state.number++
    }
  },
  actions: {
    setNum({commit}) {
      commit('setNum')
    }
  }
})
