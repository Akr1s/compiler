export const transform = (code) => {
    const transformerElement = document.querySelector('.transformer');
    transformerElement.textContent = code;
    return code;
};
