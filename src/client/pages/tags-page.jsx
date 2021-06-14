import React, {useContext} from 'react';
import {TagsContext} from '../domain/tags-context';

const TagsPage = () => {
    const {aggregatedTags, isLoading, hasLoaded, loadAggregatedTags} = useContext(TagsContext);
    return <div>TAGSPAGE</div>;
};

export default TagsPage;
