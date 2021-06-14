import {app, BrowserWindow} from 'electron';
import electronDebug from 'electron-debug';
import electronReloader from 'electron-reloader';
import url from 'url';
import path from 'path';
import getDb from './data-source/get-db';
import createIPCHandlers from './create-ipc-handlers';

const TITLE = 'Captain Browse - at your service!';

electronDebug({
    showDevTools: false,
    devToolsMode: 'right',
});

function createWindow() {
    const x = 0;
    const y = 0;
    // if (true || process.env.NODE_ENV === 'development') {
    //     // eslint-disable-next-line global-require
    //     const {screen} from'electron');
    //     const rightDisplay = screen.getAllDisplays().find(d => d.bounds.x > 0);
    //     x = rightDisplay.bounds.x;
    // }

    const mainWindow = new BrowserWindow({
        x,
        y,
        width: 1920,
        height: 1080,
        title: TITLE,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false,
        },
        backgroundColor: '#282c34',
    });
    mainWindow.setTitle(TITLE);
    mainWindow.setMenu(null);
    // mainWindow.maximize();

    const startUrl =
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, '/../dist/index.html'),
            protocol: 'file:',
            slashes: true,
        });
    mainWindow.loadURL(startUrl);
    // mainWindow.loadFile("dist/index.html");
}

function startApp() {
    return Promise.all([getDb(), createIPCHandlers(), createWindow()]);
}

app.whenReady().then(startApp);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        startApp();
    }
});

try {
    electronReloader(module);
} catch (err) {
    console.log(err);
}
