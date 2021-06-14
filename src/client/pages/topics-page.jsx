import React, {useContext} from 'react';
import {Box, Heading, Spinner} from '@chakra-ui/react';
import {TopicsContext} from '../domain/topics-context';

const TopicsPage = () => {
    const {stateRender: topicsRender} = useContext(TopicsContext);

    return (
        <Box>
            <Heading as="h1" color="text.primary">
                TOPICS PAGE
            </Heading>
            {topicsRender({
                empty: <Spinner mt="2" size="sm" color="gray.200" />,
                loading: <Spinner mt="2" size="md" color="gray.200" />,
                success: (topics) =>
                    topics.map((topic) => (
                        <Heading as="h2" color="text.secondary" key={topic.resId}>
                            {topic.prettyDisplayName}
                        </Heading>
                    )),

                error: (error) => <div>buhu, muss weinen...</div>,
            })}
        </Box>
    );
};

export default TopicsPage;
