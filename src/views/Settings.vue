<!-- Setting.vue -->
<template>
  <div>
    <label>字号设置：</label>
    <input type="number" v-model="fontSize" @input="updateFontSize" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      fontSize: this.$store.state.fontSize
    }
  },
  methods: {
    updateFontSize() {
      this.$store.commit('setFontSize', this.fontSize)
    }
  }
}
</script>
