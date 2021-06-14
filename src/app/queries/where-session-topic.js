import pagedDbQuery from '../data-source/paged-db-query';
import assignDefaultsTo from '../assign-defaults-to';

export default async ({db, query = {}, options = {}} = {}) =>
    pagedDbQuery({
        query,
        options: assignDefaultsTo(options, {
            sort: {created: 'desc'},
        }),
        schema: db.schema.SessionTopic,
    });
