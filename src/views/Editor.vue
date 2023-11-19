<script>
import { reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const index = route.params.index

    const note = reactive({ title: '', content: '' })
    const wordsData = reactive([])

    onMounted(async function () {
      if (index === -1) return
      const data = (await $data.getNotes())[index]
      note.title = data.title
      try {
        const response = await fetch(`../../words/${note.title}.json`)
        const jsonData = await response.json()
        wordsData.push(...jsonData)
      } catch (error) {
        console.error(error)
      }
    })

    let currentWordIndex = 0

    function showCurrentWord() {
      if (currentWordIndex >= 0 && currentWordIndex < wordsData.length) {
        return wordsData[currentWordIndex].Words
      }
      return ''
    }

    function showCurrentDefinition() {
        console.log(currentWordIndex);
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

    function showNextWord() {
      currentWordIndex++;
      note.content = showCurrentWord();
    }

    const currentWord = computed(() => showCurrentWord())

    return {
      note,
      currentWord,
      currentDefinition: showCurrentDefinition(),
      currentExample: showCurrentExample(),
      showNextWord
    }
  }
}
</script>

<template>
    <div class="container">
        <n-card class="WordCard" hoverable>
            <div class="icon-bar">
                <svg class="collect-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 12 12">
                    <g fill="none">
                        <path
                            d="M5.283 1.546a.8.8 0 0 1 1.435 0L7.83 3.798l2.486.361a.8.8 0 0 1 .443 1.365L8.96 7.277l.425 2.476a.8.8 0 0 1-1.16.844L6 9.427l-2.224 1.17a.8.8 0 0 1-1.16-.844l.424-2.476l-1.799-1.753a.8.8 0 0 1 .444-1.365l2.486-.36l1.111-2.253z"
                            fill="currentColor"></path>
                    </g>
                </svg>
                <svg class="kill-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 24 24">
                    <g>
                        <path
                            d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648zM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5z"
                            fill="currentColor"></path>
                    </g>
                </svg>
            </div>
            <div class="word-title">
                <h1>{{ note.content }}</h1>
    <p>{{ currentDefinition }}</p>
    <p>{{ currentExample }}</p>
    <button @click="showNextWord">Next Word</button>
            </div>
            <br>
            <n-divider />
            <br>
            <div class="word-content">
                <n-grid cols="1 300:2 500:3" :x-gap="12" :y-gap="16">
                    <n-gi>
                        <n-button size="large" strong secondary>
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary>
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary>
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary>
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary>
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary>
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary>
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary>
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary>
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                </n-grid>

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
    height: 50%;
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: 23px;
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

.icon-bar {
    height: 1.5em;
}

.collect-icon {
    height: 1.5em;
    width: 1.5em;
}

.collect-icon:hover path {
    fill: #ece093 !important;
}

.kill-icon {
    float: right;
    height: 1.5em;
    width: 1.5em;
}

.kill-icon:hover path {
    fill: #18a058 !important;
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