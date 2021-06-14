import path from 'path';
import MongooseConnect from './MongooseConnect';
import logger from '../logger';
import defaultModelFactory from '../models';
// import path from 'path';
// import {fileURLToPath} from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

let db;

const getDb = async (config) => {
    if (db) {
        return db;
    }
    const mongooseConfig = config || {};

    mongooseConfig.connectionString =
        mongooseConfig.connectionString || process.env.NODE_ENV === 'production'
            ? 'mongodb://tassadar:27017/captain'
            : 'mongodb://tassadar:27017/captain';
    mongooseConfig.modelFactory = mongooseConfig.modelFactory || defaultModelFactory;

    const am = new MongooseConnect(mongooseConfig, logger);
    db = await am.start();
    return db;
};

export default getDb;
