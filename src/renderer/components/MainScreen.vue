<template>
  <div  id="page">
    <h1>Main Page</h1>
    <p>This is made with Electron and Vue. It includes vue-router and a Vuex store</p>

    <h3>Test the store</h3>
    <p>Number: {{ number }}</p>
    <button @click="add">Add</button>

    <h3>Test IPC communication</h3>
    <button @click="send">ping Main process</button><br>
    <p id="reply" v-if="message.length">{{ message }} </p>
  </div>
</template>


<script>
  import {ipcRenderer} from 'electron'

  export default {
    name: 'MainScreen',
    data() {
      return{
        message: ''
      }
    },
    computed: {
      number() {
        return this.$store.getters.getNumber
      }
    },
    methods: {
      add() {
        this.$store.dispatch('setNum')
      },
      send() {
        ipcRenderer.on('greet', (event, data) => {
          this.message = data
        })
        ipcRenderer.send('ping')
      }
    }
  }
</script>


<style scoped>
  #page {
    width: 80%;
    height: 500px;
    margin: auto;
    overflow: hidden;
  }
  h3 {
    margin-top: 40px;
  }
  #reply {
    color: green;
    font-weight: bold;
  }
</style>
