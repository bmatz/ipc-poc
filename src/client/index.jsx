import React from 'react';
import {render} from 'react-dom';
import {ChakraProvider} from '@chakra-ui/react';

import './index.css';
import theme from './theme';

import App from './app.jsx';

render(
    <ChakraProvider theme={theme} resetCSS>
        <App />
    </ChakraProvider>,
    document.getElementById('root')
);
