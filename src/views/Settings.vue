<!-- 设置界面还没开始写 -->
<script setup>
import { ref, watch } from 'vue';

const fontSize = ref(14); // Default font size

</script>

<template>
    <div>
      <label for="fontSize">Font Size:</label>
      <input type="number" v-model="fontSize" id="fontSize" />
      
    </div>
  </template>
  
<style scoped>
</style>
