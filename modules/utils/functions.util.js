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

            const isString = typeof result === 'string';
            element.textContent = isString ? result : JSON.stringify(result, null, 2);
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

export function getGrayscaleColor(percentage) {
    var color_part_dec = (255 * percentage) / 100;
    var color_part_hex = Number(parseInt(color_part_dec, 10)).toString(16);
    return '#' + color_part_hex + color_part_hex + color_part_hex;
}
