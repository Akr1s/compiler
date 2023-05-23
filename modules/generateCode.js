export const generateCode = (code) => {
    const resultElement = document.querySelector('.result');
    resultElement.textContent = code;
    return code;
};
