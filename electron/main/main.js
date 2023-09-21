const {app, BrowserWindow} = require('electron')
const {join, resolve} = require('path')
process.env.DIST = join(__dirname, '../../')
const indexHtml = join(process.env.DIST, 'dist/index.html')
const windowStateKeeper = require('electron-window-state')

const path = require('path')

const createWindow = () => {
    let status = windowStateKeeper({
        maximize: true
    })
    const win = new BrowserWindow({
        ...status,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    let contents = win.webContents
    contents.openDevTools()

    if (app.isPackaged) {
        win.loadFile(indexHtml)
    } else {
        win.loadURL('http://127.0.0.1:5173/')
    }
    status.manage(win)
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
