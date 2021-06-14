import React from 'react';
import {arrayOf, string, func, number, bool} from 'prop-types';
import {Flex, Spinner} from '@chakra-ui/react';
import {FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight, FaSync} from 'react-icons/fa';
import PaginatorButton from './paginator-button';
import IconButton from './icon-button';

const propTypes = {
    boundaries: arrayOf(string),
    onNext: func,
    onPrevious: func,
    onFirst: func,
    onLast: func,
    onGotoPage: func,
    currentPage: number,
    onRefresh: func,
    isLoading: bool,
};

const defaultProps = {
    boundaries: ['1'],
    onNext: () => {},
    onPrevious: () => {},
    onFirst: () => {},
    onLast: () => {},
    onGotoPage: () => {},
    currentPage: 1,
    onRefresh: undefined,
    isLoading: false,
};

const Paginator = ({
    boundaries,
    onNext,
    onPrevious,
    onFirst,
    onLast,
    onGotoPage,
    currentPage,
    onRefresh,
    isLoading,
}) => (
    <Flex alignSelf="center">
        <IconButton icon={<FaAngleDoubleLeft />} onClick={onFirst} />
        <IconButton icon={<FaAngleLeft />} onClick={onPrevious} />
        {boundaries.map((boundary, idx) => {
            if (boundary === '...') {
                return <PaginatorButton key={`${idx}-${boundary}`}>...</PaginatorButton>;
            }
            const boundaryNumber = parseInt(boundary, 10);
            return (
                <PaginatorButton
                    key={`${idx}-${boundary}`}
                    onClick={() => onGotoPage(boundaryNumber)}
                    active={boundaryNumber === currentPage}>
                    {boundaryNumber === currentPage && <strong>{boundary}</strong>}
                    {boundaryNumber !== currentPage && <span>{boundary}</span>}
                </PaginatorButton>
            );
        })}
        <IconButton icon={<FaAngleRight />} onClick={onNext} />
        <IconButton icon={<FaAngleDoubleRight />} onClick={onLast} />
        {onRefresh && !isLoading && <IconButton icon={<FaSync />} onClick={onRefresh} />}
        {onRefresh && isLoading && <Spinner mt="2" size="md" color="gray.200" />}
    </Flex>
);

Paginator.propTypes = propTypes;
Paginator.defaultProps = defaultProps;

export default Paginator;
