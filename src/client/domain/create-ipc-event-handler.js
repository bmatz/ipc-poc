const mockLog = (functionName, args) => {
    console.warn(`called mocked ipcRenderer.${functionName} with args`, args);
};
const electronMock = {
    ipcRenderer: {
        removeAllListeners: (...args) => mockLog('removeAllListeners', args),
        on: (...args) => mockLog('on', args),
        send: (...args) => mockLog('send', args),
    },
};

const {ipcRenderer} = window.require ? window.require('electron') : electronMock;

const createIPCEventHandler = (eventName) => (arg) => {
    const removeListeners = () => {
        ipcRenderer.removeAllListeners(`${eventName}.ok`);
        ipcRenderer.removeAllListeners(`${eventName}.error`);
    };
    return new Promise((resolve, reject) => {
        ipcRenderer.on(`${eventName}.ok`, (_, result) => {
            removeListeners();
            resolve(result);
        });

        ipcRenderer.on(`${eventName}.error`, (_, result) => {
            removeListeners();
            reject(result);
        });
        ipcRenderer.send(eventName, arg);
    });
};

export default createIPCEventHandler;
