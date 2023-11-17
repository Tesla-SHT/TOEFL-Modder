<template>
    <div class="setting-item">
        <label>缩放设置</label>
        <n-input-number v-model:value="zoomLevel" @input="updateZoom">
            <template #suffix>
                %
            </template>
            <template #minus-icon>
                <n-icon @click="decreaseZoom" class="zoom-button" />
            </template>
            <template #add-icon>
                <n-icon @click="increaseZoom" class="zoom-button" />
            </template>
        </n-input-number>
        <!--<div class="zoom-controls">
            <button @click="decreaseZoom" class="zoom-button">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="16 16 16 16">
                    <path d="M8 15h16v2H8z" fill="currentColor"></path>
                </svg>
            </button>
            <span>{{ zoomLevel }}%</span>
            <button @click="increaseZoom" class="zoom-button">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16">
                    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 5v14"></path>
                        <path d="M5 12h14"></path>
                    </g>
                </svg>
            </button>
        </div>-->
    </div>
</template>

<script>
export default {
    Setup() {
        return {
            zoomLevel: this.$store.state.zoomLevel
        }
    },
    data() {
        return {
            zoomLevel: this.$store.state.zoomLevel,
        };
    },
    methods: {
        decreaseZoom() {
            if (this.zoomLevel > 50) {
                this.zoomLevel -= 9;
            } const event = new KeyboardEvent('keydown', {
                key: '-',
                ctrlKey: true,
            });

            window.dispatchEvent(event);
            this.updateZoom();
        },
        increaseZoom() {
            if (this.zoomLevel < 200) {
                this.zoomLevel += 9;
            }
            const event = new KeyboardEvent('keydown', {
                key: '+',
                ctrlKey: true,
                shiftKey: true,
            });

            window.dispatchEvent(event);
            this.updateZoom();
        },
        updateZoom() {
            this.$store.commit('ZoomSize', this.zoomlevel)
        },
    },
};
</script>

<style scoped>
.setting-item {
    margin-bottom: 20px;
}

.zoom-controls {
    display: flex;
    align-items: center;
}
</style>