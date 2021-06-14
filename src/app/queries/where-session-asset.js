import pagedDbQuery from '../data-source/paged-db-query';
import mapAsset from './map-asset';
import assignDefaultsTo from '../assign-defaults-to';

export default async ({db, query = {}, options = {}} = {}) =>
    pagedDbQuery({
        query: assignDefaultsTo(query, {status: 'finished'}),
        options: assignDefaultsTo(options, {
            page: 1,
            pageSize: 25,
            sort: {sortableAssetId: 'desc'},
            mapResultEntry: mapAsset,
        }),
        schema: db.schema.SessionAsset,
    });
