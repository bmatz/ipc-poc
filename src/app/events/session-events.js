import log from '../logger';
import whereSession from '../queries/where-session';
import findOne from '../queries/find-one';
import whereSessionTopic from '../queries/where-session-topic';

const sessionEvents = {
    getCurrentSession: async (arg, {db}) => {
        const session = await findOne('session', {db});
        const sessionTags = await whereSessionTopic(db, {
            sessionId: session.resId,
        });
        const tagsDone = sessionTags.items.filter((sessionTag) => sessionTag.status === 'done');
        log.debug(session);
        return {
            ...session,
            tagsTotal: sessionTags.total,
            tagsDone: tagsDone.length,
        };
    },

    getLatestSessions: async (arg, {db}) => {
        const sessions = await whereSession(db, {
            page: 1,
            pageSize: 20,
            ...(arg || {}),
        });
        return sessions;
    },

    getSession: async (arg, {schema: {Session}, db}) => {
        const result = await Session.findOne({resId: arg});
        if (!result) {
            throw new Error(`Session with resId ${arg} not found`);
        }
        const session = result._doc;
        const sessionTags = await whereSessionTopic(db, {sessionResId: arg});
        const tagsDone = sessionTags.items.filter((sessionTopic) => sessionTopic.state === 'done');
        return {
            ...session,
            tagsTotal: sessionTags.total,
            tagsDone: tagsDone.length,
        };
    },

    whereSession: async (arg, {db}) => whereSession(db, {status: 'finished', ...(arg || {})}),
};

export default sessionEvents;
