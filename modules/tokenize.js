export const tokenize = (code) => {
    const result = code
        .split(/\s+/)
        .filter((token) => token.length > 0)
        .map((token) => {
            return isNaN(token) ? { type: 'word', value: token } : { type: 'number', value: token };
        });

    return result;
};
