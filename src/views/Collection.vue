<template>
    <n-config-provider :theme="theme" :locate="zhCN">
        <div style="display: flex; width:100%; justify-content: space-between;">

            <div class="list-container" :class="{ 'expanded': isLeftExpanded, 'narrowed': isRightExpanded }">
                <n-button v-if="!isButtonHidden" style="padding:0!important" class="leftsidebar"
                    :class="{ 'is-button': isLeftExpanded, 'that-button': thatRightclick, }" @click="expandLeftSidebar">
                    <div v-if="!isDivHidden" style="font-size: 24px; color: #d4a827;">
                        Q <br> U<br> I<br> C<br> K<br> <br> R<br> E<br> V<br>I<br>E<br>W
                    </div>
                </n-button>
                <div v-if="isDivVisible" class="words">
                    <n-list clickable>
                        <n-collapse hoverable>
                            <n-list-item>
                                <n-collapse-item v-for="(item) in listItems" content-style="margin-top: 10px;">
                                    <template #header>
                                        {{ item.word }}
                                    </template>
                                    <n-thing style="margin-top: 4px; margin-left: 25px">
                                        <template #description>
                                            <n-space size="small" style="margin-top: 4px; margin-left: 0px">
                                                <n-tag :bordered="false" type="info" size="small">
                                                    {{ item.definition }}
                                                </n-tag>
                                            </n-space>
                                        </template>
                                        {{ item.example }}
                                    </n-thing>
                                </n-collapse-item>
                            </n-list-item>
                        </n-collapse>
                    </n-list>
                </div>
            </div>
            <div class="container" :class="{ 'narrowed': isLeftExpanded, 'expanded': isRightExpanded }">
                <n-button v-if="!isbuttonHidden" class="rightsidebar"
                    :class="{ 'is-button': isRightExpanded, 'that-button': thatLeftclick }" @click="expandRightSidebar">
                    <div v-if="!isdivHidden" style="font-size: 24px; color: #d4a827;">
                        I <br> M<br> M<br> E<br> R<br> S<br> E<br> D<br> <br>R<br>E<br>C<br>I<br>T<br>E I <br> M<br> M<br>
                        E<br> R<br> S<br> E<br> D<br> <br>R<br>E<br>C<br>I<br>T<br>E I <br> M<br> M<br> E<br> R<br> S<br>
                        E<br> D<br> <br>R<br>E<br>C<br>I<br>T<br>E
                    </div>
                </n-button>
                <div v-if="isdivVisible" class="showncard">
                    I <br> M<br> M<br> E<br> R<br> S<br> E<br> D<br> <br>R<br>E<br>C<br>I<br>T<br>EI <br> M<br> M<br>
                    E<br> R<br> S<br> E<br> D<br> <br>R<br>E<br>C<br>I<br>T<br>EI <br> M<br> M<br> E<br> R<br> S<br>
                    E<br> D<br> <br>R<br>E<br>C<br>I<br>T<br>E
                </div>
            </div>
        </div>
    </n-config-provider>
</template>

<script>
import { NButton, NIcon, NList, NThing, NTag, NListItem, } from 'naive-ui';
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

import axios from 'axios';
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);


export default {
    data() {
        return {
            isLeftExpanded: false,
            isRightExpanded: false,
            thatLeftclick: false,
            thatRightclick: false,
            isDivHidden: false,
            isdivHidden: false,
            isDivVisible: false,
            isdivVisible: false,
            isButtonHidden: false,
            isbuttonHidden: false,

            zhCN,
            dateZhCN,
            darkTheme,
            checkedBackground: null,
            theme: null,
            darkcolor: null,
        };
    }, created() {
        axios.get('../../data/setting.json')
            .then(response => {
                this.checkedBackground = response.data.checkedBackground;
                this.theme = this.checkedBackground === "Dark" ? darkTheme : null;
                this.darkcolor = response.data.checkedBackground === 'Dark' ? 'darkcolor' : null;
            })
            .catch(error => {
                console.error('Failed to fetch setting data:', error);
            });
        //下面获取所有的字典，从而查找收藏的单词在哪些字典中出现过

        axios.get('../../data/collection.json')
            .then(response => {
                this.listItems = response.data;
                console.log(this.listItems)
            })

            .catch(error => {
                console.error('Failed to fetch setting data:', error);
            });
    },
    methods: {
        expandLeftSidebar() {
            this.isLeftExpanded = true;
            this.isRightExpanded = false;
            this.thatLeftclick = true;
            this.thatRightclick = false;
            if (!this.isDivHidden) {
                this.isDivHidden = true;
            }
            if (!this.isButtonHidden) {
                this.isButtonHidden = true;
            }
            if (!this.isdivHidden) {
                this.isdivHidden = true;
            }
            this.isDivVisible = !this.isDivVisible;
            this.isdivVisible = false;
            this.isbuttonHidden = false;
        },
        expandRightSidebar() {
            this.isLeftExpanded = false;
            this.isRightExpanded = true;
            this.thatRightclick = true;
            this.thatLeftclick = false;
            if (!this.isDivHidden) {
                this.isDivHidden = true;
            }
            if (!this.isbuttonHidden) {
                this.isbuttonHidden = true;
            }
            if (!this.isdivHidden) {
                this.isdivHidden = true;
            }
            this.isdivVisible = !this.isdivVisible;
            this.isDivVisible = false;
            this.isButtonHidden = false;
        }
    },
    computed: {
        getmode() {
            return this.checkedBackground === "Dark" ? "list-item-2" : "list-item-1";
        }
    }
};

