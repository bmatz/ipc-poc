import {v4 as uuid} from 'uuid';
import createSchema from './create-schema';

const Asset = (mongoose, options) => {
    const schemaDescription = {
        resId: {
            type: String,
            default: uuid,
            index: true,
            unique: true,
        },
        assetId: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        sortableAssetId: {
            type: Number,
            require: true,
            index: true,
        },
        sourceAssetId: {
            type: String,
            require: true,
            index: true,
        },
        sortableSourceAssetId: {
            type: Number,
            require: true,
            index: true,
        },
        updated: Date,
        created: Date,
        uploaded: Date,
        played: Boolean,
        listed: Boolean,
        favorite: Boolean,
        hidden: Boolean,
        duplicate: Boolean,
        deleted: Boolean,
        tags: [String],
        path: String,
        type: String,
        originalType: String,
        resolution: String,
        bytes: Number,
        hasAudio: Boolean,
        duration: String,
        seconds: Number,
        width: Number,
        height: Number,
        md5: String,
        originalmd5: String,
        filename: String,
        filesize: String,
        assetOriginURL: String,
        sourceAssetURL: String,
        sourcePreviewURL: String,
        sourceThumbURL: String,
        sourcePreviewVideoURL: String,
        sourcename: String,
    };

    return createSchema(mongoose, schemaDescription, options);
};

export default Asset;
