import { isNumber } from './utils.js';

export const tokenize = (code) => {
    let pos = 0;
    let linePos = 0;
    let row = 1;
    const length = code.length;
    let error = null;
    const tokens = [];

    const allowedKeywords = ['paper', 'pen', 'line'];
    const allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
    const spaceChars = [' ', '\n'];
    const isSpace = (char) => spaceChars.includes(char);

    while (pos < length) {
        const currentChar = code[pos];

        // empty space
        if (currentChar === ' ') {
            linePos++;
            pos++;
            continue;
            // new line
        } else if (currentChar === '\n') {
            pos++;
            row++;
            linePos = 0;
            tokens.push({ type: 'newline' });
            continue;
            //number
        } else if (isNumber(currentChar)) {
            let number = '';
            const start = linePos + 1;

            while (pos < length && !isSpace(code[pos]) && isNumber(code[pos])) {
                number += code[pos];
                linePos++;
                pos++;
            }
            const end = linePos;

            if (pos < length && !isSpace(code[pos]) && !isNumber(code[pos])) {
                error = {
                    type: 'error',
                    message: `Error on line ${row}:${start}: ❝${
                        number + code[pos]
                    }❞ is not a valid number.`,
                };
                break;
            }

            tokens.push({ type: 'number', value: number, start, end });
            continue;
            //keyword
        } else if (allowedChars.includes(currentChar)) {
            let word = '';
            const start = linePos + 1;

            while (pos < length && !isSpace(code[pos]) && !isNumber(code[pos])) {
                word += code[pos];
                linePos++;
                pos++;
            }
            const end = linePos;

            if (isNumber(code[pos])) {
                error = {
                    type: 'error',
                    value: `Error on line ${row}:${start}: ❝${
                        word + code[pos]
                    }❞ Numbers are not allowed in a keyword.`,
                };
                break;
            }

            if (!allowedKeywords.includes(word)) {
                error = {
                    type: 'error',
                    value: `Error on line ${row}:${start}: Invalid keyword ❝${word}❞.`,
                };
                break;
            }

            tokens.push({ type: 'keyword', value: word, start, end });
        } else {
            error = {
                type: 'error',
                message: `Error on line ${row}:${linePos}: Unexpected character ❝${currentChar}❞.`,
            };
            break;
        }
    }

    return { error, tokens };
};
