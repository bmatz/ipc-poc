import {v4 as uuid} from 'uuid';
import createSchema from './create-schema';
import ErrorDescriptionFactory from './ErrorDescription';
import SourceFactory from './Source';

const SessionTopic = (mongoose, options) => {
    const schemaDescription = {
        resId: {
            type: String,
            default: uuid,
            index: true,
            unique: true,
        },
        name: {
            type: String,
            index: true,
            required: true,
        },
        sessionResId: {
            type: String,
            default: uuid,
            index: true,
        },
        topicResId: {
            type: String,
            default: uuid,
            index: true,
        },
        updated: Date,
        created: Date,
        exceptions: [ErrorDescriptionFactory(mongoose, {removeMongoId: true})],
        sources: [SourceFactory(mongoose, {removeMongoId: true})],
        state: String,
        failedAssets: [String],
        assetsCount: Number,
        assetsDone: Number,
        uniqueAssetsDone: Number,
    };

    return createSchema(mongoose, schemaDescription, options);
};

export default SessionTopic;
