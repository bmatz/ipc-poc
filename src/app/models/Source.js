import createSchema from './create-schema';

const Source = (mongoose, options) => {
    const schemaDescription = {
        mode: String,
        active: Boolean,
        sourceId: String,
        autoFetchId: Boolean,
        sourcename: String,
        tagname: String,
    };
    return createSchema(mongoose, schemaDescription, options);
};

export default Source;
