<script setup>
import { ref } from 'vue'

import Icon from './Icon.vue'

const emit = defineEmits(['selected'])

const { pages, defaultIndex, iconcolor } = defineProps(['pages', 'defaultIndex', 'iconcolor'])

const activeIndex = ref(defaultIndex)

const changeIndex = (index) => {
    activeIndex.value = index
    emit('selected', index)
}
</script>

<template>
    <div class="container">
        <div :class="{ 'item': true, 'isSelected': index == activeIndex, 'dark':iconcolor == 'white', 'darkSelect': (index == activeIndex)&&(iconcolor=='white')  }" v-for="item, index in pages"
            @click="changeIndex(index)" >
            <div class="inner-container">
                <Icon class="icon" :name="item.icon" :color="iconcolor"></Icon>
                <div class="title" :to="item.path">{{ item.name }}</div>
            </div>
        </div>
        <!-- 每次选择后动态计算指示条的位置 -->
        <div class="indicator-bar" :style="{ 'top': activeIndex * 45 + (activeIndex + 1) * 5 + 'px' }"></div>
    </div>
</template>

<style scoped>
.dark:hover, .darkSelect{
    background-color:#756C4B!important;
}
.container {
    position: relative;
}

.item {
    margin: 5px;
    margin-top: 10px;
    height: 40px;
    border: 1px solid white;
    border-top:0px;
    border-bottom:0px;
    border-radius: 7px;
    transition: 0.1s;
}

.item:hover {
    background-color: #faedc7;
}

.isSelected {
    background-color: #faedc7;
}

.indicator-bar {
    position: absolute;
    left: 10px;

    height: 30px;
    width: 5px;

    background-color: #d4a827;
    border-radius: 3px;
    transition: 0.1s;
}

.inner-container {
    margin-left: 50px;
    display: inline-flex;
}

.title {
    margin-left: 15px;

    line-height: 40px;
    font-weight: 600;
}

.icon {
    width: 23px;
    height: 23px;
    margin-top: 9px;
}
</style>