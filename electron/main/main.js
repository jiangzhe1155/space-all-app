const {app, BrowserWindow, globalShortcut, Menu, webFrame} = require('electron')
const {join} = require('path')
process.env.DIST = join(__dirname, '../../')
const indexHtml = join(process.env.DIST, 'dist/index.html')
const windowStateKeeper = require('electron-window-state')

const isMac = process.platform === 'darwin'

const template = [// { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [{role: 'about'}, {type: 'separator'}, {role: 'services'}, {type: 'separator'}, {role: 'hide'}, {role: 'hideOthers'}, {role: 'unhide'}, {type: 'separator'}, {role: 'quit'}]
    }] : []), // { role: 'fileMenu' }
    {
        label: 'File', submenu: [isMac ? {role: 'close'} : {role: 'quit'}]
    }, // { role: 'editMenu' }
    {
        label: 'Edit',
        submenu: [{role: 'undo'}, {role: 'redo'}, {type: 'separator'}, {role: 'cut'}, {role: 'copy'}, {role: 'paste'}, ...(isMac ? [{role: 'pasteAndMatchStyle'}, {role: 'delete'}, {role: 'selectAll'}, {type: 'separator'}, {
            label: 'Speech', submenu: [{role: 'startSpeaking'}, {role: 'stopSpeaking'}]
        }] : [{role: 'delete'}, {type: 'separator'}, {role: 'selectAll'}])]
    }, // { role: 'viewMenu' }
    {
        label: 'View',
        submenu: [{role: 'reload'}, {role: 'forceReload'}, {role: 'toggleDevTools'}, {type: 'separator'}, {
            role: 'resetZoom',
            enable: false
        }, {role: 'zoomIn', enable: false}, {role: 'zoomOut',enable: false}, {type: 'separator'}, {role: 'togglefullscreen'}]
    }, // { role: 'windowMenu' }
    {
        label: 'Window',
        submenu: [{role: 'minimize'}, {role: 'zoom'}, ...(isMac ? [{type: 'separator'}, {role: 'front'}, {type: 'separator'}, {role: 'window'}] : [{role: 'close'}])]
    }, {role: 'help', submenu: [{
            label: 'Learn More', click: async () => {
                const {shell} = require('electron')
                await shell.openExternal('https://electronjs.org')
            }
        }]
    }]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
const path = require('path')


const createWindow = () => {
    // Menu.setApplicationMenu(null) // null值取消顶部菜单栏
    let status = windowStateKeeper({
        defaultHeight: 618, defaultWidth: 1000, maximize: true
    })
    const win = new BrowserWindow({
        ...status, webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }, frame: false, titleBarStyle: 'hidden', minHeight: 618, minWidth: 1000
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
