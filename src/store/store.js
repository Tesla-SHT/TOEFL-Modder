// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    fontSize: 100, // 初始字号为16
    zoomLevel : 100
  },
  mutations: {
    setFontSize(state, newSize) {
      state.fontSize = newSize;
    },
    ZoomSize(state, newZoom){
      state.zoomLevel = newZoom;
    }
  }
});
