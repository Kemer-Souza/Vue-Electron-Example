'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Mantenha uma referência global do objeto janela, se não o fizer, a janela irá
// ser fechado automaticamente quando o objeto JavaScript for coletado como lixo.
let win

// O esquema deve ser registrado antes que o aplicativo esteja pronto
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
     // Use pluginOptions.nodeIntegration, deixe isso como está
      // Veja nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration para mais informações
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Carrega a url do servidor dev se estiver em modo de desenvolvimento
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    //if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.webContents.on('did-finish-load',()=>{
    const {title, version} = require('../package.json')
    win.setTitle(`${title} :: ${version}`)
    console.log('terminou')
  })

  win.on('closed', () => {
    win = null
  })
}





// Saia quando todas as janelas estiverem fechadas.
app.on('window-all-closed', () => {
  // No macOS, é comum para aplicativos e sua barra de menu
  // para permanecer ativo até que o usuário saia explicitamente com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // No macOS, é comum recriar uma janela no aplicativo quando o
  // o ícone do dock é clicado e não há outras janelas abertas.
  if (win === null) {
    createWindow()
  }
})

// Este método será chamado quando o Electron terminar
// inicialização e está pronto para criar janelas do navegador.
// Algumas APIs só podem ser usadas após a ocorrência desse evento.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})


// Saia de forma limpa a pedido do processo pai no modo de desenvolvimento.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
