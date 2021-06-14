import uuid from 'uuid';
import createSchema from './create-schema';
import ErrorDescriptionFactory from './ErrorDescription';

const SessionAsset = (mongoose, options) => {
    const schemaDescription = {
        resId: {
            type: String,
            default: uuid.v4,
            require: true,
            index: true,
            unique: true,
        },
        sessionResId: {
            type: String,
            default: uuid.v4,
            require: true,
            index: true,
        },
        assetId: {
            type: String,
            required: true,
            index: true,
        },
        sortableAssetId: {
            type: Number,
            require: true,
            index: true,
        },
        sourceAssetId: {
            type: String,
            required: true,
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
        exceptions: [ErrorDescriptionFactory(mongoose, {removeMongoId: true})],
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
        tagname: String,
        state: String,
    };

    // Item.index({ 'sources.sourceSystem': 1, 'sources.sourceId': -1 });
    // Item.index({ lastName_search: 1, firstName_search: -1 });

    // Item.pre('save', function save(next) {
    // 	this.firstName_search = this.firstName ? this.firstName.toLowerCase() : this.firstName;
    // 	this.lastName_search = this.lastName ? this.lastName.toLowerCase() : this.lastName;
    // 	next();
    // });

    return createSchema(mongoose, schemaDescription, options);
};

export default SessionAsset;
