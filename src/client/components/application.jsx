import React from 'react';
import {Flex} from '@chakra-ui/react';

const Application = ({children}) => (
    <Flex minHeight="100vh" flexDirection="column" bg="bg.main" color="primary.text">
        {children}
    </Flex>
);
export default Application;
