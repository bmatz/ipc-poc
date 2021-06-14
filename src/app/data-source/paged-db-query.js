import {identity} from 'ramda';

import log from '../logger';

const mapResult = (entries, mapResultEntry = identity) =>
    Array.isArray(entries) ? entries.map(mapResultEntry) : mapResultEntry(entries);

const pagedDbQuery = async ({
    query,
    options: {select, sort, page, pageSize, populate, populateOptions, findOne, mapResultEntry},
    schema,
}) => {
    if (!schema) {
        throw new Error('schema not defined');
    }
    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);

    let findFn = findOne ? schema.findOne(query) : schema.find(query);
    if (sort) {
        findFn = findFn.sort(sort);
    }

    log.debug(
        {
            schema: schema.modelName,
            query,
            options: {select, sort, page, pageSize, populate, populateOptions, findOne, mapResultEntry},
        },
        `pagedDbQuery is querying ${schema.modelName}s`
    );

    findFn = findFn.select(`-_id -__v ${select || ''}`);

    if (populate) {
        findFn = findFn.populate(populate, populateOptions || '');
    }

    if (!findOne && pageNumber && pageSizeNumber) {
        const result = await findFn
            .lean()
            .skip((pageNumber - 1) * pageSizeNumber)
            .limit(pageSizeNumber)
            .exec();

        return {
            page: pageNumber,
            pageSize: pageSizeNumber,
            total: await schema.countDocuments(query),
            items: mapResult(result, mapResultEntry),
        };
    }

    const result = await findFn.lean().exec();

    const mappedResult = mapResult(result, mapResultEntry);

    return findOne
        ? mappedResult
        : {
              total: await schema.countDocuments(query),
              items: mappedResult,
          };
};

export default pagedDbQuery;
