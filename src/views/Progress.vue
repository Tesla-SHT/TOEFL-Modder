<script>
import { NButton, NHr, NIcon, useMessage } from "naive-ui";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";

import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
import axios from 'axios';
use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);

export default {
    components: {
        NButton,
        NIcon,
        VChart,
        NHr
    },
    setup: () => {

        const option = ref({
            title: {
                text: "Total Progress",
                left: "center"
            },
            tooltip: {
                trigger: "item",
                formatter: "{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: "Dictionary",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "60%"],
                    data: [],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                }
            ]
        });
        const numberAnimationInstRef = ref(null);
        return {
            numberAnimationInstRef, option,
            zhCN,
            dateZhCN,
            darkTheme,

            //value: ref(addDays(Date.now(), 1).valueOf()),
            /*isDateDisabled(timestamp) {
                if (isYesterday(timestamp)) {
                    return true;
                }
                return false;
            }*/
        };
    }, created() {
        axios.get('../../data/setting.json')
            .then(response => {
                this.theme = response.data.checkedBackground === 'Dark' ? darkTheme : null;
            })
            .catch(error => {
                console.error('Failed to fetch setting data:', error);
            });

        axios.get('../../data/notes.json')
            .then(response => {
                const notes = response.data;
                const timeRecords = notes.map(book => book.time);
                var allTimes = Array.from(new Set(timeRecords.flat()));
                //total days
                this.totaldays = allTimes.length;
                //continuous days
                var todayDate = new Date(); //今天
                var nowDataArr = [todayDate.getFullYear(), todayDate.getMonth() + 1, todayDate.getDate()] //今天的 年 月 日
                for (var k = 0; k < allTimes.length; k++) {
                    var flag = false;
                    for (var i = 0; i < allTimes.length; i++) {
                        let activeArr = allTimes[i].split('/');
                        //console.log(activeArr);
                        if (nowDataArr[0] == activeArr[0] && nowDataArr[1] == activeArr[1] && nowDataArr[2] == activeArr[2]) {
                            this.continuous++;
                            flag = true;
                            break;
                        }

                    }
                    if (!flag) break;
                    todayDate = new Date(todayDate.setTime(todayDate.getTime() - 24 * 60 * 60 * 1000))
                    nowDataArr = [todayDate.getFullYear(), todayDate.getMonth() + 1, todayDate.getDate()]
                    //console.log(nowDataArr);
                }
            })
            .catch(error => {
                console.error('获取时间记录出错：', error);
            });
        axios.get('../../data/records.json')
            .then(response => {
                const records = response.data;
                var i;
                var j;
                var bookName = {};
                var timestamp;
                //获取每个词书中单词的数量

                var ans = 0;
                for (i = 0; i < records.length; i++) {
                    bookName[records[i].dict] = records[i].words.length;
                    for (j = 0; j < records[i].words.length; j++) {
                        this.totalaccuracy += records[i].words[j].acc;
                        timestamp = new Date(records[i].words[j].last_time);
                        //console.log((timestamp.getFullYear()-2000)*400+(timestamp.getMonth()+1)*32+timestamp.getDate());
                        this.timeWord[(timestamp.getFullYear() - 2000) * 400 + (timestamp.getMonth() + 1) * 32 + timestamp.getDate()]++;
                        //console.log(this.timeWord[(timestamp.getFullYear()-2000)*400+(timestamp.getMonth()+1)*32+timestamp.getDate()]);
                        ans++;
                    }
                }
                if (ans > 0)
                    this.totalaccuracy = (this.totalaccuracy / ans * 100).toFixed(10);
                //将词书名和单词数量转化为echarts所需的格式
                for (var key in bookName) {
                    this.option.series[0].data.push({ name: key, value: bookName[key] });
                }
                //console.log(this.option.series[0].data);
            })
    },
    data() {
        return {
            buttonStyle: {
                width: '100%',
                height: '310px',
                borderRadius: '8px',
                color: '#FFD700', // 初始颜色，例如黄色
                borderColor: 'transparent!important',
                fontSize: '24px',
                borderWidth: '16px', // 设置边框宽度，例如2像素
            },
            hoverStyle: {
                color: '#FFD700', // 悬停时颜色，与初始颜色一致
                borderColor: '#FFD700',
                borderWidth: '16px', // 设置悬停状态下的边框宽度，例如4像素
            },
            theme: null,
            totaldays: 0,
            totalaccuracy: 0,
            continuous: 0,
            timeWord: new Array(100 * 400 * 32 * 12).fill(0),
        }
    },
    methods: {
        navigateToNewPage() {
            // 使用编程式导航跳转到新页面
            this.$router.push({ name: 'collection' })
        },
    },
}



