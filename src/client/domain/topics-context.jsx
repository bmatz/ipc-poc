import React, {createContext, useEffect} from 'react';
import {node} from 'prop-types';
import {assoc, sortWith, map, ascend, prop, pipe} from 'ramda';
import {Machine, assign} from 'xstate';
import {useMachine} from '@xstate/react';
import {getDisplayName} from './get-tag-display-name';
import useStateRender from '../components/use-state-render';

import {whereTopic, createTopic, updateTopic, activateTopic, deactivateTopic} from './ipc-event-handlers';

const TopicsContext = createContext({
    topics: [],
    isLoading: false,
    hasLoaded: false,
    loadTopics: () => {},
});

const TopicsContextConsumer = TopicsContext.Consumer;
const addPrettyDisplayname = (topic) => assoc('prettyDisplayName', getDisplayName(topic), topic);
const addPrettyDisplayNames = map(addPrettyDisplayname);
const sortByPrettyDisplayNameAscending = sortWith([ascend(prop('prettyDisplayName'))]);
const mapTopics = pipe(addPrettyDisplayNames, sortByPrettyDisplayNameAscending);

const topicsMachine = Machine({
    id: 'topicsLoader',
    initial: 'empty',
    context: {
        topics: [],
    },
    states: {
        empty: {
            on: {request: 'loading'},
        },
        loading: {
            entry: ['fetchTopics'],
            on: {
                response: {
                    target: 'success',
                    actions: assign({topics: (_, event) => event.data}),
                },
                error: {
                    target: 'failure',
                    actions: assign({error: (_, event) => event.data}),
                },
            },
        },
        success: {on: {request: 'loading'}},
        failure: {on: {request: 'loading'}},
    },
});

function useTopics() {
    const [state, send] = useMachine(topicsMachine, {
        actions: {
            fetchTopics: async () => {
                try {
                    const {items} = await whereTopic();
                    const mappedTopics = mapTopics(items);
                    send({type: 'response', data: mappedTopics});
                } catch (error) {
                    send({type: 'error', data: error});
                }
            },
        },
    });

    async function loadTopics() {
        send('request');
    }

    async function saveTopic(values) {
        values.displayName = !values.displayName ? values.name : values.displayName;
        const saveFn = values.resId ? updateTopic : createTopic;
        const result = await saveFn(values);
        const docId = result._doc.resId;
        const toggleActiveFn =
            (Array.isArray(values.active) && values.active.length > 0) || values.active === true
                ? activateTopic
                : deactivateTopic;
        await toggleActiveFn(docId);
    }

    useEffect(() => {
        loadTopics();
    }, []);

    return {
        stateRender: useStateRender({state, context: state.context, options: {dataProp: 'topics'}}),
        loadTopics,
        saveTopic,
    };
}

const TopicsContextProvider = ({children}) => {
    const {stateRender, loadTopics, saveTopic} = useTopics([]);
    return (
        <TopicsContext.Provider
            value={{
                stateRender,
                loadTopics,
                saveTopic,
            }}>
            {children}
        </TopicsContext.Provider>
    );
};

TopicsContextProvider.propTypes = {children: node.isRequired};

export {TopicsContext, TopicsContextConsumer, TopicsContextProvider};
