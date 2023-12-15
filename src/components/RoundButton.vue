<template>
    <div class="container" @mouseover="showPopover" @mouseleave="hidePopover">
      <n-popover v-model="isPopoverVisible" trigger="manual" placement="top">
        <template #trigger>
          <Icon class="icon" :name="icon" :color="iconColor" :selected-color="iconColor"></Icon>
        </template>
      </n-popover>
    </div>
  </template>
  
  <script setup>
  import Icon from './Icon.vue'
  import { ref } from 'vue'
  
  const { icon, color, selectedColor, iconColor, size } = defineProps(['title', 'icon', 'color', 'selectedColor', 'iconColor', 'size'])
  
  const height = size + 'px'
  const radius = Number(size) / 2 + 'px'
  const isPopoverVisible = ref(false)
  
  const showPopover = () => {
    isPopoverVisible.value = true
  }
  
  const hidePopover = () => {
    isPopoverVisible.value = false
  }
  </script>
  
  <style scoped>
  .container {
    height: v-bind(height);
    width: v-bind(height);
    border-radius: v-bind(radius);
    background-color: v-bind(color);
    text-align: center;
    transition: 0.1s;
    position: relative; /* 添加相对定位，使得弹出说明可以相对于这个容器定位 */
  }
  
  .container:hover {
    background-color: v-bind(selectedColor);
  }
  
  .icon {
    width: 100%;
    height: 100%;
  }
  
  /* 样式调整，让说明显示在触发区域上方 */
  .n-popover-content {
    top: -10px;
  }
  </style>
  