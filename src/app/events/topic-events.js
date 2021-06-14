import {v4 as uuid} from 'uuid';
import {indexBy, prop, pipe, map} from 'ramda';
import whereTopic from '../queries/where-topic';

const createdLatestSessionTopicMap = pipe(map(prop('sessionTag')), indexBy(prop('tagId')));

const topicEvents = {
    whereTopic: async (query, {db, schema: {SessionTopic} = {}} = {}) => {
        const whereTopicPromise = whereTopic({db, query});

        const latestSessionTopicsPromise = SessionTopic.aggregate([
            {
                $project: {
                    created: '$created',
                    topicResId: '$topicResId',
                    sessionTag: '$$ROOT',
                },
            },
            {
                $sort: {created: -1},
            },
            {
                $group: {
                    _id: '$topicResId',
                    sessionTopic: {$first: '$sessionTopic'},
                },
            },
        ]).exec();
        const [result, latestSessionTopics] = await Promise.all([whereTopicPromise, latestSessionTopicsPromise]);

        const latestSessionTopicsMap = createdLatestSessionTopicMap(latestSessionTopics);
        result.items = result.items.map((topic) => ({
            ...topic,
            recentSessionTag: latestSessionTopicsMap[topic.resId],
        }));

        return result;
    },

    getTopic: async (arg, {schema: {Topic}}) => Topic.findOne({$or: [{resId: arg}, {name: arg}]}),

    createTopic: async (arg, {schema: {Topic}}) => {
        const tag = await Topic.findOne({name: arg.name});
        if (tag) {
            throw new Error(`Topic with name ${arg.name} already exists`);
        }
        const newTopic = new Topic(arg);
        if (!newTopic.displayName) {
            newTopic.displayName = newTopic.name;
        }
        newTopic.active = true;
        newTopic.favorite = false;
        newTopic.resId = uuid();
        newTopic.created = new Date();
        newTopic.updated = new Date();
        return newTopic.save();
    },

    updateTopic: async (arg, {schema: {Tag: Topic}}) => {
        const query = {$or: [{resId: arg.resId}, {name: arg.resId}]};
        const item = await Topic.findOne(query);
        if (!item) {
            throw new Error(`Topic with resId/name ${arg.resId} not found`);
        }
        await Topic.findOneAndUpdate(query, {
            displayName: arg.displayName,
            active: arg.active,
            updated: new Date(),
            sources: arg.sources,
        });
        return Topic.findOne(query);
    },

    activateTopic: async (arg, {schema: {Tag: Topic}}) => {
        const query = {$or: [{resId: arg}, {name: arg}]};
        const item = await Topic.findOne(query);
        if (!item) {
            throw new Error(`Topic with resId/name ${arg} not found`);
        }
        await Topic.findOneAndUpdate(query, {active: true});
        return Topic.findOne(query);
    },

    deactivateTopic: async (arg, {schema: {Tag: Topic}}) => {
        const query = {$or: [{resId: arg}, {name: arg}]};
        const item = await Topic.findOne(query);
        if (!item) {
            throw new Error(`Topic with resId/name ${arg} not found`);
        }
        await Topic.findOneAndUpdate(query, {active: false});
        return Topic.findOne(query);
    },

    // TAGS
    aggregateTags: async (_, {schema: {Asset}}) => {
        console.log(Asset);
        return Asset.aggregate([{$unwind: '$tags'}, {$group: {_id: '$tags', count: {$sum: 1}}}]);
    },
};

export default topicEvents;
