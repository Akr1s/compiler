import { isNumber } from './functions.util.js';
import { allowedKeywords } from '../constants/keywords.constant.js';
import { TOKEN_TYPES } from '../constants/token-types.constant.js';
import { CompilerError } from '../error.class.js';

export const tokenize = (code) => {
    let linePos = 1;
    let line = 1;

    const tokens = [];
    const _tokens = code.replace(/[\n\r]/g, ' *nl* ').split(' ');

    for (let i = 0; i < _tokens.length; i++) {
        const token = _tokens[i];
        if (!token) {
            linePos++;
        } else if (token === '*nl*') {
            line++;
            linePos = 1;

            tokens.push({ type: TOKEN_TYPES.NEWLINE });
        } else if (allowedKeywords.includes(token)) {
            const start = linePos;
            const end = start + token.length - 1;
            linePos = end + 2;

            tokens.push({ type: TOKEN_TYPES.KEYWORD, value: token, start, end, line });
        } else if (isNumber(token)) {
            const start = linePos;
            const end = start + token.length - 1;
            linePos = end + 2;

            tokens.push({ type: TOKEN_TYPES.NUMBER, value: Number(token), start, end, line });
        } else {
            throw new CompilerError(line, linePos, `Invalid token ❝${token}❞.`);
        }
    }

    return tokens;
};
