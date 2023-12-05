<script>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import Navigator from './components/Navigator.vue'
import Icon from './components/Icon.vue'

import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
import axios from 'axios';
export default {
  components: {
    Navigator,
    Icon
  },
  setup() {
    const router = useRouter()
    const back = () => {
      router.back()
    }
    const pages = reactive([
      {
        name: 'Books',
        icon: 'pencil',
        path: '/'
      },
      {
        name: 'Progress',
        icon: 'progress',
        path: '/progress'
      },
      {
        name: 'Setting',
        icon: 'setting',
        path: '/settings'
      },
      {
        name: 'About',
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
    return {
      pages,
      defaultIndex,
      changePage,
      closeWindow,
      back
    }
  },
  created() {
    axios.get('../../data/setting.json')
      .then(response => {
        this.theme = response.data.checkedBackground === 'Dark' ? darkTheme : null;
        this.darkcolor = response.data.checkedBackground === 'Dark' ? 'darkcolor' : null;
        this.iconcolor = response.data.checkedBackground === 'Dark' ? 'white' : 'black';
      })
      .catch(error => {
        console.error('Failed to fetch setting data:', error);
      });
  },
  data() {
    return {
      theme: null,
      darkcolor: null,
      iconcolor:null
    }
  }
}
</script>

<template>
  <div class="container Allbackground" :class="darkcolor">
    <div class="side-panel" :class="darkcolor">
      <h1 class="app-title" style="margin-bottom:70px" :class="darkcolor">TOEFL &nbsp; Modder</h1>
      <Navigator class="navigator" :pages="pages" :defaultIndex="defaultIndex" @selected="changePage" :iconcolor="iconcolor"></Navigator>
    </div>
    <div class="status-bar" :class="darkcolor">
      <svg class="backicon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24" :color = "iconcolor" style="height:1.5em;width:3em;margin-top:15px;  
  -webkit-app-region: no-drag;" @click="back">
        <path d="M11.67 3.87L9.9 2.1L0 12l9.9 9.9l1.77-1.77L3.54 12z" fill="currentColor"></path>
      </svg>
      <Icon class="close-button" name="close" :color="iconcolor" selectedColor="red" @click="closeWindow"></Icon>
    </div>
    <div class="content-panel" :class="darkcolor">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.darkcolor{
  background-color: black!important;
  color : white!important;
}
.backicon:hover path {
  fill: #6cc6e4;
}

.container {
  display: inline;
  background-color: white;
}

.side-panel {
  float: left;

  height: 100%;
  width: 200px;

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