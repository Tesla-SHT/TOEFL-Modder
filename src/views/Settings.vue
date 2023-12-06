<!-- Setting.vue -->
<script>
import { defineComponent, ref } from "vue";
import { computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
export default {
  setup() {
    const checkedValueRef1 = ref(null);
    const checkedValueRef2 = ref(null);
    const checkedValueRef3 = ref(null);
    const checkedValueRef4 = ref(null);
    const checkedValueRef5 = ref(null);

    return {
      disabled: ref(true),
      checkedAccent: checkedValueRef1,
      checkedSequence: checkedValueRef2,
      checkedPre: checkedValueRef3,
      checkedBackground: checkedValueRef4,
      checkedAuto: checkedValueRef5,
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
      },
      handleAuto(e) {
        checkedValueRef5.value = e.target.value;
      }, zhCN,
      dateZhCN, darkTheme
    };
  },
  created() {
    axios.get('../../data/setting.json')
      .then(response => {
        this.newWordNumber = response.data.wordnumber; // 假设设置文件中有一个名为wordCount的字段
        this.checkedBackground = response.data.checkedBackground;
        this.theme = this.checkedBackground === "Dark" ? darkTheme : null;
      })
      .catch(error => {
        console.error('Failed to fetch setting data:', error);
      });
  },
  data() {
    return {
      newWordNumber: 50,

      reviewWordNumber: 150,
      theme: null
    }
  },
  methods: {
    updateWordNumber(event) {
      console.log(this.newWordNumber)
      $setting.updateWordNumber(this.newWordNumber)
    },
    handleBackground(event, background) {
      console.log(background)

      this.checkedBackground = background; this.theme = this.checkedBackground === "Dark" ? darkTheme : null;
      $setting.updateBackground(background)
      location.reload()
    },
    clearData(event){
      $setting.clearData()
    }
  }
}
</script>

<template>
  <n-config-provider :theme="theme" :locate="zhCN">
    <n-card :bordered="false" style="background:transparent">
      <n-collapse arrow-placement="right" :default-expanded-names="['2', '1']">
        <n-collapse-item name="1" >
          <template #header>
            <n-h2 style="margin:0;">
              <b>Study Preference</b>
            </n-h2>
          </template>
          <n-card>

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
                <h4>Automatic Pronunciation</h4>
              </n-gi>
              <n-gi :span="7">
                <n-space>
                  <n-radio :checked="checkedAuto === 'Enabled'" value="Enabled" name="basic-demo" @change="handleAuto">
                    Enabled
                  </n-radio>
                  <n-radio :checked="checkedAuto === 'Disabled'" value="Disabled" name="basic-demo" @change="handleAuto">
                    Disabled
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
                  <n-radio :checked="checkedSequence === 'Shuffled'" value="Shuffled" name="basic-demo"
                    @change="handleSequence">
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
                  <n-radio :checked="checkedPre === 'New Word First'" value="New Word First" name="basic-demo"
                    @change="handlePre">
                    New Word First
                  </n-radio></n-space>
              </n-gi>
            </n-grid>
          </n-card>
        </n-collapse-item>
        <n-collapse-item name="2" style="padding-bottom:0;">
          <template #header>
            <n-h2 style="margin:0;">
              <b> General Display</b>
            </n-h2>
          </template>
          <n-card>
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
                  <n-radio :checked="checkedBackground === 'Light'" value="Light" name="basic-demo"
                    @change="handleBackground(event, 'Light')">
                    Light Mode
                  </n-radio>
                  <n-radio :checked="checkedBackground === 'Dark'" value="Dark" name="basic-demo"
                    @change="handleBackground(event, 'Dark')">
                    Dark Mode
                  </n-radio>
                </n-space>
              </n-gi>
            </n-grid>
            <br>

            <n-grid :cols="12">
              <n-gi :span="5" style="display:flex; align-items: center">
                <h4>Clear Progress Data</h4>
              </n-gi>
              <n-gi :span="7"><n-space ><n-button size="small" @click="clearData">Clear</n-button></n-space></n-gi>
            </n-grid>
          </n-card>
        </n-collapse-item>
      </n-collapse>
    </n-card>
    <span style="white-space: pre-line">&nbsp;</span>
    <span style="white-space: pre-line">&nbsp;</span>
  </n-config-provider>
</template>
<style>
h4 {
  margin: 0;
}
</style>
