import getDb from '../data-source/get-db';

export function withDb(fn) {
    return async function awaitDb(arg) {
        const db = await getDb();
        return fn(arg, {db});
    };
}

export function withSchema(schema) {
    return function schemaWrapper(fn) {
        return async function schemaExecutor(arg) {
            const db = await getDb();
            const dbSchema = {};
            if (Array.isArray(schema)) {
                schema.forEach((s) => {
                    dbSchema[s] = db.schema[s];
                });
            } else {
                dbSchema[schema] = db.schema[schema];
            }

            return fn(arg, {db, schema: dbSchema});
        };
    };
}

export function dynamicHandler(handler) {
    const handlerFnString = handler.toString();

    const startArguments = handlerFnString.indexOf('(');
    const endArguments = handlerFnString.indexOf(')');

    let argumentsString = handlerFnString.substring(startArguments, endArguments + 1);
    argumentsString = argumentsString.replace(/\s|\(|\)|/g, '');

    const startDb = argumentsString.indexOf('db');
    const startSchema = argumentsString.indexOf('schema');

    if (startSchema > -1) {
        let schemaString = argumentsString.substring(startSchema + 8);
        const schemaEnd = schemaString.indexOf('}');

        schemaString = schemaString.substring(0, schemaEnd);

        const schemas = schemaString.split(',');
        return withSchema(schemas)(handler);
    }

    if (startDb > -1) {
        return withDb(handler);
    }

    return handler;
}
