const codeArea = document.querySelector('#code-area');

const tokenize = (code) => {
    const tokenizerElement = document.querySelector('.tokenizer');
    tokenizerElement.textContent = code;
    return code;
};

const parse = (code) => {
    const parserElement = document.querySelector('.parser');
    parserElement.textContent = code;
    return code;
};

const transform = (code) => {
    const transformerElement = document.querySelector('.transformer');
    transformerElement.textContent = code;
    return code;
};

const generateCode = (code) => {
    const resultElement = document.querySelector('.result');
    resultElement.textContent = code;
    return code;
};

const handleCodeAreaChange = (event) => {
    const code = event.target.value;
    const compile = flow(tokenize, parse, transform, generateCode);

    compile(code);
};

codeArea.addEventListener('input', debounce(handleCodeAreaChange, 2000));

function debounce(func, timeout = 300) {
    let timer;
    return (args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(args);
        }, timeout);
    };
}

function flow(...funcs) {
    return function (...args) {
        let index = 0;
        let result = funcs[index](args);
        while (++index < funcs.length) {
            result = funcs[index](result);
        }
        return result;
    };
}
