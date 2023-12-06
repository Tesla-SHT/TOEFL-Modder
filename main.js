const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
//词书的信息
const NOTE_PATH = path.join(__dirname, './data/notes.json')
if (!fs.existsSync(NOTE_PATH)) {
    fs.mkdirSync(path.join(__dirname, './data'))
    fs.writeFileSync(NOTE_PATH, '[]')
}
const getNotesData = () => JSON.parse(fs.readFileSync(NOTE_PATH))
//收藏夹
const COLLECT_PATH = path.join(__dirname, './data/collection.json')

if (!fs.existsSync(COLLECT_PATH)) {
    fs.writeFileSync(COLLECT_PATH, '[]')
}
else {
    const fileContent = fs.readFileSync(COLLECT_PATH, 'utf8');
    if (fileContent.trim() === '') {
        fs.writeFileSync(COLLECT_PATH, '[]');
    }
}
const getCollectionData = () => JSON.parse(fs.readFileSync(COLLECT_PATH))
//回收站
const DELETE_PATH = path.join(__dirname, './data/bin.json')
if (!fs.existsSync(DELETE_PATH)) {
    fs.writeFileSync(DELETE_PATH, '[]')
}
else {
    const fileContent = fs.readFileSync(DELETE_PATH, 'utf8');
    if (fileContent.trim() === '') {
        fs.writeFileSync(DELETE_PATH, '[]');
    }
}
const getBinData = () => JSON.parse(fs.readFileSync(DELETE_PATH))
//设置
const SETTING_PATH = path.join(__dirname, './data/setting.json')
if (!fs.existsSync(SETTING_PATH)) {
    fs.writeFileSync(SETTING_PATH, '[]')
}
else {
    const fileContent = fs.readFileSync(SETTING_PATH, 'utf8');
    if (fileContent.trim() === '') {
        fs.writeFileSync(SETTING_PATH, '{}');
    }
}
const getSettingData = () => JSON.parse(fs.readFileSync(SETTING_PATH))
//records
const RECORDS_PATH = path.join(__dirname, './data/records.json')
if (!fs.existsSync(RECORDS_PATH)) {
    fs.writeFileSync(RECORDS_PATH, '[]')
}
else {
    const fileContent = fs.readFileSync(RECORDS_PATH, 'utf8');
    if (fileContent.trim() === '') {
        fs.writeFileSync(RECORDS_PATH, '[]');
    }
}
const getRecords = () => JSON.parse(fs.readFileSync(RECORDS_PATH))


