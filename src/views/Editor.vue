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
            <div class="word-title">
                <h1>Word</h1>
            </div>
            <br>
            <n-divider />
            <br>
            <div class="word-content">
                <n-grid cols="1 300:2 500:3" :x-gap="12" :y-gap="16">
                    <n-gi>
                        <n-button size="large" strong secondary >
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary >
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary >
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary >
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary >
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary >
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary >
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary >
                            Defaultddddddd
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button size="large" strong secondary >
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
.word-content{
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