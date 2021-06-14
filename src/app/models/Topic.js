import {v4 as uuid} from 'uuid';
import createSchema from './create-schema';
import SourceFactory from './Source';

const TopicFactory = (mongoose, {removeMongoId, nested} = {}) => {
    const schemaDescription = {
        resId: {
            type: String,
            default: uuid,
            index: true,
            unique: !nested,
        },
        name: {
            type: String,
            index: true,
            required: true,
            unique: !nested,
        },
        displayName: {
            type: String,
            index: true,
            required: true,
        },
        updated: Date,
        created: Date,
        favorite: Boolean,
        active: Boolean,
        sources: [SourceFactory(mongoose, {removeMongoId: true})],
        readOnly: Boolean,
    };

    return createSchema(mongoose, schemaDescription, {removeMongoId});
};

export default TopicFactory;
