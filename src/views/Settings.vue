<!-- Setting.vue -->
<template>
  <div>
    <div class="container">
      <label>字号设置：</label>
      <n-input-number v-model:value="fontSize" @input="updateFontSize">
        <template #suffix>
          %
        </template>
      </n-input-number>
    </div>
    <n-button>naive-ui</n-button>
  </div>
</template>

<script>
export default {
  Setup() {
    return {
      fontSize: this.$store.state.fontSize
    }
  },
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
