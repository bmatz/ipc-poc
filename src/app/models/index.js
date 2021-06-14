/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import Session from './Session';
import SessionTopic from './SessionTopic';
import SessionAsset from './SessionAsset';
import Topic from './Topic';
import Asset from './Asset';

const models = {
    Session,
    SessionTopic,
    SessionAsset,
    Topic,
    Asset,
};

// const models = ['Session', 'SessionTopic', 'SessionAsset', 'Topic', 'Asset'];

const toCamelCase = (str) => {
    const firstLetter = str.slice(0, 1).toLowerCase();
    return `${firstLetter}${str.slice(1)}`;
};

const createModelFactory = (mongoose, connection) => (modelName) => {
    // const modelFactory = await import(`./${modelName}`);
    const collection = `${toCamelCase(modelName)}s`;
    return connection.model(modelName, models[modelName], collection);
};

export default (mongoose, connection) => {
    const createModel = createModelFactory(mongoose, connection);
    const schemas = {};
    Object.keys(models).forEach((model) => {
        schemas[model] = createModel(model);
    });
    // models.forEach((model) => {
    //     schemas[model] = createModel(model);
    // });
    return schemas;
};