const createWindow = () => {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        frame: false,
        transparent: true,
        show: false,
        resizable: false,
        maximizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    win.loadURL('http://localhost:5173/')
    // win.loadFile(path.join(__dirname, './dist/index.html'))

    win.on('ready-to-show', () => {
        win.show()
    })

    //本来就有的，作模板用
    ipcMain.on('update-time', (event, index, time) => {
        let notesData = getNotesData();
        notesData[index].time.push(time)
        notesData[index].learnday += 1;
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notesData))

    })
    ipcMain.on('create-review', (event, title) => {

        const REVIEW_PATH = path.join(__dirname, './data/review/' + title + '.json');
        //改成判断是否有collection.json这个文件而不是判断是否有这个路径
        if (!fs.existsSync(REVIEW_PATH)) {
            fs.writeFileSync(REVIEW_PATH, '[]');
        }
        else {
            // 判断内容是否为空
            const fileContent = fs.readFileSync(REVIEW_PATH, 'utf8');
            if (fileContent.trim() === '') {
                fs.writeFileSync(REVIEW_PATH, '[]');
            }
        }
    })
    ipcMain.handle('get-notes-data', () => getNotesData())
    /*ipcMain.on('insert-note', (event, data) => {
        let notesData = getNotesData()
        notesData.unshift(data)
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notesData))
    })
    ipcMain.on('update-note', (event, index, data) => {
        let notesData = getNotesData()
        notesData[index] = data
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notesData))
    })
    ipcMain.on('delete-note', (event, index) => {
        let notesData = getNotesData()
        notesData.splice(index, 1)
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notesData))
    })*/
    //Collection
    ipcMain.handle('get-collection-data', () => getCollectionData())
    ipcMain.on('add-to-collection', (event, word, definition, example) => {
        let collectionData = getCollectionData()
        collectionData.push({
            word: word,
            definition: definition,
            example: example
        })
        fs.writeFileSync(COLLECT_PATH, JSON.stringify(collectionData))
    })
    ipcMain.on('delete-from-collection', (event, word, definition, example) => {
        let collectionData = getCollectionData();
        console.log(collectionData);
        const index = collectionData.findIndex(item => item.word === word);
        if (index !== -1) {
            collectionData.splice(index, 1);
            fs.writeFileSync(COLLECT_PATH, JSON.stringify(collectionData));
        }
    });
    //Bin
    ipcMain.handle('get-bin-data', () => getBinData())
    ipcMain.on('add-to-bin', (event, word) => {
        let binData = getBinData()
        binData.push(word)
        fs.writeFileSync(DELETE_PATH, JSON.stringify(binData))
    })
    ipcMain.on('delete-from-bin', (event, word) => {
        let binData = getBinData()
        const index = binData.indexOf(word)
        if (index !== -1) {
            binData.splice(index, 1)
            fs.writeFileSync(DELETE_PATH, JSON.stringify(binData))
        }
    })
    //Settiing
    ipcMain.handle('get-setting-data', () => getSettingData())
    ipcMain.on('update-word-number', (event, number) => {
        let settingData = getSettingData()
        settingData.wordnumber = number
        fs.writeFileSync(SETTING_PATH, JSON.stringify(settingData))
    })
    ipcMain.on('update-checkedBackground', (event, checked) => {
        let settingData = getSettingData()
        settingData.checkedBackground = checked
        fs.writeFileSync(SETTING_PATH, JSON.stringify(settingData))
    })
    ipcMain.on('update-accent', (event, accent) => {
        let settingData = getSettingData()
        settingData.accent = accent
        fs.writeFileSync(SETTING_PATH, JSON.stringify(settingData))
    })
    ipcMain.handle('clear-data', () => {
        fs.writeFileSync(DELETE_PATH, '[]')
        fs.writeFileSync(COLLECT_PATH, '[]')
        let notesData = getNotesData();
        for (let i = 0; i < notesData.length; i += 1) {
            notesData[i].time = [];
            notesData[i].learnday = 0;
        }
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notesData))

    })
    //record
    // ipcMain.handle('get-records-data', () => getRecords())
    ipcMain.handle('gen-arrange', async (event, dict, total, num) => {
        const arrange = await genArrange(dict, total, num)
        return arrange
    })
    function genArrange(dict, total, num) {
        let records = []
        recrods = getRecords()
        var flag_i = false
        var i
        var arrange = []
        for (i in records) {
            if (records[i].dict == dict) {
                flag_i = true
                break
            }
        }
        if (!flag_i) {
            records.push({ "dict": dict, "words": [] })
            fs.writeFileSync(RECORDS_PATH, JSON.stringify(records))
            for (i in records) {
                if (records[i].dict == dict) {
                    break
                }
            }
        }
        let words = records[i].words
        var j
        for (j = 0; j < words.length; j += 1) {
            if (words[j].time < Date.now() - 1000 * 600 | words[j].acc < 0.6) {
                arrange.push(words[j].index)
            }
            if (arrange.length >= num) break
        }
        for (j = arrange.length; j < num; j += 1) {
            var new_ind
            while (true) {
                new_ind = Math.floor(Math.random() * total)
                if (arrange.find(function (elem) {
                    return elem == new_ind
                }) == undefined) break
            }
            arrange.push(new_ind)
        }
        arrange.push(-1)
        return arrange
    }
    ipcMain.on('new-record', (event, dict, ind, color) => {
        console.log(ind)
        let records = getRecords()
        var flag_i = false
        var i
        for (i = 0; i < records.length; i += 1) {
            if (records[i].dict == dict) {
                flag_i = true
                break
            }
        }
        if (!flag_i) {
            records.push({ "dict": dict, "words": [] })
        }
        let words = records[i].words
        var flag_j = false
        var j
        for (j = 0; j < words.length; j += 1) {
            if (words[j].index == ind) {
                flag_j = true
                break
            }
        }
        if (!flag_j) {
            words.push({ "index": ind, "last_time": 0, "try_num": 0.0, "acc": 1.0 })
        }
        let word = words[j]
        word.last_time = Date.now()
        word.acc = (word.acc * word.try_num + color ? 1.0 : 0.0) / (word.try_num + 1)
        word.try_num += 1
        words[j] = word
        records[i].words = words
        fs.writeFileSync(RECORDS_PATH, JSON.stringify(records))
    })
    ipcMain.on('window-close', () => {
        win.close()
    })

    ipcMain.on('log', (event, text) => {
        console.log(text)
    })

    // win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})