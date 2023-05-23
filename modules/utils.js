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
    return function (data) {
        let index = 0;
        let result = funcs[index](data);
        while (++index < funcs.length) {
            result = funcs[index](result);
        }
        return result;
    };
};
