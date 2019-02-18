// electron entry point - main

const { app, BrowserWindow, Tray, Menu, ipcMain} =  require('electron')
const path = require('path')
const url =  require('url')

const iconPath =  path.join(__dirname, 'assets/images/', 'wimealogo.png')
let Router = require('electron-router')
let router = Router('MAIN')

let login_window
let index_window
let tray  = null


function createWindow(){

      //after login load index_window
      //parent window
      index_window = new BrowserWindow({ width: 800, height: 600, show: false})

      index_window.loadURL(url.format({
        pathname:path.join(__dirname, 'views','index.html'),
        protocol:'file',
        slashes: true
      }))

    //child window
    login_window = new BrowserWindow({parent:index_window,  width:700, height: 800, icon: path.join(__dirname, 'assets/images/wimealogo.png'), frame: false});
    login_window.loadURL(url.format({
      pathname:path.join(__dirname, 'views','login.html'),
      protocol: 'file',
      slashes: true
    }))

    //Tray
    tray = new Tray(iconPath)

    const template = [
      {
        label: 'sign out'
      },
      {
        label: 'Add data',
        submenu: [
          {
            label: 'Observation_slip'
          }
        ]
      }
    ]
    const contextMenu = Menu.buildFromTemplate(template)
    tray.setContextMenu(contextMenu)
    tray.setToolTip('WIMEA WDR DESKTOP APP') //Title

}


//IPC
ipcMain.on('valid_user', (event, arg) =>{
  if(arg == 'ping'){
    index_window.show()
    login_window.hide()
  }
})

app.on('ready', createWindow)
app.on('window-all-closed', ()=>{

  if(process.platform !== 'darwin'){
    app.quit()
  }
})


app.on('activate', ()=>{

  if(win ==  null) {
    createWindow()
  }
})
