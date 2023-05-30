import { NODE_TYPES } from '../constants/node-types.constant.js';
import { KEYWORDS } from '../constants/keywords.constant.js';
import { TOKEN_TYPES } from '../constants/token-types.constant.js';
import { CompilerError } from '../error.class.js';

const nodeTypes = {
    [TOKEN_TYPES.NUMBER]: NODE_TYPES.NUMBER_LITERAL,
    [TOKEN_TYPES.STRING]: NODE_TYPES.STRING_LITERAL,
};

const argumentsMap = {
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
};

const isValidColor = (strColor) => {
    var s = new Option().style;
    s.color = strColor;

    return s.color === strColor;
};

const getKeywordArguments = (initialToken, initialPosition, tokens) => {
    let currentPosition = initialPosition;
    const keywordArguments = argumentsMap[initialToken.value];
    const argumentsCount = keywordArguments.length;
    const args = [];

    for (let i = 0; i < argumentsCount; i++) {
        currentPosition++;
        const requiredArgument = keywordArguments[i];
        const argument = tokens[currentPosition];

        if (!argument || argument.type === TOKEN_TYPES.NEWLINE) {
            throw new CompilerError(
                initialToken.line,
                initialToken.end + 2,
                `Missing arguments: ${initialToken.value} requires ${argumentsCount} arguments.`,
            );
        } else if (!requiredArgument.types.includes(argument.type)) {
            throw new CompilerError(
                argument.line,
                argument.start,
                `Type error: ${requiredArgument.name} is not a ${requiredArgument.types.join(
                    ' or ',
                )}.`,
            );
        } else if (argument.type === TOKEN_TYPES.STRING && !isValidColor(argument.value)) {
            throw new CompilerError(
                argument.line,
                argument.start,
                `Error: "${argument.value}" is not a valid color.`,
            );
        }

        args.push({
            type: nodeTypes[argument.type],
            value: argument.value,
        });
    }

    currentPosition++;
    const newlineToken = tokens[currentPosition];
    if (newlineToken && newlineToken.type !== TOKEN_TYPES.NEWLINE) {
        throw new CompilerError(newlineToken.line, newlineToken.start, 'Expecting an end of line.');
    }
    currentPosition++;
    const positionShift = currentPosition - initialPosition;

    return { args, positionShift };
};

const checkPaper = (isPaper) => {
    if (!isPaper) {
        throw new CompilerError(token.line, token.start, 'Paper should be defined first.');
    }
};

export const parse = (tokens) => {
    const body = [];
    let position = 0;
    let isPaper = false;

    while (position < tokens.length) {
        const token = tokens[position];

        if (token.type === TOKEN_TYPES.STRING)
            switch (token.value) {
                case KEYWORDS.PAPER: {
                    if (isPaper) {
                        throw new CompilerError(
                            token.line,
                            token.start,
                            'Paper is already defined.',
                        );
                    }
                    const { args, positionShift } = getKeywordArguments(token, position, tokens);
                    const declaration = {
                        type: NODE_TYPES.PAPER_DECLARATION,
                        name: KEYWORDS.PAPER,
                        arguments: args,
                    };

                    body.push(declaration);
                    position += positionShift;
                    isPaper = true;
                    break;
                }
                case KEYWORDS.PEN: {
                    checkPaper(isPaper);
                    const { args, positionShift } = getKeywordArguments(token, position, tokens);
                    const declaration = {
                        type: NODE_TYPES.PEN_DECLARATION,
                        name: KEYWORDS.PEN,
                        arguments: args,
                    };

                    body.push(declaration);
                    position += positionShift;
                    break;
                }
                case KEYWORDS.LINE: {
                    checkPaper(isPaper);
                    const { args, positionShift } = getKeywordArguments(token, position, tokens);
                    const declaration = {
                        type: NODE_TYPES.LINE_DECLARATION,
                        name: KEYWORDS.LINE,
                        arguments: args,
                    };

                    body.push(declaration);
                    position += positionShift;
                    break;
                }
                default: {
                    throw new CompilerError(
                        token.line,
                        token.start,
                        `Invalid keyword "${token.value}"`,
                    );
                }
            }
    }
    return { type: 'Drawing', body };
};
