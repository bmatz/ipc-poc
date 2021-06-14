import React from 'react';
import {Heading, Text} from '@chakra-ui/react';
import Application from './components/application';
import Controls from './components/controls';
import Content from './components/content';
import Paginator from './components/paginator';
import Navigation from './parts/navigation';
import {TagsContextProvider} from './domain/tags-context';
import {TopicsContextProvider} from './domain/topics-context';
import TagsPage from './pages/tags-page';
import TopicsPage from './pages/topics-page';

const App = () => (
    <Application>
        <Controls>
            <Navigation />
        </Controls>
        <Content>
            <Heading color="text.primary">Captain Browsing</Heading>
            <Paginator />
            <TagsContextProvider>
                <TagsPage />
            </TagsContextProvider>
            <TopicsContextProvider>
                <TopicsPage />
            </TopicsContextProvider>
        </Content>
    </Application>
);

export default App;
