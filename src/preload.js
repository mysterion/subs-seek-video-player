const { contextBridge } = require('electron/renderer')
const fs = require('fs')

contextBridge.exposeInMainWorld('utils', {
    getFile: (p) => {
        if (fs.existsSync(p)) {
            return fs.readFileSync(p, 'utf-8')
        } else {
            return null
        }
    },
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
})