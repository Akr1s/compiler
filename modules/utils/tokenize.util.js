import { isNumber } from './functions.util.js';
import { TOKEN_TYPES } from '../constants/token-types.constant.js';

const specialTokens = {
    NEWLINE: '*nl*',
};

export const tokenize = (code) => {
    let linePos = 1;
    let line = 1;

    const tokens = [];
    const _tokens = code
        .replace(/[\n\r]/g, ` ${specialTokens.NEWLINE} `)
        .replace(/  +/g, ' ')
        .split(' ');

    for (let i = 0; i < _tokens.length; i++) {
        const token = _tokens[i];

        if (!token) {
            linePos++;
        } else if (token === specialTokens.NEWLINE) {
            line++;
            linePos = 1;

            tokens.push({ type: TOKEN_TYPES.NEWLINE });
        } else if (isNumber(token)) {
            const start = linePos;
            const end = start + token.length - 1;
            linePos = end + 2;

            tokens.push({ type: TOKEN_TYPES.NUMBER, value: Number(token), start, end, line });
        } else if (Object.keys(specialTokens).includes(token)) {
            const start = linePos;
            const end = start + token.length - 1;
            linePos = end + 2;

            tokens.push({ type: TOKEN_TYPES.SPECIAL_CHARACTER, value: token, start, end, line });
        } else {
            const start = linePos;
            const end = start + token.length - 1;
            linePos = end + 2;

            tokens.push({ type: TOKEN_TYPES.STRING, value: token, start, end, line });
        }
    }

    return tokens;
};
