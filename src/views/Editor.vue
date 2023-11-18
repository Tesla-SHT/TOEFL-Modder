<script setup>
import { reactive, onMounted, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const index = route.params.index

const note = reactive({ title: '', content: '' })

onMounted(async function () {
    if (index == -1) return
    const data = (await $data.getNotes())[index]
    note.title = data.title
    note.content = data.content
})

const back = () => {
    router.back()
}

const save = () => {
    if (index == -1) { // 路径为-1则表示新建便签
        $data.insertOne({ ...note })
    } else {
        $data.updateOne(index, { ...note })
    }
    router.back()
}
</script>

<template>
    <div class="container">
        <n-card class="WordCard" hoverable>
            <div class="icon-bar">
                <svg class="collect-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12"
                    style="height:1.5em;width:1.5em">
                    <g >
                        <path
                            d="M5.283 1.546a.8.8 0 0 1 1.435 0L7.83 3.798l2.486.361a.8.8 0 0 1 .443 1.365L8.96 7.277l.425 2.476a.8.8 0 0 1-1.16.844L6 9.427l-2.224 1.17a.8.8 0 0 1-1.16-.844l.424-2.476l-1.799-1.753a.8.8 0 0 1 .444-1.365l2.486-.36l1.111-2.253zm.718.806l-.98 1.983a.8.8 0 0 1-.601.438l-2.19.318l1.585 1.544a.8.8 0 0 1 .23.708l-.374 2.18l1.958-1.03a.8.8 0 0 1 .744 0l1.958 1.03l-.374-2.18a.8.8 0 0 1 .23-.708L9.771 5.09l-2.189-.318a.8.8 0 0 1-.602-.438L6 2.352z"
                            fill="currentColor"></path>
                    </g>
                </svg>
            </div>
            <div class="word-title">
                <h1>Word</h1>
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
    height: 10%;
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
.icon-bar{
    height:1.5em;
}
collect-icon:hover g{
    fill: #faedc7;
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