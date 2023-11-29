<!-- Setting.vue -->
<script>
export default {

  Setup() {
    const checkedValueRef = ref(null);

    return {
      disabled: ref(true),
      checkedValue: checkedValueRef,
      handleChange(e) {
        checkedValueRef.value = e.target.value;
      }
    };
  },

  data() {
    return {
      newwordNumber: 50,
      reviewwordNumber: 150
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
  <h2>&nbsp;&nbsp; Study Preference</h2>
  <n-card style="margin:5% 3%;width:94%">
    <n-grid :cols="6">
      <n-gi :span="2">
        <h4>New Word Number</h4>
      </n-gi>
      <n-gi :span="4">
        <n-slider v-model:value="newwordNumber" :min="10" :max="200" :step="10" style="padding-top:9px"
          @click="updateWordNumber(event)" />
      </n-gi>
    </n-grid>
  </n-card>
  <n-card style="margin:5% 3%;width:94%">
    <n-grid :cols="6">
      <n-gi :span="2">
        <h4>Reviewing Word Number</h4>
      </n-gi>
      <n-gi :span="4">
        <n-slider v-model:value="reviewwordNumber" :min="10" :max="200" :step="10" style="padding-top:9px"
          @click="updateWordNumber(event)" />
      </n-gi>
    </n-grid>
  </n-card>
  <n-card style="margin:5% 3%;width:94%">
    <n-grid :cols="6">
      <n-gi :span="2">
        <h4>Pronunciation</h4>
      </n-gi>
      <n-gi :span="4">
        <n-radio :checked="checkedValue === 'Definitely Maybe'" value="Definitely Maybe" name="basic-demo"
          @change="handleChange">
          American Accent
        </n-radio>
        <n-radio :checked="checkedValue === 'Be Here Now'" value="Be Here Now" name="basic-demo" @change="handleChange">
          British Accent
        </n-radio>
      </n-gi>
    </n-grid>
  </n-card>
  <n-card style="margin:5% 3%;width:94%">
    <n-grid :cols="6">
      <n-gi :span="2">
        <h4>Word Order</h4>
      </n-gi>
      <n-gi :span="4">
        <n-radio :checked="checkedValue === 'Definitely Maybe'" value="Definitely Maybe" name="basic-demo"
          @change="handleChange">
          Alphabet Sequence
        </n-radio>
        <n-radio :checked="checkedValue === 'Be Here Now'" value="Be Here Now" name="basic-demo" @change="handleChange">
          Shuffled
        </n-radio>
      </n-gi>
    </n-grid>
  </n-card>
  <h2>&nbsp;&nbsp; General Display</h2>
  <n-card style="margin:5% 3%;width:94%">
    <n-grid :cols="6">
      <n-gi :span="2">
        <h4>Display Scale</h4>
      </n-gi>
      <n-gi :span="4">
        <h4>Zoom in: Ctrl/Shift/+</h4>
        <h4>Zoom out: Ctrl/-</h4>
      </n-gi>
    </n-grid>
  </n-card>
  <span style="white-space: pre-line">blank</span>
  <span style="white-space: pre-line">blank</span>
</template>
<style>
h4 {
  margin: 0;
}

</style>
