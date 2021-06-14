import fs from 'fs';
import {ipcMain} from 'electron';
import log from './logger';
import {dynamicHandler} from './events/event-factories.js';
import topicEvents from './events/topic-events';
import assetEvents from './events/asset-events';
import sessionEvents from './events/session-events';
import sessionAssetEvents from './events/session-asset-events';

function createIpcHandler(event, handler, typeDescription) {
    log.debug(`listening on ${event} as ${typeDescription}`);
    ipcMain.on(event, async (ipcEvent, arg) => {
        log.debug(`on:${event} with ${!arg ? 'no ' : ''}args`, arg);
        try {
            const result = await handler(arg);
            ipcEvent.sender.send(`${event}.ok`, result);
        } catch (error) {
            log.error(error);
            ipcEvent.sender.send(`${event}.error`, error);
        }
    });
}

function registerHandler(handlerName, handlerDefinition) {
    let handler;
    let typeDescription = '';
    if (typeof handlerDefinition === 'function') {
        typeDescription = 'function with dynamic wrapper';
        handler = dynamicHandler(handlerDefinition);
    } else {
        typeDescription = 'object with wrapper';
        handler = handlerDefinition.wrapper(handlerDefinition.handler);
    }

    createIpcHandler(handlerName, handler, typeDescription);
}

const fileEvents = {
    readFile: async (filename) => {
        const content = fs.readFileSync(filename);
        return content.toString();
    },
};

const ipcEvents = {
    ...sessionEvents,
    ...sessionAssetEvents,
    ...assetEvents,
    ...topicEvents,
    ...fileEvents,
};

function createIPCHandlers() {
    Object.keys(ipcEvents).forEach((ipcEvent) => {
        registerHandler(ipcEvent, ipcEvents[ipcEvent]);
    });
}

export default createIPCHandlers;
