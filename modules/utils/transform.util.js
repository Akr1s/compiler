import { KEYWORDS } from '../constants/keywords.constant.js';
import { NODE_TYPES } from '../constants/node-types.constant.js';
import { getGrayscaleColor } from './functions.util.js';

const createFunctions = {
    [KEYWORDS.PAPER]: function (scope, params) {
        const [width, heigth, color] = params.map((param) => param.value);

        return {
            tag: 'rect',
            attr: {
                x: 0,
                y: 0,
                width: width,
                height: heigth,
                fill: color,
            },
            body: [],
        };
    },
    [KEYWORDS.LINE]: function (scope, params, penColor) {
        const [xStart, yStart, xEnd, yEnd] = params.map((param) => param.value);

        return {
            tag: 'line',
            attr: {
                x1: xStart,
                y1: yStart,
                x2: xEnd > scope.paperWidth ? scope.paperWidth : xEnd,
                y2: yEnd > scope.paperHeight ? scope.paperHeight : yEnd,
                stroke: penColor,
                'stroke-linecap': 'round',
            },
            body: [],
        };
    },
};

export const transform = (ast) => {
    const { body } = ast;
    const [paperWidth, peperHeigh] = body[0].arguments.map((argument) => argument.value);

    const scope = {
        paperWidth,
        peperHeigh,
        penColor: null,
    };

    const paper = createFunctions[KEYWORDS.PAPER](scope, body[0].arguments);

    const transformedAst = {
        tag: 'svg',
        attr: {
            width: paperWidth,
            height: peperHeigh,
            viewBox: `0 0 ${paperWidth} ${peperHeigh}`,
            xmlns: 'http://www.w3.org/2000/svg',
            version: '1.1',
        },
        body: [paper],
    };

    for (let i = 1; i < body.length; i++) {
        const node = ast.body[i];

        if ([NODE_TYPES.LINE_DECLARATION, NODE_TYPES.PEN_DECLARATION].includes(node.type)) {
            if (node.name === KEYWORDS.PEN) {
                const colorValue = node.arguments[0].value;
                scope.penColor =
                    typeof colorValue === 'number' ? getGrayscaleColor(colorValue) : colorValue;
            } else {
                const element = createFunctions[node.name](scope, node.arguments, scope.penColor);
                if (!element) {
                    throw new Error(`${node.name} is not a valid command.`);
                }
                transformedAst.body.push(element);
            }
        }
    }

    return transformedAst;
};
