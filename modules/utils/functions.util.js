import { CompilerError } from '../error.class.js';

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

export const analizeStepResults = (callback, element) => {
    return (data) => {
        let result;
        try {
            result = callback(data);
            element.classList.remove('error');
            element.textContent = JSON.stringify(result, null, 2);
        } catch (error) {
            if (error instanceof CompilerError) {
                const errorMessage = `${error.name}: ${error.message}`;
                element.textContent = errorMessage;
                element.classList.add('error');
            }
            throw error;
        }
        return result;
    };
};
