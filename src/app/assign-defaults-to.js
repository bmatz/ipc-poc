import {assoc} from 'ramda';

const assignDefaultsTo = (props, defaultProps) =>
    Object.keys(defaultProps).reduce(
        (acc, key) => {
            if (!props[key]) {
                return assoc(key, defaultProps[key], acc);
            }
            return acc;
        },
        {...props}
    );

export default assignDefaultsTo;
