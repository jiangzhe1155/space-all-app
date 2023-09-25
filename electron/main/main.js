const {app, BrowserWindow, globalShortcut, Menu, webFrame} = require('electron')
const {join} = require('path')
process.env.DIST = join(__dirname, '../../')
const indexHtml = join(process.env.DIST, 'dist/index.html')
const windowStateKeeper = require('electron-window-state')

const isMac = process.platform === 'darwin'

const path = require('path')

const createWindow = () => {
    // Menu.setApplicationMenu(null) // null值取消顶部菜单栏
    let status = windowStateKeeper({
        defaultHeight: 650, defaultWidth: 1000, maximize: true
    })
    const win = new BrowserWindow({
        ...status, webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }, frame: true, titleBarStyle: 'default',
        minHeight: 650, minWidth: 1000
    })
    if (app.isPackaged) {
        win.loadFile(indexHtml)
    } else {
        win.loadURL('http://127.0.0.1:5173/')
    }
    status.manage(win)
    return win
}

app.whenReady().then(() => {
    let win = createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    if (!app.isPackaged) {
        globalShortcut.register('CommandOrControl+Shift+i', function () {
            win.webContents.openDevTools()
        })
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
