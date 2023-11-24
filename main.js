const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

const NOTE_PATH = path.join(__dirname, './data/notes.json')
if (!fs.existsSync(NOTE_PATH)) {
    fs.mkdirSync(path.join(__dirname, './data'))
    fs.writeFileSync(NOTE_PATH, '[]')
}
const getNotesData = () => JSON.parse(fs.readFileSync(NOTE_PATH))

const COLLECT_PATH = path.join(__dirname, './data/collection.json')

//改成判断是否有collection.json这个文件而不   是判断是否有这个路径
if (!fs.existsSync(COLLECT_PATH)) {
    fs.writeFileSync(COLLECT_PATH, '[]')
}
else {
    // 判断内容是否为空
    const fileContent = fs.readFileSync(COLLECT_PATH, 'utf8');
    if (fileContent.trim() === '') {
        fs.writeFileSync(COLLECT_PATH, '[]');
    }
}
const getCollectionData = () => JSON.parse(fs.readFileSync(COLLECT_PATH))

const DELETE_PATH = path.join(__dirname, './data/bin.json')
if (!fs.existsSync(DELETE_PATH)) {
    fs.writeFileSync(DELETE_PATH, '[]')
}
else {
    // 判断内容是否为空
    const fileContent = fs.readFileSync(DELETE_PATH, 'utf8');
    if (fileContent.trim() === '') {
        console.log('true empty');
        fs.writeFileSync(DELETE_PATH, '[]');
    }
}
const getBinData = () => JSON.parse(fs.readFileSync(DELETE_PATH))

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
        notesData[index].learnday +=1;
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notesData))
        
    })
    ipcMain.handle('get-notes-data', () => getNotesData())
    ipcMain.on('insert-note', (event, data) => {
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
    })
    //Collection
    ipcMain.handle('get-collection-data', () => getCollectionData())
    ipcMain.on('add-to-collection', (event, word) => {
        let collectionData = getCollectionData()
        collectionData.push(word)
        fs.writeFileSync(COLLECT_PATH, JSON.stringify(collectionData))
    })
    ipcMain.on('delete-from-collection', (event, word) => {
        let collectionData = getCollectionData()
        const index = collectionData.indexOf(word)
        if (index !== -1) {
            collectionData.splice(index, 1)
            fs.writeFileSync(COLLECT_PATH, JSON.stringify(collectionData))
        }
    })
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