import React from 'react';
import {string, bool, object, func} from 'prop-types';
import {Button} from '@chakra-ui/react';
import IconButton from './icon-button';

const propTypes = {
    icon: string,
    text: string,
    active: bool,
    route: string.isRequired,
    params: object,
    currentRoute: string,
    onNavigateTo: func.isRequired,
};
const defaultProps = {
    icon: undefined,
    text: 'Navigation Button Needs Text or Icon',
    active: false,
    params: undefined,
    currentRoute: undefined,
};

const NavigationButton = ({icon, text, active, route, params, currentRoute, onNavigateTo, ...otherProps}) => {
    function navigateTo() {
        if (onNavigateTo) {
            onNavigateTo(route, params);
        }
    }

    return (
        <>
            {icon && (
                <IconButton
                    icon={icon}
                    onClick={navigateTo}
                    _hover={{bg: 'bg.lighter', color: 'text.primary'}}
                    _active={{bg: 'bg.light', color: 'text.primary'}}
                    color={currentRoute === route ? 'text.primary' : 'text.secondary'}
                    rounded="0px"
                    {...otherProps}
                />
            )}
            {!icon && text && (
                <Button
                    onClick={navigateTo}
                    _hover={{bg: 'bg.lighter', color: 'text.primary'}}
                    _active={{bg: 'bg.light', color: 'text.primary'}}
                    color={currentRoute === route ? 'text.primary' : 'text.secondary'}
                    rounded="0px"
                    bg="transparent"
                    textAlign="center"
                    padding="0"
                    // _hover={{bg: 'transparent'}}
                    // _active={{bg: 'transparent'}}
                    _focus={{outline: 'none'}}
                    {...otherProps}>
                    {text}
                </Button>
            )}
        </>
    );
};

NavigationButton.propTypes = propTypes;
NavigationButton.defaultProps = defaultProps;

export default NavigationButton;
