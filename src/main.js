import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import store from './store/store'
import naiveui from "./naiveui";

import ECharts from 'vue-echarts'
import { use } from "echarts/core";

// 手动引入 ECharts 各模块来减小打包体积
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
]);

createApp(App)
  .use(router)
  .use(naiveui)
  .use(store) // 使用 Vuex store
  .mount('#app')



