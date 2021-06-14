import React from 'react';
import {Box, Flex, Text, Tag} from '@chakra-ui/react';
import {node, string, bool, number, arrayOf} from 'prop-types';

const propTypes = {
    navigationButton: node,
    displayName: string.isRequired,
    imagesCount: number,
    tagname: string.isRequired,
    sourcesCount: number,
    activeSources: number,
    active: bool,
    children: node,
    lastScan: string,
    hasMissingIds: bool,
    sourcenames: arrayOf(string),
};

const defaultProps = {
    navigationButton: undefined,
    imagesCount: 0,
    active: false,
    children: null,
    lastScan: 'never scanned',
    sourcesCount: 0,
    activeSources: 0,
    hasMissingIds: false,
    sourcenames: [],
};

const TopicBlock = ({
    navigationButton,
    displayName,
    tagname,
    lastScan,
    activeSources,
    sourcesCount,
    active,
    imagesCount,
    children,
    hasMissingIds,
    sourcenames,
}) => {
    const sourcesInfo = sourcesCount !== activeSources ? `, ${activeSources} active` : '';
    const scanInfo = lastScan || 'Never scanned';
    const ssSS = sourcesCount > 1 ? 's' : '';
    let scanInfoColor = lastScan === 'Yesterday' || lastScan === 'Today' ? 'gray' : 'green';
    if (!lastScan) {
        scanInfoColor = 'red';
    }

    let nameTag = '';
    let viewDisplayName = displayName;
    if (displayName.startsWith('[')) {
        const idx = displayName.indexOf(']');
        if (idx > 0) {
            nameTag = displayName.slice(0, idx + 1);
            viewDisplayName = displayName.slice(idx + 1);
        }
    }

    return (
        <Box pb="4">
            <div>
                <Flex fontSize="3xl" borderBottom="1px" borderBottomStyle="solid" borderBottomColor="text.primary">
                    {navigationButton}
                    {nameTag && (
                        <Text color={active ? 'blue.300' : 'text.secondary'} mr="2">
                            {nameTag}
                        </Text>
                    )}
                    <Text color={active ? 'text.primary' : 'text.secondary'}>{viewDisplayName}</Text>
                    {!!imagesCount && (
                        <Text color="text.secondary" ml="4">
                            <i> - {imagesCount}</i>
                        </Text>
                    )}
                    {children}
                </Flex>
                {tagname && (
                    <Flex ml="10" mt="1">
                        <Tag rounded="full" variant="outline" ml="1">
                            {tagname}
                        </Tag>
                        <Tag rounded="full" variant="outline" variantColor="yellow" ml="1">
                            {sourcesCount} Source{ssSS}
                            {sourcesInfo}
                        </Tag>
                        {hasMissingIds && (
                            <Tag ml="1" variantColor="red" rounded="full">
                                Missing Source Tag Ids
                            </Tag>
                        )}
                        <Tag
                            ml="1"
                            variantColor={scanInfoColor}
                            rounded="full"
                            variant={!lastScan ? undefined : 'outline'}>
                            {scanInfo}
                        </Tag>
                        {sourcenames.map((sourcename) => (
                            <Tag key={`${tagname}-${sourcename}`} rounded="full" variant="outline">
                                {sourcename}
                            </Tag>
                        ))}
                    </Flex>
                )}
            </div>
        </Box>
    );
};

TopicBlock.defaultProps = defaultProps;
TopicBlock.propTypes = propTypes;

export default TopicBlock;
