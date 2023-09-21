const {app, BrowserWindow} = require('electron')
const {join} = require("path");
process.env.DIST = join(__dirname, '../../')
const indexHtml = join(process.env.DIST, 'dist/index.html')

const createWindow = () => {
    const win = new BrowserWindow({
        minWidth: 1200,
        width: 1200,
        height: 800,
        minHeight: 800,
    })

    if (app.isPackaged) {
        win.loadFile(indexHtml)
    } else {
        win.loadURL('http://127.0.0.1:5173/')
    }
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
