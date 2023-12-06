const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('$app', {
  close() {
    ipcRenderer.send('window-close')
  },
  // 这个主要是在不用devtool时从渲染层输出调试信息到控制台
  log(text) {
    console.log(text)
    ipcRenderer.send('log', text)
  }
})

contextBridge.exposeInMainWorld('$data', {
  updateTime(index, time) {
    ipcRenderer.send('update-time', index, time)
  },
  createReview(index, title) {
    ipcRenderer.send('create-review', title)
  },
  getNotes: () => ipcRenderer.invoke('get-notes-data'),
  updateOne(index, data) {
    ipcRenderer.send('update-note', index, data)
  },
  deleteOne(index) {
    ipcRenderer.send('delete-note', index)
  },
  insertOne(data) {
    ipcRenderer.send('insert-note', data)
  }
})

contextBridge.exposeInMainWorld('$collect', {
  getCollectionList: () => ipcRenderer.invoke('get-collection-data'),
  addToCollection(word, definition, example) {
    ipcRenderer.send('add-to-collection', word, definition, example)
  },
  deleteFromCollection(word, definition, example) {
    ipcRenderer.send('delete-from-collection', word, definition, example)
  }
})

contextBridge.exposeInMainWorld('$delete', {
  getBinList: () => ipcRenderer.invoke('get-bin-data'),
  addToBin(word) {
    ipcRenderer.send('add-to-bin', word)
  },
  deleteFromBin(word) {
    ipcRenderer.send('delete-from-bin', word)
  }
})

contextBridge.exposeInMainWorld('$setting', {
  getSettingData: () => ipcRenderer.invoke('get-setting-data'),
  updateWordNumber(number) {
    ipcRenderer.send('update-word-number', number)
  },
  updateBackground(background) {
    ipcRenderer.send('update-checkedBackground', background)
  },
  updateAccent(accent) {
    ipcRenderer.send('update-accent', accent)
  },
  clearData: () => ipcRenderer.invoke('clear-data')
})

contextBridge.exposeInMainWorld('$record', {
  record(dict, index, color) {
    ipcRenderer.send('new-record', dict, index, color)
  },
  load_arrange: (dict, total, num) => ipcRenderer.invoke('gen-arrange', dict, total, num),
  addWordNumber(title) { ipcRenderer.send('add-word-number', title) }
})
