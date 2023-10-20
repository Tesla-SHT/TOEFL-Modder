
import { app, Menu, BrowserWindow, ipcMain } from 'electron'

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
const mainURL = process.env.NODE_ENV === 'development' ? `http://localhost:8080/` : `file://${__dirname}/index.html` 

function createMainWindow () {
   // Initial window options
   const mainWindow = new BrowserWindow({
    show: false,  // wait till everything is ready 
    backgroundColor: '#FFFFFF',  // should match App background
    useContentSize: true,  // window borders are not included in size
    height: 700,
    width: 1200,    
    webPreferences: {  
      // Check this out -->  https://www.electronjs.org/docs/latest/tutorial/security
      nodeIntegration: true, 
      contextIsolation: false  
    }
  })
  // This disables some security warnings coming from the webPreferences settings 
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';  
  
  mainWindow.once('ready-to-show', () => {      
    mainWindow.show()
  })

  mainWindow.loadURL(mainURL)

  mainWindow.on('close', () => {
    app.quit()
  })

  // build the menu bar at top of application
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)
}

app.on('ready', () => {
  createMainWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }    
})


// Contents of top menu bar
const mainMenuTemplate = [
  {
    label: 'Window',
    submenu: [
      {
        role: 'reload'
      },
      {
        label: 'Quit',
        click() {
          mainWindow.close();
        }
      }           
    ]
  }
]
// add dev tools if in dev mode
if (process.env.NODE_ENV === 'development') {
  mainMenuTemplate.push({
    label: 'Dev Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  })
}


ipcMain.on('ping', (event) => {
  event.sender.send('greet', 'Hello from Main Process')
})

