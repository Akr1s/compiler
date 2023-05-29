import { NODE_TYPES } from '../constants/node-types.constant.js';
import { isNumber } from './functions.util.js';
import { KEYWORDS } from '../constants/keywords.constant.js';
import { TOKEN_TYPES } from '../constants/token-types.constant.js';
import { CompilerError } from '../error.class.js';

export const parse = (tokens) => {
    const body = [];
    let pos = 0;
    let isPaper = false;
    let isPen = false;

    while (pos < tokens.length) {
        const token = tokens[pos];

        if (token.type === TOKEN_TYPES.KEYWORD)
            switch (token.value) {
                case KEYWORDS.PAPER: {
                    if (isPaper) {
                        throw new CompilerError(
                            token.line,
                            token.start,
                            'Paper is already defined.',
                        );
                    }

                    const declaration = {
                        type: NODE_TYPES.PAPER_DECLARATION,
                        name: KEYWORDS.PAPER,
                        arguments: [],
                    };

                    pos++;
                    const firstArgument = tokens[pos];
                    if (!firstArgument || firstArgument.type === TOKEN_TYPES.NEWLINE) {
                        throw new CompilerError(
                            token.line,
                            token.end + 2,
                            'Missing arguments. Paper requires two arguments: width and height.',
                        );
                    } else if (!isNumber(firstArgument.value)) {
                        throw new CompilerError(
                            firstArgument.line,
                            firstArgument.start,
                            'Type error. Paper width should be a number.',
                        );
                    }
                    declaration.arguments.push({
                        type: NODE_TYPES.NUMBER_LITERAL,
                        value: firstArgument.value,
                    });

                    pos++;
                    const secondArgument = tokens[pos];
                    if (!secondArgument || secondArgument.type === TOKEN_TYPES.NEWLINE) {
                        throw new CompilerError(
                            token.line,
                            firstArgument.end + 2,
                            'Missing arguments. Paper requires second argument - height.',
                        );
                    } else if (!isNumber(secondArgument.value)) {
                        throw new CompilerError(
                            secondArgument.line,
                            secondArgument.start,
                            'Type error. Paper height should be a number.',
                        );
                    }
                    declaration.arguments.push({
                        type: NODE_TYPES.NUMBER_LITERAL,
                        value: secondArgument.value,
                    });

                    pos++;
                    const lastToken = tokens[pos];
                    if (lastToken && lastToken.type !== TOKEN_TYPES.NEWLINE) {
                        throw new CompilerError(
                            lastToken.line,
                            lastToken.start,
                            'Expecting an end of line.',
                        );
                    }

                    body.push(declaration);
                    pos++;
                    isPaper = true;
                    break;
                }
                case KEYWORDS.PEN: {
                    if (!isPaper) {
                        throw new CompilerError(
                            token.line,
                            token.start,
                            'Paper should be defined first.',
                        );
                    }

                    const declaration = {
                        type: NODE_TYPES.PEN_DECLARATION,
                        name: KEYWORDS.PEN,
                        arguments: [],
                    };

                    pos++;
                    const firstArgument = tokens[pos];
                    if (!firstArgument || firstArgument.type === TOKEN_TYPES.NEWLINE) {
                        throw new CompilerError(
                            token.line,
                            token.end + 2,
                            'Missing arguments. Pen requires one argument: color.',
                        );
                    } else if (!isNumber(firstArgument.value)) {
                        throw new CompilerError(
                            firstArgument.line,
                            firstArgument.start,
                            'Type error. Pen color should be a number.',
                        );
                    }
                    declaration.arguments.push({
                        type: NODE_TYPES.NUMBER_LITERAL,
                        value: firstArgument.value,
                    });

                    pos++;
                    const lastToken = tokens[pos];
                    if (lastToken && lastToken.type !== TOKEN_TYPES.NEWLINE) {
                        throw new CompilerError(
                            lastToken.line,
                            lastToken.start,
                            'Expecting an end of line.',
                        );
                    }

                    body.push(declaration);
                    pos++;
                    isPen = true;
                    break;
                }
                case KEYWORDS.LINE: {
                    if (!isPaper) {
                        throw new CompilerError(
                            token.line,
                            token.start,
                            'Paper should be defined first.',
                        );
                    }
                    const declaration = {
                        type: NODE_TYPES.LINE_DECLARATION,
                        name: KEYWORDS.LINE,
                        arguments: [],
                    };

                    pos++;
                    const firstArgument = tokens[pos];
                    if (!firstArgument || firstArgument.type === TOKEN_TYPES.NEWLINE) {
                        throw new CompilerError(
                            token.line,
                            token.end + 2,
                            'Missing arguments. Line requires four arguments: xStart, yStart, xEnd, yEnd.',
                        );
                    } else if (!isNumber(firstArgument.value)) {
                        throw new CompilerError(
                            firstArgument.line,
                            firstArgument.start,
                            'Type error. Line xStart should be a number.',
                        );
                    }
                    declaration.arguments.push({
                        type: NODE_TYPES.NUMBER_LITERAL,
                        value: firstArgument.value,
                    });

                    pos++;
                    const secondArgument = tokens[pos];
                    if (!secondArgument || secondArgument.type === TOKEN_TYPES.NEWLINE) {
                        throw new CompilerError(
                            token.line,
                            firstArgument.end + 2,
                            'Missing arguments. Line requires four arguments: xStart, yStart, xEnd, yEnd.',
                        );
                    } else if (!isNumber(secondArgument.value)) {
                        throw new CompilerError(
                            secondArgument.line,
                            secondArgument.start,
                            'Type error. Line yStart should be a number.',
                        );
                    }
                    declaration.arguments.push({
                        type: NODE_TYPES.NUMBER_LITERAL,
                        value: secondArgument.value,
                    });

                    pos++;
                    const third = tokens[pos];
                    if (!third || third.type === TOKEN_TYPES.NEWLINE) {
                        throw new CompilerError(
                            token.line,
                            firstArgument.end + 2,
                            'Missing arguments. Line requires four arguments: xStart, yStart, xEnd, yEnd.',
                        );
                    } else if (!isNumber(third.value)) {
                        throw new CompilerError(
                            third.line,
                            third.start,
                            'Type error. Line xEnd should be a number.',
                        );
                    }
                    declaration.arguments.push({
                        type: NODE_TYPES.NUMBER_LITERAL,
                        value: third.value,
                    });

                    pos++;
                    const fourth = tokens[pos];
                    if (!fourth || fourth.type === TOKEN_TYPES.NEWLINE) {
                        throw new CompilerError(
                            token.line,
                            token.end + 2,
                            'Missing arguments. Line requires four arguments: xStart, yStart, xEnd, yEnd.',
                        );
                    } else if (!isNumber(fourth.value)) {
                        throw new CompilerError(
                            fourth.line,
                            fourth.start,
                            'Type error. Line yEnd should be a number.',
                        );
                    }
                    declaration.arguments.push({
                        type: NODE_TYPES.NUMBER_LITERAL,
                        value: fourth.value,
                    });

                    pos++;
                    const lastToken = tokens[pos];
                    if (lastToken && lastToken.type !== TOKEN_TYPES.NEWLINE) {
                        throw new CompilerError(
                            lastToken.line,
                            lastToken.start,
                            'Expecting an end of line.',
                        );
                    }

                    body.push(declaration);
                    pos++;
                    break;
                }
            }
    }
    return { type: 'Drawing', body };
};
