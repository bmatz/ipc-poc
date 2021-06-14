import React from 'react';
import {Flex} from '@chakra-ui/react';
import {FaTachometerAlt, FaCalendarAlt, FaTags, FaImage, FaTimes} from 'react-icons/fa';
import {string, func, arrayOf, shape} from 'prop-types';
import NavigationButton from '../components/navigation-button';

const NavigationOrganism = ({currentRoute, onNavigateTo, tabs, currentTab}) => (
    <nav>
        <Flex>
            <NavigationButton
                icon={<FaTachometerAlt />}
                route="dashboard"
                currentRoute={currentRoute}
                onNavigateTo={onNavigateTo}
            />
            <NavigationButton
                icon={<FaCalendarAlt />}
                route="current"
                currentRoute={currentRoute}
                onNavigateTo={onNavigateTo}
            />
            <NavigationButton icon={<FaTags />} route="tags" currentRoute={currentRoute} onNavigateTo={onNavigateTo} />
            {/* <NavigationButton icon="database" route="sessions"  currentRoute={currentRoute} onNavigateTo={onNavigateTo} /> */}
            <NavigationButton
                icon={<FaImage />}
                route="assets"
                currentRoute={currentRoute}
                onNavigateTo={onNavigateTo}
            />
            {/* <NavigationButton icon="cog" route="settingsControl"  currentRoute={currentRoute} onNavigateTo={onNavigateTo} /> */}
            {tabs.map((tab) => (
                <React.Fragment key={`${tab.resId}-fragment`}>
                    <NavigationButton
                        key={tab.route}
                        text={tab.name}
                        route={tab.route}
                        currentRoute={currentTab ? currentTab.resId : currentRoute}
                        onNavigateTo={onNavigateTo}
                    />
                    <NavigationButton
                        key={`${tab.route}.close`}
                        icon={<FaTimes />}
                        route={tab.route}
                        params={{close: true}}
                        onNavigateTo={onNavigateTo}
                    />
                </React.Fragment>
            ))}
        </Flex>
    </nav>
);

NavigationOrganism.propTypes = {
    currentRoute: string,
    onNavigateTo: func,
    tabs: arrayOf(shape({route: string.isRequired, name: string.isRequired})),
    currentTab: shape({resId: string.isRequired}),
};

NavigationOrganism.defaultProps = {
    tabs: [],
    currentRoute: '',
    onNavigateTo: undefined,
    currentTab: {},
};

export default NavigationOrganism;
