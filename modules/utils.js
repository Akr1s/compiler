export const debounce = (func, timeout = 300) => {
    let timer;
    return (args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(args);
        }, timeout);
    };
};

export const isNumber = (str) => !isNaN(str) && !isNaN(parseFloat(str));
