import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import store from './store/store'
import naiveui from "./naiveui";
createApp(App)
  .use(router)
  .use(naiveui)
  .use(store) // 使用 Vuex store
  .mount('#app')
