import React from 'react';
import {Box} from '@chakra-ui/react';

const Content = ({children}) => (
    <Box bg="bg.main" pt="8" pb="8" pr="12" pl="12">
        {children}
    </Box>
);
export default Content;
