export const parse = (code) => {
    const parserElement = document.querySelector('.parser');
    parserElement.textContent = code;
    return code;
};
