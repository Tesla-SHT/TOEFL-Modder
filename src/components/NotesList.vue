<script setup>
import Icon from './Icon.vue'
import { ref, onMounted, watch } from 'vue';
import { useSettings } from '/src/composables/settings'; // Assuming you have a composable for settings

const settings = useSettings(); // Use the composable to get the settings
const { data, clicked } = defineProps(['data', 'clicked'])

const time = ref(0); // Define time as a reactive ref
function updateday(event, tdata, index, title) {
    const timedata = Object.values(tdata);
    const currenttime = new Date();
    time.value = currenttime.toLocaleDateString();
    let flag = 0;
    for (let i = 0; i < timedata.length; i++) {
        console.log(timedata[i])
        if (timedata[i] === time.value) {
            console.log("已经有了");
            flag = 1;
            break;
        }
    }
    if (!flag) {
        $data.updateTime(index, time.value);
    }
    $data.createReview(index, title);
}
</script>
<template>
    <div class="container"><!-- -->
        <div class="item" v-for="item, index in data" @click="$emit('selected', $event, index, item.title);
        updateday(event, item.time, index, item.title)">
            <n-layout has-sider class="wordlist">
                <n-layout-sider :width="230" content-style="padding:24px 24px 24px 0;background-color:transparent">

                    <div class="title">{{ item.title }}</div>
                </n-layout-sider>
                <n-layout style="margin-top:20px">
                    <p class="learn-day">{{ "You have learnt " + item.learnday + " days, " + item.learnword + " words, " }}
                    </p>
                    <p class="learn-word">{{ item.learnword }}</p>
                    <!--<Icon class="delete-icon" name="delete" color="black" selectedColor="#cc0000"></Icon>-->
                </n-layout>
            </n-layout>
        </div>
    </div>
</template>

<style scoped>
.item {
    position: relative;
    margin: 15px 15px;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    transition: 0.1s;
}

.item {
    border: 1px solid transparent;
}

.item:hover {
    border: 1px solid rgb(255, 192, 1)
}

/* 设定列表第一项与上方距离 */
.item:first-child {
    margin-top: 0px;
}

/* 设定列表最后项与下方距离 */
.item:last-child {
    margin-bottom: 60px;
}

.title {
    margin-top: 0px;
    margin-left: 15px;
    margin-right: 0px;

    font-size: 18px;
    font-weight: 600;

    display: block;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.content {
    margin-top: 6px;
    margin-left: 15px;
    margin-right: 50px;
}

.title,
.content {
    display: block;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.learn-word,
.learn-day {
    margin: 0;
    margin-left: 15px;
}


.delete-icon {
    position: absolute;
    right: 15px;
    top: calc(50% - 11px);
    width: 22px;
    height: 22px;
    user-select: none;
}
</style>