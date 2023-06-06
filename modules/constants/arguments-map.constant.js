import { KEYWORDS } from './keywords.constant.js';
import { TOKEN_TYPES } from './token-types.constant.js';

export const argumentsMap = {
    [KEYWORDS.PAPER]: [
        { name: 'width', types: [TOKEN_TYPES.NUMBER] },
        { name: 'height', types: [TOKEN_TYPES.NUMBER] },
        { name: 'color', types: [TOKEN_TYPES.NUMBER, TOKEN_TYPES.STRING] },
    ],
    [KEYWORDS.PEN]: [{ name: 'color', types: [TOKEN_TYPES.NUMBER, TOKEN_TYPES.STRING] }],
    [KEYWORDS.LINE]: [
        { name: 'xStart', types: [TOKEN_TYPES.NUMBER] },
        { name: 'yStart', types: [TOKEN_TYPES.NUMBER] },
        { name: 'xEnd', types: [TOKEN_TYPES.NUMBER] },
        { name: 'yEnd', types: [TOKEN_TYPES.NUMBER] },
    ],
    [KEYWORDS.RECT]: [
        { name: 'x', types: [TOKEN_TYPES.NUMBER] },
        { name: 'y', types: [TOKEN_TYPES.NUMBER] },
        { name: 'width', types: [TOKEN_TYPES.NUMBER] },
        { name: 'height', types: [TOKEN_TYPES.NUMBER] },
        { name: 'fill', types: [TOKEN_TYPES.NUMBER, TOKEN_TYPES.STRING] },
    ],
    [KEYWORDS.CIRCLE]: [
        { name: 'cx', types: [TOKEN_TYPES.NUMBER] },
        { name: 'cy', types: [TOKEN_TYPES.NUMBER] },
        { name: 'r', types: [TOKEN_TYPES.NUMBER] },
        { name: 'fill', types: [TOKEN_TYPES.NUMBER, TOKEN_TYPES.STRING] },
    ],
};
