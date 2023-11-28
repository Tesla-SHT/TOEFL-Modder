<script>
import { reactive, onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
    setup() {

        const route = useRoute()
        const router = useRouter()

        const index = route.params.index

        const note = reactive({ title: '', content: '', definition: '', example: '' })
        const wordsData = reactive([])
        const options = ref([]);
        let collection = []
        let bin = []
        onMounted(async function () {
            if (index === -1) return
            const data = (await $data.getNotes())[index]
            note.title = data.title
            try {
                //get wordbook's words
                const response = await fetch(`../../data/dicts/${note.title}.json`);
                const jsonData = await response.json();
                wordsData.push(...jsonData);
                //get reviewing words
                await $collect.getCollectionList().then(result => {
                    ExposeCollection(result)
                });
                await $delete.getBinList().then(result => {
                    ExposeBin(result)
                });

                showNextWord(); // 显示第一个单词
            } catch (error) {
                console.error(error)
            }


        })
        let currentWordIndex = 0

        let collectflag = false
        function ExposeCollection(result) {
            collection = result
        }

        let deleteflag = false
        function ExposeBin(result) {
            bin = result
        }
        //console.log(collection)
        function showCurrentWord() {
            if (currentWordIndex >= 0 && currentWordIndex < wordsData.length) {
                return wordsData[currentWordIndex].Words
            }
            return ''
        }

        function showCurrentDefinition() {
            // console.log(currentWordIndex);
            if (currentWordIndex >= 0 && currentWordIndex < wordsData.length) {
                return wordsData[currentWordIndex].Definitions
            }
            return ''
        }

        function showCurrentExample() {
            if (currentWordIndex >= 0 && currentWordIndex < wordsData.length) {
                return wordsData[currentWordIndex].Example
            }
            return ''
        }
        let correctIndex = 0;
        function showNextWord(Number) {
            setTimeout(() => {
                console.log(Number);
                if (correctIndex >= Number) {
                    console.log(Number);
                    correctIndex = 8;
                }
                deleteflag = false;
                while (!deleteflag) {
                    currentWordIndex++;
                    note.content = showCurrentWord();
                    note.definition = showCurrentDefinition();
                    note.example = showCurrentExample();
                    deleteflag = true
                    for (let i = 0; i < bin.length; i++) {
                        if (bin[i] == note.content) {
                            deleteflag = false;
                            break;
                        }
                    }
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
                const randomIndex = Math.floor(Math.random() * randomOptions.length);
                randomOptions[randomIndex] = note.definition;
                options.value = randomOptions;
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
            deleteflag,
            options,
        }
    },
    data() {
        return {
            collecting: this.collectflag, // Flag to track if the collect button is being clicked
            deleting: false, // Flag to track if the delete button is being clicked
            audioBaseUrl: 'http://dict.youdao.com/dictvoice?type=2&audio=',
            audioword: this.note.content,
            answercolor: true
        }
    },
    computed: {
        audioLink() {
            //console.log( this.audioBaseUrl + this.audioword)
            return this.audioBaseUrl + this.audioword
        }
    },
    methods: {
        playAudio(word) {
            this.audioword = word
            const audioElement = this.$refs.audioPlayer
            audioElement.play()
        },
        collectWord(event, word) {

            //console.log("collectWord")
            if (!this.collecting) {
                console.log("add to collection")
                this.collecting = true
                $collect.addToCollection(word)
            }
            else {
                console.log("delete from collection")
                this.collecting = false
                $collect.deleteFromCollection(word)
            }
        },
        deleteWord(event, word) {
            if (!this.deleting) {
                this.deleting = true
                $delete.addToBin(word)
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
        checkAnswer(event, correct, answer) {
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
        },
        isAnswerCorrect(event) {
            return this.answercolor;
        }
    }
}

</script>

<template>
    <div class="container">
        <n-card class="WordCard" hoverable>
            <div class="icon-bar">
                <button :class="{ 'collected': collecting }" class="icon-button" @click="collectWord(event, note.content)">
                    <svg class="collect-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 12 12">
                        <g fill="none">
                            <path
                                d="M5.283 1.546a.8.8 0 0 1 1.435 0L7.83 3.798l2.486.361a.8.8 0 0 1 .443 1.365L8.96 7.277l.425 2.476a.8.8 0 0 1-1.16.844L6 9.427l-2.224 1.17a.8.8 0 0 1-1.16-.844l.424-2.476l-1.799-1.753a.8.8 0 0 1 .444-1.365l2.486-.36l1.111-2.253z"
                                fill="currentColor"></path>
                        </g>
                    </svg>
                </button>
                <button :class="{ 'deleted': deleting }" class="icon-button" @click="deleteWord(event, note.content)"
                    style="float: right;">
                    <svg class="kill-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 24 24">
                        <g>
                            <path
                                d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648zM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5z"
                                fill="currentColor"></path>
                        </g>
                    </svg>
                </button>
            </div>
            <div class="word-title">
                <h1>{{ note.content }}</h1>

                <div>
                    <svg @click="playAudio(note.content)" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"
                        style="height:1.5em;width:1.5em;">
                        <path
                            d="M625.9 115c-5.9 0-11.9 1.6-17.4 5.3L254 352H90c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h164l354.5 231.7c5.5 3.6 11.6 5.3 17.4 5.3c16.7 0 32.1-13.3 32.1-32.1V147.1c0-18.8-15.4-32.1-32.1-32.1zM586 803L293.4 611.7l-18-11.7H146V424h129.4l17.9-11.7L586 221v582zm348-327H806c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16h128c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16zm-41.9 261.8l-110.3-63.7a15.9 15.9 0 0 0-21.7 5.9l-19.9 34.5c-4.4 7.6-1.8 17.4 5.8 21.8L856.3 800a15.9 15.9 0 0 0 21.7-5.9l19.9-34.5c4.4-7.6 1.7-17.4-5.8-21.8zM760 344a15.9 15.9 0 0 0 21.7 5.9L892 286.2c7.6-4.4 10.2-14.2 5.8-21.8L878 230a15.9 15.9 0 0 0-21.7-5.9L746 287.8a15.99 15.99 0 0 0-5.8 21.8L760 344z"
                            fill="currentColor"></path>
                    </svg>
                    <audio ref="audioPlayer" :src="audioLink"></audio>
                </div>

                <!--<p>{{ note.definition }}</p>
                <p>{{ note.example }}</p>-->
            </div>
            <br>
            <n-divider />
            <div class="word-content">
                <div class="word-choice">
                    <n-grid cols="1 500:2" :x-gap="12" :y-gap="16">
                        <n-gi v-for="option in options" :key="option">
                            <n-button class="word-option" @click="checkAnswer(event, note.definition, option);" size="large"
                                strong secondary>
                                {{ option }}
                            </n-button>
                        </n-gi>
                    </n-grid>
                </div>
                <div class="word-detail">
                    <n-h5 prefix="bar" :type="isAnswerCorrect() ? 'success' : 'error'">
                        {{ note.definition }}
                    </n-h5>
                    <n-h6 prefix="bar" :type="isAnswerCorrect() ? 'success' : 'error'">
                        {{ note.example }}
                    </n-h6>
                    <n-button @click="showNextWord($store.state.wordNumber); refreshIcon(event)" :type="isAnswerCorrect() ? 'success' : 'error'"
                        dashed>Next Word</n-button>

                </div>
            </div>
        </n-card>
    </div>
</template>

<style scoped>
.container {
    overflow-y: hidden;
}

.WordCard {
    width: 90%;
    height: 80%;
    margin: 5% 5%;
    border-radius: 10px;
    background-color: white;

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
    background-color: white;

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
    background-color: white;
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
    display: none;
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

/*.title-container {
    margin-top: 5px;
    margin-left: 0px;
    margin-right: 0px;
    text-align: center;
}

.title {
    width: calc(100% - 30px);
    height: 50px;

    text-align: center;
    font-size:23px;
    font-weight: bold;

    border: none;
    outline: none;
    border-radius: 10px;
    background-color: white;
}

.content-container {
    margin-top: 15px;
    margin-right: 15px;
    margin-left: 15px;
    width: calc(100% - 30px);
    height: calc(100% - 180px);

    text-align: center;
    border-radius: 10px;
    background-color: white;
}
.content {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    margin-top: 20px;

    border: none;
    outline: none;
    resize: none;

    font-size: 17px;
    font-family:"微软雅黑";
}

.button-container {
    float: right;
    margin-top: 15px;
}

button {
    border: none;
    border-radius: 10px;
    color: white;
    padding: 8px 40px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: auto 5px;
    transition: 0.1s;
}
.button-right {
    margin-right: 15px;
}

#cancel {
    background-color: #cccccc;
}
#cancel:hover {
    background-color: #999999;
}

#save {
    background-color: #fcc000;
}
#save:hover {
    background-color: #d4a827;
}*/
</style>