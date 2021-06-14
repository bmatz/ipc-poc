import React from 'react';
import {Box} from '@chakra-ui/react';

const PaginatorButton = ({active, onClick, children}) => (
    <Box
        onClick={onClick}
        cursor="pointer"
        minWidth="10"
        textAlign="center"
        alignSelf="center"
        color={active ? 'text.primary' : 'text.secondary'}
        _hover={{color: 'text.primary', fontWeight: 'bold'}}
        _active={{color: 'text.primary', fontWeight: 'bold'}}>
        {children}
    </Box>
);

export default PaginatorButton;
