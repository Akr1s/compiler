export const parse = (code) => {
    const parserElement = document.querySelector('.parser');
    parserElement.textContent = JSON.stringify(code, null, 2);
    return code;
};
