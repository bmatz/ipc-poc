/* eslint-disable import/no-namespace */
import {extendTheme} from '@chakra-ui/react';

const colors = {
    background: '#282c34',
    backgroundlighter: '#666',
    backgroundlight: '#555',
    bg: {
        main: '#2a2f3a',
        primary: '#282c34',
        lighter: '#666',
        light: '#555',
    },
    text: {
        primary: 'white',
        secondary: '#aaa',
        darker: '#7d8a94',
    },
};

const theme = extendTheme({colors});

export default theme;
