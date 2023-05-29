export class CompilerError extends Error {
    constructor(line, linePosition, message) {
        super(`Error on line (${line}:${linePosition}): ${message}`);
        this.name = this.constructor.name;
    }
}