</script>

<style scoped>
.leftsidebar {
    height: 70vh;
    width: 50%;
    margin-top: 7%;
    margin-left: 7%;
    margin-right: auto;
    overflow: hidden;
    border-radius: 40px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s, width 0.3s;
    /* 添加过渡效果 */
    --n-color-hover: none !important;
    --n-border-hover: none !important;
    --n-text-color: none !important;
}

.leftsidebar.is-button {
    width: 80%;
    border-radius: 10px;
    /* 边框宽度和颜色 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    /* 阴影样式，可以根据需要调整参数 */
    overflow-y: auto;
    /* 允许垂直滚动 */

}

.leftsidebar.that-button {
    width: 85%;
    border-color: #F09C20;
    background-color: #faedc7;
    margin-top: 30px;
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

.leftsidebar.that-button:hover {
    background-color: inherit;
    border: none;
    cursor: default;
}

.rightsidebar {
    height: 70vh;
    width: 50%;
    margin-top: 7%;
    margin-right: 7%;
    margin-left: auto;
    overflow: hidden;
    border-radius: 40px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s, width 0.3s;
    /* 添加过渡效果 */
    --n-color-hover: none !important;
    --n-border-hover: none !important;
    --n-text-color: none !important;
}

.rightsidebar.is-button {
    width: 80%;
    border-radius: 10px;
    /* 边框宽度和颜色 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    /* 阴影样式，可以根据需要调整参数 */
    overflow-y: auto;
    /* 允许垂直滚动 */
}

.rightsidebar.that-button {
    width: 50%;
    border-color: #F09C20;
    background-color: #faedc7;
    margin-top: 30px;
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
}

.leftsidebar.that-button:hover {
    background-color: inherit;
    border: none;
    cursor: default;
}

.list-container {
    overflow-y: auto;
    max-height: calc(80vh);
    height: calc(80vh);
    /* 添加此行以设置固定高度 */
    margin-top: 5vh;
    width: 85%;
    margin-left: 3%;
    margin-right: auto;
    transition: width 0.3s ease;
    /* 添加过渡效果 */
}

.list-container.expanded {
    width: 85%;
    /* 设置扩大后的宽度 */
}

.list-container.narrowed {
    width: 5%;
}

.list-item {
    border: 1px solid #e0e0e0;
    padding: 10px;
    margin-bottom: 0;
    padding-bottom: 0;
    margin-top: 0px;
    margin-top: 0px;
    border-left: none;
    /* 添加这一行，使左边框消失 */
    border-right: none;
    width: 96.5%;
    /* 新增样式以限定边框并在内容超过宽度时换行 */
    word-wrap: break-word;
    word-break: break-all;
}

.list-item-1:hover {
    box-shadow: inset 0 5px 50px -5px rgba(0, 0, 0, 0.2),
        inset 0 -5px 5px -5px rgba(0, 0, 0, 0.2);

}

.list-item-2:hover {
    box-shadow: inset 0 5px 50px -5px rgba(255, 255, 255, 0.4),
        inset 0 -5px 5px -5px rgba(255, 255, 255, 0.4);
}

.thing {
    font-family: 'Arial', sans-serif;
}

.thing-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0px;
    text-align: left;
    /* 添加这一行，使标题文本居左 */
}

.thing-content {
    font-size: 14px;
    text-align: left;
    /* 添加这一行，使内容文本居左 */
    white-space: pre-wrap;
    /* 添加这一行，使内容保留换行符并在需要时换行 */
}

.description {
    margin-top: 10px;
}

.tag {
    display: inline-block;
    margin-right: 6px;
    margin-bottom: 0px;
    margin-top: 0px;
    padding: 4px 8px;
    background-color: #4CAF50;
    color: #fff;
    border-radius: 4px;
}

.words {
    margin-top: 1%;
    margin-left: 1%;
    height: 97%;
    width: 97%;
    border-radius: 10px;
    /* 边框宽度和颜色 */
    box-shadow: 0 0 10px rgba(0.3, 0, 0, 0.3);
    /* 阴影样式，可以根据需要调整参数 */
    overflow-y: auto;
    /* 允许垂直滚动 */
}

.container {
    overflow-y: auto;
    max-height: calc(80vh);
    height: calc(80vh);
    /* 添加此行以设置固定高度 */
    margin-top: 5vh;
    width: 85%;
    margin-right: 3%;
    margin-left: auto;
    transition: width 0.3s ease;
    /* 添加过渡效果 */
}

.container.narrowed {
    width: 5%;
}

.container.expanded {
    width: 85%;
    /* 设置扩大后的宽度 */
}

.showncard {
    margin-top: 1%;
    margin-left: 1%;
    height: 97%;
    width: 97%;
    border-radius: 10px;
    /* 边框宽度和颜色 */
    box-shadow: 0 0 10px rgba(0.3, 0, 0, 0.3);
    /* 阴影样式，可以根据需要调整参数 */
    overflow-y: auto;
    /* 允许垂直滚动 */
}
</style>
