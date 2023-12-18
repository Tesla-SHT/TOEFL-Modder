<!-- Setting.vue -->
<script>
import { defineComponent, ref } from "vue";
import { computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
export default {
  setup() {

    return {
      disabled: ref(true),
      checkedAccent: ref(null),
      checkedSequence: ref(null),
      checkedPre: ref(null),
      checkedBackground: ref(null),
      newWordNumber: ref(null),
      reviewNumber: ref(null),
      theme: ref(null),
      checkedAuto: ref(null), zhCN,
      dateZhCN, darkTheme
    };
  },
  created() {
    /*axios.get('../../data/setting.json')
      .then(response => {
        this.newWordNumber = response.data.wordnumber; // 假设设置文件中有一个名为wordCount的字段
        this.reviewNumber = response.data.reviewnumber;
        this.checkedBackground = response.data.checkedBackground;
        this.theme = this.checkedBackground === "Dark" ? darkTheme : null;
        this.checkedAccent = response.data.accent==="2"?"American Accent":"English Accent";
        this.checkedSequence = response.data.sequence==="A"?"Alphabet Sequence":"Shuffled";
        this.checkedPre = response.data.order==="R"?"Review First":"New Word First";
      })
      .catch(error => {
        console.error('Failed to fetch setting data:', error);
      });*/
    $setting.getSettingData().then(val => {
      this.newWordNumber = val.wordnumber; // 假设设置文件中有一个名为wordCount的字段
      this.reviewNumber = val.reviewnumber;
      this.checkedBackground = val.checkedBackground;
      this.theme = this.checkedBackground === "Dark" ? darkTheme : null;
      this.checkedAccent = val.accent === "2" ? "American Accent" : "English Accent";
      this.checkedSequence = val.sequence === "A" ? "Alphabet Sequence" : "Shuffled";
      this.checkedPre = val.order === "R" ? "Review First" : "New Word First";
    }).catch(error => {
      console.error('Failed to fetch setting data:', error);
    });
  },
  data() {
    return {
    }
  },
  watch: {
    newWordNumber(newVal) {
      this.updateWordNumber(event);
    },
    reviewNumber(newVal) {
      this.updateReviewNumber(event);
    }
  },
  methods: {
    updateWordNumber(event) {
      $setting.updateWordNumber(this.newWordNumber)
    },
    updateReviewNumber(event) {
      $setting.updateReviewNumber(this.reviewNumber)
    },
    handleBackground(event, background) {
      //console.log(background)
      this.checkedBackground = background;
      this.theme = this.checkedBackground === "Dark" ? darkTheme : null;
      $setting.updateBackground(background)
      location.reload()
    },
    clearData(event) {
      $setting.clearData()
      location.reload()
    },
    handleAccent(event, accent) {
      this.checkedAccent = (accent === '2') ? "American Accent" : "English Accent";
      $setting.updateAccent(accent)
    },
    handleSequence(event, sequence) {
      this.checkedSequence = (sequence === 'A') ? "Alphabet Sequence" : "Shuffled";
      $setting.updateSequence(sequence)
    },
    handlePre(event, pre) {
      this.checkedPre = (pre === 'R') ? "Review First" : "New Word First";
      $setting.updatePre(pre)
    }
  }
}
</script>

<template>
  <n-config-provider :theme="theme" :locate="zhCN">
    <n-card :bordered="false" style="background:transparent">
      <n-collapse arrow-placement="right" :default-expanded-names="['2', '1']">
        <n-collapse-item name="1">
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
                <n-slider v-model:value="newWordNumber" :min="5" :max="200" :step="5" style="padding-top:9px"
                  @click="updateWordNumber(event)" />
              </n-gi>
            </n-grid>
            <br>
            <n-grid :cols="12">
              <n-gi :span="5">
                <h4>Reviewing Word Number</h4>
              </n-gi>
              <n-gi :span="7">
                <n-slider v-model:value="reviewNumber" :min="5" :max="200" :step="5" style="padding-top:9px"
                  @click="updateReviewNumber(event)" />
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
                    @change="handleAccent(event, '2')">
                    American Accent
                  </n-radio>
                  <n-radio :checked="checkedAccent === 'English Accent'" value="English Accent" name="basic-demo"
                    @change="handleAccent(event, '1')">
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
                    @change="handleSequence(event, 'A')">
                    Alphabet Sequence
                  </n-radio>
                  <n-radio :checked="checkedSequence === 'Shuffled'" value="Shuffled" name="basic-demo"
                    @change="handleSequence(event, 'S')">
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
                    @change="handlePre(event, 'R')">
                    Review First
                  </n-radio>
                  <n-radio :checked="checkedPre === 'New Word First'" value="New Word First" name="basic-demo"
                    @change="handlePre(event, 'N')">
                    New Word First
                  </n-radio></n-space>
              </n-gi>
            </n-grid>
          </n-card>
        </n-collapse-item>
        <n-collapse-item name="2" style="margin-bottom:50px;">
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
              <n-gi :span="7">
                <n-space>
                  <n-popconfirm @positive-click="clearData" positive-text="Confirm" negative-text="Cancel">
                    <template #trigger>
                      <n-button size="small">Clear</n-button>
                    </template>
                    <div style="color:rgb(223, 0, 0)">
                      If you confirm this button, all learning data would be deleted<br> and you
                      need to restart your learning progress!
                    </div>
                  </n-popconfirm>
                </n-space>
              </n-gi>
            </n-grid>
          </n-card>
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </n-config-provider>
</template>
<style>
h4 {
  margin: 0;
}
</style>
