export const transform = (code) => {
    const transformerElement = document.querySelector('.transformer');
    transformerElement.textContent = JSON.stringify(code, null, 2);
    return code;
};
