<script setup>
</script>

<template>
    <div style="height:100%">
        <div class="icon-container">
            <svg t="1672459372819" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="1377" width="85" height="85">
                <path
                    d="M986.39 37.61c-49.988-49.988-131-49.988-180.99 0L0.118 842.924v180.958h180.958l805.314-805.286c49.988-49.986 49.988-130.998 0-180.986z"
                    fill="#F6BB42" p-id="1378"></path>
                <path
                    d="M956.242 248.748l30.148-30.15c49.988-49.988 49.988-131 0-180.988s-131-49.988-180.99 0l-30.148 30.148 180.99 180.99z"
                    fill="#EC87C0" p-id="1379"></path>
                <path
                    d="M850.796 143.302L151.05 843.048c-8.31 8.342-8.31 21.84 0 30.15a21.328 21.328 0 0 0 30.182 0L880.946 173.484l-30.15-30.182z"
                    fill="#FFCE54" p-id="1380"></path>
                <path d="M0.118 842.924v180.958h180.958z" fill="#FFE5AB" p-id="1381"></path>
                <path d="M835.708 369.534l-180.992-180.992 120.66-120.628 180.992 180.96z" fill="#E6E9ED" p-id="1382">
                </path>
                <path
                    d="M760.316 143.302l-30.18-30.148c-0.032-0.062-0.094-0.094-0.124-0.124l-30.148 30.148c0.032 0.032 0.062 0.094 0.124 0.124l30.148 30.182c8.342 8.31 21.84 8.31 30.18 0 8.312-8.342 8.312-21.84 0-30.182zM850.516 293.864l30.18 30.148c0.032 0.062 0.094 0.094 0.124 0.124l30.15-30.148c-0.032-0.032-0.062-0.094-0.124-0.124l-30.15-30.182c-8.34-8.31-21.838-8.31-30.18 0-8.31 8.342-8.31 21.84 0 30.182z"
                    fill="#CCD1D9" p-id="1383"></path>
                <path d="M0.118 963.552v60.33h60.33z" fill="#656D78" p-id="1384"></path>
            </svg>
        </div>
        <div class="about-container">
            <p class="description">Expand your vocabulary with TOEFL-modder, a word recitation software designed to help
                you improve your English skills.</p>
            <div class="team-info">
                <h2 class="team-title">Development Team</h2>
                <n-grid x-gap="12" cols="12"      >
                    <n-grid-item span="2" offset="1">
                        <div>沈皓天</div>
                    </n-grid-item>
                    <n-grid-item span="2">
                        <div>姜林楚</div>
                    </n-grid-item>
                    <n-grid-item span="2">
                        <div>蔡贺丞</div>
                    </n-grid-item>
                    <n-grid-item span="2">
                        <div>胡烁怡</div>
                    </n-grid-item>
                    <n-grid-item span="2">
                        <div>翁歌华</div>
                    </n-grid-item>
                </n-grid>
            </div>
            
        </div>
        <br>
        <br>
        <br>
        <footer style="font-size:12px;bottom:0;margin-top:auto">
            <p class="contact">Contact us: <a href="https://github.com/Tesla-SHT/TOEFL-Modder" target="_blank">Github</a> </p>
            <p class="copyright">© 2023 TOEFL-Modder. All rights reserved.</p>
        </footer>
    </div>
</template>

<style scoped>
.icon-container {
    text-align: center;
    margin-top: 20px;
}

.icon {
    width: 85px;
    height: 85px;
    border: 2px solid #f3f3f3;
    border-radius: 20px;
    padding: 20px;
    background-color: white;
}

.title {
    text-align: center;
}

.description {
    font-size: 14px;
    text-align: center;
    padding:0 10%;
}


.about-container {
    text-align: center;
    padding: 20px;
    align-items: center;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}


.team-title {
    font-size: 20px;
    margin-bottom: 10px;
}

.team-members {
    list-style-type: none;
    padding: 0;
    margin-bottom: 20px;
}

.team-members li {
    font-size: 14px;
    margin-bottom: 5px;
}

.copyright{
    text-align: center;
}
.contact{
    
    text-align: center;
}
/* Add more styles as needed */
</style>