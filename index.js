import { debounce } from './modules/utils.js';
import { generateCode } from './modules/generateCode.js';
import { parse } from './modules/parse.js';
import { tokenize } from './modules/tokenize.js';
import { transform } from './modules/transform.js';

const codeArea = document.querySelector('#code-area');

const handleCodeAreaChange = (event) => {
    const tokenizerElement = document.querySelector('.tokenizer');
    const parserElement = document.querySelector('.parser');
    const transformerElement = document.querySelector('.transformer');
    const resultElement = document.querySelector('.result');
    const code = event.target.value;

    const displayResults = (data, error, element) => {
        if (!!error) {
            element.classList.add('error');
        } else {
            element.classList.remove('error');
        }
        element.textContent = JSON.stringify(error || data, null, 2);
    };

    const { tokens, error } = tokenize(code);
    displayResults(tokens, error, tokenizerElement);

    const ast = parse(tokens);
    parserElement.textContent = JSON.stringify(ast, null, 2);

    const transformedAst = transform(ast);
    transformerElement.textContent = JSON.stringify(transformedAst, null, 2);

    const resultCode = generateCode(transformedAst);
    resultElement.textContent = JSON.stringify(resultCode, null, 2);
};

codeArea.addEventListener('input', debounce(handleCodeAreaChange, 2000));
