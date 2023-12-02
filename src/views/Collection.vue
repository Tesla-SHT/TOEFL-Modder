<template>
    <div>
        <div style="display: flex; width:100%; justify-content: space-between;">
            <n-button class="leftsidebar" :class="{ 'is-button': isLeftExpanded,'that-button':thatRightclick }" hoverable @click="expandLeftSidebar">
                <div style="font-size: 24px; color: #d4a827;">
                    Q <br> U<br> I<br> C<br> K<br> <br> R<br> E<br> V<br>I<br>E<br>W
                </div>
            </n-button>
            <n-button class="rightsidebar" :class="{ 'is-button': isRightExpanded,'that-button':thatLeftclick }" hoverable @click="expandRightSidebar">
                <div style="font-size: 24px; color: #d4a827;">
                    I <br> M<br> M<br> E<br> R<br> S<br> E<br> D<br> <br>R<br>E<br>C<br>I<br>T<br>E
                </div>
            </n-button>
        </div>
    </div>
</template>

<script>
import { NButton, NIcon } from 'naive-ui';
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
    },
    data() {
        return {
            isLeftExpanded: false,
            isRightExpanded: false,
            thatLeftclick: false,
            thatRightclick: false,
        };
    },
    methods: {
        expandLeftSidebar() {
            this.isLeftExpanded = true;
            this.isRightExpanded = false;
            this.thatLeftclick= true;
            this.thatRightclick= false;
        },
        expandRightSidebar() {
            this.isLeftExpanded = false;
            this.isRightExpanded = true;
            this.thatRightclick= true;
            this.thatLeftclick= false;
        },
    },
};
</script>

<style scoped>
.chart {
    height: 200px;
}

.leftsidebar {
    height: 70vh;
    margin-top: 10vh;
    width: 30%;
    margin-left: 7%;
    margin-right: auto;
    overflow: hidden;
    border-radius: 40px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s, width 0.3s;
    /* 添加过渡效果 */
}

.leftsidebar.is-button {
    width: 80%;
}

.leftsidebar.that-button {
    width: 5%;
}

.leftsidebar:hover {
    background-color: #faedc7;
    border: solid #F09C20;
    /* 设置边框宽度和颜色 */
}

.leftsidebar::before {
    content: "";
    position: absolute;
    top: 10%;
    left: 2%;
    height: 80%;
    width: 6px;
    /* 定义竖线的宽度 */
    background-color: #d4a827;
    /* 竖线的颜色 */
    border-radius: 5px 5PX 5PX 5px;
    /* 圆角效果，可根据需要调整 */
    opacity: 0;
    /* 初始时隐藏竖线 */
    transition: opacity 0.3s;
    /* 添加过渡效果 */
}

.leftsidebar:hover::before {
    opacity: 1;
    /* 悬停时显示竖线 */
}

.rightsidebar {
    height: 70vh;
    margin-top: 10vh;
    width: 30%;
    margin-right: 7%;
    margin-left: auto;
    overflow: hidden;
    border-radius: 40px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s,width 0.3s;
    /* 添加过渡效果 */
}

.rightsidebar.is-button {
    width: 80%;
}

.rightsidebar.that-button {
    width: 5%;
}

.rightsidebar:hover {
    background-color: #faedc7;
    border: solid #F09C20;
    /* 设置边框宽度和颜色 */
}

.rightsidebar::before {
    content: "";
    position: absolute;
    top: 10%;
    right: 2%;
    height: 80%;
    width: 6px;
    /* 定义竖线的宽度 */
    background-color: #d4a827;
    /* 竖线的颜色 */
    border-radius: 5px 5PX 5PX 5px;
    /* 圆角效果，可根据需要调整 */
    opacity: 0;
    /* 初始时隐藏竖线 */
    transition: opacity 0.3s;
    /* 添加过渡效果 */
}

.rightsidebar:hover::before {
    opacity: 1;
    /* 悬停时显示竖线 */
}</style>
