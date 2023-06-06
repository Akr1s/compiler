export const generateCode = (transformedAst) => {
    const transformAttributes = (attributes) => {
        return Object.entries(attributes).reduce(
            (acc, [key, value]) => acc + ` ${key}='${value}'`,
            '',
        );
    };

    const rootAttributes = transformAttributes(transformedAst.attr);

    const elements = transformedAst.body.map(
        ({ tag, attr }) => `\n\t<${tag} ${transformAttributes(attr)}></${tag}>`,
    );

    return `<svg ${rootAttributes}>${elements.join('')}\n</svg>`;
};
