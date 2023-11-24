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
    updateTime(index, time){
      ipcRenderer.send('update-time', index, time)
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
  addToCollection(word) {
    ipcRenderer.send('add-to-collection', word)
  },
  deleteFromCollection(word) {
    ipcRenderer.send('delete-from-collection', word)
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