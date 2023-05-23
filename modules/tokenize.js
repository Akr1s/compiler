export const tokenize = (code) => {
    const tokenizerElement = document.querySelector('.tokenizer');
    tokenizerElement.textContent = code;
    return code;
};
