import React, {createContext, useEffect, useState} from 'react';
import {node} from 'prop-types';
import {aggregateTags} from './ipc-event-handlers';

const TagsContext = createContext({
    aggregatedTags: [],
    isLoading: false,
    hasLoaded: false,
    loadAggregatedTags: () => {},
});

const TagsContextConsumer = TagsContext.Consumer;

function useAggregatedTags(initialValue) {
    const [aggregatedTags, setAggregatedTags] = useState(initialValue);
    const [isLoading, setIsLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    const loadAggregatedTags = async () => {
        setIsLoading(true);
        const result = await aggregateTags();
        setHasLoaded(true);
        setIsLoading(false);
        setAggregatedTags(result);
    };

    useEffect(() => {
        if (!isLoading && !hasLoaded) {
            loadAggregatedTags();
        }
    }, []);

    return {aggregatedTags, isLoading, hasLoaded, loadAggregatedTags};
}

const TagsContextProvider = ({children}) => {
    const tagsProps = useAggregatedTags([]);
    return (
        <TagsContext.Provider
            value={{
                ...tagsProps,
            }}>
            {children}
        </TagsContext.Provider>
    );
};

TagsContextProvider.propTypes = {children: node.isRequired};

export {TagsContext, TagsContextConsumer, TagsContextProvider};
