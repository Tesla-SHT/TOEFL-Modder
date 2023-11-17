<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import Navigator from './components/Navigator.vue'
import Icon from './components/Icon.vue'

const router = useRouter()
const back = () => {
  router.back()
}
const pages = reactive([
  {
    name: '便签',
    icon: 'pencil',
    path: '/'
  },
  {
    name: '设置',
    icon: 'setting',
    path: '/settings'
  },
  {
    name: '关于',
    icon: 'info',
    path: '/about'
  }
])
const defaultIndex = 0

const changePage = (pageIndex) => {
  router.push(pages[pageIndex].path)
}

const closeWindow = () => {
  $app.close()
}


</script>

<template>
  <div class="container">
    <div class="side-panel">
      <h1 class="app-title" style="margin-bottom:38px">TOEFL &nbsp; Modder</h1>
      <Navigator class="navigator" :pages="pages" :defaultIndex="defaultIndex" @selected="changePage"></Navigator>
    </div>
    <div class="status-bar">
      <svg class="backicon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" style="height:1.5em;width:3em;margin-top:15px;
  -webkit-app-region: no-drag;" @click="back">
        <path d="M11.67 3.87L9.9 2.1L0 12l9.9 9.9l1.77-1.77L3.54 12z" fill="currentColor"></path>
      </svg>
      <Icon class="close-button" name="close" color="black" selectedColor="red" @click="closeWindow"></Icon>
    </div>
    <div class="content-panel">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.backicon:hover path{
  fill: #70d3f4;
}
.container {
  display: inline;
  background-color: white;
}

.side-panel {
  float: left;

  height: 100%;
  width: 200px;

  background-color: #f3f3f3;

  -webkit-app-region: drag;
  /* 允许用户进行窗口拖动 */
}

.app-title {
  height: 49px;

  margin-top: 40px;

  font-size: 27px;
  text-align: center;

  color: black;
}

.navigator {
  -webkit-app-region: no-drag;
  /* 禁止拖动 */
}

.content-panel {
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;

  height: 100%;
  width: calc(100% - 200px);

  background-color: #f9f9f9;
  overflow: auto;
}

.status-bar {
  float: right;
  margin-top: 0px;
  margin-left: 0px;
  margin-right: 0px;
  height: 45px;
  width: calc(100% - 200px);

  background-color: #f9f9f9;

  -webkit-app-region: drag;
}

.close-button {
  width: 23px;
  height: 23px;
  margin-right: 18px;
  margin-top: 15px;
  float: right;

  -webkit-app-region: no-drag;
}
</style>