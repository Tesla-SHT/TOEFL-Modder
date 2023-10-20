<template>
  <div class="home"> 
    <MainScreen /> 
     
  </div>
</template>

<script>
// @ is an alias to /src
import MainScreen from'@/components/MainScreen.vue'

export default {
  name: 'Home',
  components: {
    MainScreen
  }
}
</script>


<style scoped>
  .home {
    width: 100%;
    max-width: 1500px;
    padding: 30px;
    border: 1px solid green;
    overflow: auto;
    margin: auto;
  }
</style>
