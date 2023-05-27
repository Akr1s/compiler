import { isNumber } from './utils.js';

export const tokenize = (code) => {
    let linePos = 1;
    let line = 1;
    const allowedKeywords = ['paper', 'pen', 'line'];

    let error = null;
    const tokens = [];
    const _tokens = code.replace(/[\n\r]/g, ' *nl* ').split(' ');

    for (let i = 0; i < _tokens.length; i++) {
        const token = _tokens[i];
        if (!token) {
            linePos++;
        } else if (token === '*nl*') {
            line++;
            linePos = 1;

            tokens.push({ type: 'newline' });
        } else if (allowedKeywords.includes(token)) {
            const start = linePos;
            const end = start + token.length - 1;
            linePos = end + 2;

            tokens.push({ type: 'keyword', value: token, start, end });
        } else if (isNumber(token)) {
            const start = linePos;
            const end = start + token.length - 1;
            linePos = end + 2;

            tokens.push({ type: 'number', value: token, start, end });
        } else {
            error = `Error on line (${line}:${linePos}): Invalid token ❝${token}❞.`;
            break;
        }
    }

    return { error, tokens };
};
