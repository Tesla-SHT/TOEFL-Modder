import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import store from './store/store'

createApp(App)
  .use(router)
  .use(store) // 使用 Vuex store
  .mount('#app')
