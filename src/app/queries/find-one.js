import assignDefaultsTo from '../assign-defaults-to';

export default async ({schemaName, options = {}, otherProps} = {}) => {
    // eslint-disable-next-line
    const whereFn = require(`./where-${schemaName}`);
    return whereFn({options: assignDefaultsTo(options, {findOne: true}), ...otherProps});
};
