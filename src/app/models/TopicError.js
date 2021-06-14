import createSchema from './create-schema';
import ErrorDescriptionFactory from './ErrorDescription';

const TopicError = (mongoose, options) => {
    const schemaDescription = {
        tag: String,
        exceptions: [ErrorDescriptionFactory(mongoose, {removeMongoId: true})],
    };
    return createSchema(mongoose, schemaDescription, options);
};

export default TopicError;
