import { analizeStepResults, debounce } from './modules/utils/functions.util.js';
import { generateCode } from './modules/utils/generate-code.util.js';
import { parse } from './modules/utils/parse.util.js';
import { tokenize } from './modules/utils/tokenize.util.js';
import { transform } from './modules/utils/transform.util.js';

const codeArea = document.querySelector('#code-area');

const handleCodeAreaChange = (event) => {
    const resultElement = document.querySelector('.result');
    const code = event.target.value;

    const tokens = analizeStepResults(tokenize, document.querySelector('.tokenizer'))(code);
    const ast = analizeStepResults(parse, document.querySelector('.parser'))(tokens);
    const transformedAst = analizeStepResults(
        transform,
        document.querySelector('.transformer'),
    )(ast);

    const resultCode = generateCode(transformedAst);
    resultElement.textContent = JSON.stringify(resultCode, null, 2);
};

codeArea.addEventListener('input', debounce(handleCodeAreaChange, 2000));
