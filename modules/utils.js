export const debounce = (func, timeout = 300) => {
    let timer;
    return (args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(args);
        }, timeout);
    };
};

export const flow = (...funcs) => {
    return function (...args) {
        let index = 0;
        let result = funcs[index](args);
        while (++index < funcs.length) {
            result = funcs[index](result);
        }
        return result;
    };
};
