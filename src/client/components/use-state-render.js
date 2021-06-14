import {useCallback} from 'react';

const stateRenderFactory = ({
    state,
    context,
    options = {dataProp: '...', errorProp: 'error'},
    errorStates = ['error'],
}) => (renderProps) => {
    const {errorProp, dataProp} = options;
    const renderFn = renderProps[state];
    if (errorStates.includes(state)) {
        const errorArg = context[errorProp];
        return renderFn(errorArg);
    }
    let dataArg;
    if (dataProp === '...') {
        dataArg = {...context};
        delete dataArg[errorProp];
    } else {
        dataArg = context[dataProp];
    }

    if (typeof renderFn === 'function') {
        return renderFn(dataArg);
    }
    return renderFn;
};

const useStateRender = ({state, context, options, errorStates}) => {
    const render = useCallback(
        (renderProps) => {
            const renderFn = stateRenderFactory({state, context, options, errorStates});
            return renderFn(renderProps);
        },
        [state, context, context, options, errorStates]
    );

    return render;
};

export default useStateRender;
