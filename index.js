import { argumentsMap } from './modules/constants/arguments-map.constant.js';
import { analizeStepResults, debounce } from './modules/utils/functions.util.js';
import { generateCode } from './modules/utils/generate-code.util.js';
import { parse } from './modules/utils/parse.util.js';
import { tokenize } from './modules/utils/tokenize.util.js';
import { transform } from './modules/utils/transform.util.js';

const codeArea = document.querySelector('#code-area');

const keywords = Object.entries(argumentsMap)
    .map(([key, value]) => {
        const args = value.map(({ name, types }) => `[${name}: ${types.join(' | ')}]`).join(' ');
        return `<span class="declaration"><b>${key}</b> ${args}</span>`;
    })
    .join('');
document.querySelector('#keywords').innerHTML = keywords;

const handleCodeAreaChange = (event) => {
    const code = event.target.value;

    const tokens = analizeStepResults(tokenize, document.querySelector('.tokenizer'))(code);
    const ast = analizeStepResults(parse, document.querySelector('.parser'))(tokens);
    const transformedAst = analizeStepResults(
        transform,
        document.querySelector('.transformer'),
    )(ast);
    const svg = analizeStepResults(generateCode, document.querySelector('.result'))(transformedAst);
    document.querySelector('#preview').innerHTML = svg;
};

codeArea.addEventListener('input', debounce(handleCodeAreaChange, 2000));
