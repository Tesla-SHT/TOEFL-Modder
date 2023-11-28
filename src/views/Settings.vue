<!-- Setting.vue -->
<script>
export default {
  data(){
    return {
      wordNumber: 50
    }
  },
  methods: {
    updateWordNumber(event) {
      console.log(this.wordNumber)
      $setting.updateWordNumber(this.wordNumber)
    }
  }

}
</script>

<template>
  <n-card style="margin:5% 3%;width:94%">
    <n-grid :cols="6">
      <n-gi :span="2">
        <h4>Word Number</h4>
      </n-gi>
      <n-gi :span="4">
        <n-slider v-model:value="wordNumber" :min="10" :max="200" :step="10" style="padding-top:9px"
          @click="updateWordNumber(event)" />
      </n-gi>
    </n-grid>
  </n-card>
</template>
<style>
h4 {
  margin: 0;
}
</style>
