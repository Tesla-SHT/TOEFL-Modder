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
                    <n-card class="WordCard" >
                        <div class="word-title" v-for="(item, index) in words" :key="index">
                            <h1>{{ word.word }}</h1>
                        </div>
                        <div class="word-content">
                            <div class="word-detail" v-for="(item, index) in words" :key="index">
                                <n-h5 prefix="bar">
                                    {{ item.definition }}
                                </n-h5>
                                <n-h6 prefix="bar">
                                    {{ item.example }}
                                </n-h6>
                            </div>
                        </div>
                    </n-card>
                </div>
            </div>
        </div>
    </n-config-provider>
</template>

<script>

import { reactive, onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NButton, NIcon, NList, NThing, NTag, NListItem, } from 'naive-ui';
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from "echarts/components";

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
    /*setup() {

        const route = useRoute()
        const router = useRouter()

        const index = route.params.index

        const note = reactive({ title: '', content: '', definition: '', example: '' })
        const wordsData = reactive([])
        let wordnumber = 0;
        let wordnumberRemain = 0;
        const options = ref([]);
        let collection = []
        let bin = []
        let wordArrange = []
        let currentWordIndex = ref(0);
        let currentIndex = 0

        onMounted(async function () {
            if (index === -1) return
            const data = (await $data.getNotes())[index]
            note.title = data.title
            // 确保 note.content 初始化成功
            console.log('Initial note.content:', note.content);

            try {
                //get wordbook's words
                const response = await fetch(data / collection.json);
                const jsonData = await response.json();
                wordsData.push(...jsonData);
                wordnumber = (await $setting.getSettingData()).wordnumber;
                //get reviewing words
                await $collect.getCollectionList().then(result => {
                    ExposeCollection(result)
                });
                await $delete.getBinList().then(result => {
                    ExposeBin(result)
                });


                wordnumberRemain = wordnumber;
                //for (let i = 0; i < wordsData.length; i++) {wordArrange.push(i);}
                //wordArrange = getRandomElements(wordArrange, wordArrange.length);//arrange shuffle
                //wordArrange.push(-1);//end of arrange
                wordArrange = await $record.load_arrange(note.title, wordsData.length, wordnumber)
                showNextWord(); // 显示第一个单词

            } catch (error) {
                console.error(error)
            }

        })

        let collectflag = false
        function ExposeCollection(result) {
            collection = result
        }

        let validflag = false
        function ExposeBin(result) {
            bin = result
        }
        //console.log(collection)
        function showCurrentWord() {
            //if (currentWordIndex >= 0 && currentWordIndex < wordsData.length) {
            return wordsData[currentWordIndex.value].Words
            //}
            //return ''
        }

        function showCurrentDefinition() {
            // console.log(currentWordIndex);
            //if (currentWordIndex >= 0 && currentWordIndex < wordsData.length) {
            return wordsData[currentWordIndex.value].Definitions
            //}
            //return ''
        }

        function showCurrentExample() {
            //if (currentWordIndex >= 0 && currentWordIndex < wordsData.length) {
            return wordsData[currentWordIndex.value].Example
            //}
            //return ''
        }
        function showNextWord() {
            setTimeout(() => {
                validflag = false;
                while (!validflag) {
                    //currentWordIndex++;
                    currentWordIndex.value = wordArrange[currentIndex];
                    //console.log(currentWordIndex.value);
                    if (currentWordIndex.value < 0) {
                        console.log("end of dictionary");
                        break;
                    }
                    validflag = true
                    let tempWord = showCurrentWord();
                    for (let i = 0; i < bin.length; i++) {
                        if (bin[i] == tempWord) {
                            validflag = false;
                            break;
                        }
                    }
                    currentIndex++;
                }
                console.log(wordnumber, wordnumberRemain);
                if (wordnumberRemain <= 0) {
                    console.log(wordnumber);
                    router.back();
                    wordnumberRemain = wordnumber;
                }
                wordnumberRemain--;
                if (validflag) {
                    note.content = showCurrentWord();
                    note.definition = showCurrentDefinition();
                    note.example = showCurrentExample();
                } else {
                    note.content = '';
                    note.definition = '';
                    note.example = '';
                    router.back;
                    currentIndex = 0;
                }
                collectflag = false;
                //console.log(collection);
                for (let i = 0; i < collection.length; i++) {
                    if (collection[i] == note.content) {
                        //console.log("check" + collectflag);
                        collectflag = true;
                        break;
                    }
                }      // Generate options
                const allOptions = wordsData.map(word => word.Definitions).flat();
                const randomOptions = getRandomElements(allOptions, 6);
                {
                    let existflag = false
                    for (let i in randomOptions) {
                        if (i == note.definition) existflag = true
                    }
                    if (!existflag) {
                        const randomIndex = Math.floor(Math.random() * randomOptions.length);
                        randomOptions[randomIndex] = note.definition;
                        options.value = randomOptions;
                    }
                }
            }, 200);
        }

        function getRandomElements(array, count) {
            const shuffled = array.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }
        return {
            note,
            currentWordIndex,
            showNextWord,
            collectflag,
            validflag,
            options, zhCN,
            dateZhCN, darkTheme
        }
    },*/
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

            /*collecting: this.collectflag, // Flag to track if the collect button is being clicked
            deleting: false, // Flag to track if the delete button is being clicked
            audioBaseUrl: 'http://dict.youdao.com/dictvoice?type=',
            audioword: this.note.content,
            audioaccent: "1",
            answercolor: true,
            iconcolor: null,*/

            words: [], // 这里是一个数组
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
        axios.get('../../data/collection.json')
            .then(response => {
                const firstItem = response.data[0];
                this.words = [{
                    word: firstItem.word,
                    definition: firstItem.definition,
                    example: firstItem.example
                }];
                console.log(this.words);
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
        },
        /*playAudio(word) {
            this.audioword = word
            const audioElement = this.$refs.audioPlayer
            audioElement.play()
        },
        collectWord(event, word, definition, example) {

            //console.log("collectWord")
            if (!this.collecting) {
                console.log("add to collection")
                this.collecting = true
                $collect.addToCollection(word, definition, example)
            }
            else {
                console.log("delete from collection")
                this.collecting = false
                $collect.deleteFromCollection(word, definition, example)
            }
        },
        deleteWord(event, word, title) {
            if (!this.deleting) {
                this.deleting = true
                $delete.addToBin(word)
                $record.addWordNumber(title)
                console.log("delete " + this.deleting)
            }
            else {
                this.deleting = false
                $delete.deleteFromBin(word)
            }
        },
        refreshIcon(event) {
            setTimeout(() => {
                const choice = document.getElementsByClassName('word-choice');
                choice[0].classList.remove('conceal');
                choice[0].classList.add('reveal');

                const detail = document.getElementsByClassName('word-detail');
                detail[0].classList.remove('reveal');
                detail[0].classList.add('conceal');
                console.log(this.collection)
                this.collecting = this.collectflag
                console.log(this.collecting)
                this.deleting = false
            }, 200)
        },
        checkAnswer(event, correct, answer, wordindex) {
            if (correct === answer) {
                this.answercolor = true;
                this.$nextTick(() => {
                    const buttons = document.getElementsByClassName('word-option');
                    for (let i = 0; i < buttons.length; i++) {
                        if (buttons[i].textContent === correct) {
                            buttons[i].classList.add('correct');
                        }
                    }
                    setTimeout(() => {
                        // Replace the buttons with the word's definition and example
                        // Implement your logic here
                        const choice = document.getElementsByClassName('word-choice');
                        //console.log(choice);
                        choice[0].classList.remove('reveal')
                        choice[0].classList.add('conceal');
                        const detail = document.getElementsByClassName('word-detail');
                        detail[0].classList.remove('conceal');
                        detail[0].classList.add('reveal');
                        // Reset the button's class to remove the color highlighting
                        const buttons = document.getElementsByClassName('word-option');
                        for (let i = 0; i < buttons.length; i++) {
                            buttons[i].classList.remove('correct');
                            buttons[i].classList.remove('incorrect');
                        }
                    }, 500);
                })
            }
            else {
                this.answercolor = false;
                // Set the button's class to 'incorrect' to change the border color to red
                this.$nextTick(() => {
                    const buttons = document.getElementsByClassName('word-option');
                    //console.log(buttons);
                    for (let i = 0; i < buttons.length; i++) {
                        if (buttons[i].textContent === answer) {
                            buttons[i].classList.add('incorrect');
                        }
                        if (buttons[i].textContent === correct) {
                            buttons[i].classList.add('correct');
                        }
                    }

                    setTimeout(() => {
                        // Replace the buttons with the word's definition and example
                        // Implement your logic here
                        const choice = document.getElementsByClassName('word-choice');
                        //console.log(choice[0]);
                        //增加display:none
                        choice[0].classList.remove('reveal')
                        choice[0].classList.add('conceal');
                        const detail = document.getElementsByClassName('word-detail');
                        detail[0].classList.remove('conceal');
                        detail[0].classList.add('reveal');
                        // Reset the button's class to remove the color highlighting
                        const buttons = document.getElementsByClassName('word-option');
                        for (let i = 0; i < buttons.length; i++) {
                            buttons[i].classList.remove('correct');
                            buttons[i].classList.remove('incorrect');
                        }
                    }, 800);
                });
            }
            $record.record(this.note.title, wordindex, this.answercolor)
            console.log(this.note.content, wordindex, this.answercolor)
        },
        isAnswerCorrect(event) {
            return this.answercolor;
        }*/
    },
    computed: {
        getmode() {
            return this.checkedBackground === "Dark" ? "list-item-2" : "list-item-1";
        },
       /* audioLink() {
            console.log(this.audioBaseUrl + this.audioaccent + '&audio=' + this.audioword)
            return this.audioBaseUrl + this.audioaccent + '&audio=' + this.audioword
        }*/
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

.WordCard {
    width: 90%;
    height: 80%;
    margin: 5% 5%;
    border-radius: 10px;

}

.word-title {
    width: 100%;
    height: 20%;
    margin: 0;
    padding: 0;
    text-align: center;
    font-weight: bold;
    border: none;
    outline: none;
    border-radius: 10px;

}

.word-content {
    width: 100%;
    margin: auto;
    padding: 0;
    text-align: center;
    font-size: 23px;
    font-weight: bold;
    border: none;
    outline: none;
    border-radius: 10px;
    overflow-y: hidden;
    vertical-align: middle;
}

.word-option {
    max-width: 100%;
    word-wrap: break-word;
    overflow: auto;
    white-space: normal;
    overflow-wrap: break-word;
    border-radius: 10px;
    height: 50px;
}

.icon-bar {
    height: 1.5em;
}

.icon-button {
    border: 0;
    background-color: transparent;
}

.collect-icon {
    height: 1.5em;
    width: 1.5em;
}

button.collected .collect-icon path {
    fill: #ece093 !important;
}

.collect-icon:hover path {
    fill: #ece093 !important;
}

.kill-icon {
    float: right;
    height: 1.5em;
    width: 1.5em;
}

button.deleted .kill-icon path {
    fill: #18a058 !important;
}

.kill-icon:hover path {
    fill: #18a058 !important;
}

.word-choice {
    display: block;
}

.word-detail {
    /*display: none;*/
    padding-bottom: 10px;
}

.correct {
    border: #18a058 2px solid;
}

.incorrect {
    border: #ff0000 2px solid;
}

.conceal {
    display: none;
}

.reveal {
    display: block
}
</style>
