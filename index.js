import { debounce, flow } from './modules/utils.js';
import { generateCode } from './modules/generateCode.js';
import { parse } from './modules/parse.js';
import { tokenize } from './modules/tokenize.js';
import { transform } from './modules/transform.js';

const codeArea = document.querySelector('#code-area');

const handleCodeAreaChange = (event) => {
    const code = event.target.value;
    const compile = flow(tokenize, parse, transform, generateCode);

    compile(code);
};

codeArea.addEventListener('input', debounce(handleCodeAreaChange, 2000));
