<script>
import { NButton, NIcon } from 'naive-ui'

export default {
    components: {
        NButton,
        NIcon,
    },
    data() {
        return {
            buttonStyle: {
                width: '195px',
                height: '310px',
                borderRadius: '8px',
                color: '#FFD700', // 初始颜色，例如黄色
                borderColor: '#FFD700',
                fontSize: '24px',
                borderWidth: '16px', // 设置边框宽度，例如2像素
            },
            hoverStyle: {
                color: '#FFD700', // 悬停时颜色，与初始颜色一致
                borderColor: '#FFD700',
                borderWidth: '16px', // 设置悬停状态下的边框宽度，例如4像素
            },
        }
    },
}

</script>
<template>
    <n-card style="margin:5% 3%;width:94%;" hoverable>
        <n-grid :cols="6">
            <n-gi :span="6">
                <h3 align="center">You Have Met TOEFL-Modder for _ Days!</h3>
            </n-gi>
        </n-grid>
    </n-card>
    <div>
        <div style="display: flex;">
            <n-card style="margin:5% 3%;width:35%;height:350px; margin-top: 5px;" hoverable>
                <div>
                    <n-button :style="buttonStyle" :hover-style="hoverStyle">
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
                </div>
            </n-card>
            <n-card style="margin:5% 3%;width:50%;height:350px; margin-top: 5px;" hoverable>
                <n-grid :cols="1">
                    <n-gi :span="8">
                        <h3 align="center">Monthly Progress</h3>
                    </n-gi>
                </n-grid>
                <n-grid :cols="1">
                    <n-gi :span="8">
                        <h3 align="center">Weekly Progress</h3>
                    </n-gi>
                </n-grid>
            </n-card>
        </div>
    </div>
    <n-card style="margin:5% 3%;width:94%; margin-top: 5px;" hoverable>
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
    </n-card>
    <div>
        6
    66

</div></template>
<style></style>
