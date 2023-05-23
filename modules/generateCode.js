export const generateCode = (code) => {
    const resultElement = document.querySelector('.result');
    resultElement.textContent = JSON.stringify(code, null, 2);
    return code;
};