</script>
<template>
    <n-config-provider :theme="theme" :locate="zhCN">
        <n-card style="margin:1% 3%;width:94%;" hoverable class="card">
            <n-grid :cols="6">
                <n-gi :span="6">
                    <h3 align="center">
                        <n-statistic tabular-nums>
                            <template #prefix>
                                You have met TOEFL-Modder for
                            </template>
                            <n-gradient-text type="warning"><n-number-animation ref="numberAnimationInstRef" :from="0"
                                    :to="totaldays" /></n-gradient-text>
                            <template #suffix>
                                days!
                            </template>
                        </n-statistic>
                    </h3>
                </n-gi>
            </n-grid>
            <!--<n-grid :cols="6">
                <n-gi :span="3" style="text-align:center">Total Accuracy:</n-gi>
                <n-gi :span="3" style="text-align:center">Continuous Study Day:{{ }}</n-gi>
            </n-grid>-->
        </n-card>
        <div>
            <div style="display: flex;">
                <n-card style="margin:5% 3%;width:35%;height:350px; margin-top: 5px;" hoverable class="card">
                    <n-button :style="buttonStyle" :hover-style="hoverStyle" @click="navigateToNewPage" type="warning"
                        ghost>
                        <n-icon name="heart" />
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 12 12">
                            <g fill="none">
                                <path
                                    d="M5.283 1.546a.8.8 0 0 1 1.435 0L7.83 3.798l2.486.361a.8.8 0 0 1 .443 1.365L8.96 7.277l.425 2.476a.8.8 0 0 1-1.16.844L6 9.427l-2.224 1.17a.8.8 0 0 1-1.16-.844l.424-2.476l-1.799-1.753a.8.8 0 0 1 .444-1.365l2.486-.36l1.111-2.253z"
                                    fill="currentColor"></path>
                            </g>
                        </svg> Collection
                    </n-button>
                </n-card>
                <n-card style="margin:5% 3%;width:50%;height:350px; margin-top: 5px;" hoverable class="card">
                    <v-chart class="chart" :option="option" />
                    <n-grid :cols="1">
                        <n-gi :span="8">
                            <h3 align="center">Total Accuracy: <n-gradient-text type="warning"><n-number-animation
                                        ref="numberAnimationInstRef" :from="0" :to="totalaccuracy"
                                        :precision="2" />%</n-gradient-text></h3>
                            <h3 align="center">Continuous Study Day: <n-gradient-text type="warning"><n-number-animation
                                        ref="numberAnimationInstRef" :from="0" :to="continuous" /></n-gradient-text></h3>
                        </n-gi>
                    </n-grid>

                </n-card>
            </div>
        </div>
        <n-card style="margin:1% 3%;width:94%;" hoverable>
            <n-calendar v-model:value="value" :default=null :default-value=null #="{ year, month, date }">
                <n-gradient-text type="error">{{ timeWord[(year - 2000) * 400 + month * 32 + date] }}</n-gradient-text><p style="margin:0px">words</p>
            </n-calendar>
        </n-card>
        <!--<n-card style="margin:5% 3%;width:94%; margin-top: 5px;" hoverable>
            <n-grid :cols="17">
                <n-gi :span="8">
                    <h3 align="center">Accuracy</h3>
                </n-gi>
                <n-gi :span="1">
                </n-gi>
                <n-gi :span="8">
                    <h3>Total Study Time</h3>
                    <h3>Total Study Day</h3>
                    <h3>Continuous Study Day </h3>
                </n-gi>
            </n-grid>
        </n-card>-->
        <br>
        <br>
        <br>
    </n-config-provider>
</template>
<style>
.chart {
    height: 200px;
}
.n-calendar {
    height:580px!important
}

.card {
    border-color: blue;
}
</style>
