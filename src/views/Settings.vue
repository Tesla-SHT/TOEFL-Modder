<!-- Setting.vue -->
<script>
import { defineComponent, ref } from "vue"; 
import axios from 'axios';
export default {

  setup() {
    const checkedValueRef1 = ref(null);
    const checkedValueRef2 = ref(null);
    const checkedValueRef3 = ref(null);
    const checkedValueRef4 = ref(null);

    return {
      disabled: ref(true),
      checkedAccent: checkedValueRef1,
      checkedSequence: checkedValueRef2,
      checkedPre: checkedValueRef3,
      checkedBackground: checkedValueRef4,
      handleAccent(e) {
        checkedValueRef1.value = e.target.value;
      },
      handleSequence(e) {
        checkedValueRef2.value = e.target.value;
      },
      handlePre(e) {
        checkedValueRef3.value = e.target.value;
      },
      handleBackground(e) {
        checkedValueRef4.value = e.target.value;
      }
    };
  },
  created() {
    axios.get('../../data/setting.json')
      .then(response => {
        this.newWordNumber = response.data.wordnumber; // 假设设置文件中有一个名为wordCount的字段
      })
      .catch(error => {
        console.error('Failed to fetch setting data:', error);
      });
  },
  data() {
    return {
      newWordNumber: 50,
      reviewWordNumber: 150
    }
  },
  methods: {
    updateWordNumber(event) {
      console.log(this.newWordNumber)
      $setting.updateWordNumber(this.newWordNumber)
    }
  }
}
</script>

<template>
  <h2>&nbsp;&nbsp; Study Preference</h2>
  <n-card style="margin:5% 3%;width:94%">
    <n-grid :cols="12">
      <n-gi :span="5">
        <h4>New Word Number</h4>
      </n-gi>
      <n-gi :span="7">
        <n-slider v-model:value="newWordNumber" :min="10" :max="200" :step="10" style="padding-top:9px"
          @click="updateWordNumber(event)" />
      </n-gi>
    </n-grid>
    <br>
    <n-grid :cols="12">
      <n-gi :span="5">
        <h4>Reviewing Word Number</h4>
      </n-gi>
      <n-gi :span="7">
        <n-slider v-model:value="reviewWordNumber" :min="10" :max="200" :step="10" style="padding-top:9px"
          @click="updateWordNumber(event)" />
      </n-gi>
    </n-grid>
    <br>
    <n-grid :cols="12">
      <n-gi :span="5">
        <h4>Pronunciation</h4>
      </n-gi>
      <n-gi :span="7">
        <n-space>
          <n-radio :checked="checkedAccent === 'American Accent'" value="American Accent" name="basic-demo"
            @change="handleAccent">
            American Accent
          </n-radio>
          <n-radio :checked="checkedAccent === 'English Accent'" value="English Accent" name="basic-demo"
            @change="handleAccent">
            English Accent
          </n-radio></n-space>
      </n-gi>
    </n-grid>
    <br>
    <n-grid :cols="12">
      <n-gi :span="5">
        <h4>Word Order</h4>
      </n-gi>
      <n-gi :span="7">
        <n-space>
          <n-radio :checked="checkedSequence === 'Alphabet Sequence'" value="Alphabet Sequence" name="basic-demo"
            @change="handleSequence">
            Alphabet Sequence
          </n-radio>
          <n-radio :checked="checkedSequence === 'Shuffled'" value="Shuffled" name="basic-demo" @change="handleSequence">
            Shuffled
          </n-radio></n-space>
      </n-gi>
    </n-grid>
    <br>
    <n-grid :cols="12">
      <n-gi :span="5">
        <h4>Study Order</h4>
      </n-gi>
      <n-gi :span="7">
        <n-space>
          <n-radio :checked="checkedPre === 'Review First'" value="Review First" name="basic-demo"
            @change="handlePre">
            Review First
          </n-radio>
          <n-radio :checked="checkedPre === 'New Word First'" value="New Word First" name="basic-demo" @change="handlePre">
            New Word First
          </n-radio></n-space>
      </n-gi>
    </n-grid>
  </n-card>
  <h2>&nbsp;&nbsp; General Display</h2>
  <n-card style="margin:5% 3%;width:94%">
    <n-grid :cols="12">
      <n-gi :span="5">
        <h4>Display Scale</h4>
      </n-gi>
      <n-gi :span="7">
        <h4>Zoom in: Ctrl/Shift/+ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Zoom out: Ctrl/-</h4>
        <h4></h4>
      </n-gi>
    </n-grid>
    <br>
    <n-grid :cols="12">
      <n-gi :span="5">
        <h4>Background</h4>
      </n-gi>
      <n-gi :span="7">
        <n-space>
          <n-radio :checked="checkedBackground === 'DayView'" value="DayView" name="basic-demo"
            @change="handleBackground">
            DayView
          </n-radio>
          <n-radio :checked="checkedBackground === 'NightView'" value="NightView" name="basic-demo" @change="handleBackground">
            NightView
          </n-radio>
          <n-radio :checked="checkedBackground === 'Eye-Protection Mode'" value="Eye-Protection Mode" name="basic-demo"
            @change="handleBackground">
            Eye-Protection Mode
          </n-radio></n-space>
      </n-gi>
    </n-grid>
  </n-card>
  <span style="white-space: pre-line">&nbsp;</span>
  <span style="white-space: pre-line">&nbsp;</span>
</template>
<style>
h4 {
  margin: 0;
}
</style>
