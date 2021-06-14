import createSchema from './create-schema';

const ErrorDescription = (mongoose, options) => {
    const schemaDescription = {process: String, exception: String, stacktrace: String};

    return createSchema(mongoose, schemaDescription, options);
};

export default ErrorDescription;
