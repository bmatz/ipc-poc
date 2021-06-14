import {v4 as uuid} from 'uuid';
import createSchema from './create-schema';
import TopicErrorFactory from './TopicError';
import TopicFactory from './Topic';

const Session = (mongoose, options) => {
    const schemaDescription = {
        resId: {
            type: String,
            default: uuid,
            index: true,
            unique: true,
        },
        topicBaseTags: [String],
        topics: [TopicFactory(mongoose, {removeMongoId: true, nested: true})],
        start: Date,
        end: Date,
        state: String,
        assetsCount: Number,
        assetsDone: Number,
        uniqueAssetsDone: Number,
        failedTopics: [TopicErrorFactory(mongoose, {removeMongoId: true})],
    };
    return createSchema(mongoose, schemaDescription, options);
};

export default Session;
