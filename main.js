const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')
const { get } = require('http')
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
//dict
const DICT_PATH = path.join(__dirname, './data/dicts/')
function getDictData(title) {
    const filePath = DICT_PATH + title + '.json';
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        const fileContent = fs.readFileSync(filePath);
        return JSON.parse(fileContent);
    } else { return '[]' }
}

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
            devTools: false
        }
    })

    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, './dist/index.html'))
    }
    else {
        win.loadURL('http://localhost:5173/')
    }

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
    /*ipcMain.on('create-review', (event, title) => {

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
    })*/
    ipcMain.handle('get-notes-data', () => getNotesData())
    ipcMain.handle('insert-book', async (event) => {

        // 打开文件选择对话框
        const result = await dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{ name: 'Dictionary Files', extensions: ['csv'] }],
        });

        const filePath = result.filePaths[0];
        //console.log(decodeURIComponent(__dirname) + "!");
        //console.log(filePath);
        // 复制文件到static文件夹和run.cmd所在的目录
        const staticFolderPath = path.join(__dirname, 'static/csv2json');
        //console.log(staticFolderPath + "!staticfolderpath")
        const staticFilePath = path.join(staticFolderPath, path.basename(filePath));
        //console.log(staticFilePath + "!staticfilepath")
        fs.copyFileSync(filePath, staticFilePath);

        const runCmdPath = path.join(__dirname, 'static/csv2json/run.cmd');
        //console.log(runCmdPath)
        const runCmdFolderPath = path.dirname(runCmdPath);
        const runCmdFilePath = path.join(runCmdFolderPath, path.basename(filePath));
        fs.copyFileSync(filePath, runCmdFilePath);
        //console.log(runCmdFilePath + "!runcmdfilepath")
        // 运行run.cmd文件生成JSON词典
        const { exec } = require('child_process');
        exec('run.cmd', { cwd: runCmdFolderPath }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing run.cmd: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`run.cmd stderr: ${stderr}`);
                return;
            }

        })

        // 移动生成的JSON词典到data/dicts文件夹
        const generatedDictPath = runCmdFilePath.replace('.csv', '.json');
        const dictsFolderPath = path.join(__dirname, 'data/dicts');
        const dictFilePath = path.join(dictsFolderPath, path.basename(generatedDictPath));
        //console.log(dictFilePath + "!dictfilepath" )
        fs.renameSync(generatedDictPath, dictFilePath);
        let notes = getNotesData();
        notes.push({ "title": path.basename(generatedDictPath, '.json'), "time": [], "learnday": 0, "learnword": 0, "unlearned": 0 })
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notes))
        win.reload();
        // 发送上传成功的消息给Vue组件
    })
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
    ipcMain.on('add-word-number', (event, title) => {
        let notesData = getNotesData();
        var l;
        for (l = 0; l < notesData.length; l += 1) {
            if (notesData[l].title == title)
                notesData[l].learnword += 1
            notesData[l].unlearned -= 1
        }
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notesData))

    })
    //Settiing
    ipcMain.handle('get-setting-data', () => getSettingData())
    ipcMain.on('update-word-number', (event, number) => {
        let settingData = getSettingData()
        settingData.wordnumber = number
        fs.writeFileSync(SETTING_PATH, JSON.stringify(settingData))
    })
    ipcMain.on('update-review-number', (event, number) => {
        let settingData = getSettingData()
        settingData.reviewnumber = number
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
    ipcMain.on('update-sequence', (event, sequence) => {
        let settingData = getSettingData()
        settingData.sequence = sequence
        fs.writeFileSync(SETTING_PATH, JSON.stringify(settingData))
    })
    ipcMain.on('update-pre', (event, pre) => {
        let settingData = getSettingData()
        settingData.order = pre
        fs.writeFileSync(SETTING_PATH, JSON.stringify(settingData))
    })
    ipcMain.handle('clear-data', () => {
        fs.writeFileSync(DELETE_PATH, '[]')
        fs.writeFileSync(COLLECT_PATH, '[]')
        fs.writeFileSync(RECORDS_PATH, '[]')
        let notesData = getNotesData();
        for (let i = 0; i < notesData.length; i += 1) {
            notesData[i].time = [];
            notesData[i].learnday = 0;
            notesData[i].learnword = 0;
            //console.log(notesData[i].title);
            let dictData = getDictData(notesData[i].title);
            if (dictData == undefined) {
                notesData[i].unlearned = 0;
            }
            else {
                notesData[i].unlearned = dictData.length;
            }
        }
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notesData))
        let settingData = getSettingData()
        settingData.wordnumber = 25
        settingData.reviewnumber = 50
        settingData.checkedBackground = "Light"
        settingData.accent = "2"
        settingData.sequence = "S"
        settingData.order = "R"
        fs.writeFileSync(SETTING_PATH, JSON.stringify(settingData))
    })
    //record
    ipcMain.handle('get-records-data', () => getRecords())
    ipcMain.handle('gen-arrange', async (event, dict, total, num, review) => {
        const arrange = await genArrange(dict, total, num, review)
        return arrange
    })
    function genArrange(dict, total, num, review) {
        let records = getRecords()
        var flag_i = false
        var i
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
        var arrange = []
        var star = []
        const seq = getSettingData().sequence;
        const order = getSettingData().order;
        const bin = getBinData();
        let dictData = getDictData(dict);
        var inbin;
        for (j = 0; j < words.length; j += 1) {
            //console.log(j + "a")
            inbin = false;
            for (var k = 0; k < bin.length; k += 1) {
                if (dictData[words[j].index].Words == bin[k]) {
                    //console.log("Succeed Inbin!")
                    inbin = true;
                    break
                }
            }
            if (inbin) continue;
            if ( (Date.now() - words[j].time - 1000 *86400)>0 &  Math.pow(words[j].acc,Math.pow((Date.now() - words[j].time)/86400/1000,0.3)) < 0.5 | words[j].acc < 0.5) {
                arrange.push(words[j].index)
                star.push(words[j].try_num)
            }
            if (arrange.length >= review) break
        }
        const l_r = arrange.length + num;
        var number = 0;
        for (j = arrange.length; j < l_r; j += 1) {
            var new_ind
            while (number < total) {
                new_ind = seq === "S" ? (Math.floor(Math.random() * total)) : number;
                inbin = false;
                for (var k = 0; k < bin.length; k += 1) {
                    if (dictData[number].Words == bin[k]) {
                        inbin = true;
                        break
                    }
                }
                number += 1;
                if (inbin) continue;
                if (arrange.find(function (elem) {
                    return elem == new_ind
                }) == undefined) break
            }
            if (order === "R") {
                arrange.push(new_ind)
                star.push(0)
            }
            else { arrange.unshift(new_ind); star.unshift(0) }

        }
        arrange.push(-1)
        return [arrange, star]
    }
    ipcMain.on('new-record', (event, dict, ind, color) => {

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
            words.push({ "index": ind, "last_time": 0, "try_num": 0, "acc": 1.0, "accuracy": 1.0})
        }
        let word = words[j]
        word.last_time = Date.now()
        word.acc = (word.try_num < 1 ? 0 : word.acc) * 0.51 + (color ? 1.0 : 0.0) * 0.49;
        word.accuracy = (word.accuracy * word.try_num + (color ? 1.0 : 0.0)) / (word.try_num + 1)
        //console.log(word.accuracy)
        word.try_num += 1
        words[j] = word
        records[i].words = words
        fs.writeFileSync(RECORDS_PATH, JSON.stringify(records))

        //update booklist data
        let notesData = getNotesData();
        var l;
        for (l = 0; l < notesData.length; l += 1) {
            if ((notesData[l].title == records[i].dict) && (records[i].words[j].try_num == 1))
                notesData[l].learnword += 1
            notesData[l].unlearned -= 1
        }
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notesData))
    })
    ipcMain.on('window-close', () => {
        win.close()
    })

    ipcMain.on('log', (event, text) => {
        //console.log(text)
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