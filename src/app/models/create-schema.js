function createSchema(mongoose, schemaDescription, options = {}) {
    if (!mongoose.Schema) {
        throw new Error('mongoose not provided, missing Schema property on argument mongoose');
    }
    if (!schemaDescription) {
        throw new Error('missing schema Description');
    }
    const {removeMongoId} = options;
    return removeMongoId
        ? new mongoose.Schema(schemaDescription, {_id: false})
        : new mongoose.Schema(schemaDescription);
}

export default createSchema;
