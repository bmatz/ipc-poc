/* eslint-disable import/no-namespace */
import React from 'react';
import {IconButton as ChakraIconButton} from '@chakra-ui/react';

// import resolveIcon from './resolve-icon';

const IconButton = ({icon, iconName, name, regular, ...otherProps}) => (
    <ChakraIconButton
        bg="transparent"
        color="text.primary"
        textAlign="center"
        padding="0"
        // _hover={{bg: 'transparent'}}
        // _active={{bg: 'transparent'}}
        _focus={{outline: 'none'}}
        // icon={resolveIcon(icon || iconName || name, regular)}
        icon={icon}
        {...otherProps}
    />
);
export default IconButton;
