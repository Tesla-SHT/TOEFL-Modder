// store.js
import { createStore } from 'vuex'; 

export default createStore({
  state: {
    fontSize: 100, // 初始字号为16
    zoomLevel: 100,
    wordNumber:50

  },
  mutations: {
    setFontSize(state, newSize) {
      state.fontSize = newSize;
    },
    ZoomSize(state, newZoom) {
      state.zoomLevel = newZoom;
    },
    setWordNumber(state, newNumber) {
      state.wordNumber = newNumber;
    },
    addToCollection(state, word) {
      state.collectionList.push(word)
    },
    deleteFromWordList(state, word) {
      const index = state.wordList.indexOf(word)
      if (index !== -1) {
        state.wordList.splice(index, 1)
      }
    }
  },
  actions: {
    addToCollection({ commit }, word) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('addToCollection', word)
          resolve()
        }, 1000) // Simulating an asynchronous action
      })
    },
    deleteFromWordList({ commit }, word) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('deleteFromWordList', word)
          resolve()
        }, 1000) // Simulating an asynchronous action
      })
    }
  },
  getters: {
    getCollectionList: state => state.collectionList,
    getWordList: state => state.wordList
  }
});